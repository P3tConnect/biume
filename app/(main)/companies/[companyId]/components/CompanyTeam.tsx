import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface Professional {
  id: string;
  name: string;
  role: string;
  speciality: string;
  image: string;
}

interface CompanyTeamProps {
  professionals: Professional[];
}

export function CompanyTeam({ professionals }: CompanyTeamProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">L'équipe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {professionals.map((pro) => (
            <div
              key={pro.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={pro.image} alt={pro.name} />
                <AvatarFallback>
                  {pro.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{pro.name}</p>
                <p className="text-sm text-muted-foreground">
                  {pro.role} - {pro.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 