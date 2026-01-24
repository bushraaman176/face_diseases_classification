import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-skincare.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent)) 100%)`,
        }}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">AI-Powered Skincare Analysis</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Your Personalized
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Skincare Advisor
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Upload your photo and let our advanced AI analyze your skin to detect issues 
              and recommend the perfect products tailored just for you.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="group shadow-lg hover:shadow-xl transition-all"
              >
                <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="shadow-sm hover:shadow-md transition-all"
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Personalized</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-200">
            <div 
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ boxShadow: 'var(--shadow-strong)' }}
            >
              <img 
                src={heroImage} 
                alt="Skincare products and spa atmosphere"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-secondary to-secondary/50 rounded-full blur-3xl opacity-60" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary to-primary/50 rounded-full blur-3xl opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
};
