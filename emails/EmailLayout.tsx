import {
  Body,
  Container,
  Head,
  Html,
  Tailwind,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

export const EmailLayout = ({
  preview,
  children,
}: React.PropsWithChildren<{ preview?: string }>) => {
  const mainColor = "#4F46E5"; // Indigo primary color

  return (
    <Tailwind>
      <Html>
        <Head />
        {preview && <Preview>{preview}</Preview>}
        <Body className="bg-white my-auto mx-auto font-sans">
          {/* Top Banner */}
          <Section className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 py-4">
            <Container className="mx-auto text-center">
              <Img
                src="https://i.imgur.com/zj63mcF.png"
                width="40"
                height="auto"
                alt="Biume"
                className="mx-auto mb-2"
              />
              <Text className="text-white text-sm font-medium m-0">Biume</Text>
            </Container>
          </Section>

          {/* Main Content */}
          <Container className="mx-auto px-6 py-12 max-w-[600px]">
            {/* Content Area */}
            <Section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              {children}
            </Section>

            {/* Divider */}
            <Section className="my-10">
              <div className="h-px w-full max-w-[80px] mx-auto bg-gray-200" />
            </Section>

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-sm text-gray-600 mb-4">
                Connect with us
              </Text>

              {/* Social Links - Modern Icons */}
              <Section className="mb-8">
                <Link
                  href="https://facebook.com"
                  className="mx-2 text-gray-600 hover:text-indigo-600"
                >
                  <Img
                    src="https://i.imgur.com/sS9jIAF.png"
                    width="20"
                    height="20"
                    alt="Facebook"
                    className="inline-block"
                  />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="mx-2 text-gray-600 hover:text-indigo-600"
                >
                  <Img
                    src="https://i.imgur.com/uX6hOt0.png"
                    width="20"
                    height="20"
                    alt="Twitter"
                    className="inline-block"
                  />
                </Link>
                <Link
                  href="https://instagram.com"
                  className="mx-2 text-gray-600 hover:text-indigo-600"
                >
                  <Img
                    src="https://i.imgur.com/NA6bUxY.png"
                    width="20"
                    height="20"
                    alt="Instagram"
                    className="inline-block"
                  />
                </Link>
              </Section>

              <Text className="text-xs text-gray-400 mb-4">
                Transforming pet care with innovative solutions
              </Text>

              <div className="text-xs text-gray-400 leading-relaxed">
                <Text className="m-0">Biume Inc.</Text>
              </div>

              <Section className="mt-6">
                <Link
                  href="mailto:hello@biume.com"
                  className="text-xs text-indigo-600 hover:text-indigo-700 no-underline"
                >
                  hello@biume.com
                </Link>
              </Section>

              <Text className="text-xs text-gray-400 mt-6">
                © {new Date().getFullYear()} Biume. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
