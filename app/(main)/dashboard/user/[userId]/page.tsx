'use client';

import React from 'react';
import { useSession } from '@/src/lib/auth-client';
import StepperClient from '@/components/onboarding/components/stepper-client';
import ClientTimetableWidget from '@/components/dashboard/shortcuts/client/client-timetable-widget';
import ClientPetsWidget from '@/components/dashboard/shortcuts/client/client-pets-widget';
import ClientHistoryReservationWidget from '@/components/dashboard/shortcuts/client/client-history-reservation-widget';
import ClientObservationsWidget from '@/components/dashboard/shortcuts/client/client-observations-widget';
import { Card, CardHeader, CardTitle } from '@/components/ui';

const ClientDashboardHomePage = () => {
  const { data: session } = useSession();
  const showModal = session?.user.onBoardingComplete === false;

  return (
    <div>
      {showModal && <StepperClient open={showModal} />}

      <Card className='overflow-hidden rounded-2xl'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <span className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
              Bonjour, {session?.user.name}
            </span>
            <span className='text-3xl'>👋</span>
          </CardTitle>
          <p className='text-sm text-gray-400 mt-2'>
            Gérez vos animaux de compagnie et vos réservations en toute
            simplicité
          </p>
        </CardHeader>
      </Card>

      <div className='grid pt-4 grid-cols-2 gap-6'>
        <ClientPetsWidget />
        <ClientTimetableWidget />
        <ClientObservationsWidget />
        <ClientHistoryReservationWidget />
      </div>
    </div>
  );
};

export default ClientDashboardHomePage;
