import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CompaniesListPage() {
  return (
    <div className="min-h-screen w-screen bg-background">
      {/* Hero Section with Search */}
      <div className="relative w-full border-b border-border overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,var(--primary)_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_30%,var(--accent)_150%)]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute h-[500px] w-[500px] rounded-full bg-primary/30 blur-3xl -top-48 -left-48" />
          <div className="absolute h-[400px] w-[400px] rounded-full bg-secondary/20 blur-3xl -bottom-48 right-0" />
        </div>
        <div className="relative w-full px-8 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-3 text-center">
            Trouvez et réservez votre vétérinaire
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous en quelques clics avec les meilleurs vétérinaires
            près de chez vous
          </p>

          <div className="max-w-3xl mx-auto bg-card/95 backdrop-blur-md rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Quel type de soin recherchez-vous ?"
                className="pl-9 pr-4 h-12"
              />
            </div>
            <div className="relative sm:w-[200px]">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Où ?" className="pl-9 pr-4 h-12" />
            </div>
            <Button className="h-12 px-6 custom-button">Rechercher</Button>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 w-full">
        <div className="w-full px-8">
          <div className="flex items-center justify-between py-4 gap-4 overflow-x-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtres
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/90 transition-colors"
                >
                  Disponible aujourd'hui
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/90 transition-colors"
                >
                  Réservation instantanée
                </Badge>
              </div>
            </div>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommandés</SelectItem>
                <SelectItem value="nearest">Les plus proches</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-8 py-8 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col bg-card rounded-lg border border-border card-highlight hover-card-effect"
            >
              {/* Image */}
              <div className="w-full h-[200px] relative bg-accent">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent group-hover:scale-105 transition-transform duration-200" />
                <Badge className="absolute top-3 left-3 bg-secondary hover:bg-secondary/90 transition-colors">
                  Disponible aujourd'hui
                </Badge>
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">
                      Cabinet Vétérinaire {index + 1}
                    </h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3" /> Paris {index + 1}e
                      arrondissement
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-card-foreground">
                        4.8
                      </span>
                      <span className="text-muted-foreground text-sm">
                        (124)
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    À partir de 35€
                  </Badge>
                </div>

                {/* Availabilities */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Prochaines disponibilités</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap custom-button"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      14:30
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap custom-button"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      15:15
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap custom-button"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      16:00
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
