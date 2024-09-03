import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import React from 'react'

const NewShortcut = () => {
  return (
    <Button
      className='rounded-xl flex items-center justify-center gap-2 ml-10'
      size="sm"
      variant="secondary"
    >
      <Plus className='h-4 w-4' />
      <p className='font-semibold text-sm'>Nouveau</p>
    </Button>
  )
}

export default NewShortcut