import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (authLoading) return;
        
        if (!user?.email) {
          navigate("/auth");
          return;
        }

        const { data: adminData, error } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", user.email)
          .maybeSingle();

        if (error && error.code !== "PGRST116") {
          console.error("Error checking admin status:", error);
          navigate("/");
          return;
        }

        if (!adminData) {
          toast({
            title: "Geen toegang",
            description: "Je hebt geen admin rechten.",
            variant: "destructive",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error in checkAdminStatus:", error);
        navigate("/");
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, authLoading, navigate, toast]);

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
    enabled: !isCheckingAdmin, // Only fetch products after admin check is complete
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Product verwijderd",
        description: "Het product is succesvol verwijderd.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (authLoading || isCheckingAdmin) {
    return (
      <div className="container py-8">
        <p>Laden...</p>
      </div>
    );
  }

  if (productsLoading) {
    return (
      <div className="container py-8">
        <p>Producten laden...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-playfair text-2xl font-semibold">
          Producten beheren
        </h1>
        <Button onClick={() => navigate("/admin/products/new")}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nieuw product
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titel</TableHead>
              <TableHead>Categorie</TableHead>
              <TableHead>Prijs</TableHead>
              <TableHead>Voorraad</TableHead>
              <TableHead className="w-[100px]">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>
                  {product.category === "sieraden"
                    ? "Sieraden"
                    : "Telefoonhoesjes"}
                </TableCell>
                <TableCell>€{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
