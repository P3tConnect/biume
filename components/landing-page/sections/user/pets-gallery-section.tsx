import Image from "next/image";

export function PetsGallerySection() {
  return (
    <section className="py-16 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Nos amis à quatre pattes</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Découvrez les adorables compagnons de notre communauté
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden">
              <Image
                src={`/pets/pet-${i}.jpg`}
                alt={`Animal ${i}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="font-medium text-sm sm:text-base">Luna</div>
                <div className="text-xs sm:text-sm text-white/80">2 ans • Golden Retriever</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 