import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResults, SkinIssue } from "@/components/AnalysisResults";
import { ProductRecommendations, Product } from "@/components/ProductRecommendations";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [step, setStep] = useState<'hero' | 'upload' | 'results'>('hero');
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
      console.log('🚀 Starting analysis for file:', file.name, 'Type:', file.type, 'Size:', file.size);
      
      // Create FormData to send image to backend
      const formData = new FormData();
      formData.append('file', file);

      console.log('📤 Sending request to backend...');
      
      // Send POST request to FastAPI backend
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });

      console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Received data from backend:', data);
      
      // Transform backend response to SkinIssue format
      const issues: SkinIssue[] = [];
      
      // Add the primary predicted issue
      if (data.predicted_class && data.predicted_class !== 'Normal Skin') {
        console.log('🎯 Primary prediction:', data.predicted_class, 'Confidence:', data.confidence);
        issues.push({
          name: data.predicted_class,
          confidence: data.confidence * 100,
          severity: data.confidence > 0.8 ? 'high' : data.confidence > 0.5 ? 'medium' : 'low',
          description: getIssueDescription(data.predicted_class)
        });
      }

      // Add other significant predictions (confidence > 30%)
      if (data.all_predictions) {
        Object.entries(data.all_predictions).forEach(([className, confidence]) => {
          const conf = confidence as number;
          if (className !== data.predicted_class && 
              className !== 'Normal Skin' && 
              conf > 0.3) {
            console.log('📊 Additional prediction:', className, 'Confidence:', conf);
            issues.push({
              name: className,
              confidence: conf * 100,
              severity: conf > 0.8 ? 'high' : conf > 0.5 ? 'medium' : 'low',
              description: getIssueDescription(className)
            });
          }
        });
      }

      console.log('📋 Total issues detected:', issues.length, issues);
      setSkinIssues(issues);

      // Get product recommendations based on detected issues
      const products: Product[] = [];
      issues.forEach(issue => {
        const issueProducts = MOCK_PRODUCTS[issue.name] || [];
        products.push(...issueProducts);
      });
      setRecommendedProducts(products);

      setStep('results');
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: `Detected ${issues.length} skin concern${issues.length !== 1 ? 's' : ''} with personalized recommendations.`,
      });

      setTimeout(() => {
        uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('❌ Analysis error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error: error
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Helper function to get descriptions for skin issues
  const getIssueDescription = (issueName: string): string => {
    const descriptions: Record<string, string> = {
      'Acne': 'Inflammatory skin condition causing pimples and blemishes.',
      'Blackheads': 'Clogged pores with oxidized sebum appearing as dark spots.',
      'Dark Spots': 'Hyperpigmentation areas that may result from sun damage or aging.',
      'Dry Skin': 'Lack of moisture causing flakiness and rough texture.',
      'Eye Bags': 'Puffiness or dark circles under the eyes.',
      'Oily Skin': 'Excess sebum production leading to shiny appearance.',
      'Pores': 'Enlarged or visible pores that may trap dirt and oil.',
      'Skin Redness': 'Inflammation or irritation causing reddish appearance.',
      'Wrinkles': 'Fine lines and creases typically associated with aging.',
      'Normal Skin': 'Healthy, balanced skin with no major concerns.'
    };
    return descriptions[issueName] || 'Detected skin condition requiring attention.';
  };

  const handleReset = () => {
    setStep('upload');
    setSkinIssues([]);
    setRecommendedProducts([]);
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onGetStarted={handleGetStarted} />

      {(step === 'upload' || step === 'results') && (
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
                
                {recommendedProducts.length > 0 && (
                  <div className="pt-8">
                    <ProductRecommendations products={recommendedProducts} />
                  </div>
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
