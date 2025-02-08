'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import FormEditPet from '../forms/form-edit-pet';
import { Pet } from '@/src/db';

interface EditPetDialogProps {
  pet: Pet;
}

export function EditPetDialog({ pet }: EditPetDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <PencilIcon className='rounded-full h-8 w-8' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Modifier {pet.name}</DialogTitle>
        </DialogHeader>
        <FormEditPet pet={pet} />
      </DialogContent>
    </Dialog>
  );
}
