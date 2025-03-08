import { Section, Text } from "@react-email/components"
import React from "react"

import { EmailLayout } from "./EmailLayout"

interface ReminderEmailProps {
  customerName: string
  reminderTitle: string
  dueDate: string
  description?: string
  priority: "low" | "medium" | "high"
}

const ReminderEmail = ({ customerName, reminderTitle, dueDate, description, priority }: ReminderEmailProps) => {
  const priorityColors = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  }

  return (
    <EmailLayout preview={`Reminder: ${reminderTitle}`}>
      <Section>
        <Text className="text-2xl font-bold text-gray-800">Reminder ⏰</Text>

        <Text className="text-gray-600 mt-4">Hi {customerName},</Text>

        <Text className="text-gray-600">This is a reminder for an upcoming task:</Text>

        <Section className="bg-gray-50 p-4 rounded-lg mt-4">
          <Text className="text-gray-700">
            <strong>Title:</strong> {reminderTitle}
          </Text>
          <Text className="text-gray-700">
            <strong>Due Date:</strong> {dueDate}
          </Text>
          {description && (
            <Text className="text-gray-700">
              <strong>Description:</strong> {description}
            </Text>
          )}
          <Text className={`font-medium ${priorityColors[priority]}`}>
            <strong>Priority:</strong> {/* {priority.charAt(0).toUpperCase() + priority.slice(1)} */}
          </Text>
        </Section>

        <Text className="text-gray-600 mt-4">
          Please make sure to complete this task before the due date. You can view and manage all your reminders in your
          Biume dashboard.
        </Text>

        {/* <Section className="mt-6">
          <Button
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
            href="https://biume.com/dashboard/reminders"
          >
            View Reminders
          </Button>
        </Section> */}

        <Text className="text-gray-600 mt-6">Thank you for using Biume!</Text>
      </Section>
    </EmailLayout>
  )
}

export default ReminderEmail
