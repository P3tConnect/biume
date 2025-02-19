export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent via-background to-background"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 clip-path-diagonal"></div>
      <div className="container relative mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Notre mission est de
            <span className="block mt-2 text-gradient">révolutionner la santé animale</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Biume aide les professionnels de santé animale à se concentrer sur l'essentiel :
            le bien-être de leurs patients, en simplifiant la gestion de leur activité.
          </p>
        </div>
      </div>
    </section>
  );
} 