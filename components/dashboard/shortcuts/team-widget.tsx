import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import TeamList from "../pages/team-page/team-list";
import TeamBudget from "../pages/team-page/team-budget";

const TeamWidget = () => {
  return (
    <>
      <TeamBudget />
      <Card>
        <CardHeader className="flex items-start justify-start text-center font-bold text-2xl">
          Équipe
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-end justify-end text-center gap-2">
            <Button
              variant="outline"
              size="sm"
            >
              <Search size={15} className="text-secondary dark:text-white" />
            </Button>
            <Button
              variant="outline"
              className="border border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-white dark:text-white dark:border dark:border-secondary dark:hover:border-secondary"
              size="sm"
            >
              <div className="flex flex-row gap-2 items-center text-center">
                <SlidersHorizontal size={15} />
                Filtrer
              </div>
            </Button>
            <Button
              variant="secondary"
              className="dark:text-white dark:border dark:border-secondary dark:hover:border-secondary"
              size="sm"
            >
              <div className="flex flex-row gap-2 items-center text-center">
                <Plus size={15} />
                Ajouter
              </div>
            </Button>
          </div>
          <TeamList />
        </CardContent>
      </Card>
    </>
  );
};

export default TeamWidget;
