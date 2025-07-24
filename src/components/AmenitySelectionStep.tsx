import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Zap, 
  Wifi, 
  Volume2, 
  Snowflake, 
  Table,
  Coffee,
  UtensilsCrossed,
  User,
  CheckCircle2
} from "lucide-react";

interface AmenitySelectionStepProps {
  value: string[];
  onChange: (amenities: string[]) => void;
}

const amenities = [
  {
    id: "power",
    label: "Power plugs available",
    description: "Accessible power outlets for laptops",
    icon: Zap
  },
  {
    id: "wifi",
    label: "Reliable Wi-Fi",
    description: "Fast and stable internet connection",
    icon: Wifi
  },
  {
    id: "quiet",
    label: "Quiet environment",
    description: "Good for focused work and calls",
    icon: Volume2
  },
  {
    id: "aircon",
    label: "Air conditioning",
    description: "Climate controlled environment",
    icon: Snowflake
  },
  {
    id: "tables",
    label: "Large tables",
    description: "Laptop-friendly workspace",
    icon: Table
  },
  {
    id: "coffee",
    label: "Great coffee",
    description: "Quality coffee and beverages",
    icon: Coffee
  },
  {
    id: "food",
    label: "Food available",
    description: "Meals, snacks, or light bites",
    icon: UtensilsCrossed
  },
  {
    id: "solo",
    label: "Solo worker friendly",
    description: "Welcoming for individual workers",
    icon: User
  }
];

export const AmenitySelectionStep = ({ value, onChange }: AmenitySelectionStepProps) => {
  const handleToggle = (amenityId: string) => {
    const newValue = value.includes(amenityId)
      ? value.filter(id => id !== amenityId)
      : [...value, amenityId];
    onChange(newValue);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-singapore-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-singapore-green" />
        </div>
        <h3 className="text-xl font-semibold text-coffee-dark mb-2">
          Which amenities were available?
        </h3>
        <p className="text-muted-foreground">
          Select all the amenities you found during your visit
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {amenities.map((amenity) => {
          const Icon = amenity.icon;
          const isSelected = value.includes(amenity.id);
          
          return (
            <Card 
              key={amenity.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-singapore-green bg-singapore-green/5' 
                  : 'hover:bg-muted/30'
              }`}
              onClick={() => handleToggle(amenity.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected 
                      ? 'bg-singapore-green text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-coffee-dark text-sm">
                      {amenity.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {amenity.description}
                    </div>
                  </div>
                </div>
                <Checkbox 
                  checked={isSelected}
                  onChange={() => handleToggle(amenity.id)}
                  className="mt-1"
                />
              </div>
            </Card>
          );
        })}
      </div>

      {value.length > 0 && (
        <div className="bg-singapore-green/10 p-4 rounded-lg">
          <p className="text-sm text-singapore-green font-medium">
            ✓ {value.length} amenities selected
          </p>
        </div>
      )}
    </div>
  );
};