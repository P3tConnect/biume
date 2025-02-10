import { Star } from "lucide-react";
import Avvvatars from "avvvatars-react";
import { testimonials } from "./data";

export function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Découvrez les expériences de nos utilisateurs satisfaits
          </p>
        </div>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => {
            console.log("Rendering testimonial:", testimonial); // Debug log
            return (
              <div key={index} className="group">
                <div className="bg-background border rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14">
                      <Avvvatars
                        value={testimonial.name}
                        style="shape"
                        size={56}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 