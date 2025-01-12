import DashboardClientLayout from '@/components/dashboard/layout/dashboard-client-layout';
import { ReactNode } from 'react'

const ClientDashboardLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userId: string; locale: string }>;
}) => {
  const { userId } = await params;
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
};

export default ClientDashboardLayout;
