
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (!email) return;
        
        const { data: adminData, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('email', email)
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin status:', error);
          return;
        }
        
        setIsAdmin(!!adminData);
      } catch (error) {
        console.error('Error in checkAdminStatus:', error);
      }
    };

    const debounceTimer = setTimeout(() => {
      checkAdminStatus();
    }, 500); // Debounce the admin check by 500ms

    return () => clearTimeout(debounceTimer);
  }, [email]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Registratie succesvol",
          description: "Controleer je email om je account te verifiëren.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container flex min-h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="font-playfair text-2xl font-semibold">
              {isSignUp ? "Maak een account" : "Log in"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignUp
                ? "Creëer een admin account"
                : "Log in als administrator"}
            </p>
            {isAdmin && (
              <p className="mt-2 text-sm text-green-600">
                Dit email adres heeft admin rechten
              </p>
            )}
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Laden..." : isSignUp ? "Registreren" : "Inloggen"}
            </Button>
          </form>
          <div className="text-center text-sm">
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Al een account? Log in"
                : "Nog geen account? Registreer nu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
