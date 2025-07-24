import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, MapPin, Navigation, Train } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const LocationPreference = () => {
  const navigate = useNavigate();
  const [locationType, setLocationType] = useState<string>('');
  const [selectedMRT, setSelectedMRT] = useState<string>('');
  const [customLocation, setCustomLocation] = useState<string>('');

  const handleLocationSelect = (type: string) => {
    setLocationType(type);
    if (type !== 'mrt') setSelectedMRT('');
    if (type !== 'custom') setCustomLocation('');
  };

  const handleContinue = () => {
    const locationData = {
      type: locationType,
      mrt: selectedMRT,
      custom: customLocation
    };
    sessionStorage.setItem('locationPreference', JSON.stringify(locationData));
    navigate('/results');
  };

  const canContinue = locationType === 'nearby' || 
                     (locationType === 'mrt' && selectedMRT) || 
                     (locationType === 'custom' && customLocation.trim());

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
              <h1 className="text-2xl font-bold text-coffee-dark">Almost there</h1>
              <p className="text-muted-foreground">Step 3 of 3</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-12">
            <div className="bg-singapore-green h-2 rounded-full w-full transition-all duration-300"></div>
          </div>

          {/* Question */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Where do you want to work today?
            </h2>
            <p className="text-lg text-muted-foreground">
              We'll find cafés that match your location preference
            </p>
          </div>

          {/* Location Options */}
          <div className="space-y-4 mb-8">
            <Card 
              className={`p-6 cursor-pointer transition-all duration-200 border-2 ${
                locationType === 'nearby' 
                  ? 'border-singapore-green bg-singapore-green/5 shadow-soft' 
                  : 'hover:border-singapore-green/50 hover:shadow-card'
              }`}
              onClick={() => handleLocationSelect('nearby')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  locationType === 'nearby' ? 'bg-singapore-green text-white' : 'bg-coffee-light text-coffee-dark'
                }`}>
                  <Navigation className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${
                    locationType === 'nearby' ? 'text-singapore-green' : 'text-coffee-dark'
                  }`}>
                    Near me
                  </h3>
                  <p className="text-muted-foreground">Use my current location</p>
                </div>
              </div>
            </Card>

            <Card 
              className={`p-6 cursor-pointer transition-all duration-200 border-2 ${
                locationType === 'mrt' 
                  ? 'border-singapore-green bg-singapore-green/5 shadow-soft' 
                  : 'hover:border-singapore-green/50 hover:shadow-card'
              }`}
              onClick={() => handleLocationSelect('mrt')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  locationType === 'mrt' ? 'bg-singapore-green text-white' : 'bg-coffee-light text-coffee-dark'
                }`}>
                  <Train className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-1 ${
                    locationType === 'mrt' ? 'text-singapore-green' : 'text-coffee-dark'
                  }`}>
                    Near an MRT station
                  </h3>
                  <p className="text-muted-foreground mb-3">Choose a convenient station</p>
                  
                  {locationType === 'mrt' && (
                    <Select value={selectedMRT} onValueChange={setSelectedMRT}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select MRT station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orchard">Orchard</SelectItem>
                        <SelectItem value="raffles-place">Raffles Place</SelectItem>
                        <SelectItem value="marina-bay">Marina Bay</SelectItem>
                        <SelectItem value="tanjong-pagar">Tanjong Pagar</SelectItem>
                        <SelectItem value="bugis">Bugis</SelectItem>
                        <SelectItem value="clarke-quay">Clarke Quay</SelectItem>
                        <SelectItem value="somerset">Somerset</SelectItem>
                        <SelectItem value="dhoby-ghaut">Dhoby Ghaut</SelectItem>
                        <SelectItem value="chinatown">Chinatown</SelectItem>
                        <SelectItem value="harbourfront">HarbourFront</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </Card>

            <Card 
              className={`p-6 cursor-pointer transition-all duration-200 border-2 ${
                locationType === 'custom' 
                  ? 'border-singapore-green bg-singapore-green/5 shadow-soft' 
                  : 'hover:border-singapore-green/50 hover:shadow-card'
              }`}
              onClick={() => handleLocationSelect('custom')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  locationType === 'custom' ? 'bg-singapore-green text-white' : 'bg-coffee-light text-coffee-dark'
                }`}>
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-1 ${
                    locationType === 'custom' ? 'text-singapore-green' : 'text-coffee-dark'
                  }`}>
                    A specific location
                  </h3>
                  <p className="text-muted-foreground mb-3">Enter neighborhood or address</p>
                  
                  {locationType === 'custom' && (
                    <Input
                      placeholder="e.g. Tiong Bahru, Holland Village..."
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      className="w-full"
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={handleContinue} 
              disabled={!canContinue}
              className="gap-2"
            >
              Find cafés
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};