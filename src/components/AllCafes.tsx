import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Clock, Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import cafe1 from "@/assets/cafe-1.jpg";
import cafe2 from "@/assets/cafe-2.jpg";
import cafe3 from "@/assets/cafe-3.jpg";

export const AllCafes = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('nearest');
  const [searchQuery, setSearchQuery] = useState('');

  const mockCafes = [
    {
      id: 1,
      name: "Common Man Coffee Roasters",
      image: cafe1,
      rating: 4.8,
      lastCheckin: "2 hours ago",
      distance: "0.3 km",
      neighborhood: "Martin Road",
      workFriendly: true
    },
    {
      id: 2,
      name: "The Book Café",
      image: cafe2,
      rating: 4.6,
      lastCheckin: "5 hours ago", 
      distance: "0.7 km",
      neighborhood: "Tiong Bahru",
      workFriendly: true
    },
    {
      id: 3,
      name: "Habitat Coffee",
      image: cafe3,
      rating: 4.7,
      lastCheckin: "1 hour ago",
      distance: "1.2 km",
      neighborhood: "Holland Village", 
      workFriendly: true
    },
    {
      id: 4,
      name: "Artisan Roast Coffee",
      image: cafe1,
      rating: 4.5,
      lastCheckin: "3 hours ago",
      distance: "1.8 km",
      neighborhood: "Chinatown",
      workFriendly: true
    },
    {
      id: 5,
      name: "The Daily Grind",
      image: cafe2,
      rating: 4.4,
      lastCheckin: "6 hours ago",
      distance: "2.1 km",
      neighborhood: "Clarke Quay",
      workFriendly: false
    },
    {
      id: 6,
      name: "Brew & Bite",
      image: cafe3,
      rating: 4.3,
      lastCheckin: "1 day ago",
      distance: "2.5 km",
      neighborhood: "Raffles Place",
      workFriendly: true
    }
  ];

  const filteredCafes = mockCafes.filter(cafe =>
    cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cafe.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCafes = [...filteredCafes].sort((a, b) => {
    switch (sortBy) {
      case 'nearest':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'recent':
        // Simple sort by hours mentioned in lastCheckin
        const aHours = parseInt(a.lastCheckin.split(' ')[0]) || 24;
        const bHours = parseInt(b.lastCheckin.split(' ')[0]) || 24;
        return aHours - bHours;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

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
              <h1 className="text-2xl font-bold text-coffee-dark">All Cafés</h1>
              <p className="text-muted-foreground">{mockCafes.length} work-friendly spots in Singapore</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cafés or neighborhoods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nearest">Nearest first</SelectItem>
                    <SelectItem value="recent">Most recent updates</SelectItem>
                    <SelectItem value="rating">Highest rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredCafes.length} café{filteredCafes.length !== 1 ? 's' : ''} found
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/intent')}
            >
              Use smart filters instead
            </Button>
          </div>

          {/* Café Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {sortedCafes.map((cafe) => (
              <Card 
                key={cafe.id} 
                className="overflow-hidden hover:shadow-card transition-all duration-200 cursor-pointer"
                onClick={() => navigate(`/cafe/${cafe.id}`)}
              >
                <div className="relative">
                  <img 
                    src={cafe.image} 
                    alt={cafe.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {cafe.workFriendly ? (
                      <Badge className="bg-singapore-green text-white">
                        ✅ Work-friendly
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Limited work space
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-coffee-dark mb-1">{cafe.name}</h3>
                      <p className="text-sm text-muted-foreground">{cafe.neighborhood}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-singapore-green">
                        {cafe.rating}
                      </div>
                      <div className="text-xs text-muted-foreground">rating</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {cafe.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Updated {cafe.lastCheckin}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredCafes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-coffee-medium" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-dark mb-2">No cafés found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-card border-singapore-green/20">
              <h3 className="text-xl font-semibold text-coffee-dark mb-2">
                Know a great work café?
              </h3>
              <p className="text-muted-foreground mb-4">
                Help the remote work community by adding your favorite spots
              </p>
              <Button variant="singapore">
                Add a café
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};