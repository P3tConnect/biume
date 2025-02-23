'use client';

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { defineStepper } from "@stepperize/react"
import { Card } from "@/components/ui/card"
import { ClientInfoStep } from "./steps/client-info-step"
import { ServiceDetailsStep } from "./steps/service-details-step"
import { ReportContentStep } from "./steps/report-content-step"
import { AttachmentsStep } from "./steps/attachments-step"
import { SignatureStep } from "./steps/signature-step"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@/src/lib"

const reportFormSchema = z.object({
  // Client Info
  clientId: z.string(),
  petId: z.string(),

  // Service Details
  serviceDate: z.date(),
  duration: z.number().min(1),
  serviceType: z.string(),

  // Report Content
  description: z.string().min(10),
  observations: z.string(),
  recommendations: z.string(),

  // Attachments
  photos: z.array(z.any()).optional(),
  documents: z.array(z.any()).optional(),

  // Signature
  signature: z.string(),
})

type ReportFormValues = z.infer<typeof reportFormSchema>

const { useStepper, utils, steps } = defineStepper(
  {
    id: "start",
    title: "Bienvenue",
    description: "Bienvenue dans l'inscription de votre entreprise !",
  },
  {
    id: "client",
    title: "Informations",
    description: "Renseignez les informations de votre entreprise pour que nous puissions créer le compte de votre établissement.",
  },
  {
    id: "service",
    title: "Détails du Service",
    description: "Renseignez les informations du service que vous avez effectué.",
  },
  {
    id: "content",
    title: "Contenu du Rapport",
    description: "Renseignez le contenu du rapport que vous avez effectué.",
  },
  {
    id: "attachments",
    title: "Pièces Jointes",
    description: "Ajoutez des pièces jointes à votre rapport.",
  },
  {
    id: "signature",
    title: "Signature",
    description: "Signez le rapport pour le valider.",
  },
);

export function NewReportForm() {
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      photos: [],
      documents: [],
    },
  })

  const { handleSubmit } = form

  const { current, next, prev, isFirst, isLast, switch: switchStep } = useStepper()

  const onSubmit = handleSubmit(async (data) => {
    if (isLast) {
      // TODO: Implement final submission
      console.log(data)
      return
    }
    next()
  })

  const stepIndex = utils.getIndex(current.id);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="mx-auto space-y-8">
        <div className="relative">
          <div className="absolute top-4 left-0 w-full h-0.5 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center gap-2 transition-colors duration-200",
                  stepIndex >= index ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200",
                    stepIndex >= index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1}
                </div>
                <span className="text-xs font-medium">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="border-b pb-4 mb-6">
                <h2 className="text-lg font-semibold">{current.title}</h2>
                <p className="text-sm text-muted-foreground">{current.description}</p>
              </div>

              {switchStep({
                start: () => <div>Start</div>,
                client: () => <ClientInfoStep form={form} />,
                service: () => <ServiceDetailsStep form={form} />,
                content: () => <ReportContentStep form={form} />,
                attachments: () => <AttachmentsStep form={form} />,
                signature: () => <SignatureStep form={form} />,
              })}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prev}
              disabled={isFirst}
              className="gap-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Précédent
            </Button>

            <Button
              onClick={() => next()}
              className="gap-2"
            >
              {isLast ? "Soumettre le rapport" : "Suivant"}
              {!isLast && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  )
} 