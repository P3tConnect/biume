import { Button, Section, Text } from "@react-email/components"
import React from "react"

import { EmailLayout } from "./EmailLayout"

interface AppointmentOTPEmailProps {
  clientName: string
  professionalName: string
  appointmentDate: string
  appointmentTime: string
  serviceName: string
  otpCode: string
}

const AppointmentOTPEmail = ({
  clientName = "cher client",
  professionalName = "notre partenaire",
  appointmentDate = "aujourd'hui",
  appointmentTime = "bientôt",
  serviceName = "rendez-vous",
  otpCode = "000000",
}: Partial<AppointmentOTPEmailProps>) => {
  return (
    <EmailLayout preview={`Votre code d'accès pour votre rendez-vous chez ${professionalName}`}>
      <Section>
        <Text className="text-2xl font-bold text-gray-800 mb-6">Votre code d'accès pour votre rendez-vous</Text>

        <Text className="text-gray-600 mb-4">Bonjour {clientName},</Text>

        <Text className="text-gray-600 mb-6">
          Votre rendez-vous pour {serviceName} chez {professionalName} est prévu dans moins d'une heure, le{" "}
          {appointmentDate} à {appointmentTime}.
        </Text>

        <Section className="bg-indigo-50 p-6 rounded-xl my-8 border border-indigo-100">
          <Text className="text-lg font-semibold text-indigo-900 mb-4">Votre code d'accès</Text>
          <Text className="text-4xl font-bold text-center text-indigo-700 mb-4 tracking-widest bg-white py-4 rounded-lg border border-indigo-200">
            {otpCode}
          </Text>
          <Text className="text-gray-500 text-sm italic mt-4">
            Ce code est à présenter lors de votre arrivée à {professionalName}.
          </Text>
        </Section>

        <Text className="text-gray-700 mb-4">Quelques points importants :</Text>
        <ul className="text-gray-600 space-y-2 mb-6">
          <li>• Ce code est valable uniquement pour ce rendez-vous.</li>
          <li>• Merci d'arriver quelques minutes avant l'heure prévue.</li>
          <li>• En cas d'empêchement, veuillez nous prévenir au plus tôt.</li>
        </ul>

        <Section className="text-center mb-8">
          <Button
            href={`https://biume.com/appointments`}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-8 py-3 rounded-lg font-medium text-base"
          >
            Voir mon rendez-vous
          </Button>
        </Section>

        <Section className="mt-8 pt-6 border-t border-gray-100">
          <Text className="text-gray-700">
            Merci de votre confiance,
            <br />
            <span className="text-indigo-600 font-medium">L'équipe {professionalName}</span>
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  )
}

export default AppointmentOTPEmail
