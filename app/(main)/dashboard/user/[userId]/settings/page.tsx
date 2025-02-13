import { Card, CardHeader, CardTitle } from '@/components/ui';
import ClientSettingsForm from '@/components/dashboard/pages/user/settings-page/client-setting-form';

import React from 'react';

const ClientDashboardSettingsPage = () => {
  return (
    <>
      <Card className='overflow-hidden rounded-2xl mb-4'>
        <CardHeader className='border-b border-gray-100 dark:border-gray-800'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
              <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                Paramètres de l&apos;utilisateur
              </CardTitle>
              <p className='text-sm text-muted-foreground'>
                Gérez les paramètres et les préférences de votre profil
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
      <ClientSettingsForm />
    </>
  );
};

export default ClientDashboardSettingsPage;
