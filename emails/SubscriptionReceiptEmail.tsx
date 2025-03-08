import React from "react";
import { EmailLayout } from "./EmailLayout";
import { Heading, Text, Section, Container } from "@react-email/components";
import { format } from "date-fns";

interface SubscriptionReceiptEmailProps {
  customerName: string;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  date: Date;
  nextBillingDate: Date;
}

const SubscriptionReceiptEmail: React.FC<SubscriptionReceiptEmailProps> = ({
  customerName,
  planName,
  amount,
  currency,
  transactionId,
  date,
  nextBillingDate,
}) => {
  return (
    <EmailLayout>
      <Heading className="text-2xl font-bold text-gray-800">
        Payment Receipt
      </Heading>

      <Section className="mt-6">
        <Text className="text-base">Dear {customerName},</Text>
        <Text className="text-base mt-2">
          Thank you for your subscription! This email confirms your payment has
          been processed successfully.
        </Text>
      </Section>

      <Section className="mt-6 bg-gray-50 p-6 rounded-lg">
        <Container className="border-b border-gray-200 pb-4">
          <Text className="text-sm font-semibold text-gray-600">
            Transaction Details
          </Text>
          <Text className="text-base mt-2">Plan: {planName}</Text>
          <Text className="text-base">Amount: </Text>
          <Text className="text-base">
            Date:
            {/* {format(date, "MMMM dd, yyyy")} */}
          </Text>
          <Text className="text-base">Transaction ID: {transactionId}</Text>
        </Container>

        <Container className="mt-4">
          <Text className="text-sm font-semibold text-gray-600">
            Next Billing
          </Text>
          <Text className="text-base mt-2">
            Your next billing date will be{" "}
            {/* {format(nextBillingDate, "MMMM dd, yyyy")} */}
          </Text>
        </Container>
      </Section>

      <Section className="mt-6">
        <Text className="text-sm text-gray-600">
          If you have any questions about your subscription or need assistance,
          please don't hesitate to contact our support team.
        </Text>
      </Section>

      <Section className="mt-6">
        <Text className="text-xs text-gray-500">
          This receipt was automatically generated and sent by Biume. Please
          keep this for your records.
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default SubscriptionReceiptEmail;
