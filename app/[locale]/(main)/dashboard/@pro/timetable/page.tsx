import React from 'react'
import { Metadata } from 'next';
import TimetableWidget from '@/components/dashboard/shortcuts/timetable-widget';
import ReservationsStatusesWidget from '@/components/dashboard/shortcuts/reservations-statuses-widget';
import IncomingReservationsWidget from '@/components/dashboard/shortcuts/incoming-reservations-widget';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Calendrier - Dashboard",
  description: "Gestion du calendrier",
};

const ProTimeTablePage = () => {
  return (
    <>
    <div className='flex flex-col gap-5'>
      <TimetableWidget />
      <div className='flex flex-col gap-5 lg:flex lg:flex-row'>
        <IncomingReservationsWidget />
        <ReservationsStatusesWidget />
      </div>
    </div>
    </>
  )
}

export default ProTimeTablePage