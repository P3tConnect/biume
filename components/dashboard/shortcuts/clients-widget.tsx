import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { MoreVertical } from 'lucide-react'
import React from 'react'

const ClientsProWidget = () => {
  return (
    <Card className='w-full bg-white dark:bg-black rounded-2xl'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className='text-xl'>Total des clients ce mois</CardTitle>
        <Button variant="outline" className='rounded-full h-7 w-7 p-0'>
          <MoreVertical size={18} />
        </Button>
      </CardHeader>
      <CardContent className='flex justify-start items-center gap-5'>
        <h3 className='font-bold text-4xl text-secondary'>450</h3>
        <Badge>
          + 130%
        </Badge>
      </CardContent>
    </Card>
  )
}

export default ClientsProWidget