import React from "react"

import { Button } from "@/components/ui"

const ButtonsSection = () => {
  return (
    <div className="flex flex-col w-full justify-between items-center sm:flex-row">
      <div className="flex gap-2">
        <Button variant="secondary" className="text-black rounded-2xl">
          Mes derniers devis
        </Button>
        <Button variant="secondary" className="text-black rounded-2xl">
          Mes dernières factures
        </Button>
      </div>
      <div className="flex gap-2">
        <Button className="rounded-2xl">Créer un devis</Button>
        <Button className="rounded-2xl">Créer une facture</Button>
      </div>
    </div>
  )
}

export default ButtonsSection
