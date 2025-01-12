'use client';

import React from 'react';
import { useSession } from '@/src/lib/auth-client';
import StepperClient from '@/components/onboarding/components/stepper-client';
import ClientTimetableWidget from '@/components/dashboard/shortcuts/client/client-timetable-widget';
import ClientPetsWidget from '@/components/dashboard/shortcuts/client/client-pets-widget';
import ClientHistoryReservationWidget from '@/components/dashboard/shortcuts/client/client-history-reservation-widget';
import ClientObservationsWidget from '@/components/dashboard/shortcuts/client/client-observations-widget';

const ClientDashboardHomePage = () => {
  const { data: session } = useSession();

  const showModal = session?.user.onBoardingComplete === false;

  return (
    <>
      {showModal && <StepperClient open={showModal} />}
      <div className='flex flex-col gap-4'>
        <div className='grid gap-4 lg:grid-cols-12'>
          <div className='lg:col-span-6'>
            <ClientTimetableWidget />
          </div>
          <div className='lg:col-span-6'>
            <ClientPetsWidget />
          </div>
          <div className='lg:col-span-6'>
            <ClientHistoryReservationWidget />
          </div>
          <div className='lg:col-span-6'>
            <ClientObservationsWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboardHomePage;
