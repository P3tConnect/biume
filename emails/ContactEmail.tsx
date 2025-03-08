import { Button, Hr, Section, Text } from "@react-email/components"

import { EmailLayout } from "./EmailLayout"

interface ContactEmailProps {
  name: string
  email: string
  message: string
  subject?: string
}

export const ContactEmail = ({ name, email, message, subject = "Nouveau contact" }: ContactEmailProps) => {
  return (
    <EmailLayout preview={`Message de contact de ${name} - ${subject}`}>
      <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Nouveau message de contact</Text>

      <Section className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-2">Détails du contact :</Text>

        <div className="text-gray-600 mb-4">
          <Text className="m-0">
            <strong>Nom :</strong> {name}
          </Text>
          <Text className="m-0">
            <strong>Email :</strong> {email}
          </Text>
          {subject && (
            <Text className="m-0">
              <strong>Sujet :</strong> {subject}
            </Text>
          )}
        </div>

        <Hr className="border-gray-200 my-4" />

        <Text className="text-lg font-semibold text-gray-800 mb-2">Message :</Text>

        <Text className="text-gray-600 whitespace-pre-wrap">{message}</Text>
      </Section>

      <Section className="mb-6">
        <Button
          href={`mailto:${email}`}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium text-center block w-full"
        >
          Répondre au message
        </Button>
      </Section>

      <Text className="text-sm text-gray-600 italic">
        Ce message a été envoyé via le formulaire de contact de Biume.
      </Text>
    </EmailLayout>
  )
}

export default ContactEmail
