import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExceptionalMoveFormValues, exceptionalMoveSchema } from "./types"
import { LocationStep } from "./steps/LocationStep"
import { AvailabilityStep } from "./steps/AvailabilityStep"
import { DetailsStep } from "./steps/DetailsStep"
import { ConfirmationStep } from "./steps/ConfirmationStep"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { defineStepper } from "@stepperize/react"

interface ExceptionalMoveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type StepId = "location" | "availability" | "details" | "confirmation"

const { Scoped, useStepper } = defineStepper(
  {
    id: "location",
    title: "Zone de déplacement",
    description: "Définissez la zone dans laquelle vous serez disponible",
  },
  {
    id: "availability",
    title: "Période de disponibilité",
    description: "Choisissez vos dates et horaires de disponibilité",
  },
  {
    id: "details",
    title: "Détails",
    description: "Renseignez les détails de votre déplacement",
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "Vérifiez les informations avant de confirmer",
  }
)

export const ExceptionalMoveDialog = ({ open, onOpenChange }: ExceptionalMoveDialogProps) => {
  const methods = useForm<ExceptionalMoveFormValues>({
    resolver: zodResolver(exceptionalMoveSchema),
    defaultValues: {
      city: "",
      radius: 20,
      address: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: "09:00",
      endTime: "18:00",
      reason: "",
      notes: "",
    },
  })

  const { current, next, prev, isFirst, isLast, switch: switchStep } = useStepper()

  const onSubmit = (values: ExceptionalMoveFormValues) => {
    if (!isLast) {
      next()
      return
    }
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <Scoped>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>{current.title}</DialogTitle>
                <DialogDescription>{current.description}</DialogDescription>
              </DialogHeader>

              <div className="py-6">
                {switchStep({
                  location: () => <LocationStep />,
                  availability: () => <AvailabilityStep />,
                  details: () => <DetailsStep />,
                  confirmation: () => <ConfirmationStep />,
                })}
              </div>

              <DialogFooter>
                {!isFirst && (
                  <Button type="button" variant="outline" onClick={prev} className="mr-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour
                  </Button>
                )}
                <Button onClick={() => next()}>
                  {isLast ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Confirmer
                    </>
                  ) : (
                    <>
                      Suivant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </Scoped>
      </DialogContent>
    </Dialog>
  )
}
