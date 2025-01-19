import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import ClientSettingsForm from './client-setting-form';
import { clientSettingsSchema } from '@/app/(main)/dashboard/user/[userId]/settings/page';

const ClientDashboardSettingsComponent = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clientSettingsSchema>>;
}) => {
  return <ClientSettingsForm form={form} />;
};
export default ClientDashboardSettingsComponent;
