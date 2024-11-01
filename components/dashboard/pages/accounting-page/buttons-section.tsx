import { Button } from "@/components/ui";
import React from "react";

const ButtonsSection = () => {
  return (
    <div className="flex flex-col w-full h-full justify-between items-center sm:flex-row">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="rounded-2xl border border-primary bg-transparent text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:border-primary"
        >
          Mes derniers devis
        </Button>
        <Button
          variant="outline"
          className="rounded-2xl border border-primary bg-transparent text-primary hover:bg-primary hover:text-white  dark:border-white dark:text-white dark:hover:border-primary"
        >
          Mes dernières factures
        </Button>
      </div>
      <div className="flex gap-2">
        <Button className="rounded-2xl">Créer un devis</Button>
        <Button className="rounded-2xl">Créer une facture</Button>
      </div>
    </div>
  );
};

export default ButtonsSection;
