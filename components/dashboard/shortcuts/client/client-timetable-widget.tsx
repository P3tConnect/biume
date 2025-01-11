'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Calendar,
  Card,
  CardContent,
  Skeleton,
} from '@/components/ui';
import { useState } from 'react';

const ClientTimetableWidget = () => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  return (
    <Card className='h-full rounded-2xl border border-border'>
      <CardContent className='pt-4'>
        <Calendar
          mode='single'
          selected={currentDate}
          onSelect={setCurrentDate}
          today={new Date()}
          defaultMonth={new Date()}
          className='flex h-full w-full'
          classNames={{
            months:
              'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
            month: 'space-y-4 w-full flex flex-col',
            table: 'w-full h-full border-collapse space-y-1',
            head_row: 'h-12',
            row: 'w-full mt-2',
            cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          }}
        />
      </CardContent>
      <div className='divide-y border-t'>
        <div>
          <Card className='border-none'>
            <CardContent className='p-4 rounded-2xl'>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='size-10'>
                      <AvatarImage src='https://randomuser.me/api/portraits/men/42.jpg' />
                      <AvatarFallback>DE</AvatarFallback>
                    </Avatar>
                    <div className='flex-grow'>
                      <p className='font-medium leading-none'>Consultation</p>
                      <p className='text-sm text-muted-foreground mt-1'>
                        Dr. Jenny Akwar
                      </p>
                      <p className='text-sm text-muted-foreground mt-1'>
                        at 05:00-06:00 PM
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 pt-2'>
                    <Avatar className='size-10'>
                      <AvatarImage src='/images/pets/persian-cat.jpg' />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                    <div className='flex-grow'>
                      <p className='font-medium leading-none'>Luna</p>
                      <p className='text-sm text-muted-foreground mt-1'>
                        Chat Persan • 1 ans
                      </p>
                      <p className='text-sm text-muted-foreground mt-1'>
                        Vaccin
                      </p>
                    </div>
                  </div>
                </div>
                <div className='rounded-lg bg-secondary/50 px-3 py-1 text-end text-xs font-medium text-green-700 dark:text-secondary'>
                  Validé
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className='border-none'>
            <CardContent className='p-4 rounded-2xl'>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='size-10'>
                      <AvatarImage src='https://randomuser.me/api/portraits/men/55.jpg' />
                      <AvatarFallback>DE</AvatarFallback>
                    </Avatar>
                    <div className='flex-grow'>
                      <p className='font-medium leading-none'>Consultation</p>
                      <p className='text-sm text-muted-foreground mt-1'>
                        Dr. Halbert Duort
                      </p>
                      <p className='text-sm text-muted-foreground mt-1'>
                        at 05:00-06:00 PM
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 pt-2'>
                    <Avatar className='size-10'>
                      <AvatarImage src='/images/pets/persian-cat.jpg' />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div className='flex-grow'>
                      <p className='font-medium leading-none'>Max</p>
                      <p className='text-sm text-muted-foreground mt-1'>
                        Chien - Berger Allemand • 5 ans
                      </p>
                      <p className='text-sm text-muted-foreground mt-1'>
                        Perte d&apos;appétit depuis 3 jours
                      </p>
                    </div>
                  </div>
                </div>
                <div className='rounded-lg bg-orange-800/20 px-3 py-1 text-end text-xs font-medium text-red-400'>
                  Annulé
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default ClientTimetableWidget;
