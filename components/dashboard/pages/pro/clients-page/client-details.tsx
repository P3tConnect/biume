import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Star,
  Clock,
  FileText,
  PawPrint,
} from "lucide-react";

type ClientDetailsProps = {
  client: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    city: string;
    country: string;
    createdAt: string;
    status: "Active" | "Inactive";
  };
};

const appointments = [
  {
    id: "1",
    date: "2024-02-15",
    time: "14:30",
    service: "Consultation",
    status: "upcoming",
  },
  {
    id: "2",
    date: "2024-02-01",
    time: "10:00",
    service: "Vaccination",
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-15",
    time: "16:00",
    service: "Checkup",
    status: "completed",
  },
];

const pets = [
  {
    id: "1",
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
  },
  {
    id: "2",
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: 2,
  },
];

export function ClientDetails({ client }: ClientDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {client.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{client.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge
                variant={client.status === "Active" ? "default" : "destructive"}
                className="rounded-full"
              >
                {client.status}
              </Badge>
              <span>•</span>
              <span>
                Client depuis {new Date(client.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Modifier</Button>
          <Button>Nouveau rendez-vous</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{client.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {client.city}, {client.country}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Rendez-vous</span>
              </div>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <PawPrint className="h-4 w-4" />
                <span>Animaux</span>
              </div>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4" />
                <span>Note moyenne</span>
              </div>
              <p className="text-2xl font-bold">4.8</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </div>
              <p className="text-2xl font-bold">5</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList>
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="pets">Animaux</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Historique des rendez-vous</CardTitle>
              <CardDescription>
                Liste de tous les rendez-vous passés et à venir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(appointment.date).toLocaleDateString()} à{" "}
                          {appointment.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.service}
                      </p>
                    </div>
                    <Badge
                      variant={
                        appointment.status === "upcoming"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {appointment.status === "upcoming"
                        ? "À venir"
                        : "Terminé"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pets">
          <Card>
            <CardHeader>
              <CardTitle>Animaux</CardTitle>
              <CardDescription>Liste des animaux du client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{pet.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {pet.breed} • {pet.age} ans
                      </p>
                    </div>
                    <Badge variant="outline">{pet.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Tous les documents liés au client
              </CardDescription>
            </CardHeader>
            <CardContent>{/* Documents content */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Facturation</CardTitle>
              <CardDescription>
                Historique des paiements et factures
              </CardDescription>
            </CardHeader>
            <CardContent>{/* Billing content */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
