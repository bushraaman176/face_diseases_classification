import { useEffect, useState } from "react";
import { Upload, Sparkles, Droplets, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import acneImg from "@/assets/acne.png";
import heroImg from "@/assets/dry.png";
import wrinklesImg from "@/assets/wrinkles.png";

const images = [
  acneImg,
  heroImg,
  wrinklesImg,
];

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background to-accent">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-10">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
            AI-Powered Skin Analysis
          </span>

          <h1 className="text-5xl font-bold leading-tight">
            Your Smart
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Skincare Advisor
            </span>
          </h1>

          <p className="text-muted-foreground text-lg">
            Upload your face image and get instant AI-powered skin analysis with personalized recommendations.
          </p>

          <div className="flex gap-4">
            <Button onClick={onGetStarted} className="flex gap-2">
              <Upload size={18} /> Get Started
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        {/* RIGHT PHONE MOCKUP */}
        <div className="relative flex justify-center items-center">

          {/* Floating Cards */}
          <div className="absolute -left-6 top-10 bg-card shadow-lg p-3 rounded-xl w-40 animate-bounce border border-primary/10">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="text-primary" size={16} />
              AI detects acne instantly
            </div>
          </div>

          <div className="absolute -right-6 bottom-10 bg-card shadow-lg p-3 rounded-xl w-44 animate-pulse border border-primary/10">
            <div className="flex items-center gap-2 text-sm">
              <Droplets className="text-primary" size={16} />
              Personalized skincare tips
            </div>
          </div>

          <div className="absolute top-0 right-10 bg-card shadow-lg p-3 rounded-xl w-40 animate-bounce border border-primary/10">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="text-secondary" size={16} />
              Dermatology-level AI
            </div>
          </div>

          {/* PHONE */}
          <div className="relative w-[280px] h-[560px] bg-black rounded-[40px] p-3 shadow-2xl">

            {/* Screen */}
            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">

              <img
                src={images[index]}
                alt="skin analysis"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />

              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};