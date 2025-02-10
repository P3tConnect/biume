"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { orgId } = useParams();
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop() || "profile";

  return (
    <div>
      <Card className="overflow-hidden rounded-2xl mb-4">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Paramètres de l'organisation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Gérez les paramètres et les préférences de votre organisation
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="px-1">
        <Tabs
          defaultValue="profile"
          value={currentTab}
          className="space-y-4"
          onValueChange={(value) => {
            router.push(`/dashboard/organization/${orgId}/settings/${value}`);
          }}
        >
          <TabsList>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
          </TabsList>
          <>{children}</>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsLayout;
