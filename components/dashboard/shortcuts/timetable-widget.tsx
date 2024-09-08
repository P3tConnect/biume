"use client";

import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { MoreVertical } from 'lucide-react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridDayPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useRef } from 'react'

const TimetableWidget = () => {
  const calendarRef = useRef<FullCalendar>(null);

  const handleChangeView = (view: string) => {
    const calendar = calendarRef.current;
    if (calendar) {
      const api = calendar.getApi();

      api.changeView(view);
    }
  };

  return (
    <Card className='w-full bg-white h-1/2 dark:bg-black rounded-2xl'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className='text-xl'>Calendrier et prochains rendez-vous</CardTitle>
        <Button variant="outline" className='rounded-full h-7 w-7 p-0'>
          <MoreVertical size={18} />
        </Button>
      </CardHeader>
      <CardContent>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridDayPlugin, multiMonthPlugin]}
          height={325}
          contentHeight={325}
          headerToolbar={{
            left: '',
            right: '',
          }}
        />
      </CardContent>
    </Card>
  )
}

export default TimetableWidget