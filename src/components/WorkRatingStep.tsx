import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, ThumbsUp } from "lucide-react";

interface WorkRatingStepProps {
  rating: number;
  comments?: string;
  onRatingChange: (rating: number) => void;
  onCommentsChange: (comments: string) => void;
}

const ratingLabels = {
  1: "Poor - Not suitable for work",
  2: "Fair - Limited work potential", 
  3: "Good - Decent for short work sessions",
  4: "Very Good - Great for most work",
  5: "Excellent - Perfect workspace"
};

export const WorkRatingStep = ({ 
  rating, 
  comments, 
  onRatingChange, 
  onCommentsChange 
}: WorkRatingStepProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-singapore-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ThumbsUp className="h-8 w-8 text-singapore-green" />
        </div>
        <h3 className="text-xl font-semibold text-coffee-dark mb-2">
          Rate the work experience
        </h3>
        <p className="text-muted-foreground">
          How would you rate this cafe for remote work?
        </p>
      </div>

      {/* Star Rating */}
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="p-1 hover:scale-110 transition-transform"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => onRatingChange(star)}
              >
                <Star 
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          
          {(hoveredRating || rating) > 0 && (
            <p className="text-sm font-medium text-coffee-dark">
              {ratingLabels[(hoveredRating || rating) as keyof typeof ratingLabels]}
            </p>
          )}
        </div>
      </Card>

      {/* Comments */}
      <div className="space-y-3">
        <Label htmlFor="comments" className="text-coffee-dark font-medium">
          Additional comments (optional)
        </Label>
        <Textarea
          id="comments"
          placeholder="Share specific details about the workspace, atmosphere, or any tips for other remote workers..."
          value={comments || ""}
          onChange={(e) => onCommentsChange(e.target.value)}
          className="min-h-24 resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Your feedback helps create a better community for remote workers
        </p>
      </div>

      {rating > 0 && (
        <div className="bg-singapore-green/10 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`h-4 w-4 ${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-singapore-green">
              {ratingLabels[rating as keyof typeof ratingLabels]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};