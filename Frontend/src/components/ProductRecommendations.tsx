import { ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export interface Product {
  id: string;
  name: string;

  rating: number;
  imageUrl: string;
  description: string;
  targetIssue: string;
}

interface ProductRecommendationsProps {
  products: Product[];
}

export const ProductRecommendations = ({ products }: ProductRecommendationsProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Recommended Products</h2>
        <p className="text-muted-foreground">
          Personalized skincare products to address your specific concerns
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card 
            key={product.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom"
            style={{ 
              boxShadow: 'var(--shadow-soft)',
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="aspect-square overflow-hidden bg-accent">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    {/* <p className="text-sm text-muted-foreground">{product.brand}</p> */}
                    <h3 className="font-semibold line-clamp-2 mt-1">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-secondary text-secondary" />
                    <span className="text-sm font-medium text-secondary">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                
                <div className="inline-block px-3 py-1 bg-primary/10 rounded-full">
                  <span className="text-xs font-medium text-primary">
                    For {product.targetIssue}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                {/* <div>
                  <p className="text-2xl font-bold">${product.price}</p>
                </div> */}
                <Button size="sm" className="group/btn">
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
