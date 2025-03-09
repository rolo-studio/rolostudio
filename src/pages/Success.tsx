
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Success = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // This is where you would typically:
    // 1. Verify the payment (usually done on the server)
    // 2. Clear the cart (since the purchase is complete)
    // 3. Store the order in your database
    
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md rounded-lg border p-8 text-center shadow-sm">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Betaling geslaagd!</h1>
        <p className="mt-4 text-muted-foreground">
          Hartelijk dank voor je bestelling. We gaan direct aan de slag om je bestelling te verwerken.
        </p>
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => navigate("/")}
            className="w-full"
          >
            Terug naar de winkel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
