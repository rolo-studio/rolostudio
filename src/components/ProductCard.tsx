
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [isHovering, setIsHovering] = useState(false);

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
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-2 bg-white/80 transition-opacity ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <Heart className="h-5 w-5" />
        </Button>
        {product.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium">
              Uitverkocht
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          {product.category === 'sieraden' ? 'Sieraden' : 'Telefoonhoesjes'}
        </p>
        <h3 className="mt-1 font-medium">{product.title}</h3>
        {product.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="mt-1 font-semibold">€{product.price.toFixed(2)}</p>
        <Button 
          className="mt-4 w-full button-primary"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Toevoegen aan winkelwagen" : "Uitverkocht"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
