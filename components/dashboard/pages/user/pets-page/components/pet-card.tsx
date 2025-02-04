'use client';

import { Card, CardContent, Button, Skeleton, Badge } from '@/components/ui';
import { cn } from '@/src/lib';
import { PawPrint, Pencil, Trash2, Calendar, Weight } from 'lucide-react';
import { useState } from 'react';

interface PetCardProps {
  pet: {
    id: string;
    name: string;
    image?: string | null;
    type: string;
    breed?: string | null;
    birthDate?: string | null;
    weight?: number | null;
    gender?: 'male' | 'female' | null;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const monthDiff = today.getMonth() - birth.getMonth();
    let age = today.getFullYear() - birth.getFullYear();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (values: any) => {
    if (onEdit) {
      onEdit(pet.id);
    }
  };

  return (
    <>
      <Card className='group overflow-hidden'>
        <div className='relative h-[280px]'>
          <div className='absolute inset-0'>
            {pet.image ? (
              <>
                {isImageLoading && <Skeleton className='h-full w-full' />}
                <img
                  src={pet.image}
                  alt={pet.name}
                  className={cn(
                    'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
                    isImageLoading && 'invisible'
                  )}
                  onLoad={() => setIsImageLoading(false)}
                />
              </>
            ) : (
              <div className='flex h-full items-center justify-center bg-muted'>
                <PawPrint className='h-24 w-24 text-muted-foreground/20' />
              </div>
            )}
          </div>

          {/* Overlay avec dégradé */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />

          {/* Boutons d'action */}
          <div className='absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            {onEdit && (
              <Button
                size='icon'
                variant='secondary'
                className='h-8 w-8 rounded-full'
                onClick={handleEdit}
              >
                <Pencil className='h-4 w-4' />
              </Button>
            )}
            {onDelete && (
              <Button
                size='icon'
                variant='destructive'
                className='h-8 w-8 rounded-full'
                onClick={() => onDelete(pet.id)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            )}
          </div>

          {/* Informations principales */}
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <div className='mb-4 space-y-1'>
              <div className='flex items-center gap-2'>
                <Badge variant='secondary' className='bg-white/10 text-white'>
                  {pet.type}
                </Badge>
                {pet.gender && (
                  <div
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-base font-semibold',
                      pet.gender === 'female'
                        ? 'text-pink-400'
                        : 'text-blue-400'
                    )}
                  >
                    {pet.gender === 'female' ? '♀' : '♂'}
                  </div>
                )}
              </div>
              <h3 className='text-2xl font-bold text-white'>{pet.name}</h3>
              {pet.breed && (
                <p className='text-sm text-white/80'>{pet.breed}</p>
              )}
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 gap-3'>
              {pet.birthDate && (
                <div className='flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-1.5 text-sm text-white backdrop-blur-sm'>
                  <Calendar className='h-4 w-4' />
                  <span>{getAge(pet.birthDate)} ans</span>
                </div>
              )}
              {pet.weight && (
                <div className='flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-1.5 text-sm text-white backdrop-blur-sm'>
                  <Weight className='h-4 w-4' />
                  <span>{pet.weight} kg</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
