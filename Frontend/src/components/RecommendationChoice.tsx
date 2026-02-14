import { Card, CardContent } from "@/components/ui/card";
import { Package, Dumbbell } from "lucide-react";

interface RecommendationChoiceProps {
  onSelect: (choice: 'products' | 'exercises') => void;
}

export const RecommendationChoice = ({ onSelect }: RecommendationChoiceProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">What Would You Like?</h2>
        <p className="text-muted-foreground">
          Choose between product recommendations or exercise videos for your skin concerns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <Card 
          className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary group"
          onClick={() => onSelect('products')}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Package className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Products</h3>
              <p className="text-muted-foreground">
                Get personalized skincare product recommendations
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary group"
          onClick={() => onSelect('exercises')}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Dumbbell className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Exercises</h3>
              <p className="text-muted-foreground">
                Watch guided facial exercise and massage videos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
