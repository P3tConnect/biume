'use client';

import React from 'react';
import { useSession } from '@/src/lib/auth-client';
import StepperClient from '@/components/onboarding/components/stepper-client';
import ClientTimetableWidget from '@/components/dashboard/shortcuts/client/client-timetable-widget';

const ClientDashboardHomePage = () => {
  const { data: session } = useSession();

  const showModal = session?.user.onBoardingComplete === false;

  return (
    <>
      {showModal && <StepperClient open={showModal} />}
      <div className='flex flex-col gap-4'>
        <div className='grid gap-4 lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <ClientTimetableWidget />
          </div>
          <div className='lg:col-span-4'>{/* <UpcomingAppointments /> */}</div>
          <div className='lg:col-span-4 flex flex-col gap-4'>
            {/* <TeamMembersCard />
            <AverageDailySalesCard /> */}
          </div>
          <div className='lg:col-span-4'>
            {/* <ClientWithLastProcedure /> */}
          </div>
          <div className='lg:col-span-4'>{/* <ProgressionWidget /> */}</div>
          <div className='lg:col-span-4'>{/* <ObservationsWidget /> */}</div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboardHomePage;
