import { Card, CardHeader, CardTitle } from '@/components/ui';

const ClientDashboardReservationsComponent = () => {
  return (
    <div className='space-y-6'>
      <Card className='overflow-hidden rounded-2xl mb-4'>
        <CardHeader className='border-b border-gray-100 dark:border-gray-800'>
          <div className='flex flex-row justify-between items-center gap-4'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
              <div>
                <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                  Mes réservations
                </CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Gérez vos rendez-vous et suivez vos réservations
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ClientDashboardReservationsComponent;
