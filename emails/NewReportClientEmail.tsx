import { Button, Section, Text } from "@react-email/components"

import { EmailLayout } from "./EmailLayout"

interface NewReportClientEmailProps {
  clientName: string
  reportDate: string
  reportUrl: string
  petName: string
}

const NewReportClientEmail = ({
  clientName = "valued client",
  reportDate = "today",
  reportUrl = "https://biume.com/reports",
  petName = "your pet",
}: Partial<NewReportClientEmailProps>) => {
  return (
    <EmailLayout preview={`New Report Available for ${petName}`}>
      <Section>
        <Text className="text-2xl font-bold text-gray-800 mb-4">New Report Available</Text>

        <Text className="text-gray-600 mb-4">Hi {clientName},</Text>

        <Text className="text-gray-600 mb-4">
          A new report has been generated for {petName} on {reportDate}. You can view the complete details and any
          recommendations by clicking the button below.
        </Text>

        <Section className="text-center my-8">
          <Button href={reportUrl} className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium">
            View Report
          </Button>
        </Section>

        <Text className="text-gray-600 mb-4">
          If you have any questions about the report or would like to discuss the findings, please don't hesitate to
          reach out to your care provider.
        </Text>

        <Text className="text-gray-600">
          Best regards,
          <br />
          The Biume Team
        </Text>
      </Section>
    </EmailLayout>
  )
}

export default NewReportClientEmail
