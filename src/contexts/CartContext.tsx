
import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart items when the auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchCartItems();
    });

    fetchCartItems();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchCartItems = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*');

      if (error) throw error;
      
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "Error",
        description: "Could not load your cart items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if product is already in cart
      const existingItem = cartItems.find(item => item.product_id === product.id);
      
      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            product_id: product.id,
            user_id: session.session.user.id,
            quantity: 1
          });

        if (error) throw error;
      }

      await fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      await fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Could not remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        await removeFromCart(itemId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;

      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Could not update cart quantity",
        variant: "destructive",
      });
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      isLoading 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
