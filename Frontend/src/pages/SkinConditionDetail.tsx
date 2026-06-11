import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import acneImg from "@/assets/acne.png";
import blackhead from "@/assets/blackhead.png";
import wrinklesImg from "@/assets/wrinkles.png";
import dry from "@/assets/dry.png";
import oily from "@/assets/oily.png";
import pores from "@/assets/pores.png";
import redness from "@/assets/redness.png";
import darkspots from "@/assets/darkspots.png";
import eyebags from "@/assets/eyebags.png";
import normal from "@/assets/normal.png";

const conditionDetails: Record<string, any> = {
  acne: {
    id: 1,
    name: "Acne",
    image: acneImg,
    overview: "Acne is a common skin condition characterized by the formation of pimples, blackheads, and whiteheads. It occurs when hair follicles become clogged with dead skin cells and sebum (oil).",
    
    causes: [
      "Excess sebum production",
      "Bacterial growth (Propionibacterium acnes)",
      "Clogged pores and hair follicles",
      "Hormonal fluctuations",
      "Certain medications",
      "High-glycemic diet",
      "Stress and sleep deprivation",
    ],

    symptoms: [
      "Red, inflamed pimples",
      "Blackheads and whiteheads",
      "Painful cysts and nodules",
      "Oily skin",
      "Scarring in severe cases",
    ],

    riskFactors: [
      "Teenage years and hormonal changes",
      "Family history of acne",
      "Oily skin type",
      "Certain medications (steroids)",
      "High-stress levels",
    ],

    treatments: [
      {
        name: "Topical Treatments",
        items: ["Benzoyl peroxide", "Salicylic acid", "Retinoids", "Azelaic acid"],
      },
      {
        name: "Oral Medications",
        items: ["Antibiotics", "Hormonal contraceptives", "Isotretinoin (severe cases)"],
      },
      {
        name: "Professional Treatments",
        items: ["Chemical peels", "Laser therapy", "Light therapy", "Extraction"],
      },
    ],

    prevention: [
      "Cleanse face twice daily with gentle cleanser",
      "Use non-comedogenic products",
      "Avoid touching your face",
      "Manage stress through exercise and meditation",
      "Maintain a balanced diet low in processed foods",
      "Get adequate sleep (7-9 hours)",
      "Use sunscreen daily",
    ],

    duration: "Varies from weeks to months depending on severity and treatment",
  },

  blackheads: {
    id: 2,
    name: "Blackheads",
    image: blackhead,
    overview: "Blackheads (open comedones) form when pores become clogged with sebum and dead skin cells. The dark appearance is caused by oxidation, not dirt.",
    
    causes: [
      "Excess sebum production",
      "Accumulation of dead skin cells",
      "Oxidation of clogged pore content",
      "Large pore size",
      "Poor skincare routine",
      "Humidity and moisture",
    ],

    symptoms: [
      "Small dark or yellowish spots",
      "Usually on nose and chin",
      "Visible in well-lit areas",
      "Slightly raised texture",
    ],

    riskFactors: [
      "Oily skin type",
      "Large pores",
      "Puberty and hormonal changes",
      "Humid climate",
    ],

    treatments: [
      {
        name: "Topical Treatments",
        items: ["Salicylic acid", "Retinoids", "Glycolic acid", "Clay masks"],
      },
      {
        name: "Professional Treatments",
        items: ["Professional extraction", "Chemical peels", "Microdermabrasion"],
      },
      {
        name: "Skincare Products",
        items: ["Pore strips", "Exfoliating scrubs", "BHA products"],
      },
    ],

    prevention: [
      "Exfoliate 2-3 times weekly",
      "Use salicylic acid cleansers",
      "Avoid heavy creams on affected areas",
      "Keep pores unclogged with regular cleansing",
      "Use non-comedogenic sunscreen",
    ],

    duration: "Can persist if not treated; prevention is key",
  },

  darkspots: {
    id: 3,
    name: "Dark Spots",
    image: darkspots,
    overview: "Dark spots (hyperpigmentation) are darker patches on the skin caused by excess melanin production. Common after sun exposure or skin inflammation.",
    
    causes: [
      "Sun exposure and UV damage",
      "Post-inflammatory hyperpigmentation",
      "Melasma (hormonal)",
      "Age spots from aging",
      "Certain medications (photosensitizing drugs)",
    ],

    symptoms: [
      "Brown or gray patches",
      "Usually appear on face, hands, or sun-exposed areas",
      "Flat, painless spots",
      "Vary in size from small to large",
    ],

    riskFactors: [
      "Prolonged sun exposure",
      "Darker skin types",
      "Pregnancy and hormonal changes",
      "Age (over 50)",
      "Certain medications",
    ],

    treatments: [
      {
        name: "Topical Treatments",
        items: ["Hydroquinone", "Tretinoin", "Vitamin C", "Kojic acid"],
      },
      {
        name: "Professional Treatments",
        items: ["Laser therapy", "Chemical peels", "Microdermabrasion", "Cryotherapy"],
      },
    ],

    prevention: [
      "Apply SPF 30+ sunscreen daily",
      "Wear protective clothing and hats",
      "Avoid peak sun hours (10am-4pm)",
      "Use vitamin C serum",
      "Avoid triggers for hyperpigmentation",
    ],

    duration: "Months to years depending on depth and treatment",
  },

  dryskin: {
    id: 4,
    name: "Dry Skin",
    image: dry,
    overview: "Dry skin lacks sufficient moisture and natural oils, causing tightness, flaking, and discomfort.",
    
    causes: [
      "Low humidity and cold weather",
      "Harsh soaps and detergents",
      "Hot water bathing",
      "Aging and reduced oil production",
      "Genetic predisposition",
      "Certain health conditions",
    ],

    symptoms: [
      "Tight, uncomfortable feeling",
      "Flaky and rough texture",
      "Itching and redness",
      "Fine lines more visible",
      "Loss of elasticity",
    ],

    riskFactors: [
      "Age (over 50)",
      "Winter and dry climates",
      "Frequent washing",
      "Eczema or dermatitis",
    ],

    treatments: [
      {
        name: "Moisturizers",
        items: ["Hyaluronic acid serums", "Glycerin", "Ceramide creams", "Oils"],
      },
      {
        name: "Skincare Changes",
        items: ["Gentle cleansers", "Lukewarm water", "Hydrating masks"],
      },
      {
        name: "Professional Treatments",
        items: ["Hydrating facials", "Microneedling", "Laser treatments"],
      },
    ],

    prevention: [
      "Use gentle, fragrance-free cleansers",
      "Moisturize immediately after showering",
      "Use a humidifier indoors",
      "Limit hot water exposure",
      "Drink plenty of water",
      "Avoid harsh chemicals",
    ],

    duration: "Ongoing maintenance needed",
  },

  enlargedpores: {
    id: 5,
    name: "Enlarged Pores",
    image: pores,
    overview: "Enlarged pores appear as visible openings on the skin surface, more noticeable on the face.",
    
    causes: [
      "Excessive sebum production",
      "Clogged pores",
      "Sun damage and loss of elasticity",
      "Aging and collagen loss",
      "Genetic factors",
      "Acne scarring",
    ],

    symptoms: [
      "Visibly large pore openings",
      "Usually on nose and cheeks",
      "Can trap dirt and oil",
      "May appear darker",
    ],

    riskFactors: [
      "Oily skin type",
      "Sun exposure",
      "Age",
      "Genetics",
    ],

    treatments: [
      {
        name: "Topical Treatments",
        items: ["Retinoids", "Niacinamide", "Salicylic acid", "Vitamin C"],
      },
      {
        name: "Professional Treatments",
        items: ["Chemical peels", "Laser resurfacing", "Microdermabrasion", "RF therapy"],
      },
    ],

    prevention: [
      "Keep pores clean with regular cleansing",
      "Use exfoliants regularly",
      "Apply sunscreen daily",
      "Use retinoids for collagen production",
      "Avoid pore-clogging products",
    ],

    duration: "Permanent but can be minimized with treatment",
  },

  eyebags: {
    id: 6,
    name: "Eye Bags",
    image: eyebags,
    overview: "Eye bags are puffiness under the eyes, often with dark discoloration, indicating fatigue or aging.",
    
    causes: [
      "Poor sleep and fatigue",
      "Fluid retention",
      "Allergies and sinus issues",
      "Aging and loss of elasticity",
      "Sun damage",
      "Genetic predisposition",
      "Smoking and alcohol",
    ],

    symptoms: [
      "Puffiness under eyes",
      "Dark circles and discoloration",
      "Sagging skin under eyes",
      "Worsens in morning",
    ],

    riskFactors: [
      "Age over 50",
      "Family history",
      "Allergies",
      "Chronic sleep deprivation",
    ],

    treatments: [
      {
        name: "Topical Treatments",
        items: ["Retinol creams", "Caffeine serums", "Vitamin K", "Cold compresses"],
      },
      {
        name: "Professional Treatments",
        items: ["Fillers", "Laser therapy", "Chemical peels", "Blepharoplasty"],
      },
    ],

    prevention: [
      "Get 7-9 hours of quality sleep",
      "Sleep with elevated head",
      "Apply cold compresses in morning",
      "Manage allergies",
      "Reduce salt intake",
      "Stay hydrated",
      "Avoid smoking and alcohol",
    ],

    duration: "Temporary if sleep-related, permanent without treatment if age-related",
  },

  oilyskin: {
    id: 7,
    name: "Oily Skin",
    image: oily,
    overview: "Oily skin results from excess sebum production, giving a shiny, greasy appearance.",
    
    causes: [
      "Overactive sebaceous glands",
      "Hormonal fluctuations",
      "Genetic predisposition",
      "High humidity",
      "Improper skincare routine",
    ],

    symptoms: [
      "Shiny, greasy appearance",
      "Enlarged pores",
      "Prone to acne",
      "Heavy makeup doesn't last",
    ],

    riskFactors: [
      "Puberty and hormones",
      "Genetics",
      "Warm climate",
      "Certain medications",
    ],

    treatments: [
      {
        name: "Skincare",
        items: ["Gel cleansers", "Mattifying primers", "Oil-control moisturizers"],
      },
      {
        name: "Topical Products",
        items: ["Salicylic acid", "Niacinamide", "Clay masks", "Blotting papers"],
      },
      {
        name: "Professional Treatments",
        items: ["Chemical peels", "Laser therapy", "Sebum reduction treatments"],
      },
    ],

    prevention: [
      "Use oil-free products",
      "Cleanse twice daily",
      "Avoid over-moisturizing",
      "Use mattifying primers and powders",
      "Blot with papers throughout day",
    ],

    duration: "Ongoing management required",
  },

  skinredness: {
    id: 8,
    name: "Skin Redness",
    image: redness,
    overview: "Skin redness is inflammation or irritation causing flushed appearance, often due to sensitivity or rosacea.",
    
    causes: [
      "Sensitive skin reactions",
      "Rosacea",
      "Irritant contact dermatitis",
      "Sun exposure",
      "Allergic reactions",
      "Inflammation from acne",
      "Extreme temperatures",
    ],

    symptoms: [
      "Flushed, red appearance",
      "Burning or stinging sensation",
      "Itching and irritation",
      "Visible blood vessels",
      "Swelling in severe cases",
    ],

    riskFactors: [
      "Fair skin tone",
      "Sensitive skin",
      "Family history of rosacea",
      "Trigger foods (spicy, hot beverages)",
    ],

    treatments: [
      {
        name: "Skincare",
        items: ["Gentle cleansers", "Soothing serums", "Anti-inflammatory moisturizers"],
      },
      {
        name: "Topical Treatments",
        items: ["Azelaic acid", "Metronidazole", "Sulfur products"],
      },
      {
        name: "Professional Treatments",
        items: ["Laser therapy", "IPL treatment", "Chemical peels"],
      },
    ],

    prevention: [
      "Use gentle, fragrance-free products",
      "Avoid known triggers",
      "Use broad-spectrum SPF 30+ sunscreen",
      "Manage stress",
      "Avoid extreme temperatures",
      "Limit spicy foods and hot beverages",
    ],

    duration: "Varies; chronic if rosacea",
  },

  wrinkles: {
    id: 9,
    name: "Wrinkles",
    image: wrinklesImg,
    overview: "Wrinkles are fine lines and creases that form as skin loses collagen and elasticity with age.",
    
    causes: [
      "Natural aging process",
      "Sun exposure and UV damage",
      "Loss of collagen and elastin",
      "Repetitive facial expressions",
      "Smoking",
      "Poor hydration",
      "Sleep position",
    ],

    symptoms: [
      "Fine lines and wrinkles",
      "Deep creases",
      "Loss of skin elasticity",
      "Sagging skin",
      "Reduced firmness",
    ],

    riskFactors: [
      "Age (over 30)",
      "Sun exposure",
      "Smoking",
      "Genetics",
      "Poor skincare",
    ],

    treatments: [
      {
        name: "Topical Treatments",
        items: ["Retinol", "Peptides", "Vitamin C", "Hyaluronic acid"],
      },
      {
        name: "Professional Treatments",
        items: ["Botox", "Fillers", "Laser resurfacing", "Chemical peels", "Microneedling"],
      },
    ],

    prevention: [
      "Apply SPF 30+ daily",
      "Use retinoids regularly",
      "Stay hydrated",
      "Don't smoke",
      "Manage facial expressions",
      "Sleep on back",
      "Use antioxidant serums",
    ],

    duration: "Progressive; prevention is key",
  },

  normalskin: {
    id: 10,
    name: "Normal Skin",
    image: normal,
    overview: "Normal skin is balanced with good hydration, elasticity, and minimal issues. It maintains a healthy appearance.",
    
    causes: [
      "Genetic predisposition",
      "Good skincare routine",
      "Healthy lifestyle",
      "Balanced sebum production",
      "Adequate hydration",
    ],

    symptoms: [
      "Clear complexion",
      "Balanced oil production",
      "Good elasticity",
      "Minimal sensitivity",
      "Even skin tone",
    ],

    riskFactors: [
      "Can develop issues with poor care",
      "Aging changes",
      "Environmental factors",
    ],

    treatments: [
      {
        name: "Maintenance",
        items: ["Gentle cleanser", "Lightweight moisturizer", "Sunscreen"],
      },
      {
        name: "Prevention",
        items: ["Anti-aging serums", "Antioxidants", "Hydrating products"],
      },
    ],

    prevention: [
      "Maintain consistent skincare routine",
      "Cleanse twice daily",
      "Use SPF 30+ daily",
      "Stay hydrated and healthy",
      "Get adequate sleep",
      "Manage stress",
      "Eat antioxidant-rich foods",
    ],

    duration: "Maintain with consistent care",
  },
};

export default function SkinConditionDetail() {
  const { condition } = useParams<{ condition: string }>();
  const navigate = useNavigate();
  const data = conditionDetails[condition?.toLowerCase() || ""];

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Condition Not Found</h1>
          <Button onClick={() => navigate("/guide")}>Back to Skin Guide</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/guide")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Skin Guide
        </button>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-foreground">{data.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{data.overview}</p>

            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-semibold text-primary mb-3">Duration</h3>
              <p className="text-foreground">{data.duration}</p>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
              Start Analysis
            </Button>
          </div>
        </div>

        {/* Three Column Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Causes */}
          <div className="bg-card rounded-2xl p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-secondary" />
              <h3 className="text-xl font-bold text-foreground">Causes & Risk Factors</h3>
            </div>
            <ul className="space-y-2">
              {data.causes.map((cause: string, idx: number) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span className="text-muted-foreground">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Symptoms */}
          <div className="bg-card rounded-2xl p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Symptoms</h3>
            </div>
            <ul className="space-y-2">
              {data.symptoms.map((symptom: string, idx: number) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-muted-foreground">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Factors */}
          <div className="bg-card rounded-2xl p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Risk Factors</h3>
            </div>
            <ul className="space-y-2">
              {data.riskFactors.map((factor: string, idx: number) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-muted-foreground">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Treatments */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Treatment Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.treatments.map((treatment: any, idx: number) => (
              <div key={idx} className="bg-card rounded-2xl p-6 border border-primary/10">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">{treatment.name}</h3>
                </div>
                <ul className="space-y-2">
                  {treatment.items.map((item: string, itemIdx: number) => (
                    <li key={itemIdx} className="flex gap-2">
                      <span className="text-secondary">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-3xl font-bold mb-6">Prevention & Management</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.prevention.map((tip: string, idx: number) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
