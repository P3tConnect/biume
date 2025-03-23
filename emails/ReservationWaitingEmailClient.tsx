import { Button, Section, Text } from "@react-email/components"
import React from "react"

import { EmailLayout } from "./EmailLayout"

interface ReservationWaitingEmailClientProps {
  clientName: string
  petName: string
  serviceName: string
  date: string
  time: string
  providerName: string
}

const ReservationWaitingEmailClient = ({
  clientName = "cher client",
  petName = "votre animal",
  serviceName = "consultation vétérinaire",
  date = "date prévue",
  time = "heure prévue",
  providerName = "notre équipe",
}: Partial<ReservationWaitingEmailClientProps>) => {
  return (
    <EmailLayout preview={`Réservation en attente : Demande de rendez-vous pour ${petName}`}>
      <Section>
        <Text className="text-2xl font-bold text-gray-800 mb-6">Réservation en attente de confirmation</Text>

        <Text className="text-gray-600 mb-4">Bonjour {clientName},</Text>

        <Text className="text-gray-600 mb-6">
          Nous avons bien reçu votre demande de rendez-vous pour {petName} concernant {serviceName} avec {providerName}{" "}
          le {date} à {time}.
        </Text>

        <Section className="bg-indigo-50 p-6 rounded-xl my-8 border border-indigo-100">
          <Text className="text-lg font-semibold text-indigo-900 mb-4">État de votre réservation :</Text>
          <div className="space-y-3">
            <Text className="text-gray-700 flex items-center">
              <span className="text-indigo-500 mr-2">•</span> En attente de confirmation par notre équipe
            </Text>
          </div>
          <Text className="text-gray-500 text-sm italic mt-4">
            Note : Nous traiterons votre demande dans les plus brefs délais.
          </Text>
        </Section>

        <Text className="text-gray-600 mb-8">
          Vous recevrez un email de confirmation dès que votre rendez-vous sera validé par notre équipe. Vous pouvez
          également suivre l'état de votre réservation sur notre plateforme.
        </Text>

        <Section className="text-center mb-8">
          <Button
            href="https://biume.com/appointments"
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-8 py-3 rounded-lg font-medium text-base"
          >
            Voir l'état de ma réservation
          </Button>
        </Section>

        <Text className="text-gray-600 text-sm bg-gray-50 p-4 rounded-lg">
          Si vous souhaitez annuler votre demande de rendez-vous, merci de nous en informer dès que possible.
        </Text>

        <Section className="mt-8 pt-6 border-t border-gray-100">
          <Text className="text-gray-700">
            Merci de votre confiance,
            <br />
            <span className="text-indigo-600 font-medium">L'équipe {providerName}</span>
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  )
}

export default ReservationWaitingEmailClient
