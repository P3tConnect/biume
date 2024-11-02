import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from 'react'

const CalendarWeek = () => {
  return (
    <Card className='w-2/3 h-full'>
      <CardHeader>
        <CardTitle>Semaine</CardTitle>
      </CardHeader>
      <CardContent>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "",
            right: "",
          }}
        />
      </CardContent>
    </Card>
  )
}

export default CalendarWeek