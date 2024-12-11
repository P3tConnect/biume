import React from 'react'
import { EmailLayout } from './EmailLayout'
import { Column, Heading, Row, Section, Text } from '@react-email/components'

const UpgradeSubscription = ({ plan, price } : { plan: string, price: string }) => {
  return (
    <EmailLayout>
      <Heading className="text-3xl font-bold">Subscription Upgraded</Heading>
      <Text className="my-4">
        You have successfully upgraded to the {plan} plan.
      </Text>
      <Text className="my-4">
        Here is a summary of your subscription:
      </Text>
      <Section>
        <Row>
          <Column>Plan:</Column>
          <Column>Price:</Column>
        </Row>
        <Row>
          <Column>{plan}</Column>
          <Column>${price}</Column>
        </Row>
      </Section>
    </EmailLayout>
  )
}

export default UpgradeSubscription