import { safeConfig } from "@/src/lib";
import { Body, Container, Head, Html, Tailwind, Img, Preview, Section, Link } from "@react-email/components";
import * as React from 'react';

export const EmailLayout = ({ preview, children }: React.PropsWithChildren<{ preview?: string }>) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        {preview ? <Preview>Dropbox reset your password</Preview> : null}
        <div className="flex justify-center items-center gap-2 pb-2">
          <Img
            src="https://i.imgur.com/ul79l8a.png"
            width='50'
            height="auto"
            alt="Logo PawThera"
          />
        </div>
        <Body
          className="bg-gray-50 py-2"
          style={{
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Container className="border border-gray-200 bg-white p-11">
            <Section>
              {children}
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}