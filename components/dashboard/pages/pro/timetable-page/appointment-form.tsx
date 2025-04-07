"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { fr } from "date-fns/locale";
import { cn } from "@/src/lib/utils";
import { CalendarIcon, Clock, User2, FileText } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Credenza,
  CredenzaFooter,
  CredenzaTitle,
  CredenzaHeader,
  CredenzaContent,
} from "@/components/ui";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AppointmentFormData) => void;
  initialData?: Partial<AppointmentFormData>;
  isEditing?: boolean;
}

export interface AppointmentFormData {
  clientName: string;
  date: Date;
  time: string;
  duration: number;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
}

const statusConfig = {
  pending: { label: "En attente", color: "bg-yellow-500/10 text-yellow-500" },
  confirmed: { label: "Confirmé", color: "bg-green-500/10 text-green-500" },
  cancelled: { label: "Annulé", color: "bg-red-500/10 text-red-500" },
};

export function AppointmentForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<Partial<AppointmentFormData>>(
    initialData || {
      status: "pending",
      duration: 30,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.clientName &&
      formData.date &&
      formData.time &&
      formData.duration &&
      formData.status
    ) {
      onSubmit(formData as AppointmentFormData);
      onClose();
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={onClose}>
      <CredenzaContent className="max-w-3xl w-[90vw] h-[85vh] flex flex-col overflow-hidden">
        <CredenzaHeader className="px-6 pt-6 pb-4 border-b">
          <CredenzaTitle className="flex items-center gap-2 text-xl">
            {isEditing ? (
              <>
                <Clock className="w-5 h-5" /> Modifier le rendez-vous
              </>
            ) : (
              <>
                <Clock className="w-5 h-5" /> Nouveau rendez-vous
              </>
            )}
          </CredenzaTitle>
        </CredenzaHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto space-y-8 px-6 py-4"
        >
          {/* Client Information Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4 text-lg font-medium">
              <User2 className="w-5 h-5" />
              <h3>Informations client</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nom du client</Label>
                <Input
                  id="clientName"
                  value={formData.clientName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  className="max-w-md text-lg"
                  placeholder="Entrez le nom du client"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Date and Time Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4 text-lg font-medium">
              <CalendarIcon className="w-5 h-5" />
              <h3>Date et heure</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(formData.date, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure</Label>
                <div className="relative">
                  <Input
                    id="time"
                    type="time"
                    value={formData.time || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="pl-10 text-lg"
                    required
                  />
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durée</Label>
                <Select
                  value={String(formData.duration)}
                  onValueChange={(value) =>
                    setFormData({ ...formData, duration: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 heure</SelectItem>
                    <SelectItem value="90">1 heure 30</SelectItem>
                    <SelectItem value="120">2 heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(
                    value: "pending" | "confirmed" | "cancelled",
                  ) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut">
                      {formData.status && (
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "rounded-md",
                              statusConfig[formData.status].color,
                            )}
                          >
                            {statusConfig[formData.status].label}
                          </Badge>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <Badge
                        variant="secondary"
                        className="bg-yellow-500/10 text-yellow-500"
                      >
                        En attente
                      </Badge>
                    </SelectItem>
                    <SelectItem value="confirmed">
                      <Badge
                        variant="secondary"
                        className="bg-green-500/10 text-green-500"
                      >
                        Confirmé
                      </Badge>
                    </SelectItem>
                    <SelectItem value="cancelled">
                      <Badge
                        variant="secondary"
                        className="bg-red-500/10 text-red-500"
                      >
                        Annulé
                      </Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notes Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4 text-lg font-medium">
              <FileText className="w-5 h-5" />
              <h3>Notes</h3>
            </div>
            <div className="space-y-2">
              <Textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Ajouter des notes supplémentaires..."
                className="min-h-[120px] text-lg"
              />
            </div>
          </Card>
        </form>

        <CredenzaFooter className="px-6 py-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {isEditing ? "Mettre à jour" : "Créer"}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
