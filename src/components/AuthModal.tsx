import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userId: string) => void;
  preferences: {
    workIntent: string;
    amenities: string[];
    location: string;
  };
}

export const AuthModal = ({ isOpen, onClose, onSuccess, preferences }: AuthModalProps) => {
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "OTP Sent",
        description: "Check your email for the verification code",
      });
      setStep("otp");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw error;

      if (data.user) {
        // Save user preferences
        await saveUserPreferences(data.user.id);
        
        // Track login session
        await trackLoginSession(data.user.id, data.session?.access_token || "");
        
        toast({
          title: "Success",
          description: "Account created and preferences saved!",
        });
        
        onSuccess(data.user.id);
        onClose();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserPreferences = async (userId: string) => {
    const { error } = await supabase
      .from("user_preferences")
      .upsert({
        user_id: userId,
        work_intent: preferences.workIntent,
        amenities: preferences.amenities,
        location: preferences.location,
      });

    if (error) {
      console.error("Error saving preferences:", error);
      throw error;
    }
  };

  const trackLoginSession = async (userId: string, sessionId: string) => {
    const { error } = await supabase
      .from("user_sessions")
      .insert({
        user_id: userId,
        session_id: sessionId,
        login_timestamp: new Date().toISOString(),
        ip_address: null, // Would need server-side implementation for real IP
        user_agent: navigator.userAgent,
      });

    if (error) {
      console.error("Error tracking session:", error);
    }
  };

  const resetModal = () => {
    setStep("signup");
    setEmail("");
    setName("");
    setOtp("");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === "signup" ? "Create Your Account" : "Verify Your Email"}
          </DialogTitle>
        </DialogHeader>

        {step === "signup" ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send Verification Code"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
              <p className="text-sm text-muted-foreground">
                We sent a verification code to {email}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("signup")}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Save"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};