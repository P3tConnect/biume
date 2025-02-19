"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Edit2, Trash2, Calendar, Clock, PawPrint } from "lucide-react";

interface Observation {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  session?: {
    patient: {
      name: string;
      species: string;
    };
  };
}

interface ObservationDetailsDrawerProps {
  observation: Observation | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (observation: Observation) => void;
  onDelete?: (observation: Observation) => void;
}

const ObservationDetailsDrawer = ({
  observation,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: ObservationDetailsDrawerProps) => {
  if (!observation) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-3xl p-0 bg-background">
        {/* Hero Section */}
        <div className="relative h-48 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
          <SheetHeader className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent pt-24">
            <div className="flex items-center justify-between w-full mx-auto">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-background rounded-xl shadow-sm">
                  <PawPrint className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <SheetTitle className="text-3xl font-bold">
                      {observation.title}
                    </SheetTitle>
                    <Badge
                      variant={observation.updatedAt ? "secondary" : "default"}
                      className={
                        observation.updatedAt
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }
                    >
                      {observation.updatedAt ? "Terminée" : "En cours"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(
                          new Date(observation.createdAt),
                          "d MMMM yyyy",
                          {
                            locale: fr,
                          },
                        )}
                      </span>
                    </div>
                    {observation.updatedAt && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            Mise à jour le{" "}
                            {format(
                              new Date(observation.updatedAt),
                              "d MMMM yyyy",
                              {
                                locale: fr,
                              },
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {onEdit && (
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => onEdit(observation)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="default"
                    onClick={() => onDelete(observation)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                )}
              </div>
            </div>
          </SheetHeader>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="w-full mx-auto px-6">
            <div className="space-y-6 py-6">
              {/* Patient Information */}
              {observation.session?.patient && (
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Patient</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
                      {observation.session.patient.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">
                        {observation.session.patient.name}
                      </h4>
                      <Badge variant="outline" className="mt-1">
                        {observation.session.patient.species}
                      </Badge>
                    </div>
                  </div>
                </Card>
              )}

              {/* Observation Content */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Contenu de l&apos;observation
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {observation.content}
                </p>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ObservationDetailsDrawer;
