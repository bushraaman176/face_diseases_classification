import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResults, SkinIssue } from "@/components/AnalysisResults";
import { ProductRecommendations, Product } from "@/components/ProductRecommendations";
import { RecommendationChoice } from "@/components/RecommendationChoice";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { analyzeSkinImageWithDatabase } from "@/utils/databaseAnalysis";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Index = () => {
  const [step, setStep] = useState<'hero' | 'upload' | 'results' | 'choice' | 'recommendations'>('hero');
  const [recommendationType, setRecommendationType] = useState<'products' | 'exercises' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skinIssues, setSkinIssues] = useState<SkinIssue[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const uploadRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const start = params.get('start');
    if (start === 'upload') {
      setStep('upload');
      setTimeout(() => {
        uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.search]);

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

      <AnimatePresence mode="wait">
        {(step === 'upload' || step === 'results' || step === 'choice' || step === 'recommendations') && (
          <motion.section
            ref={uploadRef}
            key={step}
            className="py-16 px-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
          >
            <div className="container mx-auto space-y-12">
              {step === 'upload' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.div className="text-center space-y-4" variants={itemVariants}>
                    <motion.h2
                      className="text-4xl font-bold"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      Upload Your Photo
                    </motion.h2>
                    <motion.p
                      className="text-muted-foreground text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Our AI will analyze your skin and provide personalized recommendations
                    </motion.p>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <ImageUpload onImageSelected={handleImageSelected} isAnalyzing={isAnalyzing} />
                  </motion.div>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-20 space-y-8"
                >
                  <motion.div
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-20 w-20 text-primary" />
                    <motion.div
                      className="absolute inset-0 h-20 w-20 rounded-full bg-primary/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <motion.div
                    className="text-center space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold">Analyzing Your Skin...</h3>
                    <p className="text-muted-foreground">
                      Our AI is processing your image to detect skin concerns
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {step === 'results' && !isAnalyzing && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-12"
                >
                  <motion.div className="flex justify-center" variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="shadow-sm border-slate-200 hover:bg-slate-50"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Analyze Another Photo
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <AnalysisResults issues={skinIssues} />
                  </motion.div>

                  <motion.div className="pt-8" variants={itemVariants}>
                    <RecommendationChoice onSelect={handleRecommendationChoice} />
                  </motion.div>
                </motion.div>
              )}

              {step === 'recommendations' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-12"
                >
                  <motion.div
                    className="flex justify-center gap-4"
                    variants={itemVariants}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => {
                          setStep('results');
                          setTimeout(() => {
                            uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        variant="outline"
                        className="shadow-sm border-slate-200 hover:bg-slate-50"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Results
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="shadow-sm border-slate-200 hover:bg-slate-50"
                      >
                        Analyze Another Photo
                      </Button>
                    </motion.div>
                  </motion.div>

                  {recommendationType === 'products' && recommendedProducts.length > 0 && (
                    <motion.div variants={itemVariants}>
                      <ProductRecommendations products={recommendedProducts} />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-t mt-20 py-8"
      >
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            AI-Powered Skincare Analysis • Personalized Recommendations • Trusted Products
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
