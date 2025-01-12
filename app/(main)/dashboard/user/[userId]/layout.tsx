import DashboardClientLayout from '@/components/dashboard/layout/dashboard-client-layout';
import { currentUser } from '@/src/lib';
import { ReactNode } from 'react';

const ClientDashboardLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userId: string; locale: string }>;
}) => {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
};

export default ClientDashboardLayout;
