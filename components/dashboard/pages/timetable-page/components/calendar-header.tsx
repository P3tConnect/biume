import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { MoreVertical } from 'lucide-react'
import React from 'react'

const CalendarHeader = () => {
  return (
    <Card
      className="w-full rounded-2xl"
    >
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <CardTitle className="text-2xl text-accent-foreground">
          Calendrier et prochains rendez-vous
        </CardTitle>
        <div className='flex flex-row items-center gap-3'>
          <div className="flex justify-between items-center px-3">
            <div className="flex flew-row items-center gap-3">
              <div className="flex items-center justify-center gap-1">
                <div className="rounded-full bg-secondary h-2 w-2"></div>
                <p className="text-xs font-semibold dark:text-gray-300 text-gray-600">Terminée</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <div className="rounded-full bg-primary h-2 w-2"></div>
                <p className="text-xs font-semibold dark:text-gray-300 text-gray-600">En demande</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <div className="rounded-full bg-blue-500 h-2 w-2"></div>
                <p className="text-xs font-semibold dark:text-gray-300 text-gray-600">À payer</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <div className="rounded-full bg-yellow-500 h-2 w-2"></div>
                <p className="text-xs font-semibold dark:text-gray-300 text-gray-600">En attente de confirmaton</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <div className="rounded-full bg-red-500 h-2 w-2"></div>
                <p className="text-xs font-semibold dark:text-gray-300 text-gray-600">Annulée</p>
              </div>
            </div>
          </div>
          <Button variant="outline" size="icon" className='h-7 w-7 rounded-full bg-card'>
            <MoreVertical className='' />
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}

export default CalendarHeader