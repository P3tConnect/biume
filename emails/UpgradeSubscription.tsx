import React from "react";
import { EmailLayout } from "./EmailLayout";
import {
  Button,
  Container,
  Heading,
  Section,
  Text,
} from "@react-email/components";

const UpgradeSubscription = ({
  plan,
  price,
}: {
  plan: string;
  price: string;
}) => {
  return (
    <EmailLayout preview="Your subscription has been upgraded! 🎉">
      <Container className="text-center">
        {/* Success Icon */}
        <Text className="text-5xl mb-4">🎉</Text>

        <Heading className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to {plan}!
        </Heading>

        <Text className="text-gray-600 mb-6">
          Your subscription has been successfully upgraded. Get ready to unlock
          all the amazing features!
        </Text>

        {/* Subscription Details Card */}
        <Section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <Text className="text-sm text-gray-500 uppercase mb-4">
            Subscription Details
          </Text>

          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
            <Text className="text-gray-600">Plan</Text>
            <Text className="font-semibold text-gray-800">{plan}</Text>
          </div>

          <div className="flex justify-between items-center">
            <Text className="text-gray-600">Price</Text>
            <Text className="font-semibold text-gray-800">${price}/month</Text>
          </div>
        </Section>

        <Button
          href="https://pawthera.com/dashboard"
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-indigo-700 transition-colors"
        >
          Go to Dashboard
        </Button>

        <Text className="text-sm text-gray-500 mt-6">
          Need help? We're here for you! Contact our support team anytime.
        </Text>
      </Container>
    </EmailLayout>
  );
};

export default UpgradeSubscription;
