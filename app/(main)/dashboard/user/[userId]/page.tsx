'use client';

import React from 'react';
import { useSession } from '@/src/lib/auth-client';
import StepperClient from '@/components/onboarding/components/stepper-client';
import { Card, CardHeader, CardTitle } from '@/components/ui';
import ClientQuickActionsWidget from '@/components/dashboard/shortcuts/client/client-quick-actions-widget';
import ClientUpcomingAppointmentsWidget from '@/components/dashboard/shortcuts/client/client-upcoming-appointments-widget';
import ClientPetHealthWidget from '@/components/dashboard/shortcuts/client/client-pet-health-widget';
import ClientPetsWidgetSimple from '@/components/dashboard/shortcuts/client/client-pets-widget-simple';
import ClientExpensesWidget from '@/components/dashboard/shortcuts/client/client-expenses-widget';

const ClientDashboardHomePage = () => {
  const { data: session } = useSession();
  const showModal = session?.user.onBoardingComplete === false;

  return (
    <div className='space-y-4'>
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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 space-y-4'>
          <ClientQuickActionsWidget />
          <ClientUpcomingAppointmentsWidget />
          <ClientPetHealthWidget />
        </div>

        <div className='space-y-4'>
          <ClientPetsWidgetSimple />
          <ClientExpensesWidget />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardHomePage;
