import { SkinIssue } from "@/components/AnalysisResults";
import { Product } from "@/components/ProductRecommendations";
import serumImg from "@/assets/serum.jpg";
import moisturizerImg from "@/assets/moisturizer.jpg";
import facewashImg from "@/assets/cream.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Descriptions for each skin condition
const CONDITION_DESCRIPTIONS: Record<string, string> = {
  Acne: "Active breakouts detected. Consider using acne-fighting treatments.",
  Blackheads:
    "Open comedones detected. Regular cleansing and exfoliation recommended.",
  "Dark Spots":
    "Hyperpigmentation detected. Sun protection is essential.",
  "Dry Skin":
    "Dehydration detected. Increase moisture and hydration products.",
  "Eye Bags":
    "Puffiness around eyes detected. Consider cooling and firming treatments.",
  "Normal Skin":
    "Healthy, balanced skin detected. Maintain current routine.",
  "Oily Skin":
    "Excess sebum production detected. Oil-control products recommended.",
  Pores:
    "Enlarged pores detected. Pore-minimizing treatments suggested.",
  "Skin Redness":
    "Inflammation detected. Use soothing and calming products.",
  Wrinkles:
    "Fine lines detected. Anti-aging treatments recommended.",
};


const PRODUCT_IMAGES: Record<string, string> = {
  serum: serumImg,
  cream: facewashImg,
  moisturizer: moisturizerImg,
};

interface APIResponse {
  predicted_class: string;
  confidence: number;

  all_predictions: Record<string, number>;

  recommended_products: Array<{
    name: string;
    category: string;
    skinType: string;
    ingredients: string[];
  }>;
}


/**
 * Analyze skin image using backend API
 */
export const analyzeSkinImageWithDatabase = async (
  imageFile: File
): Promise<{
  issues: SkinIssue[];
  products: Product[];
}> => {

  try {

    const formData = new FormData();

    formData.append("file", imageFile);


    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });


    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }


    const data: APIResponse = await response.json();



    // FIXED: Removed severity because SkinIssue does not contain it
    const issue: SkinIssue = {

      name: data.predicted_class,

      confidence: parseFloat(
        (data.confidence * 100).toFixed(2)
      ),

      description:
        CONDITION_DESCRIPTIONS[data.predicted_class] ||
        `${data.predicted_class} detected in the image.`,
    };



    const allowedCategories = [
      "serum",
      "cream",
      "moisturizer",
    ];



    const products: Product[] =
      data.recommended_products

        .filter((prod) =>
          allowedCategories.includes(
            prod.category?.toLowerCase().trim()
          )
        )


        .map((prod, index) => ({

          id: `prod-${index}`,

          name: prod.name,

          rating: 4.5,

          imageUrl:
            PRODUCT_IMAGES[(prod.category || "").toLowerCase().trim()] ||
            PRODUCT_IMAGES["serum"],


          description:
            `Product for ${prod.skinType}. Ingredients: ${
              prod.ingredients.join(", ")
            }`,


          targetIssue: prod.skinType,

        }));



    return {

      issues: [issue],

      products,

    };


  } catch (error) {


    console.error(
      "Error analyzing image:",
      error
    );


    throw new Error(
      `Failed to analyze image. Make sure backend API is running at ${API_URL}`
    );

  }

};