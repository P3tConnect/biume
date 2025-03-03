import Image from "next/image";

const PETS_DATA = [
  {
    id: 1,
    name: "Luna",
    age: 2,
    breed: "Golden Retriever",
    image:
      "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Oscar",
    age: 3,
    breed: "Chat Européen",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Milo",
    age: 1,
    breed: "Berger Australien",
    image:
      "https://images.unsplash.com/photo-1625316708582-7c38734be31d?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Ruby",
    age: 4,
    breed: "Labrador",
    image:
      "https://images.unsplash.com/photo-1605897472359-85e4b94d685d?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Charlie",
    age: 2,
    breed: "Maine Coon",
    image:
      "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Bella",
    age: 5,
    breed: "Cavalier King Charles",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Max",
    age: 3,
    breed: "Berger Allemand",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Lily",
    age: 1,
    breed: "Ragdoll",
    image:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop",
  },
];

function PetCard({ pet }: { pet: (typeof PETS_DATA)[number] }) {
  return (
    <div className="relative group aspect-square rounded-2xl overflow-hidden">
      <Image
        src={pet.image}
        alt={`${pet.name} - ${pet.breed}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        priority={pet.id <= 4}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="font-medium text-sm sm:text-base">{pet.name}</div>
        <div className="text-xs sm:text-sm text-white/90">
          {pet.age} {pet.age > 1 ? "ans" : "an"} • {pet.breed}
        </div>
      </div>
    </div>
  );
}

export function PetsGallerySection() {
  return (
    <section className="w-full py-16 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Nos amis à quatre pattes
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Découvrez les adorables compagnons qui font confiance à nos
            professionnels partenaires
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PETS_DATA.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </section>
  );
}
