'use client';

import { Button, Card, CardHeader, CardTitle } from '@/components/ui';
import PetsPage from '@/components/dashboard/pages/user/pets-page/pets-page';
import { Plus } from 'lucide-react';
import TitlePage from '@/components/dashboard/pages/user/pets-page/components/title-page';

const ClientDashboardPetsPage = () => {
  return (
    <>
      <TitlePage />
      <PetsPage />
    </>
  );
};

export default ClientDashboardPetsPage;
