'use client';

import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updatePetDeseases } from '@/src/actions';
import { usePetContext } from '../context/pet-context';
import { useSession } from '@/src/lib/auth-client';
import InformationsPetDeseasesForm from '../forms/informations-pet-deseases-form';

const InformationsPetDeseasesStep = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const { petId, setPetId } = usePetContext();
  const { data: session } = useSession();
  const [localPetId, setLocalPetId] = useState<string | null>(petId);

  // S'assurer d'avoir un ID valide, même si le contexte est réinitialisé
  useEffect(() => {
    if (!petId && typeof window !== 'undefined') {
      const savedPetId = localStorage.getItem('currentPetId');
      console.log(
        "[InformationsPetDeseasesStep] Récupération de l'ID depuis localStorage:",
        savedPetId
      );

      if (savedPetId) {
        console.log(
          "[InformationsPetDeseasesStep] Réinitialisation de l'ID dans le contexte"
        );
        setPetId(savedPetId);
        setLocalPetId(savedPetId);
      }
    } else if (petId) {
      setLocalPetId(petId);
    }
  }, [petId, setPetId]);

  // Log pour déboguer la valeur de petId
  console.log("[InformationsPetDeseasesStep] ID de l'animal:", petId);
  console.log(
    "[InformationsPetDeseasesStep] ID local de l'animal:",
    localPetId
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updatePetDeseases,
    onSuccess: () => {
      toast.success('Maladies enregistrées avec succès!');
      nextStep();
    },
    onError: (error) => {
      console.error('Erreur mutation:', error);
      toast.error(
        `Erreur lors de l'enregistrement des maladies: ${error.message}`
      );
    },
  });

  const handleSubmitDeseases = async (deseases: string[]) => {
    console.log(
      '[InformationsPetDeseasesStep] Soumission des maladies:',
      deseases
    );

    // Utiliser l'ID local si disponible, sinon essayer de récupérer depuis localStorage
    const effectivePetId =
      localPetId ||
      (typeof window !== 'undefined'
        ? localStorage.getItem('currentPetId')
        : null);

    console.log(
      '[InformationsPetDeseasesStep] ID effectif utilisé:',
      effectivePetId
    );

    if (!effectivePetId) {
      console.error("ID de l'animal non trouvé:", effectivePetId);
      toast.error("Erreur : ID de l'animal non trouvé");
      return;
    }

    if (!session) {
      console.error('Session non trouvée');
      toast.error('Erreur : Session non trouvée');
      return;
    }

    try {
      console.log('Appelant mutateAsync avec:', {
        deseases: deseases,
        petId: effectivePetId,
      });

      await mutateAsync({
        deseases: deseases,
        petId: effectivePetId,
      });
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  return (
    <InformationsPetDeseasesForm
      nextStep={nextStep}
      previousStep={previousStep}
      onSubmitDeseases={handleSubmitDeseases}
      isPending={isPending}
    />
  );
};

export default InformationsPetDeseasesStep;
