import { Button, Section, Text } from "@react-email/components"
import React from "react"

import { EmailLayout } from "./EmailLayout"

interface RateEmailProps {
  clientName: string
  professionalName: string
  appointmentDate: string
  appointmentId: string
  serviceName: string
}

const RateEmail = ({
  clientName = "cher client",
  professionalName = "notre partenaire",
  appointmentDate = "votre rendez-vous",
  appointmentId = "",
  serviceName = "service",
}: Partial<RateEmailProps>) => {
  return (
    <EmailLayout preview={`Votre avis sur votre expérience chez ${professionalName}`}>
      <Section>
        <Text className="text-2xl font-bold text-gray-800 mb-6">Comment s'est passé votre rendez-vous ?</Text>

        <Text className="text-gray-600 mb-4">Bonjour {clientName},</Text>

        <Text className="text-gray-600 mb-6">
          Nous espérons que votre rendez-vous du {appointmentDate} pour {serviceName} chez {professionalName} s'est bien
          passé.
        </Text>

        <Section className="bg-indigo-50 p-6 rounded-xl my-8 border border-indigo-100">
          <Text className="text-lg font-semibold text-indigo-900 mb-4">Votre avis compte pour nous</Text>
          <Text className="text-gray-700 mb-4">
            Afin d'améliorer constamment nos services et aider les autres utilisateurs à faire leurs choix, nous vous
            invitons à prendre quelques instants pour évaluer votre expérience.
          </Text>
          <Text className="text-gray-500 text-sm italic mt-4">
            Ce formulaire ne vous prendra que quelques secondes à remplir.
          </Text>
        </Section>

        <Section className="text-center mb-8">
          <Button
            href={`https://biume.com/rate/${appointmentId}`}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-8 py-3 rounded-lg font-medium text-base"
          >
            Donner mon avis
          </Button>
        </Section>

        <Text className="text-gray-600 text-sm">
          Votre évaluation permet aux autres utilisateurs de faire des choix éclairés et aide {professionalName} à
          améliorer ses services.
        </Text>

        <Section className="mt-8 pt-6 border-t border-gray-100">
          <Text className="text-gray-700">
            Merci de votre confiance,
            <br />
            <span className="text-indigo-600 font-medium">L'équipe Biume</span>
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  )
}

export default RateEmail
