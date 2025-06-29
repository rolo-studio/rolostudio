
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Product } from "@/types/database";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useLikes } from "@/hooks/useLikes";
import { useState } from "react";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLikes();
  const [isHovering, setIsHovering] = useState(false);

  if (!product) return null;

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
      toast({
        title: "Product niet beschikbaar",
        description: "Dit product is momenteel niet op voorraad.",
        variant: "destructive",
      });
      return;
    }

    await addToCart(product);
    onClose();
  };

  const handleLike = () => {
    toggleLike(product.id);
    
    toast({
      title: isLiked(product.id) ? "Verwijderd uit favorieten" : "Toegevoegd aan favorieten",
      description: isLiked(product.id) 
        ? "Dit product is verwijderd uit je favorieten."
        : "Dit product is toegevoegd aan je favorieten.",
    });
  };

  const productIsLiked = isLiked(product.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">{product.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div 
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-2 top-2 bg-white/80 transition-all ${
                isHovering || productIsLiked ? "opacity-100" : "opacity-0"
              } ${productIsLiked ? "text-pink-600" : "hover:text-pink-600"}`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${productIsLiked ? "fill-current" : ""}`} />
            </Button>
            {product.stock <= 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium">
                  Uitverkocht
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-pink-700 mb-2">
                {product.category === 'sieraden' ? 'Sieraden' : 'Telefoonhoesjes'}
              </p>
              
              <h2 className="text-2xl font-playfair font-medium mb-4">{product.title}</h2>
              
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Beschrijving</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
              
              <div className="mb-6">
                <p className="text-3xl font-semibold text-pink-800">€{product.price.toFixed(2)}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} op voorraad` : 'Uitverkocht'}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-pink-100 text-pink-900 hover:bg-pink-200 border border-pink-200"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                size="lg"
              >
                {product.stock > 0 ? "Toevoegen aan winkelwagen" : "Uitverkocht"}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-pink-200 text-pink-700 hover:bg-pink-50"
                onClick={onClose}
                size="lg"
              >
                Sluiten
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
