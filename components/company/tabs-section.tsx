import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const TabsSection = () => {
  return (
    <div className="bg-background h-full w-3/4 rounded-3xl border border-border">
      <Tabs defaultValue="description" className="w-full p-5">
        <TabsList className="bg-background">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="rates">Tarifs</TabsTrigger>
          <TabsTrigger value="cancelPolicies">
            <p>Délais de rétractation</p>
          </TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <p>Description</p>
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
      </Tabs>
    </div>
  );
};

export default TabsSection;
