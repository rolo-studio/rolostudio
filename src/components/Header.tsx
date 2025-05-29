
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-pink-200 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-r border-pink-200">
              <nav className="flex flex-col gap-4">
                <Link
                  to="/category/sieraden"
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Sieraden
                </Link>
                <Link
                  to="/category/telefoonhoesjes"
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Telefoonhoesjes
                </Link>
                <Link
                  to="/favorites"
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Favorieten
                </Link>
                <Link
                  to="/about"
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Over ons
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="text-xl font-semibold">
            <h1 className="font-playfair text-2xl text-black">Ro & Lo Studio</h1>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link to="/category/sieraden" className="nav-link">
              Sieraden
            </Link>
            <Link to="/category/telefoonhoesjes" className="nav-link">
              Telefoonhoesjes
            </Link>
            <Link to="/favorites" className="nav-link">
              Favorieten
            </Link>
            <Link to="/about" className="nav-link">
              Over ons
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/cart')}
            className="hover:text-pink-600"
          >
            <ShoppingCart className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
