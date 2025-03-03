import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: "Mathieu Chambaud",
      role: "Co-fondateur & Développeur",
      image: "/assets/images/mathieu-chambaud.jpg"
    },
    {
      name: "Graig Kolodziejczyk",
      role: "Co-fondateur & Développeur",
      image: "/assets/images/graig-kolodziejczyk.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Notre Équipe</h2>
          <p className="text-lg text-muted-foreground">
            Une équipe passionnée qui travaille chaque jour pour améliorer la santé animale
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-white/80">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 