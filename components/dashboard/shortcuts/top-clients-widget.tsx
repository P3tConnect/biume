import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PersonIcon, StarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TopClientsWidget = () => {
  // Exemple de données (à remplacer par vos vraies données)
  const topClients = [
    {
      id: 1,
      name: "Emma Bernard",
      totalSpent: 1250,
      visits: 15,
      lastVisit: "2024-03-15",
      status: "VIP",
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
            <div
              key={client.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopClientsWidget;
