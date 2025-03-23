import { Body, Container, Head, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components"
import * as React from "react"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"

export const EmailLayout = ({ preview, children }: React.PropsWithChildren<{ preview?: string }>) => {
  const mainColor = "#4F46E5" // Indigo primary color

  return (
    <Tailwind>
      <Html>
        <Head>
          <meta name="x-apple-disable-message-reformatting" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
          <meta name="x-mailer-avatar" content="https://i.imgur.com/UPZ3wWu.png" />
        </Head>
        {preview && <Preview>{preview}</Preview>}
        <Body className="bg-gray-50 my-auto mx-auto font-sans">
          {/* Top Banner */}
          <Section className="w-full bg-white border-b border-gray-200 py-6">
            <Container className="mx-auto text-center">
              <Img src="https://i.imgur.com/UPZ3wWu.png" width="48" height="auto" alt="Biume" className="mx-auto" />
            </Container>
          </Section>

          {/* Main Content */}
          <Container className="mx-auto px-6 py-8 max-w-[600px]">
            {/* Content Area */}
            <Section className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">{children}</Section>

            {/* Footer */}
            <Section className="text-center mt-12">
              <Text className="text-sm text-gray-600 mb-6">Suivez-nous sur les réseaux sociaux</Text>

              {/* Social Links - Modern Icons */}
              <Section className="mb-8 flex justify-center space-x-4 gap-4">
                <Link
                  href="https://www.linkedin.com/company/biume"
                  className="text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <FaLinkedin size={24} />
                </Link>
                <Link
                  href="https://instagram.com/biume_app"
                  className="text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <FaInstagram size={24} />
                </Link>
              </Section>

              <Text className="text-sm text-gray-500 mb-4">
                Transformez la gestion de votre activité animale avec Biume
              </Text>

              <div className="text-sm text-gray-400 leading-relaxed">
                <Text className="m-0">Biume SAS</Text>
              </div>

              <Section className="mt-4">
                <Link
                  href="mailto:contact@biume.com"
                  className="text-sm text-indigo-600 hover:text-indigo-700 no-underline"
                >
                  contact@biume.com
                </Link>
              </Section>

              <Text className="text-xs text-gray-400 mt-6">
                © {new Date().getFullYear()} Biume. Tous droits réservés.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
