import {
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./EmailLayout";

interface ResetPasswordProps {
  resetLink?: string;
  username?: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  resetLink = "https://pawthera.com/reset-password",
  username = "there",
}) => {
  return (
    <EmailLayout preview="Reset your PawThera password">
      <Container className="mx-auto">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Password Reset Request
        </Text>

        <Text className="text-gray-600 mb-4">Hi {username},</Text>

        <Text className="text-gray-600 mb-4">
          We received a request to reset your PawThera account password. Click
          the button below to choose a new password:
        </Text>

        <Section className="text-center my-8">
          <Button
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium"
            href={resetLink}
          >
            Reset Password
          </Button>
        </Section>

        <Text className="text-gray-600 mb-4">
          If you didn't request this password reset, you can safely ignore this
          email - your password will remain unchanged.
        </Text>

        <Text className="text-gray-600 mb-4">
          For security reasons, this link will expire in 24 hours.
        </Text>

        <Text className="text-gray-600">
          Best regards,
          <br />
          The PawThera Team
        </Text>
      </Container>
    </EmailLayout>
  );
};

export default ResetPassword;
