import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, CreditCard, Bell, Users } from "lucide-react";
import { ProfileSection } from "./sections/profile-section";
import { BillingSection } from "./sections/billing-section";
import { NotificationsSection } from "./sections/notifications-section";
import { TeamSection } from "./sections/team-section";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsPageComponent = () => {
  return (
    <div className="">
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

      <div className="container px-1">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Facturation
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Équipe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>

          <TabsContent value="billing">
            <BillingSection />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsSection />
          </TabsContent>

          <TabsContent value="team">
            <TeamSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPageComponent;
