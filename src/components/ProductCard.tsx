
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useLikes } from "@/hooks/useLikes";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLikes();
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal when clicking add to cart
    
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

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal when clicking like
    toggleLike(product.id);
    
    toast({
      title: isLiked(product.id) ? "Verwijderd uit favorieten" : "Toegevoegd aan favorieten",
      description: isLiked(product.id) 
        ? "Dit product is verwijderd uit je favorieten."
        : "Dit product is toegevoegd aan je favorieten.",
    });
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const productIsLiked = isLiked(product.id);

  return (
    <>
      <div 
        className="product-card group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleCardClick}
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
        <div className="p-4">
          <p className="text-sm text-pink-700">
            {product.category === 'sieraden' ? 'Sieraden' : 'Telefoonhoesjes'}
          </p>
          <h3 className="mt-2 font-medium">{product.title}</h3>
          {product.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
          <p className="mt-3 text-base font-semibold text-pink-800">€{product.price.toFixed(2)}</p>
          <Button 
            className="mt-4 w-full bg-pink-100 text-pink-900 hover:bg-pink-200 border border-pink-200"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Toevoegen aan winkelwagen" : "Uitverkocht"}
          </Button>
        </div>
      </div>

      <ProductModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
