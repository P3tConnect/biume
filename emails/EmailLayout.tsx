import { safeConfig } from "@/src/lib";
import { Body, Container, Head, Html, Tailwind, Img, Preview, Section, Link } from "@react-email/components";
import * as React from 'react';

const baseUrl = safeConfig.NEXT_PUBLIC_APP_URL
  ? `https://${safeConfig.NEXT_PUBLIC_APP_URL}`
  : `http://localhost:3000`;

export const EmailLayout = ({ preview, children }: React.PropsWithChildren<{ preview?: string }>) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        {preview ? <Preview>Dropbox reset your password</Preview> : null}
        <Body
          className="bg-gray-50 py-2"
          style={{
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Container className="border border-gray-200 bg-white p-11">
            <div className="flex items-center gap-2">
              <Img
                src="https://i.imgur.com/ul79l8a.png"
                width='50'
                height="auto"
                alt="Logo PawThera"
              />
              <Link href={baseUrl} className="text-black">
                <h2>PawThera</h2>
              </Link>
            </div>
            <Section>
              {children}
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}