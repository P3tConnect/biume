'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type PetContextType = {
  petId: string | null;
  setPetId: (id: string) => void;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: React.ReactNode }) => {
  const [petId, setPetId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const savedPetId = localStorage.getItem('currentPetId');

      // Validation de l'ID
      if (savedPetId && savedPetId.trim() !== '') {
        return savedPetId;
      }

      // Si l'ID n'est pas valide, on le supprime du localStorage
      if (savedPetId) {
        localStorage.removeItem('currentPetId');
      }
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (petId && petId.trim() !== '') {
        localStorage.setItem('currentPetId', petId);
      } else {
        // Si l'ID n'est pas valide, on le supprime du localStorage
        localStorage.removeItem('currentPetId');
      }
    }
  }, [petId]);

  const handleSetPetId = (id: string) => {
    if (!id || id.trim() === '') {
      return;
    }

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
