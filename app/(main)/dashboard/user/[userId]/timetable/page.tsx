import ClientDashboardTimeTableComponent from '@/components/dashboard/pages/user/timetable-page/timetable-client-page';

const ClientDashboardTimeTablePage = ({ userId }: { userId: string }) => {
  return <ClientDashboardTimeTableComponent userId={userId} />;
};

export default ClientDashboardTimeTablePage;
