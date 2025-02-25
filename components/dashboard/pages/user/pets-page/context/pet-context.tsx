'use client';

import { createContext, useContext, useState } from 'react';

type PetContextType = {
  petId: string | null;
  setPetId: (id: string) => void;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: React.ReactNode }) => {
  const [petId, setPetId] = useState<string | null>(null);

  return (
    <PetContext.Provider value={{ petId, setPetId }}>
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
