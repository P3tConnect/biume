import React from 'react'
import { EmailLayout } from './EmailLayout'
import { Heading, Text } from '@react-email/components'

const DowngradeSubscription = ({ plan }: { plan: string }) => {
  return (
    <EmailLayout>
      <Heading className="text-3xl font-bold">Downgrade to {plan}</Heading>
      <Text className="my-4">
        You have successfully downgraded to the {plan} plan.
      </Text>
      <Text className="my-4">
        If you have any questions or concerns, please don't hesitate to reach
        out to us.
      </Text>
      <Text className="my-4">
        Best regards,
        <br />
        The PawThera Team
      </Text>
    </EmailLayout>
  )
}

export default DowngradeSubscription