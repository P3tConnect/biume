import { Button, Section, Text } from "@react-email/components"
import React from "react"

import { EmailLayout } from "./EmailLayout"

interface PaymentReminderEmailProps {
  idClient: string
  clientName: string
  professionalName: string
  appointmentDate: string
  appointmentTime: string
  serviceName: string
  petNames?: string[]
  paymentAmount?: string
}

const PaymentReminderEmail = ({
  idClient = "",
  clientName = "cher client",
  professionalName = "notre partenaire",
  appointmentDate = "bientôt",
  appointmentTime = "bientôt",
  serviceName = "consultation",
  petNames = [],
  paymentAmount = "",
}: Partial<PaymentReminderEmailProps>) => {
  return (
    <EmailLayout preview={`Rappel : Votre rendez-vous chez ${professionalName} dans 2 jours`}>
      <Section>
        <Text className="text-2xl font-bold text-gray-800 mb-6">Rappel de votre rendez-vous</Text>

        <Text className="text-gray-600 mb-4">Bonjour {clientName},</Text>

        <Text className="text-gray-600 mb-6">
          Nous vous rappelons que votre rendez-vous pour {serviceName} est prévu dans 2 jours, le {appointmentDate} à{" "}
          {appointmentTime}.
        </Text>

        {petNames && petNames.length > 0 && (
          <Text className="text-gray-600 mb-6">Animal(aux) concerné(s) : {petNames.join(", ")}</Text>
        )}

        <Section className="bg-indigo-50 p-6 rounded-xl my-8 border border-indigo-100">
          <Text className="text-lg font-semibold text-indigo-900 mb-4">Informations importantes</Text>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700">
              Ce rendez-vous a déjà été payé en ligne{paymentAmount ? ` (${paymentAmount})` : ""}.
            </li>
            <li className="text-gray-700">
              En cas d'empêchement, veuillez nous prévenir au plus tôt pour éviter de perdre votre paiement.
            </li>
            <li className="text-gray-700">Nous vous attendons à l'adresse de {professionalName}.</li>
          </ul>
        </Section>

        <Text className="text-gray-600 mb-8">
          Nous vous remercions pour votre confiance et nous réjouissons de vous accueillir bientôt.
        </Text>

        <Section className="text-center mb-8">
          <Button
            href={`https://biume.com/dashboard/${idClient}/timetable`}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-8 py-3 rounded-lg font-medium text-base"
          >
            Voir les détails du rendez-vous
          </Button>
        </Section>

        <Section className="mt-8 pt-6 border-t border-gray-100">
          <Text className="text-gray-700">
            À très bientôt,
            <br />
            <span className="text-indigo-600 font-medium">L'équipe {professionalName}</span>
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  )
}

export default PaymentReminderEmail
