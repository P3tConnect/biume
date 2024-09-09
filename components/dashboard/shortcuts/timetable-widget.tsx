"use client";

import { Button, Card, CardContent, CardHeader, CardTitle, Select } from '@/components/ui'
import { ArrowLeft, ArrowRight, MoreVertical } from 'lucide-react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridDayPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useRef, useState } from 'react'
import { toast } from 'sonner';
import { logger } from '@/src/lib';

const TimetableWidget = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [viewMode, setViewMode] = useState('');
  

  const handleChangeView = (view: string) => {
    const calendar = calendarRef.current;
    if (calendar) {
      const api = calendar.getApi();

      api.changeView(view);
    }
  };

  const renderMonth = () => {
    const calendar = calendarRef.current;
    if (calendar) {
      const api = calendar.getApi();

      return {
        month: api.getDate().getMonth(),
        year: api.getDate().getFullYear(),
      }
    }
  }

  const handleNext = () => {
    const calendar = calendarRef.current;
    if (calendar) {
      const api = calendar.getApi();

      api.next();
    } else {
      logger.error("Calendar ref not found", calendar)
      toast.error("Erreur lors de la navigation, veuillez réessayer plus tard");
    }
  };

  const handlePrev = () => {
    const calendar = calendarRef.current;
    if (calendar) {
      const api = calendar.getApi();

      api.prev();
    } else {
      logger.error("Calendar ref not found", calendar)
      toast.error("Erreur lors de la navigation, veuillez réessayer plus tard");
    }
  };

  return (
    <Card className='w-full bg-white h-1/2 dark:bg-black rounded-2xl'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className='text-xl'>Calendrier et prochains rendez-vous</CardTitle>
        <div className='flex justify-center items-center gap-2'>
          <p>{renderMonth()?.month && renderMonth()?.year ? `${renderMonth()?.month}/${renderMonth()?.year}` : ""}</p>
          <Select onValueChange={(value) => {}}>

          </Select>
          <Button variant="outline" onClick={handlePrev} className='rounded-full h-7 w-7 p-0'>
            <ArrowLeft size={18} />
          </Button>
          <Button variant="outline" onClick={handleNext} className='rounded-full h-7 w-7 p-0'>
            <ArrowRight size={18} />
          </Button>
          <Button variant="outline" className='rounded-full h-7 w-7 p-0'>
            <MoreVertical size={18} />
          </Button>
        </div>
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