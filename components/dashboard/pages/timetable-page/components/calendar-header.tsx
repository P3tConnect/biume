import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import React from 'react'

const CalendarHeader = () => {
  return (
    <Card
      className="w-full rounded-2xl border border-border"
    >
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-black dark:text-white">
          Calendrier et prochains rendez-vous
        </CardTitle>
      </CardHeader>

      <CardContent className="text-black dark:text-white">
        <div className="mt-5 flex justify-between items-center px-7">
          <div className="flex flew-row items-center gap-3">
            <div className="flex items-center justify-center gap-1">
              <div className="rounded-full bg-secondary h-2 w-2"></div>
              <p className="text-xs font-semibold text-gray-300">Terminée</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
              <div className="rounded-full bg-primary h-2 w-2"></div>
              <p className="text-xs font-semibold text-gray-300">En demande</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
              <div className="rounded-full bg-blue-500 h-2 w-2"></div>
              <p className="text-xs font-semibold text-gray-300">À payer</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
              <div className="rounded-full bg-yellow-500 h-2 w-2"></div>
              <p className="text-xs font-semibold text-gray-300">En attente de confirmaton</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
              <div className="rounded-full bg-red-500 h-2 w-2"></div>
              <p className="text-xs font-semibold text-gray-300">Annulée</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CalendarHeader