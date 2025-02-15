
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    id: 1,
    title: "Gouden Ketting",
    price: 49.99,
    category: "Sieraden",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Zilveren Armband",
    price: 29.99,
    category: "Sieraden",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Marmer Telefoonhoesje",
    price: 24.99,
    category: "Telefoonhoesjes",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Bloemen Telefoonhoesje",
    price: 19.99,
    category: "Telefoonhoesjes",
    image: "/placeholder.svg",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-warmGray-50">
        <div className="container text-center">
          <h1 className="animate-fade-in font-playfair text-4xl font-medium text-foreground sm:text-5xl md:text-6xl">
            Handgemaakte Schatten
          </h1>
          <p className="animate-slide-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Unieke sieraden en telefoonhoesjes, met liefde handgemaakt voor jou
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#sieraden" className="button-primary">
              Bekijk Sieraden
            </a>
            <a href="#hoesjes" className="button-secondary">
              Bekijk Hoesjes
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-center font-playfair text-3xl font-medium">
            Uitgelichte Producten
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-warmGray-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-playfair text-3xl font-medium">Over Ons</h2>
            <p className="mt-6 text-muted-foreground">
              Met passie maken wij handgemaakte sieraden en telefoonhoesjes. 
              Elk stuk is uniek en met zorg gemaakt, speciaal voor jou.
              Ontdek onze collectie en vind jouw perfecte accessoire.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
