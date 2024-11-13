import { Body, Container, Head, Html, Tailwind, Img, Preview, Section, Text , Row, Column, Link } from "@react-email/components";
import * as React from 'react';

export const EmailLayout = ({ preview, children }: React.PropsWithChildren<{ preview?: string }>) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        {preview ? <Preview>Dropbox reset your password</Preview> : null}
        <Container>
          <div className="flex flex-col items-center justify-center gap-2 pb-2">
            <Img
              src="https://i.imgur.com/zj63mcF.png"
              width='50'
              height="auto"
              alt="Logo PawThera"
            />
          </div>
        </Container>
        <Body
          className="bg-gray-50 py-2"
          style={{
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Container className="border border-gray-200 bg-white p-10 shadow-md rounded-xl">
            <Section>
              {children}
            </Section>
          </Container>
          <Section className="text-center pt-5">
              <table className="w-full">
                <tr className="w-full">
                  <td align="center">
                    <Img
                      alt="React Email logo"
                      width="50"
                      height="auto"
                      src="https://i.imgur.com/zj63mcF.png"
                    />
                  </td>
                </tr>
                <tr className="w-full">
                  <td align="center">
                    <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900">
                      PawThera 
                    </Text>
                    <Text className="mb-0 mt-[4px] text-[16px] leading-[24px] text-gray-500">
                      Think different
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Row className="table-cell h-[44px] w-[56px] align-bottom">
                      <Column className="pr-[8px]">
                        <Link href="#">
                          <Img
                            alt="Facebook"
                            height="36"
                            src="https://react.email/static/facebook-logo.png"
                            width="36"
                          />
                        </Link>
                      </Column>
                      <Column className="pr-[8px]">
                        <Link href="#">
                          <Img alt="X" height="36" src="https://react.email/static/x-logo.png" width="36" />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="#">
                          <Img
                            alt="Instagram"
                            height="36"
                            src="https://react.email/static/instagram-logo.png"
                            width="36"
                          />
                        </Link>
                      </Column>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-500">
                      123 Main Street Anytown, CA 12345
                    </Text>
                    <Text className="mb-0 mt-[4px] text-[16px] font-semibold leading-[24px] text-gray-500">
                      mail@example.com
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}