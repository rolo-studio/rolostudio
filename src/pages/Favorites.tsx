
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { useLikes } from "@/hooks/useLikes";

const Favorites = () => {
  const { likedProducts } = useLikes();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (likedProducts.length === 0) {
        setFavoriteProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('id', likedProducts);
        
        if (error) throw error;
        
        setFavoriteProducts(data || []);
      } catch (error) {
        console.error('Error fetching favorite products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [likedProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container section-padding">
        <h1 className="font-playfair text-3xl font-medium mb-8">Mijn Favorieten</h1>
        
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg" />
                <div className="p-4">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="mt-2 h-6 w-48 bg-gray-200 rounded" />
                  <div className="mt-2 h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : favoriteProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Je hebt nog geen favoriete producten.
            </p>
            <p className="text-muted-foreground mt-2">
              Klik op het hartje bij producten om ze aan je favorieten toe te voegen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
