'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Button,
  Input,
} from '@/components/ui';
import { Calendar, Filter, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

const ClientDashboardReservationsComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Données de test - à remplacer par les vraies données
  const reservations = [
    {
      id: '1',
      serviceName: 'Toilettage complet',
      companyName: 'Pawfect Grooming',
      location: '123 Rue des Animaux, Paris',
      date: '2024-03-20',
      time: '14:30',
      status: 'confirmed',
      petName: 'Max',
      price: '65€',
    },
    {
      id: '2',
      serviceName: 'Consultation vétérinaire',
      companyName: 'Clinique Véto Plus',
      location: '45 Avenue des Chats, Lyon',
      date: '2024-03-25',
      time: '10:00',
      status: 'pending',
      petName: 'Luna',
      price: '50€',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className='bg-green-500'>Confirmé</Badge>;
      case 'pending':
        return <Badge className='bg-yellow-500'>En attente</Badge>;
      case 'cancelled':
        return <Badge className='bg-red-500'>Annulé</Badge>;
      default:
        return <Badge className='bg-gray-500'>Inconnu</Badge>;
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.serviceName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reservation.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Mes Réservations</h1>
        <p className='text-muted-foreground'>
          Gérez vos rendez-vous et suivez vos réservations
        </p>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Rechercher une réservation...'
            className='pl-8'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex gap-2'>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-[180px]'>
              <Filter className='mr-2 h-4 w-4' />
              <SelectValue placeholder='Filtrer par statut' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tous les statuts</SelectItem>
              <SelectItem value='confirmed'>Confirmé</SelectItem>
              <SelectItem value='pending'>En attente</SelectItem>
              <SelectItem value='cancelled'>Annulé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id} className='flex flex-col'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl'>
                  {reservation.serviceName}
                </CardTitle>
                {getStatusBadge(reservation.status)}
              </div>
              <CardDescription className='text-base font-medium'>
                {reservation.companyName}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-1'>
              <div className='space-y-3'>
                <div className='flex items-center gap-2 text-sm'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    {new Date(reservation.date).toLocaleDateString('fr-FR')} à{' '}
                    {reservation.time}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <MapPin className='h-4 w-4' />
                  <span>{reservation.location}</span>
                </div>
                <div className='mt-4'>
                  <Badge variant='outline'>🐾 {reservation.petName}</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t pt-4'>
              <span className='text-lg font-semibold'>{reservation.price}</span>
              <div className='flex gap-2'>
                <Button variant='outline'>Modifier</Button>
                <Button variant='destructive'>Annuler</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboardReservationsComponent;
