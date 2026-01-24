import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string) => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onImageSelected, isAnalyzing }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageSelected(file, result);
    };
    reader.readAsDataURL(file);
  }, [onImageSelected, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative border-2 border-dashed rounded-2xl transition-all duration-300
          ${isDragging ? 'border-primary bg-accent/50 scale-[1.02]' : 'border-border bg-card'}
          ${preview ? 'p-4' : 'p-12'}
        `}
        style={{ boxShadow: preview ? 'var(--shadow-medium)' : 'var(--shadow-soft)' }}
      >
        {!preview ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center">
                <Upload className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Upload Your Photo</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Take a clear selfie in good lighting for the most accurate skin analysis
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => document.getElementById('file-input')?.click()}
                size="lg"
                disabled={isAnalyzing}
                className="shadow-md hover:shadow-lg transition-all"
              >
                <ImageIcon className="mr-2 h-5 w-5" />
                Choose Photo
              </Button>
              
              <p className="text-sm text-muted-foreground">
                or drag and drop your image here
              </p>
            </div>
            
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={preview} 
                alt="Your uploaded photo" 
                className="w-full h-auto max-h-96 object-contain mx-auto rounded-xl"
              />
              {!isAnalyzing && (
                <Button
                  onClick={clearImage}
                  variant="destructive"
                  size="icon"
                  className="absolute top-3 right-3 shadow-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
