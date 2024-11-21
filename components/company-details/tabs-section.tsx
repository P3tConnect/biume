import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader } from "../ui";

const TabsSection = () => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <Card className="rounded-3xl h-full w-full">
        <CardHeader className="flex flex-row justify-start items-center">
          <TabsList className="bg-background">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="rates">Tarifs</TabsTrigger>
            <TabsTrigger value="cancelPolicies">
              <p>Délais de rétractation</p>
            </TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="description">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </TabsContent>
          <TabsContent value="rates">
            <p>Tarifs</p>
          </TabsContent>
          <TabsContent value="cancelPolicies">
            <p>Délais de rétractation</p>
          </TabsContent>
          <TabsContent value="services">
            <p>Services</p>
            <p>Services</p>
            <p>Services</p>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default TabsSection;
