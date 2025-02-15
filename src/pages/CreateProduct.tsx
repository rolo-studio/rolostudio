
import { ProductForm } from "@/components/product/ProductForm";

const CreateProduct = () => {
  return (
    <div className="container py-8">
      <h1 className="mb-8 font-playfair text-2xl font-semibold">
        Nieuw product toevoegen
      </h1>
      <ProductForm />
    </div>
  );
};

export default CreateProduct;
