import React from "react"
import { Section, Text } from "@react-email/components"

import { EmailLayout } from "./EmailLayout"

const CancellationPolicyEmail = () => {
  return (
    <EmailLayout preview="Politique de remboursement">
      <Section className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-2">Politique de remboursement</Text>
      </Section>
    </EmailLayout>
  )
}

export default CancellationPolicyEmail
