import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star, 
  Zap, 
  Wifi, 
  Volume2, 
  Snowflake, 
  Table,
  Coffee,
  UtensilsCrossed,
  User,
  CheckCircle
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import cafe1 from "@/assets/cafe-1.jpg";

export const CafeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in real app would fetch by ID
  const cafe = {
    id: 1,
    name: "Common Man Coffee Roasters",
    image: cafe1,
    address: "22 Martin Rd, Singapore 239058",
    hours: "Mon-Sun: 7:30am - 10:30pm",
    rating: 4.8,
    totalCheckins: 247,
    lastCheckin: "2 hours ago",
    distance: "0.3 km",
    phone: "+65 6836 4695",
    website: "commonmancoffeeroasters.com",
    amenities: {
      power: { available: true, note: "Plenty of outlets throughout" },
      wifi: { available: true, note: "Fast & reliable, password: coffee123" },
      quiet: { available: true, note: "Quiet atmosphere, good for focus" },
      aircon: { available: true, note: "Well air-conditioned" },
      tables: { available: true, note: "Large tables, laptop-friendly" },
      coffee: { available: true, note: "Specialty coffee, highly rated" },
      food: { available: true, note: "Light meals and pastries" },
      solo: { available: true, note: "Solo worker friendly" }
    }
  };

  const amenityIcons = {
    power: Zap,
    wifi: Wifi,
    quiet: Volume2,
    aircon: Snowflake,
    tables: Table,
    coffee: Coffee,
    food: UtensilsCrossed,
    solo: User
  };

  const amenityLabels = {
    power: "Power plugs",
    wifi: "Reliable Wi-Fi",
    quiet: "Quiet environment",
    aircon: "Air conditioning",
    tables: "Big tables",
    coffee: "Great coffee",
    food: "Food available",
    solo: "Solo worker friendly"
  };

  const handleVerify = () => {
    navigate(`/cafe/${id}/experience`);
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
              <h1 className="text-2xl font-bold text-coffee-dark">Café Details</h1>
              <p className="text-muted-foreground">Everything you need to know</p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <img 
              src={cafe.image} 
              alt={cafe.name}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-3xl font-bold mb-2">{cafe.name}</h2>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{cafe.rating}</span>
                  <span className="text-sm">({cafe.totalCheckins} check-ins)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{cafe.distance}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-coffee-dark mb-4">Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{cafe.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{cafe.hours}</span>
                  </div>
                </div>
              </Card>

              {/* Amenities */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-coffee-dark mb-4">Amenities & Services</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(cafe.amenities).map(([key, amenity]) => {
                    const Icon = amenityIcons[key as keyof typeof amenityIcons];
                    const label = amenityLabels[key as keyof typeof amenityLabels];
                    
                    return (
                      <div key={key} className="flex items-start gap-3 p-3 rounded-lg bg-coffee-light/30">
                        <div className="w-8 h-8 bg-singapore-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-singapore-green" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-coffee-dark text-sm">{label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{amenity.note}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-coffee-dark mb-4">Recent Check-ins</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-singapore-green rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Anonymous user verified work conditions</div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-singapore-green rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Anonymous user confirmed Wi-Fi working</div>
                      <div className="text-xs text-muted-foreground">5 hours ago</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trust Badge */}
              <Card className="p-6 text-center bg-gradient-card border-singapore-green/20">
                <div className="w-16 h-16 bg-singapore-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-coffee-dark mb-2">Work-Friendly Verified</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Verified by {cafe.totalCheckins} remote workers
                </p>
                <Badge className="bg-singapore-green text-white">
                  Last verified {cafe.lastCheckin}
                </Badge>
              </Card>

              {/* Verification CTA */}
              <Card className="p-6">
                <h4 className="font-semibold text-coffee-dark mb-2">Help the community</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Have you worked here? Share your experience to help other remote workers.
                </p>
                <Button 
                  className="w-full" 
                  variant="singapore" 
                  onClick={handleVerify}
                >
                  ✅ I've worked here
                </Button>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h4 className="font-semibold text-coffee-dark mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    📍 Get directions
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    📞 Call café
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    🌐 Visit website
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};