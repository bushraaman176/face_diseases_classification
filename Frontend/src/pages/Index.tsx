import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResults, SkinIssue } from "@/components/AnalysisResults";
import { ProductRecommendations, Product } from "@/components/ProductRecommendations";
import { RecommendationChoice } from "@/components/RecommendationChoice";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { analyzeSkinImageWithDatabase } from "@/utils/databaseAnalysis";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [step, setStep] = useState<'hero' | 'upload' | 'results' | 'choice' | 'recommendations'>('hero');
  const [recommendationType, setRecommendationType] = useState<'products' | 'exercises' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skinIssues, setSkinIssues] = useState<SkinIssue[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const uploadRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setStep('upload');
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleImageSelected = async (file: File, preview: string) => {
    setIsAnalyzing(true);
    
    try {
      // Analyze image using backend API (fetches from database)
      const { issues, products } = await analyzeSkinImageWithDatabase(file);
      setSkinIssues(issues);
      setRecommendedProducts(products);

      setStep('results');
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: `Detected ${issues.length} skin concern${issues.length !== 1 ? 's' : ''}. Found ${products.length} recommended products.`,
      });

      setTimeout(() => {
        uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleRecommendationChoice = (choice: 'products' | 'exercises') => {
    setRecommendationType(choice);
    setStep('recommendations');
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setStep('upload');
    setRecommendationType(null);
    setSkinIssues([]);
    setRecommendedProducts([]);
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onGetStarted={handleGetStarted} />

      {(step === 'upload' || step === 'results' || step === 'choice' || step === 'recommendations') && (
        <section ref={uploadRef} className="py-16 px-4">
          <div className="container mx-auto space-y-12">
            {step === 'upload' && (
              <>
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">Upload Your Photo</h2>
                  <p className="text-muted-foreground">
                    Our AI will analyze your skin and provide personalized recommendations
                  </p>
                </div>
                <ImageUpload onImageSelected={handleImageSelected} isAnalyzing={isAnalyzing} />
              </>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-16 space-y-6 animate-in fade-in duration-500">
                <div className="relative">
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <div className="absolute inset-0 h-16 w-16 rounded-full bg-primary/20 animate-ping" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-semibold">Analyzing Your Skin...</h3>
                  <p className="text-muted-foreground">
                    Our AI is processing your image to detect skin concerns
                  </p>
                </div>
              </div>
            )}

            {step === 'results' && !isAnalyzing && (
              <div className="space-y-12">
                <div className="flex justify-center">
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    className="shadow-sm"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Analyze Another Photo
                  </Button>
                </div>

                <AnalysisResults issues={skinIssues} />
                
                <div className="pt-8">
                  <RecommendationChoice onSelect={handleRecommendationChoice} />
                </div>
              </div>
            )}

            {step === 'recommendations' && (
              <div className="space-y-12">
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={() => {
                      setStep('results');
                      setTimeout(() => {
                        uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    variant="outline"
                    className="shadow-sm"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Results
                  </Button>
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    className="shadow-sm"
                  >
                    Analyze Another Photo
                  </Button>
                </div>

                {recommendationType === 'products' && recommendedProducts.length > 0 && (
                  <ProductRecommendations products={recommendedProducts} />
                )}
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AI-Powered Skincare Analysis • Personalized Recommendations • Trusted Products</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
