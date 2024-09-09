import { Card, CardContent, CardTitle, CardHeader, Button, Badge, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui'
import { ArrowRight, MoreVertical } from 'lucide-react'
import React from 'react'

const ExpensesProWidget = () => {
  return (
    <Dialog>
      <Card className='w-full bg-white dark:bg-black rounded-2xl'>
        <CardHeader className='flex flex-row justify-between items-center'>
          <CardTitle className='text-xl'>Dernières dépenses</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='rounded-full h-7 w-7 p-0'>
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className='font-bold'>Options</DropdownMenuLabel>
              <DropdownMenuItem>Par jour</DropdownMenuItem>
              <DropdownMenuItem>Par mois</DropdownMenuItem>
              <DropdownMenuItem>Par année</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className='flex justify-between items-center'>
                  <p className='font-semibold'>Voir plus</p>
                  <ArrowRight size={14} />
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className='flex justify-start items-center gap-5'>
          <h3 className='font-bold text-4xl'>2500€</h3>
          <Badge variant="secondary">-10.5%</Badge>
        </CardContent>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dernières dépenses</DialogTitle>
          <DialogClose />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ExpensesProWidget