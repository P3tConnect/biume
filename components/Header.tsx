import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon, EyeIcon, SaveIcon, ClipboardIcon, PawPrintIcon, CalendarIcon } from "lucide-react";

interface HeaderProps {
  title: string;
  selectedPet: { id: string; name: string; species: string } | undefined;
  selectedAppointment: { id: string; date: string; type: string } | undefined;
  handleGoBack: () => void;
  setShowPreview: (value: boolean) => void;
  handleSaveReport: () => void;
}

const Header = ({
  title,
  selectedPet,
  selectedAppointment,
  handleGoBack,
  setShowPreview,
  handleSaveReport,
}: HeaderProps) => {
  return (
    <Card className="mb-4 border shadow">
      <CardHeader className="pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleGoBack} className="rounded-full hover:bg-primary/10">
                <ChevronLeftIcon className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Retour au tableau de bord</TooltipContent>
          </Tooltip>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">Rédaction de rapport médical</CardTitle>
            <CardDescription>
              Créez un rapport médical complet avec observations cliniques, recommandations et notes
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                <EyeIcon className="h-4 w-4 mr-1" />
                Aperçu
              </Button>
            </TooltipTrigger>
            <TooltipContent>Prévisualiser le rapport</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                onClick={handleSaveReport}
                disabled={!title || !selectedPet || !selectedAppointment}
              >
                <SaveIcon className="h-4 w-4 mr-1" />
                Enregistrer
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enregistrer le rapport</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <ClipboardIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <Input
              value={title}
              onChange={e => { }}
              className="text-xl font-semibold border-none bg-transparent focus-visible:ring-1 focus-visible:ring-offset-0 p-0 h-auto"
              placeholder="Titre du rapport..."
            />
            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              {selectedPet ? (
                <>
                  <PawPrintIcon className="h-3.5 w-3.5" />
                  <span>
                    {selectedPet.name} ({selectedPet.species})
                  </span>
                  {selectedAppointment && (
                    <>
                      <span className="mx-1">•</span>
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>
                        {selectedAppointment.date} - {selectedAppointment.type}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-muted-foreground/80 italic">Aucun animal sélectionné</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header; 