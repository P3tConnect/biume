'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type PetContextType = {
  petId: string | null;
  setPetId: (id: string) => void;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialiser petId depuis localStorage s'il existe
  const [petId, setPetId] = useState<string | null>(() => {
    // Vérifier si nous sommes côté client
    if (typeof window !== 'undefined') {
      const savedPetId = localStorage.getItem('currentPetId');
      console.log(
        'PetContext: Initialisation depuis localStorage:',
        savedPetId
      );
      return savedPetId;
    }
    return null;
  });

  useEffect(() => {
    console.log("PetContext: ID de l'animal mis à jour:", petId);

    // Sauvegarder l'ID dans localStorage quand il change
    if (petId) {
      localStorage.setItem('currentPetId', petId);
    }
  }, [petId]);

  const handleSetPetId = (id: string) => {
    console.log("PetContext: Définition de l'ID de l'animal:", id);

    // Sauvegarder immédiatement dans localStorage aussi
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentPetId', id);
    }

    setPetId(id);
  };

  return (
    <PetContext.Provider value={{ petId, setPetId: handleSetPetId }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
};
