import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface CancellationPolicyEmailProps {
  clientName: string
  professionalName: string
  appointmentDate: string
  appointmentTime: string
  serviceName: string
  daysBeforeAppointment: number
  refundPercent: number
}

export default function CancellationPolicyEmail({
  clientName,
  professionalName,
  appointmentDate,
  appointmentTime,
  serviceName,
  daysBeforeAppointment,
  refundPercent,
}: CancellationPolicyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Information importante concernant votre rendez-vous chez {professionalName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://biumecom.blob.core.windows.net/public/logo.png"
            width="120"
            height="40"
            alt="Biume"
            style={logo}
          />
          <Heading style={heading}>Information importante sur votre rendez-vous</Heading>
          <Section style={section}>
            <Text style={text}>Bonjour {clientName},</Text>
            <Text style={text}>
              Nous vous rappelons que vous avez un rendez-vous pour {serviceName} prévu le {appointmentDate} à{" "}
              {appointmentTime} chez {professionalName}.
            </Text>
            <Text style={text}>
              <strong>Information sur la politique d'annulation :</strong>
            </Text>
            <Text style={text}>
              À partir de maintenant, si vous annulez votre rendez-vous, vous serez remboursé à hauteur de{" "}
              {refundPercent}% du montant payé.
            </Text>
            <Text style={text}>
              Cette politique s'applique car nous sommes maintenant à {daysBeforeAppointment} jours de votre
              rendez-vous.
            </Text>
            <Text style={text}>
              Pour annuler ou modifier votre rendez-vous, vous pouvez le faire directement depuis votre espace client
              sur notre application ou notre site web.
            </Text>
            <Text style={text}>
              Nous vous remercions de votre compréhension et restons à votre disposition pour toute question.
            </Text>
            <Text style={signature}>L'équipe Biume</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>© {new Date().getFullYear()} Biume. Tous droits réservés.</Text>
          <Text style={footer}>Biume SAS, 15 rue des Fleurs, 75001 Paris, France</Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
}

const logo = {
  margin: "0 auto",
  display: "block",
  marginTop: "20px",
  marginBottom: "30px",
}

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#333",
  padding: "0 40px",
  margin: "0 0 20px",
  textAlign: "center" as const,
}

const section = {
  padding: "0 40px",
}

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#404040",
}

const signature = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#404040",
  marginTop: "32px",
  marginBottom: "0",
  fontWeight: "bold" as const,
}

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
}

const footer = {
  fontSize: "12px",
  lineHeight: "20px",
  color: "#9ca299",
  textAlign: "center" as const,
  marginBottom: "10px",
}
