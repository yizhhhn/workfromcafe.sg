import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Coffee, Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NoResults = () => {
  const navigate = useNavigate();

  const handleAddCafe = () => {
    // In real app, would open add cafe form
    alert("Feature coming soon! Thanks for wanting to contribute to the community.");
  };

  const handleTryAgain = () => {
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
              <h1 className="text-2xl font-bold text-coffee-dark">No results found</h1>
              <p className="text-muted-foreground">Let's try something else</p>
            </div>
          </div>

          {/* No Results Illustration */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Coffee className="h-12 w-12 text-coffee-medium" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-coffee-dark mb-4">
              Oops, we couldn't find any cafés with that combo
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't worry! You can try adjusting your preferences or explore all available cafés.
            </p>
          </div>

          {/* Suggestions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-coffee-dark mb-4">What you can do:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-singapore-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="h-4 w-4 text-singapore-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-coffee-dark">Try different filters</h4>
                    <p className="text-sm text-muted-foreground">
                      Remove some amenities or try a different location to see more options
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-singapore-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Coffee className="h-4 w-4 text-singapore-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-coffee-dark">Browse all cafés</h4>
                    <p className="text-sm text-muted-foreground">
                      See all available work-friendly cafés without filters
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-singapore-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Plus className="h-4 w-4 text-singapore-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-coffee-dark">Know a great café?</h4>
                    <p className="text-sm text-muted-foreground">
                      Add it to help other remote workers find amazing places to work
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="singapore" 
                onClick={handleTryAgain}
                className="flex-1 gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try different filters
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/all-cafes')}
                className="flex-1"
              >
                Browse all cafés
              </Button>
            </div>

            <div className="text-center">
              <Button 
                variant="coffee" 
                onClick={handleAddCafe}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Know a great café? Add it here
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};