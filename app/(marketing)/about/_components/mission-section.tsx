import Image from "next/image"

export function MissionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square">
            <Image
              src="/assets/images/about-mission.jpg"
              alt="Notre mission"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl"></div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre Vision</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Nous croyons en un monde où chaque animal reçoit les meilleurs soins possibles, grâce à des professionnels
              de santé équipés des outils technologiques les plus performants.
            </p>
            <p className="text-lg text-muted-foreground">
              Notre plateforme permet aux professionnels de santé animale de se concentrer sur ce qui compte vraiment :
              la santé et le bien-être de leurs patients.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
