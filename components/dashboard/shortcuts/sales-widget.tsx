import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui'
import { ArrowRight, MoreVertical } from 'lucide-react'
import React from 'react'

const SalesProWidget = () => {
  return (
    <Dialog>
      <Card className='w-full bg-white dark:bg-black rounded-2xl'>
        <CardHeader className='flex flex-row justify-between items-center'>
          <CardTitle className='text-xl'>Prestations à venir</CardTitle>
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
          <h3 className='font-bold text-4xl'>7500€</h3>
          <Badge>+ 20%</Badge>
        </CardContent>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prestations à venir</DialogTitle>
          <DialogClose />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SalesProWidget