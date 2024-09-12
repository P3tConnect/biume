import React from 'react'
import { Metadata } from 'next';
import ClientsProWidget from '@/components/dashboard/shortcuts/clients-widget';
import ExpensesProWidget from '@/components/dashboard/shortcuts/expenses-widget';
import SalesProWidget from '@/components/dashboard/shortcuts/sales-widget';
import TimetableWidget from '@/components/dashboard/shortcuts/timetable-widget';
import IncomingReservationsWidget from '@/components/dashboard/shortcuts/incoming-reservations-widget';
import ReservationsStatusesWidget from '@/components/dashboard/shortcuts/reservations-statuses-widget';

export const metadata: Metadata = {
  title: 'Home - Dashboard',
  description: 'Accueil du Dashboard',
}

const DashboardHomeProPage = () => {
  return (
    <div className='w-full flex items-start justify-start h-full gap-3'>
      <div className='flex flex-col w-1/4 h-full gap-3'>
        <ClientsProWidget />
        <ExpensesProWidget />
        <SalesProWidget />
        <IncomingReservationsWidget />
      </div>
      <div className='flex flex-col w-3/4 h-full gap-3'>
        <TimetableWidget />
        <ReservationsStatusesWidget />
      </div>
    </div>
  )
}

export default DashboardHomeProPage