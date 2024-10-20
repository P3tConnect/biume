import { Button } from '@/components/ui'
import React from 'react'

const ButtonsSection = () => {
  return (
    <div className='w-full h-full flex justify-between items-center'>
      <div className='flex gap-5'>
        <Button variant="outline">
          Mes derniers devis
        </Button>
        <Button variant="outline">
          Mes dernières factures
        </Button>
      </div>
      <div className='flex gap-5'>
        <Button>
          Créer un devis
        </Button>
        <Button>
          Créer une facture
        </Button>
      </div>
    </div>
  )
}

export default ButtonsSection