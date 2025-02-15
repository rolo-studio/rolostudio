
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ProductForm } from "@/components/product/ProductForm";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/types/database";

const EditProduct = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Product;
    },
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <p>Laden...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <p>Product niet gevonden</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 font-playfair text-2xl font-semibold">
        Product bewerken
      </h1>
      <ProductForm product={product} />
    </div>
  );
};

export default EditProduct;
