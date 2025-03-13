import { Button, Section, Text } from "@react-email/components"
import React from "react"

import { EmailLayout } from "./EmailLayout"

interface NewReservationEmailProps {
  customerName: string
  petName: string
  serviceName: string
  date: string
  time: string
  providerName: string
  price: string
}

const NewReservationEmailPro = ({
  customerName,
  petName,
  serviceName,
  date,
  time,
  providerName,
  price,
}: NewReservationEmailProps) => {
  return (
    <EmailLayout preview={`New Reservation Confirmation for ${petName}`}>
      <Section>
        <Text className="text-2xl font-bold text-gray-800">Reservation Confirmed! 🎉</Text>

        <Text className="text-gray-600 mt-4">Hi {customerName},</Text>

        <Text className="text-gray-600">Your reservation has been successfully confirmed. Here are the details:</Text>

        <Section className="bg-gray-50 p-4 rounded-lg mt-4">
          <Text className="text-gray-700">
            <strong>Pet:</strong> {petName}
          </Text>
          <Text className="text-gray-700">
            <strong>Service:</strong> {serviceName}
          </Text>
          <Text className="text-gray-700">
            <strong>Date:</strong> {date}
          </Text>
          <Text className="text-gray-700">
            <strong>Time:</strong> {time}
          </Text>
          <Text className="text-gray-700">
            <strong>Provider:</strong> {providerName}
          </Text>
          <Text className="text-gray-700">
            <strong>Price:</strong> {price}
          </Text>
        </Section>

        <Text className="text-gray-600 mt-4">
          Need to make changes? You can manage your reservation through your Biume account or contact us directly.
        </Text>

        <Section className="mt-6">
          <Button
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
            href="https://biume.com/dashboard"
          >
            View Reservation Details
          </Button>
        </Section>

        <Text className="text-gray-600 mt-6">Thank you for choosing Biume for your pet care needs!</Text>
      </Section>
    </EmailLayout>
  )
}

export default NewReservationEmailPro
