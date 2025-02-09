import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // TODO: Implémenter l'API pour la liste d'attente
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      toast.success("Votre inscription a bien été prise en compte !");
      setEmail("");
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-background border rounded-3xl p-6 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Rejoignez notre liste d'attente
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Soyez parmi les premiers professionnels à rejoindre notre plateforme et bénéficiez d'avantages exclusifs
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 sm:h-14 text-base rounded-xl"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full sm:w-auto custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-xl"
                >
                  {isLoading ? "En cours..." : "S'inscrire"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 