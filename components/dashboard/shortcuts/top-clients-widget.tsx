"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PersonIcon, StarIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const TopClientsWidget = () => {
  const [selectedClient, setSelectedClient] = useState<typeof topClients[0] | null>(null);

  // Exemple de données enrichies
  const topClients = [
    {
      id: 1,
      name: "Emma Bernard",
      email: "emma.bernard@email.com",
      phone: "06 12 34 56 78",
      totalSpent: 1250,
      visits: 15,
      lastVisit: "2024-03-15",
      status: "VIP",
      pets: [
        {
          id: 1,
          name: "Luna",
          type: "Chat",
          breed: "Siamois",
          age: 3,
          gender: "Femelle",
          weight: 4.2,
          birthDate: "2021-03-15",
          lastCheckup: "2024-02-10",
          microchip: "250268501234567",
          vaccinations: [
            { name: "Typhus", date: "2024-02-10", nextDue: "2025-02-10" },
            { name: "Leucose", date: "2024-02-10", nextDue: "2025-02-10" }
          ],
          conditions: ["Allergie alimentaire"],
          treatments: ["Régime hypoallergénique"]
        },
        {
          id: 2,
          name: "Max",
          type: "Chien",
          breed: "Labrador",
          age: 5,
          gender: "Mâle",
          weight: 32.5,
          birthDate: "2019-05-20",
          lastCheckup: "2024-01-15",
          microchip: "250268507654321",
          vaccinations: [
            { name: "CHPL", date: "2023-12-15", nextDue: "2024-12-15" },
            { name: "Rage", date: "2023-12-15", nextDue: "2024-12-15" }
          ],
          conditions: ["Arthrose légère"],
          treatments: ["Complément alimentaire articulaire"]
        }
      ],
      visitHistory: [
        { date: "2024-03-15", type: "Consultation", price: 50, notes: "Vaccination annuelle" },
        { date: "2024-02-20", type: "Urgence", price: 150, notes: "Gastro-entérite" },
        { date: "2024-01-10", type: "Contrôle", price: 45, notes: "Suivi post-opératoire" }
      ],
      notes: [
        { date: "2024-03-15", content: "Cliente très attentive aux besoins de ses animaux" },
        { date: "2024-02-20", content: "Préfère les rendez-vous en matinée" }
      ]
    },
    {
      id: 2,
      name: "Thomas Petit",
      totalSpent: 980,
      visits: 12,
      lastVisit: "2024-03-10",
      status: "Fidèle",
    },
    {
      id: 3,
      name: "Julie Martin",
      totalSpent: 750,
      visits: 8,
      lastVisit: "2024-03-05",
      status: "Régulier",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StarIcon className="w-5 h-5" />
          Meilleurs clients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topClients.map((client) => (
            <Sheet key={client.id}>
              <SheetTrigger asChild>
                <div
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <PersonIcon className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{client.name}</p>
                        <Badge
                          variant={
                            client.status === "VIP"
                              ? "default"
                              : client.status === "Fidèle"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {client.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {client.visits} visites
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{client.totalSpent}€</p>
                    <p className="text-sm text-muted-foreground">
                      Dernière visite : {client.lastVisit}
                    </p>
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent className="w-[600px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Détails du client</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)] pr-4">
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">
                          <PersonIcon className="w-8 h-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{client.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              client.status === "VIP"
                                ? "default"
                                : client.status === "Fidèle"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {client.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>{client.email}</p>
                          <p>{client.phone}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Statistiques</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Total dépensé</p>
                            <p className="text-2xl font-semibold">{client.totalSpent}€</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Nombre de visites</p>
                            <p className="text-2xl font-semibold">{client.visits}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Tabs defaultValue="pets" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="pets">Animaux</TabsTrigger>
                        <TabsTrigger value="history">Historique</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                      </TabsList>
                      <TabsContent value="pets" className="space-y-4">
                        <ScrollArea className="h-3/4">
                          <div className="space-y-4 pr-4">
                            {(client.pets || []).map((pet) => (
                              <div key={pet.id} className="p-4 bg-muted rounded-lg space-y-4">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium text-lg">{pet.name}</h4>
                                      <Badge variant="outline">{pet.gender}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {pet.type} • {pet.breed} • {pet.age} ans
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium">{pet.weight} kg</p>
                                    <p className="text-xs text-muted-foreground">Dernier check-up : {pet.lastCheckup}</p>
                                  </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Informations</h5>
                                    <div className="space-y-2 text-sm">
                                      <p className="text-muted-foreground">
                                        <span className="font-medium text-foreground">Date de naissance :</span> {pet.birthDate}
                                      </p>
                                      <p className="text-muted-foreground">
                                        <span className="font-medium text-foreground">N° Puce :</span> {pet.microchip}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Santé</h5>
                                    <div className="space-y-2 text-sm">
                                      {pet.conditions.length > 0 && (
                                        <div>
                                          <p className="font-medium text-foreground">Conditions :</p>
                                          <ul className="list-disc list-inside text-muted-foreground">
                                            {pet.conditions.map((condition, idx) => (
                                              <li key={idx}>{condition}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {pet.treatments.length > 0 && (
                                        <div>
                                          <p className="font-medium text-foreground">Traitements :</p>
                                          <ul className="list-disc list-inside text-muted-foreground">
                                            {pet.treatments.map((treatment, idx) => (
                                              <li key={idx}>{treatment}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h5 className="text-sm font-medium mb-2">Vaccinations</h5>
                                  <div className="grid grid-cols-2 gap-2">
                                    {pet.vaccinations.map((vacc, idx) => (
                                      <div key={idx} className="p-2 bg-background rounded border text-sm">
                                        <p className="font-medium">{vacc.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          Fait le {vacc.date} • Prochain : {vacc.nextDue}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="history" className="space-y-4">
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-4 pr-4">
                            {(client.visitHistory || []).map((visit, index) => (
                              <div key={index} className="p-4 bg-muted rounded-lg space-y-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                      <p className="text-sm text-muted-foreground">{visit.date}</p>
                                    </div>
                                    <h4 className="font-medium">{visit.type}</h4>
                                  </div>
                                  <Badge variant="secondary">{visit.price}€</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{visit.notes}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="notes" className="space-y-4">
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-4 pr-4">
                            {(client.notes || []).map((note, index) => (
                              <div key={index} className="p-4 bg-muted rounded-lg space-y-2">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">{note.date}</p>
                                </div>
                                <p className="text-sm">{note.content}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopClientsWidget;
