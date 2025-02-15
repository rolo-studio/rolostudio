
import { Building, HeartHandshake, Users } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <h1 className="mb-8 font-playfair text-4xl font-medium">Over ons</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Ons Team</h2>
            <p className="text-muted-foreground">
              Sorry, ik zie geen nieuwe tekst in je bericht. Kun je aangeven welke tekst je hier wilt hebben?
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <HeartHandshake className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Onze Missie</h2>
            <p className="text-muted-foreground">
              We streven ernaar om betaalbare, handgemaakte producten van hoge kwaliteit te leveren die jouw persoonlijke stijl weerspiegelen.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Ons Atelier</h2>
            <p className="text-muted-foreground">
              Vanuit ons atelier in Nederland maken we met zorg en aandacht al onze sieraden en telefoonhoesjes op bestelling.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-lg border bg-card p-8">
          <h2 className="mb-4 text-2xl font-semibold">Ons Verhaal</h2>
          <p className="max-w-3xl text-muted-foreground">
            Ro & Lo Studio begon als een hobby en groeide uit tot een passievol bedrijf. 
            We zijn begonnen met het maken van sieraden voor vrienden en familie, en door 
            hun enthousiaste reacties besloten we onze creaties met meer mensen te delen. 
            Inmiddels hebben we ons assortiment uitgebreid met unieke telefoonhoesjes, 
            allemaal met dezelfde aandacht voor detail en kwaliteit gemaakt.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
