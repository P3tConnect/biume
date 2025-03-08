export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent via-background to-background"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 clip-path-diagonal"></div>
      <div className="container relative mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Notre
            <span className="block mt-2 text-gradient">feuille de route</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Découvrez les prochaines étapes de développement de Biume et comment
            nous prévoyons d&apos;améliorer continuellement notre plateforme
            pour mieux servir les professionnels de santé animale.
          </p>
        </div>
      </div>
    </section>
  );
}
