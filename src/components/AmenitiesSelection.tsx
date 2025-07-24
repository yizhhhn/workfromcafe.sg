import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Zap, 
  Volume2, 
  Snowflake, 
  Wifi, 
  Table, 
  Coffee, 
  UtensilsCrossed,
  User
} from "lucide-react";

export const AmenitiesSelection = () => {
  const navigate = useNavigate();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenities = [
    { id: 'power', label: 'Power plugs', icon: Zap, description: 'Plenty of accessible outlets' },
    { id: 'quiet', label: 'Quiet environment', icon: Volume2, description: 'Low noise, good for focus' },
    { id: 'aircon', label: 'Air conditioning', icon: Snowflake, description: 'Cool, comfortable temperature' },
    { id: 'wifi', label: 'Reliable Wi-Fi', icon: Wifi, description: 'Fast, stable internet connection' },
    { id: 'tables', label: 'Big tables', icon: Table, description: 'Space for laptop and materials' },
    { id: 'coffee', label: 'Great coffee', icon: Coffee, description: 'Quality beverages available' },
    { id: 'food', label: 'Food available', icon: UtensilsCrossed, description: 'Meals or snacks on-site' },
    { id: 'solo', label: 'Friendly to solo workers', icon: User, description: 'Welcoming to individuals' },
  ];

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleContinue = () => {
    sessionStorage.setItem('selectedAmenities', JSON.stringify(selectedAmenities));
    navigate('/location');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-coffee-dark">Choose your needs</h1>
              <p className="text-muted-foreground">Step 2 of 3</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-12">
            <div className="bg-singapore-green h-2 rounded-full w-2/3 transition-all duration-300"></div>
          </div>

          {/* Question */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Select the amenities and services you need
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose any that are important to you (optional)
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {amenities.map((amenity) => {
              const Icon = amenity.icon;
              const isSelected = selectedAmenities.includes(amenity.id);
              
              return (
                <div
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`
                    p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${isSelected 
                      ? 'border-singapore-green bg-singapore-green/5 shadow-soft' 
                      : 'border-border hover:border-singapore-green/50 bg-card hover:shadow-card'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'bg-singapore-green text-white' : 'bg-coffee-light text-coffee-dark'}
                    `}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-semibold mb-1 ${isSelected ? 'text-singapore-green' : 'text-coffee-dark'}`}>
                        {amenity.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {selectedAmenities.length} amenities selected
            </p>
            <Button size="lg" onClick={handleContinue} className="gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};