import { Organization } from "@/src/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star } from "lucide-react";
import { use } from "react";
import { ActionResult } from "@/src/lib";
import Image from "next/image";
import Link from "next/link";

interface OrganizationsGridProps {
  organizations: Promise<ActionResult<Organization[]>>;
}

export function OrganizationsGrid({ organizations }: OrganizationsGridProps) {
  const organizationsData = use(organizations);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {organizationsData.data?.map((organization) => (
        <Link
          key={organization.id}
          href={`/companies/${organization.id}`}
          className="block"
        >
          <div className="flex flex-col bg-card rounded-lg border border-border card-highlight hover-card-effect">
            {/* Image */}
            <div className="w-full h-[200px] relative">
              {organization.coverImage ? <Image fill src={organization.coverImage} quality={80} alt="Image de l'organisation" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-accent" />}
              <Badge className="absolute top-3 left-3 bg-secondary hover:bg-secondary/90 transition-colors">
                Disponible aujourd&apos;hui
              </Badge>
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-card-foreground">
                    {organization.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-card-foreground">
                      4.8
                    </span>
                    <span className="text-muted-foreground text-sm">(124)</span>
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
        </Link>
      ))}
    </div>
  );
} 