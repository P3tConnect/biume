import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Clock, MapPin, Phone } from "lucide-react";

interface CompanyInfoProps {
  company: {
    description: string;
    address: string;
    phone: string;
    openingHours: {
      monday: string;
      saturday: string;
      sunday: string;
    };
  };
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">À propos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          {company.description}
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Adresse</p>
              <p className="text-sm text-muted-foreground">{company.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Téléphone</p>
              <p className="text-sm text-muted-foreground">{company.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Horaires</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Lun. - Ven. : {company.openingHours.monday}</p>
                <p>Sam. : {company.openingHours.saturday}</p>
                <p>Dim. : {company.openingHours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 