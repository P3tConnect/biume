import { Star } from "lucide-react";
import Image from "next/image";

const userTestimonials = [
  {
    content: "Grâce à l'application, je n'oublie plus jamais les vaccins de Luna. C'est tellement pratique !",
    name: "Sophie Martin",
    petName: "Luna",
    avatar: "/avatars/user-1.jpg",
    petAvatar: "/pets/pet-1.jpg"
  },
  {
    content: "Le suivi quotidien m'aide à mieux comprendre les besoins de mon chat. Une vraie révolution !",
    name: "Thomas Dubois",
    petName: "Milo",
    avatar: "/avatars/user-2.jpg",
    petAvatar: "/pets/pet-2.jpg"
  },
  {
    content: "J'adore pouvoir partager les photos de Rex avec toute la famille. L'application est super intuitive.",
    name: "Julie Lambert",
    petName: "Rex",
    avatar: "/avatars/user-3.jpg",
    petAvatar: "/pets/pet-3.jpg"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ils nous font confiance</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Découvrez ce que nos utilisateurs pensent de l'application
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {userTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-background border rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full ring-2 ring-primary/20"
                    />
                    <Image
                      src={testimonial.petAvatar}
                      alt={`Animal de ${testimonial.name}`}
                      width={32}
                      height={32}
                      className="absolute -bottom-2 -right-2 rounded-full ring-2 ring-background"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">avec {testimonial.petName}</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 