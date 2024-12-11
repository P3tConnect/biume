import { Calendar, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import React, { useEffect, useState } from 'react'

const CalendarMonth = () => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-lg font-bold text-gray-600 dark:text-gray-200'>Mois</CardTitle>
      </CardHeader>
      <CardContent className='w-full flex flex-col justify-center items-center p-1'>
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={setCurrentDate}
        />
      </CardContent>
    </Card>
  )
}

export default CalendarMonth