'use client';

import React, { useState } from 'react';
import { useStepper, utils } from '../hooks/useStepper';
import ProInformationsStep from '../pro/informations-step';
import ProServicesStep from '../pro/services-step';
import ProOptionsStep from '../pro/options-step';
import ProDocumentsStep from '../pro/documents-step';
import StepIndicator from './step-indicator';
import IntroStep from '../pro/intro-step';
import {
  organization as organizationUtil,
  updateUser,
  useSession,
} from '@/src/lib/auth-client';
import {
  organization as organizationTable,
  progression as progressionTable,
} from '@/src/db';
import { db, stripe } from '@/src/lib';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { SubscriptionStep } from '../pro/subscription-step';
import { generateMigrationName } from '@/src/lib/business-names';
import {
  CredenzaContent,
  CredenzaHeader,
  CredenzaDescription,
  CredenzaTitle,
} from '@/components/ui';
import ImagesStep from '../pro/images-step';

const Stepper = () => {
  const {
    next,
    prev,
    current,
    goTo,
    all,
    isLast,
    switch: switchStep,
  } = useStepper();
  const currentStep = utils.getIndex(current.id);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const skipOnboarding = async () => {
    try {
      // Créer une organisation minimale
      setIsLoading(true);
      const name = generateMigrationName();

      // Créer directement avec l'API d'authentification
      const organizationResult = await organizationUtil.create({
        name: name,
        slug: name.toLowerCase().replace(/ /g, '-'),
        logo: '',
        metadata: {},
        userId: session?.user.id,
      });

      if (!organizationResult.data) {
        throw new Error("Impossible de créer l'organisation");
      }

      const organizationId = organizationResult.data.id;

      // Créer une progression
      const [progression] = await db
        .insert(progressionTable)
        .values({
          docs: false,
          cancelPolicies: false,
          reminders: false,
          services: false,
        })
        .returning();

      // Définir l'organisation comme active
      await organizationUtil.setActive({
        organizationId: organizationId,
      });

      // Créer les comptes Stripe
      let companyStripeId = null;
      let customerStripeId = null;

      try {
        // Créer le client Stripe
        const stripeCustomer = await stripe.customers.create({
          email: session?.user.email!,
          name: name,
          metadata: {
            organizationId: organizationId,
            userId: session?.user.id!,
          },
        });
        customerStripeId = stripeCustomer.id;
        console.log('Client Stripe créé avec succès:', customerStripeId);

        // Créer le compte Stripe Connect
        // const stripeCompany = await stripe.accounts.create({
        //   type: "standard",
        //   country: "FR",
        //   email: session?.user.email!,
        //   metadata: {
        //     organizationId: organizationId,
        //     userId: session?.user.id!,
        //   },
        // });
        // companyStripeId = stripeCompany.id;
        console.log('Compte Stripe Connect créé avec succès:', companyStripeId);
      } catch (stripeError) {
        console.error(
          'Erreur lors de la création des comptes Stripe:',
          stripeError
        );
        // Continuer même en cas d'erreur Stripe - l'organisation a été créée
      }

      // Mettre à jour l'organisation dans la base de données
      await db
        .update(organizationTable)
        .set({
          onBoardingComplete: true,
          progressionId: progression.id,
          companyStripeId: companyStripeId,
          customerStripeId: customerStripeId,
        })
        .where(eq(organizationTable.id, organizationId))
        .execute();

      // Mettre à jour l'utilisateur comme pro
      await updateUser({
        isPro: true,
      });

      setIsLoading(false);

      // Rediriger vers le dashboard
      goTo('subscription');
      toast.success('Configuration rapide terminée !');
    } catch (error) {
      console.error('Erreur lors du skip:', error);
      // Afficher plus de détails sur l'erreur
      if (error instanceof Error) {
        console.error("Message d'erreur:", error.message);
        console.error('Stack trace:', error.stack);

        // Si l'erreur est liée à Stripe, proposer la page de configuration manuelle
        if (
          error.message.includes('Stripe') ||
          error.message.toLowerCase().includes('stripe')
        ) {
          toast.error(`Erreur: ${error.message}`, {
            description: (
              <div>
                <p>
                  Veuillez réessayer plus tard ou contacter l&apos;assistance
                </p>
                <a
                  href='/dashboard/stripe-setup'
                  className='text-primary underline font-medium mt-2 block'
                >
                  Configurer Stripe manuellement
                </a>
              </div>
            ),
            duration: 15000,
          });
        } else {
          toast.error(`Erreur: ${error.message}`, {
            description:
              "Veuillez réessayer plus tard ou contacter l'assistance",
            duration: 10000,
          });
        }
      } else {
        toast.error('Une erreur est survenue', {
          description: "Veuillez réessayer plus tard ou contacter l'assistance",
          duration: 5000,
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <CredenzaContent>
      <CredenzaHeader className='flex flex-row items-center space-x-4'>
        <StepIndicator
          currentStep={currentStep + 1}
          totalSteps={all.length}
          isLast={isLast}
        />
        <div className='space-y-1 flex flex-col'>
          <CredenzaTitle className='text-xl font-bold'>
            {current.title}
          </CredenzaTitle>
          <CredenzaDescription className='text-muted-foreground text-md'>
            {current.description}
          </CredenzaDescription>
        </div>
      </CredenzaHeader>

      <div className='max-h-[700px] overflow-y-auto'>
        {switchStep({
          start: () => (
            <IntroStep
              skipOnboarding={skipOnboarding}
              nextStep={next}
              isLoading={isLoading}
            />
          ),
          informations: () => (
            <ProInformationsStep nextStep={next} previousStep={prev} />
          ),
          images: () => <ImagesStep nextStep={next} previousStep={prev} />,
          services: () => (
            <ProServicesStep nextStep={next} previousStep={prev} />
          ),
          options: () => <ProOptionsStep nextStep={next} previousStep={prev} />,
          documents: () => (
            <ProDocumentsStep nextStep={next} previousStep={prev} />
          ),
          subscription: () => <SubscriptionStep />,
        })}
      </div>
    </CredenzaContent>
  );
};

export default Stepper;
