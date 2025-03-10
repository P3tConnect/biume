"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { CheckCircle, Loader2, Sparkles, Star } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addToWaitList } from "@/src/actions/waitlist.action"
import { waitlistInsertSchema } from "@/src/db"

import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui"

interface WaitlistModalProps {
  children?: React.ReactNode
  defaultIsPro?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function WaitlistModal({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  children,
  defaultIsPro = true,
}: WaitlistModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledOpen !== undefined && setControlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = isControlled ? setControlledOpen : setUncontrolledOpen

  const form = useForm<z.infer<typeof waitlistInsertSchema>>({
    resolver: zodResolver(waitlistInsertSchema),
    defaultValues: {
      name: "",
      firstName: "",
      email: "",
      organizationName: "",
      isPro: defaultIsPro,
      comment: "",
    },
  })

  const { handleSubmit, control } = form

  const { mutateAsync } = useMutation({
    mutationFn: addToWaitList,
    onSuccess: () => {
      setIsSuccess(true)
      setIsSubmitting(false)
      toast.success("Inscription réussie ! Nous vous contacterons bientôt.")
    },
    onMutate: () => {
      setIsSubmitting(true)
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
      setIsSubmitting(false)
    },
  })

  const onSubmit = handleSubmit(async values => {
    setIsSubmitting(true)
    try {
      await mutateAsync(values)
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      toast.error("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  })

  const closeModal = () => {
    if (isSuccess) {
      // Reset form and states when closing after success
      setOpen(false)
      setTimeout(() => {
        setIsSuccess(false)
        form.reset()
      }, 300)
    } else {
      setOpen(false)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      {children && <CredenzaTrigger asChild>{children}</CredenzaTrigger>}
      <CredenzaContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {!isSuccess ? (
          <div className="p-6">
            <CredenzaHeader className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-sm font-medium rounded-full bg-primary/10 text-primary w-fit">
                <Sparkles className="w-4 h-4" />
                <span>Phase bêta</span>
              </div>
              <CredenzaTitle className="text-2xl">Rejoignez notre liste d&apos;attente</CredenzaTitle>
              <CredenzaDescription>
                Soyez parmi les premiers à découvrir Biume et transformez
                {defaultIsPro ? " votre activité professionnelle." : " l'expérience de soin de votre animal."}
              </CredenzaDescription>
            </CredenzaHeader>

            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Marie" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={
                            defaultIsPro ? "marie.dupont@clinique-veterinaire.fr" : "marie.dupont@exemple.fr"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {defaultIsPro && (
                  <FormField
                    control={control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de votre entreprise</FormLabel>
                        <FormControl>
                          <Input placeholder="Clinique Vétérinaire des Alpes" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Un message pour nous ? (facultatif)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Partagez vos attentes concernant notre solution..."
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CredenzaFooter className="pt-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Inscription en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Rejoindre la liste d&apos;attente
                      </>
                    )}
                  </Button>
                </CredenzaFooter>
              </form>
            </Form>
          </div>
        ) : (
          <motion.div
            className="p-8 text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Merci pour votre inscription !</h2>
            <p className="text-muted-foreground mb-6">
              Nous vous contacterons dès que Biume sera disponible
              {defaultIsPro ? " pour votre entreprise." : "."}
            </p>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <Button variant="outline" className="gap-2" onClick={closeModal}>
              Fermer
            </Button>
          </motion.div>
        )}
      </CredenzaContent>
    </Credenza>
  )
}
