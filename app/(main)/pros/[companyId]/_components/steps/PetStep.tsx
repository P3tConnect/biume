import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { Dog, Cat, Bird, PawPrint } from "lucide-react";
import Image from "next/image";
import { Pet } from "@/src/db";

interface PetStepProps {
  userPets: Pet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
}

export function PetStep({
  userPets,
  selectedPetId,
  onSelectPet,
}: PetStepProps) {
  const getPetIcon = (type: string) => {
    switch (type) {
      case "Dog":
        return <Dog className="h-5 w-5" />;
      case "Cat":
        return <Cat className="h-5 w-5" />;
      case "Bird":
        return <Bird className="h-5 w-5" />;
      default:
        return <PawPrint className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {userPets?.map((pet) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={pet.id}
            onClick={() => onSelectPet(pet.id)}
            className={cn(
              "relative cursor-pointer rounded-xl border-2 p-4 transition-all",
              selectedPetId === pet.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50",
            )}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                {pet.image ? (
                  <Image
                    width={64}
                    height={64}
                    src={pet.image}
                    alt={pet.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <PawPrint className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium">{pet.name}</h4>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getPetIcon(pet.type)}
                  <span>{pet.type}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {!userPets?.length && (
          <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
            <PawPrint className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground">
              Vous n'avez pas encore enregistré d'animal.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
