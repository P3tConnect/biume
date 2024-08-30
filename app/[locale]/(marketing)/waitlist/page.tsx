import { Button } from '@/components/ui/button'
import { getScopedI18n } from '@/src/locales'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const WaitListPage = async () => {
  const t = await getScopedI18n('waitlist')
  return (
    <div className='flex flex-col gap-2 h-screen w-screen items-center justify-center'>
      <div className=' text-[7rem]'>🥳</div>
      <div className='flex flex-col items-center'>
        <h3>{t('title')}</h3>
        <p>{t('description')}</p>
        <Button variant="outline" asChild className='rounded-xl mt-5'>
          <Link href="/" className='flex gap-2'>
            <ArrowLeft className='h-4 w-4' />
            <p>{t('button')}</p>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default WaitListPage