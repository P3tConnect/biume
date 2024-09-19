import IncomingReservationsWidget from '@/components/dashboard/shortcuts/incoming-reservations-widget'
import ReservationsStatusesWidget from '@/components/dashboard/shortcuts/reservations-statuses-widget'
import TimetableWidget from '@/components/dashboard/shortcuts/timetable-widget'
import React from 'react'

const DashboardCompanyTimetablePage = () => {
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

export default DashboardCompanyTimetablePage