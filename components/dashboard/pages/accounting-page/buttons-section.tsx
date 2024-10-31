import { Button } from "@/components/ui";
import React from "react";

const ButtonsSection = () => {
  return (
    <div className="flex flex-col w-full h-full justify-between items-center sm:flex-row">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="border border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-white dark:border-white dark:text-white dark:hover:border-secondary"
        >
          Mes derniers devis
        </Button>
        <Button
          variant="outline"
          className="border border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-white  dark:border-white dark:text-white dark:hover:border-secondary"
        >
          Mes dernières factures
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary">Créer un devis</Button>
        <Button variant="secondary">Créer une facture</Button>
      </div>
    </div>
  );
};

export default ButtonsSection;
