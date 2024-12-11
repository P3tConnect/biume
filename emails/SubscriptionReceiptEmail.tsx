import React from 'react'
import { EmailLayout } from './EmailLayout'
import { Heading, Text } from '@react-email/components'

const SubscriptionReceiptEmail = () => {
  return (
    <EmailLayout>
      <Heading className="text-2xl font-bold">Subscription Receipt</Heading>
      <Text className="text-sm mt-2">
        You have successfully subscribed to our service. We have received your payment and have activated your subscription.
      </Text>
      <hr className="my-4" />
      <Text className="text-sm">
        If you have any questions or need assistance, please don't hesitate to contact us.
      </Text>
      
    </EmailLayout>
  )
}

export default SubscriptionReceiptEmail