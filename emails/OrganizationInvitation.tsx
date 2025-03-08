import React from "react";
import { EmailLayout } from "./EmailLayout";
import {
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OrganizationInvitationProps {
  inviterName?: string;
  organizationName?: string;
  inviteLink?: string;
}

const OrganizationInvitation = ({
  inviterName = "Team Member",
  organizationName = "Biume",
  inviteLink = "https://biume.com/invite",
}: OrganizationInvitationProps) => {
  return (
    <EmailLayout>
      <Preview>Join {organizationName} on Biume</Preview>

      <Section style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hello,</Text>
          <Text style={paragraph}>
            {inviterName} has invited you to join their organization{" "}
            <strong>{organizationName}</strong> on Biume. Join their team to
            start collaborating and managing your veterinary practice together.
          </Text>

          <Button style={{ ...button, padding: "12px 20px" }} href={inviteLink}>
            Join {organizationName}
          </Button>

          <Text style={paragraph}>
            If you're having trouble with the button above, copy and paste this
            URL into your browser:
          </Text>
          <Text style={link}>{inviteLink}</Text>

          <Hr style={hr} />

          <Text style={footer}>
            This invitation was sent from Biume. If you were not expecting this
            invitation, you can ignore this email.
          </Text>
        </Container>
      </Section>
    </EmailLayout>
  );
};

export default OrganizationInvitation;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
};

const button = {
  backgroundColor: "#0891b2",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  margin: "32px 0",
};

const link = {
  color: "#0891b2",
  textDecoration: "underline",
  fontSize: "14px",
  wordBreak: "break-all" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "42px 0 26px",
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  lineHeight: "24px",
};
