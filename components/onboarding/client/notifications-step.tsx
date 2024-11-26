"use client";

import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@/components/ui";
import NotificationForm from "../components/client/notification-form";

const ClientNotificationStep = () => {
  return (
    <Card className="h-full rounded-2xl">
      <CardHeader>
        <CardTitle>Choisissez votre type de notification</CardTitle>
        <CardDescription>
          Choisissez votre type de notification pour recevoir les alertes liées
          à vos rendez-vous / activités ou autres informations complémentaires.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ClientNotificationStep;
