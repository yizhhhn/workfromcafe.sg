import { Button } from "@/components/ui/button";
import { Coffee, MapPin, Wifi, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroCafe from "@/assets/hero-cafe.jpg";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-coffee-dark" />
            <span className="text-2xl font-bold text-coffee-dark">WorkFromCafe.sg</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">For Cafes</a>
            <Button variant="outline" size="sm">Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroCafe} 
            alt="Cozy Singapore cafe perfect for remote work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/60 to-coffee-medium/40" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-cream mb-6 leading-tight">
            Find Your Perfect
            <br />
            <span className="text-gradient bg-gradient-to-r from-cream to-coffee-light bg-clip-text text-transparent">
              Work Cafe
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto">
            Discover reliable, remote-work friendly cafés in Singapore
          </p>
          
          <Button 
            size="xl" 
            variant="hero"
            onClick={() => navigate("/intent")}
            className="mb-8"
          >
            Find a café now
          </Button>
          
          <div className="flex flex-wrap justify-center gap-8 text-cream/80">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>500+ cafés mapped</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              <span>Verified amenities</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Trusted by remote workers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Why WorkFromCafe.sg?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built by remote workers, for remote workers. Get real, updated info from the community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-card shadow-card">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-coffee-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Verified Info</h3>
              <p className="text-muted-foreground">
                Real check-ins from the community ensure you get accurate, up-to-date information.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card shadow-card">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-coffee-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Smart Filtering</h3>
              <p className="text-muted-foreground">
                Find exactly what you need - quiet spaces, power plugs, great coffee, and more.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card shadow-card">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-coffee-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Community Driven</h3>
              <p className="text-muted-foreground">
                Join a community of remote workers sharing the best work spots in Singapore.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};