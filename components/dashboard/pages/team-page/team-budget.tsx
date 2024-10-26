import { Button, Card, CardContent } from "@/components/ui";
import React from "react";

const TeamBudget = () => {
  return (
    <Card className="bg-secondary text-white w-full mb-5">
      <CardContent>
        <div className="flex flex-row justify-between items-center content-center text-center mt-4">
          <div className="flex flex-col items-start justify-start text-start content-start">
            <h1 className="text-2xl font-bold">Forfait Premium</h1>
            <p className="text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi,
              quas dolor accusamus tenetur, officiis fugit perspiciatis.
            </p>
          </div>
          <div className="flex flex-row items-end justify-end text-end content-end gap-10">
            <Button
              variant="default"
              className="bg-white text-black hover:bg-white"
            >
              Prendre ce forfait
            </Button>
            <div className="flex flex-row items-center justify-center content-center text-center">
              <h1 className="text-2xl font-bold">XX€</h1>
              <p className="text-lg">/mois</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamBudget;
