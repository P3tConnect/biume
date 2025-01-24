import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { organization } from "@/src/lib/auth-client";
import { ChevronRight, Ellipsis } from "lucide-react";

const patients = [
  {
    id: 1,
    name: "Olivia Martin",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    email: "olivia.martin@email.com",
    lastProcedure: "Appendectomy",
    date: "2024-05-20",
  },
  {
    id: 2,
    name: "Jackson Lee",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    email: "jackson.lee@email.com",
    lastProcedure: "Knee Arthroscopy",
    date: "2024-05-18",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    email: "isabella.nguyen@email.com",
    lastProcedure: "Cataract Surgery",
    date: "2024-05-15",
  },
  {
    id: 4,
    name: "William Chen",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    email: "william.chen@email.com",
    lastProcedure: "Colonoscopy",
    date: "2024-05-12",
  },
  {
    id: 5,
    name: "Can Jackson",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    email: "can.jackson@email.com",
    lastProcedure: "Colonoscopy",
    date: "2024-08-12",
  },
];

export async function ClientWithLastProcedure() {

  const { data: member, error } = await organization.getActiveMember();

  console.log(member, error);

  return (
    <Card className="col-span-3 rounded-2xl">
      <CardHeader className="relative">
        <CardTitle className="text-base">
          Patients with Last Procedure
        </CardTitle>
        <div className="absolute end-4 top-2">
          <Button variant="link" size="lg">
            <Ellipsis size={26} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center">
              <Avatar className="size-10">
                <AvatarImage src={patient.avatar} alt="Avatar" />
                <AvatarFallback>
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="font-medium leading-none">{patient.name}</p>
                <p className="text-sm text-muted-foreground">{patient.email}</p>
              </div>
              <div className="ml-auto text-end font-medium">
                <p className="text-sm">{patient.lastProcedure}</p>
                <p className="text-sm text-muted-foreground">{patient.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
