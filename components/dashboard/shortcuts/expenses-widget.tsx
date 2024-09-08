import { Card, CardContent, CardTitle, CardHeader, Button, Badge } from '@/components/ui'
import { MoreVertical } from 'lucide-react'
import React from 'react'

const ExpensesProWidget = () => {
  return (
    <Card className='w-full bg-white dark:bg-black rounded-2xl'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className='text-xl'>Dernières dépenses</CardTitle>
        <Button variant="outline" className='rounded-full h-7 w-7 p-0'>
          <MoreVertical size={18} />
        </Button>
      </CardHeader>
      <CardContent className='flex justify-start items-center gap-5'>
        <h3 className='font-bold text-4xl'>2500€</h3>
        <Badge variant="secondary">-10.5%</Badge>
      </CardContent>
    </Card>
  )
}

export default ExpensesProWidget