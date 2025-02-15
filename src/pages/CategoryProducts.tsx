
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";

type ValidCategory = 'sieraden' | 'telefoonhoesjes';

const isValidCategory = (category: string | undefined): category is ValidCategory => {
  return category === 'sieraden' || category === 'telefoonhoesjes';
};

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!isValidCategory(category)) {
          navigate('/');
          return;
        }

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', category)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, navigate]);

  const categoryTitle = category === 'sieraden' ? 'Sieraden' : 'Telefoonhoesjes';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-medium">{categoryTitle}</h1>
            <p className="mt-2 text-muted-foreground">
              Ontdek onze collectie {categoryTitle.toLowerCase()}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Grid className="h-4 w-4" />
            <span>Weergave</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4">
                  <div className="h-4 w-24 bg-gray-200" />
                  <div className="mt-2 h-6 w-48 bg-gray-200" />
                  <div className="mt-2 h-4 w-16 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Geen producten gevonden in deze categorie
            </p>
            <Button
              className="mt-4"
              onClick={() => navigate('/')}
            >
              Terug naar home
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryProducts;
