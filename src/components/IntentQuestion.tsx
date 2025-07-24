import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Focus, Phone, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const IntentQuestion = () => {
  const navigate = useNavigate();

  const handleIntent = (intent: string) => {
    // Store intent in sessionStorage for later use
    sessionStorage.setItem('workIntent', intent);
    navigate('/amenities');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-coffee-dark">Let's get started</h1>
              <p className="text-muted-foreground">Step 1 of 3</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-12">
            <div className="bg-singapore-green h-2 rounded-full w-1/3 transition-all duration-300"></div>
          </div>

          {/* Question */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              What kind of work are you planning to do today?
            </h2>
            <p className="text-lg text-muted-foreground">
              This helps us find the perfect environment for your needs
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Card 
              className="p-6 cursor-pointer hover:shadow-card transition-all duration-200 border-2 hover:border-singapore-green group"
              onClick={() => handleIntent('focus')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-coffee-light rounded-full flex items-center justify-center group-hover:bg-singapore-green/10">
                  <Focus className="h-6 w-6 text-coffee-dark group-hover:text-singapore-green" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-coffee-dark mb-1">Focus time</h3>
                  <p className="text-muted-foreground">
                    Deep work, coding, writing - need a quiet, distraction-free environment
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:shadow-card transition-all duration-200 border-2 hover:border-singapore-green group"
              onClick={() => handleIntent('calls')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-coffee-light rounded-full flex items-center justify-center group-hover:bg-singapore-green/10">
                  <Phone className="h-6 w-6 text-coffee-dark group-hover:text-singapore-green" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-coffee-dark mb-1">Taking calls/meetings</h3>
                  <p className="text-muted-foreground">
                    Video calls, phone meetings - need reliable wifi and a suitable talking environment
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:shadow-card transition-all duration-200 border-2 hover:border-singapore-green group"
              onClick={() => handleIntent('vibes')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-coffee-light rounded-full flex items-center justify-center group-hover:bg-singapore-green/10">
                  <Sparkles className="h-6 w-6 text-coffee-dark group-hover:text-singapore-green" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-coffee-dark mb-1">Need a change in environment / good vibes</h3>
                  <p className="text-muted-foreground">
                    Break routine, get inspired - looking for atmosphere and energy
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};