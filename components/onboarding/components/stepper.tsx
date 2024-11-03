'use client';

import { Button, Card, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

const Stepper = () => {
  return (
    <Card className='rounded-2xl border border-border w-1/3 h-full'>
      <CardHeader className='flex flex-col items-start justify-start gap-2'>
        <Button className='flex items-center justify-start gap-2 rounded-xl w-fit' variant="ghost">
          <ArrowLeft className='h-4 w-4' />
          <p>Quitter</p>
        </Button>
        <div className='flex flex-col gap-1'>
          <CardTitle>Informations</CardTitle>
          <CardDescription>Ceci est la description de l'étape en cours de création d'une entreprise</CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}

export default Stepper