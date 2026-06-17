import { X, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <ShoppingCart className="w-12 h-12 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add products from recommendations to get started
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-4 bg-card border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-accent flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        For {item.targetIssue}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full">
                          <span className="text-xs font-medium">★ {item.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Qty: 1
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors flex-shrink-0"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Items:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-3">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Proceed to Checkout
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
