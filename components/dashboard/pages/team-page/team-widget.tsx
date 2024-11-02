import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import TeamList from "./team-list";
import TeamBudget from "./team-budget";

const TeamWidget = () => {
  return (
    <>
      <TeamBudget />
      <Card>
        <CardHeader className="flex items-start justify-start text-center font-bold text-2xl">
          Équipe
        </CardHeader>
        <CardContent>
          <TeamList />
        </CardContent>
      </Card>
    </>
  );
};

export default TeamWidget;
