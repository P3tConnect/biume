import React from "react";
import { EmailLayout } from "./EmailLayout";
import { Heading, Text, Section, Button, Hr } from "@react-email/components";

const DowngradeSubscription = ({ plan }: { plan: string }) => {
  return (
    <EmailLayout>
      <Section>
        <Heading className="text-2xl font-bold text-gray-800 mb-6">
          Your Biume Pro Subscription Has Been Updated
        </Heading>

        <Text className="text-gray-700 mb-4">
          We wanted to confirm that your subscription has been successfully
          changed to the {plan} plan. This change is effective immediately.
        </Text>

        <Text className="text-gray-700 mb-4">
          What this means for you: • Your billing will be adjusted to reflect
          your new plan • You'll maintain access to your data and core features
          • Some premium features may be limited based on your new plan
        </Text>

        <Hr className="my-6 border-gray-300" />

        <Text className="text-gray-700 mb-4">
          Need to make changes or have questions? Our support team is here to
          help:
        </Text>

        <Button
          href="https://biume.com/support"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
        >
          Contact Support
        </Button>

        <Text className="text-gray-700 mt-6">
          Thank you for being a valued member of the Biume community.
        </Text>

        <Text className="text-gray-700 mt-4">
          Best regards,
          <br />
          The Biume Team
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default DowngradeSubscription;
