"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Eye,
  FilePenLine,
  Plus,
  Search,
  Table as TableIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateObservationDialog } from "./create-observation-dialog";
import ObservationDetailsDrawer from "./observation-details-drawer";

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

function ObservationsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function useMockObservations(filter: "all" | "pending" | "completed" = "all") {
  return useQuery({
    queryKey: ["observations", filter],
    queryFn: async () => {
      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockObservations: Observation[] = [
        {
          id: "1",
          title: "Suivi post-opératoire",
          content: "Le patient montre des signes de bonne récupération...",
          createdAt: new Date(2024, 0, 15),
          updatedAt: null,
          session: {
            patient: {
              name: "Max",
              species: "Chien",
            },
          },
        },
        {
          id: "2",
          title: "Contrôle vaccinal",
          content: "Tous les vaccins sont à jour...",
          createdAt: new Date(2024, 0, 14),
          updatedAt: new Date(2024, 0, 15),
          session: {
            patient: {
              name: "Luna",
              species: "Chat",
            },
          },
        },
        // Ajoutez plus d'observations mock si nécessaire
      ];

      return mockObservations;
    },
  });
}

export default function ObservationsPageComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all",
  );
  const { data: observations, isLoading } = useMockObservations(activeTab);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedObservation, setSelectedObservation] =
    useState<Observation | null>(null);

  const filteredObservations = observations?.filter(
    (obs) =>
      obs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.session?.patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header Card */}
      <Card className="overflow-hidden rounded-2xl">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Observations
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Gérez et suivez vos observations médicales
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
              >
                <TableIcon className="size-4 mr-2" />
                Liste des observations
              </Button>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300"
              >
                <Plus className="size-4 mr-2" />
                Nouvelle observation
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Card className="overflow-hidden rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle>Liste des observations</CardTitle>
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as typeof activeTab)
                }
                className="ml-6"
              >
                <TabsList className="grid w-full grid-cols-3 h-9">
                  <TabsTrigger value="all" className="text-xs">
                    Toutes
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs">
                    En cours
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs">
                    Terminées
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {isLoading ? (
              <ObservationsLoadingSkeleton />
            ) : filteredObservations?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FilePenLine className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">
                  Aucune observation trouvée
                </p>
                <p className="text-sm text-muted-foreground">
                  Commencez par créer une nouvelle observation
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="mt-4"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle observation
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date de création</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredObservations?.map((observation) => (
                    <TableRow key={observation.id}>
                      <TableCell className="font-medium">
                        {observation.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{observation.session?.patient.name}</span>
                          <Badge variant="outline" className="w-fit">
                            {observation.session?.patient.species}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(observation.createdAt),
                          "d MMMM yyyy",
                          {
                            locale: fr,
                          },
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            observation.updatedAt ? "secondary" : "default"
                          }
                          className={
                            observation.updatedAt
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }
                        >
                          {observation.updatedAt ? "Terminée" : "En cours"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-secondary/30"
                          onClick={() => setSelectedObservation(observation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Create Observation Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <CreateObservationDialog onClose={() => setIsCreateDialogOpen(false)} />
      </Dialog>

      {/* Observation Details Drawer */}
      <ObservationDetailsDrawer
        observation={selectedObservation}
        isOpen={!!selectedObservation}
        onClose={() => setSelectedObservation(null)}
        onEdit={(observation) => {
          // TODO: Implement edit functionality
          console.log("Edit observation:", observation);
        }}
        onDelete={(observation) => {
          // TODO: Implement delete functionality
          console.log("Delete observation:", observation);
        }}
      />
    </div>
  );
}
