import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, X, Image } from "lucide-react";

interface PictureUploadStepProps {
  value?: File;
  onChange: (file?: File) => void;
}

export const PictureUploadStep = ({ value, onChange }: PictureUploadStepProps) => {
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-singapore-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="h-8 w-8 text-singapore-green" />
        </div>
        <h3 className="text-xl font-semibold text-coffee-dark mb-2">
          Add a Photo (Optional)
        </h3>
        <p className="text-muted-foreground">
          Share a photo of the workspace to help others visualize the environment
        </p>
      </div>

      {preview ? (
        <Card className="p-4">
          <div className="relative">
            <img 
              src={preview} 
              alt="Workspace preview" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card 
          className="border-2 border-dashed border-muted-foreground/25 hover:border-singapore-green/50 transition-colors cursor-pointer"
          onClick={handleUploadClick}
        >
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG up to 10MB
            </p>
          </div>
        </Card>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <div className="bg-coffee-light/20 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Image className="h-5 w-5 text-singapore-green mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-coffee-dark mb-1">Photo Tips</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Show the overall workspace layout</li>
              <li>• Include seating and table arrangements</li>
              <li>• Capture the ambiance and lighting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};