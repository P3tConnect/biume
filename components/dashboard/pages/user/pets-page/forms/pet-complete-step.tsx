'use client';

import { Button } from '@/components/ui';
import React from 'react';
import { useRouter } from 'next/navigation';

interface PetCompleteStepProps {
  nextStep: () => void;
  onComplete?: () => void;
}

const PetCompleteStep = ({ nextStep, onComplete }: PetCompleteStepProps) => {
  const router = useRouter();

  const handleViewPets = () => {
    console.log('Bouton Voir mes animaux cliqué');
    console.log('onComplete existe:', !!onComplete);

    // Appeler la fonction onComplete si elle existe
    if (onComplete) {
      console.log('Appel de onComplete');
      onComplete();
    } else {
      console.log(
        "onComplete n'existe pas, utilisation de la méthode alternative"
      );
      // Actualiser la page pour voir le nouveau pet
      router.refresh();
      // Redirige l'utilisateur vers la page actuelle (ce qui forcera un refresh)
      window.location.href = window.location.pathname;
    }
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
      <p className='text-8xl'>🥳</p>
      <div className='flex flex-col text-center'>
        <h1 className='text-2xl font-bold'>
          Bravo ! Vous avez terminé le processus de création de votre animal !
        </h1>
        <p className='text-muted-foreground text-sm'>
          Vous pouvez maintenant prendre rendez-vous avec un professionnel
        </p>
        <p className='text-muted-foreground text-sm'>
          N&apos;hésitez pas à nous contacter si vous avez des questions
        </p>
      </div>
      <Button variant='default' onClick={handleViewPets}>
        Voir mes animaux
      </Button>
    </div>
  );
};

export default PetCompleteStep;
