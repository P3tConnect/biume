import React from 'react';
import ClientTimetableWidget from '@/components/dashboard/shortcuts/client/client-timetable-widget';
import ClientPetsWidget from '@/components/dashboard/shortcuts/client/client-pets-widget';
import ClientHistoryReservationWidget from '@/components/dashboard/shortcuts/client/client-history-reservation-widget';
import ClientObservationsWidget from '@/components/dashboard/shortcuts/client/client-observations-widget';
import OnboardingModal from '@/components/dashboard/layout/onboarding-client';
import TitleDashboardClient from '@/components/dashboard/layout/title-dashboard-client';

const ClientDashboardHomePage = () => {
  return (
    <div>
      <OnboardingModal />
      <TitleDashboardClient />

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
