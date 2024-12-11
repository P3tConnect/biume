import React from "react";
import { Button } from "../ui";

const ZoneSection = () => {
  return (
    <div className="flex items-center px-5 justify-center w-full">
      <div className="flex w-full bg-background border border-border rounded-3xl overflow-hidden shadow-lg">
        <div className="flex flex-col items-start p-8 w-1/3 gap-6">
          <h2 className="text-2xl font-bold">Zone de couverture</h2>
          <p className="text-gray-200">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <Button className="bg-gray-200 hover:bg-gray-300 text-black rounded-full w-full">
            <span className="font-medium text-sm">Adresse</span>
          </Button>
          <Button variant="default" className="rounded-full w-full">
            <span>Voir plus</span>
          </Button>
        </div>
        <div className="w-2/3 bg-gray-200">
          {/* Ici, vous intégreriez votre composant de carte */}
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-xl font-bold text-gray-400">
              Carte de la zone de couverture
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneSection;
