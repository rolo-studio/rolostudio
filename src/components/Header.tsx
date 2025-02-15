
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4">
                <a href="#" className="nav-link" onClick={() => setIsOpen(false)}>
                  Sieraden
                </a>
                <a href="#" className="nav-link" onClick={() => setIsOpen(false)}>
                  Telefoonhoesjes
                </a>
                <a href="#" className="nav-link" onClick={() => setIsOpen(false)}>
                  Over ons
                </a>
                <a href="#" className="nav-link" onClick={() => setIsOpen(false)}>
                  Contact
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <a href="/" className="text-xl font-semibold">
            <h1 className="font-playfair text-2xl">Ro & Lo Studio</h1>
          </a>
          <nav className="hidden md:flex md:gap-6">
            <a href="#" className="nav-link">
              Sieraden
            </a>
            <a href="#" className="nav-link">
              Telefoonhoesjes
            </a>
            <a href="#" className="nav-link">
              Over ons
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
