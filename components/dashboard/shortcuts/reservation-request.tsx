import React from 'react';
import { Button, Card, CardContent, CardHeader, Checkbox, Input } from '@/components/ui';
import { Search } from 'lucide-react'; // Ensure you have lucide-react for icons

const ReservationRequestWidget = () => {
  const clients = [
    'Alice Smith',
    'John Doe',
    'Emily Johnson',
    'Michael Brown',
    'Sophia Davis',
    'James Wilson',
    'Olivia Taylor',
    'William Martinez',
    'Isabella Anderson',
    'Ethan Thomas',
    'Mia Garcia',
    'Benjamin Harris',
    'Charlotte Clark',
    'Daniel Lewis',
  ];

  const maxVisibleClients = 10;

  return (
    <Card className="w-full h-full bg-background border flex flex-col rounded-3xl">
      <CardHeader className='flex flex-wrap w-full text-start justify-start'>
        <h1 className='font-bold text-2xl'>Demande de réservation en cours</h1>
      </CardHeader>
      <CardContent>
        <div className='flex flex-row justify-end items-end text-end gap-3'>
          <Button variant="outline" className='border border-secondary bg-transparent text-secondary' size="sm">
            <Search size={15} className='text-secondary dark:text-white' />
          </Button>
          <Button variant="secondary" size="sm">Voir tous</Button>
        </div>
        <h1 className='border-b-[1px] border-b-gray-600 w-full'>Client</h1>
        <div className='mt-3'>
          <ul className="space-y-2">
            {clients.slice(0, maxVisibleClients).map((client, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox id={`client-${index}`} className='data-[state=checked]:bg-secondary border border-black dark:border-white' />
                <label htmlFor={`client-${index}`} className="text-sm">
                  {client}
                </label>
              </li>
            ))}
          </ul>
          {clients.length > maxVisibleClients && (
            <p className="flex text-center items-center content-center justify-center">...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationRequestWidget;
