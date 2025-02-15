
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
      
      {/* Hero Section with marble and golden details */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.85) 50%, rgba(230,230,230,0.9) 100%),
            linear-gradient(45deg, rgba(218,165,32,0.1) 0%, rgba(255,215,0,0.1) 100%)
          `,
          boxShadow: 'inset 0 0 100px rgba(218,165,32,0.1)'
        }}
      >
        {/* Marble texture overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(218,165,32,0.05) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(218,165,32,0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255,215,0,0.05) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(255,215,0,0.05) 0%, transparent 40%)
            `,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Golden streamers and dots detail */}
        <div className="absolute w-full h-full overflow-hidden pointer-events-none">
          {/* Existing streamers */}
          <div 
            className="absolute top-1/4 left-0 w-full h-[2px] transform -rotate-6 opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #DAA520 50%, transparent 100%)',
              transform: 'rotate(-6deg) translateY(-10px) scale(0.95)',
              borderRadius: '100%'
            }}
          />
          <div 
            className="absolute top-1/3 left-0 w-full h-[1px] transform rotate-3 opacity-15"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #FFD700 50%, transparent 100%)',
              transform: 'rotate(4deg) translateY(5px) scale(1.05)',
              borderRadius: '100%'
            }}
          />
          <div 
            className="absolute top-1/2 left-0 w-full h-[1.5px] transform -rotate-2 opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #DAA520 50%, transparent 100%)',
              transform: 'rotate(-3deg) translateY(0px) scale(0.98)',
              borderRadius: '100%'
            }}
          />
          <div 
            className="absolute top-2/3 left-0 w-full h-[1px] transform rotate-3 opacity-10"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #FFD700 50%, transparent 100%)',
              transform: 'rotate(2deg) translateY(-8px) scale(1.02)',
              borderRadius: '100%'
            }}
          />
          <div 
            className="absolute top-3/4 left-0 w-full h-[1px] transform -rotate-4 opacity-15"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #DAA520 50%, transparent 100%)',
              transform: 'rotate(-5deg) translateY(15px) scale(0.97)',
              borderRadius: '100%'
            }}
          />

          {/* Golden dots/splatters */}
          <div 
            className="absolute top-1/4 left-1/4 w-2 h-2 opacity-20"
            style={{
              background: '#DAA520',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
          <div 
            className="absolute top-1/3 right-1/3 w-3 h-3 opacity-15"
            style={{
              background: '#FFD700',
              borderRadius: '50%',
              filter: 'blur(2px)'
            }}
          />
          <div 
            className="absolute top-2/3 left-1/3 w-4 h-4 opacity-10"
            style={{
              background: '#DAA520',
              borderRadius: '50%',
              filter: 'blur(3px)'
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-2 h-2 opacity-25"
            style={{
              background: '#FFD700',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
          <div 
            className="absolute top-1/2 right-1/4 w-3 h-3 opacity-15"
            style={{
              background: '#DAA520',
              borderRadius: '50%',
              filter: 'blur(2px)',
              transform: 'rotate(45deg) scale(1.2)'
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
