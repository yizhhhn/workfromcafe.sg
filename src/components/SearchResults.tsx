import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Zap, Wifi, Volume2, Snowflake, Save, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/AuthModal";
import { useToast } from "@/components/ui/use-toast";
import cafe1 from "@/assets/cafe-1.jpg";
import cafe2 from "@/assets/cafe-2.jpg";
import cafe3 from "@/assets/cafe-3.jpg";

export const SearchResults = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<any>({});
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const intent = sessionStorage.getItem('workIntent');
    const amenities = JSON.parse(sessionStorage.getItem('selectedAmenities') || '[]');
    const location = JSON.parse(sessionStorage.getItem('locationPreference') || '{}');
    
    setPreferences({ intent, amenities, location });
  }, []);

  const mockCafes = [
    {
      id: 1,
      name: "Common Man Coffee Roasters",
      image: cafe1,
      rating: 4.8,
      lastCheckin: "2 hours ago",
      distance: "0.3 km",
      amenities: ['power', 'wifi', 'quiet', 'aircon'],
      workFriendly: true
    },
    {
      id: 2,
      name: "The Book Café",
      image: cafe2,
      rating: 4.6,
      lastCheckin: "5 hours ago", 
      distance: "0.7 km",
      amenities: ['power', 'wifi', 'tables', 'quiet'],
      workFriendly: true
    },
    {
      id: 3,
      name: "Habitat Coffee",
      image: cafe3,
      rating: 4.7,
      lastCheckin: "1 hour ago",
      distance: "1.2 km", 
      amenities: ['power', 'wifi', 'aircon', 'coffee'],
      workFriendly: true
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: any } = {
      power: Zap,
      wifi: Wifi,
      quiet: Volume2,
      aircon: Snowflake,
      tables: Grid
    };
    return icons[amenity];
  };

  const handleSavePreferences = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userId: string) => {
    toast({
      title: "Preferences saved!",
      description: "Your account has been created and preferences saved.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-coffee-dark">Perfect matches</h1>
                <p className="text-muted-foreground">3 cafés found for you</p>
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          <Card className="p-4 mb-8 bg-gradient-card border-singapore-green/20">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-coffee-dark">Filtered for:</span>
              {preferences.intent && (
                <Badge variant="secondary" className="bg-coffee-light text-coffee-dark">
                  {preferences.intent}
                </Badge>
              )}
              {preferences.amenities?.slice(0, 3).map((amenity: string) => (
                <Badge key={amenity} variant="outline" className="border-singapore-green/30">
                  {amenity}
                </Badge>
              ))}
              {preferences.amenities?.length > 3 && (
                <Badge variant="outline">+{preferences.amenities.length - 3} more</Badge>
              )}
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-6 mb-8">
            {mockCafes.map((cafe) => (
              <Card 
                key={cafe.id} 
                className="overflow-hidden hover:shadow-card transition-all duration-200 cursor-pointer"
                onClick={() => navigate(`/cafe/${cafe.id}`)}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={cafe.image} 
                      alt={cafe.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-coffee-dark mb-1">{cafe.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {cafe.distance}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Last check-in {cafe.lastCheckin}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-singapore-green">
                          {cafe.rating}
                        </div>
                        <div className="text-xs text-muted-foreground">work rating</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cafe.amenities.map((amenity) => {
                        const Icon = getAmenityIcon(amenity);
                        return (
                          <div 
                            key={amenity}
                            className="flex items-center gap-1 px-2 py-1 bg-coffee-light rounded-full"
                          >
                            {Icon && <Icon className="h-3 w-3 text-coffee-dark" />}
                            <span className="text-xs text-coffee-dark capitalize">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {cafe.workFriendly && (
                      <Badge className="bg-singapore-green text-white">
                        ✅ Work-friendly verified
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="singapore" onClick={handleSavePreferences} className="gap-2">
              <Save className="h-4 w-4" />
              Save these preferences for next time
            </Button>
            <Button variant="outline" onClick={() => navigate('/all-cafes')}>
              See all cafes instead
            </Button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        preferences={{
          workIntent: preferences.intent || "",
          amenities: preferences.amenities || [],
          location: preferences.location ? JSON.stringify(preferences.location) : "",
        }}
      />
    </div>
  );
};