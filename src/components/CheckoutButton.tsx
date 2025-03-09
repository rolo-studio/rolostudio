
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/types/database";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  cartItems: CartItem[];
}

const CheckoutButton = ({ cartItems }: CheckoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const initiateCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Winkelwagen is leeg",
        description: "Voeg producten toe aan je winkelwagen om af te rekenen",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare success and cancel URLs
      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = `${window.location.origin}/cart`;

      console.log("Initiating checkout with:", { 
        cartItems,
        successUrl,
        cancelUrl 
      });

      // Call the Supabase Edge Function to create a checkout session
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          cartItems,
          successUrl,
          cancelUrl,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error("Er is een fout opgetreden bij het aanmaken van de checkout sessie");
      }

      if (!data?.url) {
        console.error("No checkout URL received:", data);
        throw new Error("Geen checkout URL ontvangen");
      }

      console.log("Redirecting to:", data.url);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout fout",
        description: error instanceof Error ? error.message : "Er is een fout opgetreden tijdens het afrekenen",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      className="mt-4 w-full"
      onClick={initiateCheckout}
      disabled={isLoading || cartItems.length === 0}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Bezig met laden...
        </>
      ) : (
        "Afrekenen"
      )}
    </Button>
  );
};

export default CheckoutButton;
