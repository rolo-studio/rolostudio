import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(4);
        
        if (error) throw error;
        
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section met luxe golven en gouden details */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, rgba(255,245,242,1) 0%, rgba(254,235,228,1) 50%, rgba(255,228,218,1) 100%)
          `
        }}
      >
        {/* Zachte golven overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(45deg, rgba(255,235,228,0.8) 0%, rgba(255,228,218,0.8) 100%),
              radial-gradient(circle at 20% 30%, rgba(255,242,238,0.6) 0%, transparent 70%),
              radial-gradient(circle at 80% 70%, rgba(255,238,232,0.6) 0%, transparent 70%)
            `
          }}
        />

        {/* Gouden lijnen */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Lange golvende lijn 1 */}
          <div 
            className="absolute w-full h-[1px] opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(218,165,32,0.6) 20%, rgba(255,215,0,0.6) 50%, rgba(218,165,32,0.6) 80%, transparent 100%)',
              top: '30%',
              transform: 'rotate(-5deg) scale(1.5)',
              filter: 'blur(0.5px)'
            }}
          />

          {/* Lange golvende lijn 2 */}
          <div 
            className="absolute w-full h-[1px] opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(218,165,32,0.5) 20%, rgba(255,215,0,0.5) 50%, rgba(218,165,32,0.5) 80%, transparent 100%)',
              top: '45%',
              transform: 'rotate(3deg) scale(1.5)',
              filter: 'blur(0.5px)'
            }}
          />

          {/* Lange golvende lijn 3 */}
          <div 
            className="absolute w-full h-[1px] opacity-35"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(218,165,32,0.5) 20%, rgba(255,215,0,0.5) 50%, rgba(218,165,32,0.5) 80%, transparent 100%)',
              top: '60%',
              transform: 'rotate(-2deg) scale(1.5)',
              filter: 'blur(0.5px)'
            }}
          />

          {/* Subtiele gouden schaduwen */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(218,165,32,0.4) 0%, transparent 60%),
                radial-gradient(circle at 70% 60%, rgba(255,215,0,0.4) 0%, transparent 60%),
                radial-gradient(circle at 20% 80%, rgba(218,165,32,0.4) 0%, transparent 50%)
              `,
              filter: 'blur(40px)'
            }}
          />
        </div>

        <div className="container text-center relative z-10">
          <h1 className="animate-fade-in font-playfair text-4xl font-medium text-foreground sm:text-5xl md:text-6xl">
            Handgemaakte Schatten
          </h1>
          <p className="animate-slide-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Unieke sieraden en telefoonhoesjes, met liefde handgemaakt voor jou
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link 
              to="/category/sieraden" 
              className="button-primary"
            >
              Bekijk Sieraden
            </Link>
            <Link 
              to="/category/telefoonhoesjes" 
              className="button-secondary"
            >
              Bekijk Hoesjes
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-center font-playfair text-3xl font-medium">
            Uitgelichte Producten
          </h2>
          {isLoading ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
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
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-warmGray-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-playfair text-3xl font-medium">Over Ons</h2>
            <p className="mt-6 text-muted-foreground">
              Met passie maken wij handgemaakte sieraden en telefoonhoesjes. 
              Elk stuk is uniek en met zorg gemaakt, speciaal voor jou.
              Ontdek onze collectie en vind jouw perfecte accessoire.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
