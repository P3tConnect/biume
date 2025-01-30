"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const NotificationsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notification</CardTitle>
        <CardDescription>
          Choisissez comment et quand vous souhaitez être notifié
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Notifications par email */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notifications par email</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="new-booking" className="flex flex-col space-y-1">
                  <span>Nouvelle réservation</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Recevez un email lorsqu'un client effectue une nouvelle réservation
                  </span>
                </Label>
                <Switch id="new-booking" />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="booking-reminder" className="flex flex-col space-y-1">
                  <span>Rappel de rendez-vous</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Recevez un rappel 24h avant chaque rendez-vous
                  </span>
                </Label>
                <Switch id="booking-reminder" />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="booking-canceled" className="flex flex-col space-y-1">
                  <span>Annulation de réservation</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Soyez notifié lorsqu'un client annule sa réservation
                  </span>
                </Label>
                <Switch id="booking-canceled" />
              </div>
            </div>
          </div>

          {/* Notifications push */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notifications push</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="push-new-message" className="flex flex-col space-y-1">
                  <span>Nouveaux messages</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Recevez une notification pour les nouveaux messages des clients
                  </span>
                </Label>
                <Switch id="push-new-message" />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="push-review" className="flex flex-col space-y-1">
                  <span>Nouveaux avis</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Soyez notifié lorsqu'un client laisse un avis
                  </span>
                </Label>
                <Switch id="push-review" />
              </div>
            </div>
          </div>

          {/* Notifications marketing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Communications marketing</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing-news" className="flex flex-col space-y-1">
                  <span>Newsletter</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Recevez nos actualités et conseils pour développer votre activité
                  </span>
                </Label>
                <Switch id="marketing-news" />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing-product" className="flex flex-col space-y-1">
                  <span>Mises à jour produit</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Soyez informé des nouvelles fonctionnalités et améliorations
                  </span>
                </Label>
                <Switch id="marketing-product" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 