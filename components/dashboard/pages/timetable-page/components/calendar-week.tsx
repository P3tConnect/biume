"use client";

import { Card, CardContent, CardHeader, CardTitle, useSidebar } from '@/components/ui'
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useRef } from 'react'
import { cn } from '@/src/lib';

const CalendarWeek = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { state } = useSidebar();

  // !!! That useEffect is here to update the calendar size when the container changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.updateSize(); // Adjusts FullCalendar's size when the container changes
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current); // Observing the container
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // !!!

  return (
    <Card ref={containerRef} className={cn('transition-transform duration-200',
      state === "collapsed" ? "w-3/4" : "w-2/3"
    )}>
      <CardHeader>
        <CardTitle className='text-lg font-bold text-gray-600 dark:text-gray-200'>Semaine</CardTitle>
      </CardHeader>
      <CardContent>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          viewHeight={660}
          height={660}
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