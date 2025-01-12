"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[90vw] h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {isEditing ? "Modifier le rendez-vous" : "Nouveau rendez-vous"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto space-y-6 px-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="clientName">Nom du client</Label>
              <Input
                id="clientName"
                value={formData.clientName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                required
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time">Heure</Label>
              <Input
                id="time"
                type="time"
                value={formData.time || ""}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Calendar */}
          <div className="space-y-2">
            <Label>Date</Label>
            <div className="border rounded-md p-4">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData({ ...formData, date })}
                className="mx-auto"
                locale={fr}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (minutes)</Label>
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

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "pending" | "confirmed" | "cancelled") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Ajouter des notes supplémentaires..."
              className="min-h-[100px]"
            />
          </div>
        </form>

        <DialogFooter className="px-6 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {isEditing ? "Mettre à jour" : "Créer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
