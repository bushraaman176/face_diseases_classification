import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

interface RecommendationChoiceProps {
  onSelect: (choice: 'products') => void;
}

export const RecommendationChoice = ({ onSelect }: RecommendationChoiceProps) => {
  return (
    <div className="space-y-6">
      
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">What Would You Like?</h2>
        <p className="text-muted-foreground">
          Get personalized skincare product recommendations for your skin concerns
        </p>
      </div>

      {/* Single centered card */}
      <div className="grid grid-cols-1 max-w-md mx-auto">
        <Card 
          className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary group"
          onClick={() => onSelect('products')}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            
            {/* Icon */}
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Package className="h-10 w-10 text-primary" />
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Products</h3>
              <p className="text-muted-foreground">
                Get personalized skincare product recommendations
              </p>
            </div>

          </CardContent>
        </Card>
      </div>

    </div>
  );
};