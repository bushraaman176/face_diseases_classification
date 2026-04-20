import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import acneImg from "@/assets/acne.png";
import heroImg from "@/assets/hero-skincare.jpg";
import wrinklesImg from "@/assets/wrinkles.png";

const conditionMap: Record<string, string> = {
  "Acne": "acne",
  "Blackheads": "blackheads",
  "Dark Spots": "darkspots",
  "Dry Skin": "dryskin",
  "Enlarged Pores": "enlargedpores",
  "Eye Bags": "eyebags",
  "Oily Skin": "oilyskin",
  "Skin Redness": "skinredness",
  "Wrinkles": "wrinkles",
  "Normal Skin": "normalskin",
};

const skinConditions = [
  {
    id: 1,
    name: "Acne",
    description: "Many red pimples on the face or body against the background of oily skin or redness",
    symptoms: "Inflammatory lesions, pustules, comedones",
    image: acneImg,
  },
  {
    id: 2,
    name: "Blackheads",
    description: "Open comedones filled with oxidized sebum appearing as dark spots on skin",
    symptoms: "Dark spots on nose and chin, enlarged pores",
    image: acneImg,
  },
  {
    id: 3,
    name: "Dark Spots",
    description: "Hyperpigmentation patches that appear darker than surrounding skin",
    symptoms: "Brown or black patches, sun damage related",
    image: heroImg,
  },
  {
    id: 4,
    name: "Dry Skin",
    description: "Skin lacking moisture with tight, flaky, and uncomfortable feeling",
    symptoms: "Flaking, tightness, rough texture, itching",
    image: heroImg,
  },
  {
    id: 5,
    name: "Enlarged Pores",
    description: "Visibly large skin pores that trap dirt and oil easily",
    symptoms: "Visible pores, congestion, oily appearance",
    image: acneImg,
  },
  {
    id: 6,
    name: "Eye Bags",
    description: "Puffiness and discoloration under the eyes indicating fatigue or aging",
    symptoms: "Swelling, dark circles, puffiness under eyes",
    image: heroImg,
  },
  {
    id: 7,
    name: "Oily Skin",
    description: "Excess sebum production causing shine and potential breakouts",
    symptoms: "Shiny appearance, greasy texture, prone to acne",
    image: acneImg,
  },
  {
    id: 8,
    name: "Skin Redness",
    description: "Inflammation or irritation causing flushed or red appearance",
    symptoms: "Redness, irritation, sensitivity, flushing",
    image: heroImg,
  },
  {
    id: 9,
    name: "Wrinkles",
    description: "Fine lines and creases from aging, sun exposure, or loss of elasticity",
    symptoms: "Fine lines, deep creases, loss of firmness",
    image: wrinklesImg,
  },
  {
    id: 10,
    name: "Normal Skin",
    description: "Balanced skin with good hydration, elasticity, and minimal issues",
    symptoms: "Clear complexion, balanced oil production",
    image: heroImg,
  },
];

export default function SkinGuide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? skinConditions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === skinConditions.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentCondition = skinConditions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Skin <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Conditions Guide</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the 10 most common skin conditions and learn how our AI can help detect and treat them.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          {/* Main Carousel Card */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-primary/10 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                    <img
                      src={currentCondition.image}
                      alt={currentCondition.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/10 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground">
                  {currentCondition.name}
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentCondition.description}
                </p>

                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="text-sm font-semibold text-primary mb-2">Common Symptoms:</h3>
                  <p className="text-sm text-foreground">{currentCondition.symptoms}</p>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={() => navigate(`/guide/${conditionMap[currentCondition.name]}`)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Previous condition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2 justify-center flex-wrap flex-1 mx-4">
              {skinConditions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Next condition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Condition {currentIndex + 1} of {skinConditions.length}
            </p>
          </div>
        </div>

        {/* Grid View - All Conditions */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">All Skin Conditions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {skinConditions.map((condition, index) => (
              <button
                key={condition.id}
                onClick={() => {
                  setCurrentIndex(index);
                  navigate(`/guide/${conditionMap[condition.name]}`);
                }}
                className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  index === currentIndex
                    ? "border-primary bg-primary/10"
                    : "border-primary/20 hover:border-primary/50 bg-card"
                }`}
              >
                <p className="font-semibold text-foreground">{condition.name}</p>
                <p className="text-xs text-muted-foreground mt-2">{condition.id}/10</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
