import { Calendar, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import React, { useState } from 'react'

const CalendarMonth = () => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  return (
    <Card className='w-full h-full'>
      <CardHeader>
        <CardTitle>Mois</CardTitle>
      </CardHeader>
      <CardContent>
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