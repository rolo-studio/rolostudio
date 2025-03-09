
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import CheckoutButton from "@/components/CheckoutButton";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, isLoading } = useCart();
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (cartItems.length === 0) {
        setLoadingProducts(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('id', cartItems.map(item => item.product_id));

        if (error) throw error;

        const productsMap = data.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {} as Record<string, Product>);

        setProducts(productsMap);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products[item.product_id];
      if (product) {
        return total + (product.price * item.quantity);
      }
      return total;
    }, 0);
  };

  if (isLoading || loadingProducts) {
    return (
      <div className="container py-8">
        <h1 className="mb-8 text-2xl font-semibold">Winkelwagen</h1>
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="mb-8 text-2xl font-semibold">Winkelwagen</h1>
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Je winkelwagen is leeg</p>
          <Button 
            className="mt-4"
            onClick={() => window.location.href = '/'}
          >
            Verder winkelen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-semibold">Winkelwagen</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const product = products[item.product_id];
              if (!product) return null;

              return (
                <div 
                  key={item.id} 
                  className="flex items-start gap-4 rounded-lg border p-4"
                >
                  <div className="aspect-square h-24 w-24 overflow-hidden rounded-md">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      €{product.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:sticky lg:top-20">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-medium">Overzicht</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotaal</span>
                <span>€{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Verzendkosten</span>
                <span>Gratis</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-medium">
                  <span>Totaal</span>
                  <span>€{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <CheckoutButton cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
