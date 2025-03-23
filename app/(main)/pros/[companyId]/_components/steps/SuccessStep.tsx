import { Button } from "@/components/ui"
import { useSession } from "@/src/lib/auth-client"
import { Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SuccessStepProps {
  onClose: () => void
}

export const SuccessStep = ({ onClose }: SuccessStepProps) => {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-6">
      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
        <Check className="h-12 w-12 text-primary" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Réservation confirmée !</h3>
        <p className="text-muted-foreground">
          Votre rendez-vous a été enregistré avec succès. Vous recevrez un email de confirmation dans quelques instants.
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onClose}>
          Je continue
        </Button>
        <Link href={`/dashboard/user/${session?.user.id}`}>
          <Button>Voir mes rendez-vous</Button>
        </Link>
      </div>
    </div>
  )
}
