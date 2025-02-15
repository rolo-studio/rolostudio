
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Cart from "@/pages/Cart";
import Auth from "@/pages/Auth";
import Admin from "@/pages/Admin";
import CreateProduct from "@/pages/CreateProduct";
import EditProduct from "@/pages/EditProduct";
import CategoryProducts from "@/pages/CategoryProducts";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import "./App.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/products/new" element={<CreateProduct />} />
              <Route path="/admin/products/:id/edit" element={<EditProduct />} />
              <Route path="/category/:category" element={<CategoryProducts />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
