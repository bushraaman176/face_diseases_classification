import { SkinIssue } from "@/components/AnalysisResults";

// Simulates AI model analysis - replace with actual TensorFlow.js or backend API
export const analyzeSkinImage = async (imageFile: File): Promise<SkinIssue[]> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Mock detection results - in production, this would come from your ML model
  const possibleIssues: SkinIssue[] = [
    {
      name: "Acne",
      confidence: Math.random() * 40 + 60,
      severity: 'medium',
      description: "Active breakouts detected in the T-zone area"
    },
    {
      name: "Dry Skin",
      confidence: Math.random() * 30 + 50,
      severity: 'low',
      description: "Mild dehydration detected, especially around cheeks"
    },
    {
      name: "Oily Skin",
      confidence: Math.random() * 35 + 45,
      severity: 'medium',
      description: "Excess sebum production in forehead and nose area"
    },
    {
      name: "Dark Spots",
      confidence: Math.random() * 25 + 60,
      severity: 'low',
      description: "Mild hyperpigmentation detected"
    },
    {
      name: "Wrinkles",
      confidence: Math.random() * 20 + 40,
      severity: 'low',
      description: "Fine lines visible around eyes and forehead"
    }
  ];

  // Return 2-3 random issues sorted by confidence
  const numIssues = Math.floor(Math.random() * 2) + 2;
  return possibleIssues
    .sort(() => Math.random() - 0.5)
    .slice(0, numIssues)
    .sort((a, b) => b.confidence - a.confidence);
};
