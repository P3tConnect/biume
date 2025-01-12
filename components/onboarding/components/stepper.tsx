'use client';

import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import React from "react";
import { useStepper, utils } from "../hooks/useStepper";
import ProInformationsStep from "../pro/informations-step";
import ProServicesStep from "../pro/services-step";
import ProOptionsStep from "../pro/options-step";
import ProDocumentsStep from "../pro/documents-step";
import ProCompleteStep from "../pro/complete-step";
import StepIndicator from "./step-indicator";
import IntroStep from "../pro/intro-step";
import { organization as organizationUtil, updateUser, useActiveOrganization, useSession } from "@/src/lib/auth-client";
import { z } from "zod";
import { CreateOptionSchema, CreateServiceSchema, organizationDocuments, service, options as optionsTable, organization as organizationTable, user as userTable } from "@/src/db";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@/src/lib";
import { useRouter } from "next/navigation";
import { eq } from "drizzle-orm";
import { toast, Toaster } from "sonner";

const Stepper = () => {
  const stepper = useStepper();
  const currentStep = utils.getIndex(stepper.current.id);
  const { data: session } = useSession();
  const router = useRouter();

  const skipOnboarding = async () => {
    try {
      // Créer une organisation minimale
      const result = await organizationUtil.create({
        name: "Mon entreprise",
        slug: "mon-entreprise",
        metadata: {},
        userId: session?.user.id,
      });

      // Définir l'organisation comme active
      await organizationUtil.setActive({
        organizationId: result.data?.id as string,
      });

      // Marquer l'onboarding comme terminé
      await db.update(organizationTable).set({
        onBoardingComplete: true,
      }).where(eq(organizationTable.id, result.data?.id as string)).execute();

      // Mettre à jour l'utilisateur comme pro
      await updateUser({
        isPro: true,
      });

      // Rediriger vers le dashboard
      router.push(`/dashboard/${result.data?.id}`);
      toast.success("Configuration rapide terminée !");
    } catch (error) {
      console.error("Erreur lors du skip:", error);
      toast.error("Une erreur est survenue", {
        description: "Veuillez réessayer plus tard",
        duration: 5000,
      });
    }
  };

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
      logo: '',
      coverImage: '',
      description: '',
      services: [],
      options: [],
      documents: [],
      siren: '',
    },
  });

  const { formState: { errors } } = form;

  const onSubmit = async (data: z.infer<typeof onboardingSchema>) => {
    try {
      // Valider les données avec le schéma
      const validationResult = onboardingSchema.safeParse(data);

      if (!validationResult.success) {
        // Afficher les erreurs dans un toast
        validationResult.error.issues.forEach((issue) => {
          toast.error(`${issue.path.join('.')}: ${issue.message}`, {
            description: "Veuillez corriger les erreurs avant de continuer",
            duration: 5000,
          });
        });
        return;
      }

      if (stepper.current.id == "start") {
        stepper.next();
      }

      if (stepper.current.id == "informations") {
        const result = await organizationUtil.create({
          name: data.name as string,
          slug: data.name?.toLowerCase().replace(/\s+/g, "-") as string,
          logo: data.logo,
          metadata: {},
          userId: session?.user.id,
        });
        await organizationUtil.setActive({
          organizationId: result.data?.id as string,
        });
        await db
          .update(organizationTable).set({
            coverImage: data.coverImage,
            description: data.description,
          })
          .where(eq(organizationTable.id, result.data?.id as string)).execute();
        stepper.next();
      }

      if (stepper.current.id == "services") {
        const organization = await organizationUtil.getFullOrganization();
        if (!organization) return;
        const services = form.getValues("services");
        if (!services) return;
        await db.insert(service).values(
          services.map((service) => ({
            ...service,
            organizationId: organization.data?.id,
          }))
        ).execute();
        stepper.next();
      }

      if (stepper.current.id == "options") {
        const organization = await organizationUtil.getFullOrganization();
        if (!organization) return;
        const options = form.getValues("options");
        if (!options) return;
        await db.insert(optionsTable).values(
          options.map((option) => ({
            ...option,
            organizationId: organization.data?.id,
          }))
        ).execute();
        stepper.next();
      }

      if (stepper.current.id == "documents") {
        const organization = await organizationUtil.getFullOrganization();
        if (!organization) return;
        const documents = form.getValues("documents");
        if (!documents || !organization.data?.id) return;
        await db.insert(organizationDocuments).values(
          documents.map((file) => ({
            file: file ?? '',
            organizationId: organization.data.id,
          }))
        ).execute();
        await db.update(organizationTable).set({
          siret: data.siret,
          siren: data.siren,
        }).where(eq(organizationTable.id, organization.data.id)).execute();
        stepper.next();
      }

      if (stepper.current.id == "complete") {
        const organization = await organizationUtil.getFullOrganization();
        if (!organization) return;
        router.push(`/dashboard/${organization.data?.id}`);
        stepper.reset();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue", {
        description: "Veuillez réessayer plus tard",
        duration: 5000,
      });
    }
  }

  const redirectToDashboard = async () => {
    const organization = await organizationUtil.getFullOrganization();
    if (!organization) return;
    await db.update(organizationTable).set({
      onBoardingComplete: true,
    }).where(eq(organizationTable.id, organization.data?.id ?? '')).execute();
    await updateUser({
      isPro: true,
    });
    router.push(`/dashboard/${organization.data?.id}`);
  }

  return (
    <DialogContent className="w-[900px]">
      <Toaster richColors position="top-center" />
      <DialogHeader className="flex flex-row items-center space-x-4">
        <StepIndicator currentStep={currentStep + 1} totalSteps={stepper.all.length} isLast={stepper.isLast} />
        <div className="space-y-1 flex flex-col">
          <DialogTitle>{stepper.current.title}</DialogTitle>
          <DialogDescription>{stepper.current.description}</DialogDescription>
        </div>
      </DialogHeader>

      {stepper.switch({
        start: () => <IntroStep />,
        informations: () => <ProInformationsStep form={form} />,
        services: () => <ProServicesStep form={form} />,
        options: () => <ProOptionsStep form={form} />,
        documents: () => <ProDocumentsStep form={form} />,
        complete: () => <ProCompleteStep />,
      })}
      <div className='space-y-4'>
        {!stepper.isLast ? (
          <div className='flex justify-end gap-4'>
            {stepper.isFirst ? (
              <>
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-xl">Fermer</Button>
                </DialogClose>
                <Button
                  variant="ghost"
                  className="rounded-xl"
                  onClick={skipOnboarding}
                >
                  Passer la configuration
                </Button>
              </>
            ) : (
              <Button
                variant='outline'
                className='rounded-xl'
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Retour
              </Button>
            )}

            <Button onClick={form.handleSubmit(onSubmit)} className="rounded-xl">
              Suivant
            </Button>
          </div>
        ) : (
          <div className='flex flex-row justify-end gap-2'>
            <Button
              onClick={stepper.prev}
              variant='outline'
              className='rounded-xl'
            >
              Retour
            </Button>
            <DialogClose asChild>
              <Button className="rounded-xl" onClick={redirectToDashboard}>Terminer</Button>
            </DialogClose>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export const onboardingSchema = z.object({
  name: z.string().optional(),
  logo: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  description: z.string().optional(),
  services: z.array(CreateServiceSchema).optional(),
  options: z.array(CreateOptionSchema).optional(),
  siren: z
    .string()
    .min(9, 'Le numéro SIREN doit contenir 9 chiffres')
    .max(9, 'Le numéro SIREN doit contenir 9 chiffres')
    .regex(/^\d+$/, 'Le numéro doit contenir uniquement des chiffres')
    .optional(),
  siret: z
    .string()
    .min(14, 'Le numéro SIRET doit contenir 14 chiffres')
    .max(14, 'Le numéro SIRET doit contenir 14 chiffres')
    .regex(/^\d+$/, 'Le numéro doit contenir uniquement des chiffres')
    .optional(),
  documents: z
    .array(z.string().url())
    .min(1, 'Veuillez télécharger au moins un document')
    .optional(),
});

export default Stepper;
