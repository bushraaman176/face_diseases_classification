import { SkinIssue } from "@/components/AnalysisResults";

// Descriptions for each skin condition
const CONDITION_DESCRIPTIONS: Record<string, string> = {
  'Acne': 'Active breakouts detected. Consider using acne-fighting treatments.',
  'Blackheads': 'Open comedones detected. Regular cleansing and exfoliation recommended.',
  'Dark Spots': 'Hyperpigmentation detected. Sun protection is essential.',
  'Dry Skin': 'Dehydration detected. Increase moisture and hydration products.',
  'Eye Bags': 'Puffiness around eyes detected. Consider cooling and firming treatments.',
  'Normal Skin': 'Healthy, balanced skin detected. Maintain current routine.',
  'Oily Skin': 'Excess sebum production detected. Oil-control products recommended.',
  'Pores': 'Enlarged pores detected. Pore-minimizing treatments suggested.',
  'Skin Redness': 'Inflammation detected. Use soothing and calming products.',
  'Wrinkles': 'Fine lines detected. Anti-aging treatments recommended.'
};

const SEVERITY_MAP: Record<string, 'low' | 'medium' | 'high'> = {
  'Acne': 'medium',
  'Blackheads': 'low',
  'Dark Spots': 'low',
  'Dry Skin': 'medium',
  'Eye Bags': 'low',
  'Normal Skin': 'low',
  'Oily Skin': 'medium',
  'Pores': 'low',
  'Skin Redness': 'high',
  'Wrinkles': 'low'
};

// Analyzes skin image using the FastAPI backend
export const analyzeSkinImage = async (imageFile: File): Promise<SkinIssue[]> => {
  try {
    // Create FormData to send the image
    const formData = new FormData();
    formData.append('file', imageFile);

    // Send request to backend API
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Convert API response to SkinIssue format
    // API returns: { predicted_class, confidence, all_predictions }
    const issues: SkinIssue[] = Object.entries(data.all_predictions)
      .map(([name, confidence]: [string, any]) => ({
        name,
        confidence: parseFloat((confidence * 100).toFixed(2)),
        severity: SEVERITY_MAP[name] || 'low',
        description: CONDITION_DESCRIPTIONS[name] || `${name} detected in the image.`
      }))
      .filter(issue => issue.confidence > 5) // Only show issues with >5% confidence
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5); // Show top 5 issues

    return issues;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image. Make sure the backend API is running on http://localhost:8000');
  }
};
