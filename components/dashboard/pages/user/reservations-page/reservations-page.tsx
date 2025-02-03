'use client';

import { Card, CardHeader, CardTitle, Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import ReservationCard from './components/reservation-card';

const mockReservations = [
  {
    id: '1',
    petName: 'Luna',
    sitterName: 'Marie Dupont',
    startDate: '2024-04-01',
    endDate: '2024-04-05',
    location: 'Paris 11ème',
    status: 'confirmed' as const,
    price: 25,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
    sitterImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    metier: 'Osteopathe',
  },
  {
    id: '2',
    petName: 'Max',
    sitterName: 'Jean Martin',
    startDate: '2024-04-15',
    endDate: '2024-04-20',
    location: 'Paris 15ème',
    status: 'pending' as const,
    price: 30,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
    sitterImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    metier: 'Vétérinaire',
  },
  {
    id: '3',
    petName: 'Rocky',
    sitterName: 'Sophie Bernard',
    startDate: '2024-03-10',
    endDate: '2024-03-15',
    location: 'Paris 9ème',
    status: 'completed' as const,
    price: 28,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
    sitterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    metier: 'Osteopathe',
  },
  {
    id: '4',
    petName: 'Milo',
    sitterName: 'Pierre Dubois',
    startDate: '2024-05-01',
    endDate: '2024-05-03',
    location: 'Paris 16ème',
    status: 'cancelled' as const,
    price: 35,
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2',
    sitterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    metier: 'Toiletteur',
  },
];

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
            <Button className='flex items-center gap-2'>
              <Plus className='size-4' />
              Nouvelle réservation
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {mockReservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onEdit={(id) => console.log('Edit', id)}
            onDelete={(id) => console.log('Delete', id)}
          />
        ))}
      </div>

      {mockReservations.length === 0 && (
        <div className='flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center'>
          <div className='rounded-full bg-primary/10 p-3'>
            <Plus className='size-6 text-primary' />
          </div>
          <div className='max-w-md space-y-1'>
            <h3 className='text-lg font-semibold'>Aucune réservation</h3>
            <p className='text-sm text-muted-foreground'>
              Vous n'avez pas encore de réservation. Commencez par en créer une
              !
            </p>
          </div>
          <Button className='flex items-center gap-2'>
            <Plus className='size-4' />
            Nouvelle réservation
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientDashboardReservationsComponent;
