import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const WaitListPage = () => {
  return (
    <div className='flex flex-col gap-2 h-screen w-screen items-center justify-center'>
      <div className=' text-[7rem]'>🥳</div>
      <div className='flex flex-col items-center'>
        <h3>Nous vous remercions de vous être inscrit sur notre liste d&apos;attente !</h3>
        <p>Restez connectés avec nous pour en savoir plus sur l&apos;avancement de la plateforme 😉</p>
        <Button variant="outline" asChild className='rounded-xl mt-5'>
          <Link href="/" className='flex gap-2'>
            <ArrowLeft className='h-4 w-4' />
            <p>Retour a l&apos;accueil</p>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default WaitListPage