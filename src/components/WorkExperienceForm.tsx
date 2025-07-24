import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PictureUploadStep } from "./PictureUploadStep";
import { AmenitySelectionStep } from "./AmenitySelectionStep";
import { WorkRatingStep } from "./WorkRatingStep";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  picture?: File;
  amenities: string[];
  rating: number;
  comments?: string;
}

export const WorkExperienceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    amenities: [],
    rating: 0
  });

  const totalSteps = 3;
  const stepTitles = [
    "Add a Photo",
    "Select Amenities",
    "Rate Experience"
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    // In real app, would submit to backend
    toast({
      title: "Thank you!",
      description: "Your feedback helps other remote workers find great places to work.",
    });
    navigate(-1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true; // Picture is optional
      case 2:
        return formData.amenities.length > 0;
      case 3:
        return formData.rating > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PictureUploadStep
            value={formData.picture}
            onChange={(picture) => setFormData({ ...formData, picture })}
          />
        );
      case 2:
        return (
          <AmenitySelectionStep
            value={formData.amenities}
            onChange={(amenities) => setFormData({ ...formData, amenities })}
          />
        );
      case 3:
        return (
          <WorkRatingStep
            rating={formData.rating}
            comments={formData.comments}
            onRatingChange={(rating) => setFormData({ ...formData, rating })}
            onCommentsChange={(comments) => setFormData({ ...formData, comments })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-coffee-dark">Share Your Experience</h1>
              <p className="text-muted-foreground">Help others work better</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-coffee-dark">
                {stepTitles[currentStep - 1]}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-singapore-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <Card className="p-6 mb-8">
            {renderStep()}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button 
              variant="singapore"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === totalSteps ? "Submit" : "Next"}
              {currentStep < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};