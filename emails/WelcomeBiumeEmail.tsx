import { Section, Text, Button, Hr } from "@react-email/components";
import { EmailLayout } from "./EmailLayout";

export const WelcomeBiume = () => {
  return (
    <EmailLayout preview="Welcome to Biume - Let's Transform Pet Care Together! 🐾">
      <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome to Biume! 🐾
      </Text>

      <Text className="text-gray-600 mb-4">
        We're thrilled to have you join our community of pet care professionals.
        Biume is here to help you streamline your business and provide
        exceptional care to your furry clients.
      </Text>

      <Section className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Here's what you can do with Biume:
        </Text>

        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Manage appointments and schedules effortlessly</li>
          <li>Track client information and pet profiles</li>
          <li>Handle payments and invoicing seamlessly</li>
          <li>Generate detailed reports and analytics</li>
          <li>Communicate with clients efficiently</li>
        </ul>
      </Section>

      <Section className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Ready to get started?
        </Text>

        <Button
          href="https://biume.com/dashboard"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium text-center block w-full"
        >
          Go to Dashboard
        </Button>
      </Section>

      <Hr className="border-gray-200 my-6" />

      <Text className="text-sm text-gray-600">
        Need help? Our support team is always here to assist you. Just reply to
        this email or contact us at support@biume.com
      </Text>
    </EmailLayout>
  );
};
