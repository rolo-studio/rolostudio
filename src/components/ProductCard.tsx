
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  category: string;
}

const ProductCard = ({ image, title, price, category }: ProductCardProps) => {
  return (
    <div className="product-card group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 bg-white/80 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">{category}</p>
        <h3 className="mt-1 font-medium">{title}</h3>
        <p className="mt-1 font-semibold">€{price.toFixed(2)}</p>
        <Button className="mt-4 w-full button-primary">Toevoegen aan winkelwagen</Button>
      </div>
    </div>
  );
};

export default ProductCard;
