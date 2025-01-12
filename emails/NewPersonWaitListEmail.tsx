import React from "react";
import { EmailLayout } from "./EmailLayout";
import {
  Container,
  Text,
  Heading,
  Section,
  Link,
} from "@react-email/components";

const NewPersonWaitList = ({ subEmail }: { subEmail: string }) => {
  return (
    <EmailLayout>
      <Container>
        <Section style={{ padding: "20px 0" }}>
          <Heading
            as="h2"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              margin: "10px 0",
              color: "#1a1a1a",
            }}
          >
            New Waitlist Subscriber
          </Heading>
        </Section>

        <Section style={{ padding: "20px 0" }}>
          <Text
            style={{
              fontSize: "16px",
              color: "#4a4a4a",
              margin: "0 0 15px 0",
              textAlign: "center",
            }}
          >
            Great news! A new person has joined the PawThera waitlist.
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#4a4a4a",
              margin: "0 0 15px 0",
              textAlign: "center",
            }}
          >
            Subscriber Email:{" "}
            <Link
              href={`mailto:${subEmail}`}
              style={{
                color: "#0070f3",
                textDecoration: "none",
              }}
            >
              {subEmail}
            </Link>
          </Text>
        </Section>

        <Section style={{ padding: "20px 0", textAlign: "center" }}>
          <Text
            style={{
              fontSize: "14px",
              color: "#666666",
              margin: "0",
            }}
          >
            Remember to follow up with the subscriber and keep them updated on
            our progress.
          </Text>
        </Section>
      </Container>
    </EmailLayout>
  );
};

export default NewPersonWaitList;
