import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface CancellationRefundEmailProps {
  clientName: string
  professionalName: string
  appointmentDate: string
  appointmentTime: string
  serviceName: string
  paymentAmount: string
  refundPercent: number
  refundAmount: string
}

export default function CancellationRefundEmail({
  clientName,
  professionalName,
  appointmentDate,
  appointmentTime,
  serviceName,
  paymentAmount,
  refundPercent,
  refundAmount,
}: CancellationRefundEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirmation d'annulation de votre rendez-vous chez {professionalName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://biumecom.blob.core.windows.net/public/logo.png"
            width="120"
            height="40"
            alt="Biume"
            style={logo}
          />
          <Heading style={heading}>Annulation de réservation confirmée</Heading>
          <Section style={section}>
            <Text style={text}>Bonjour {clientName},</Text>
            <Text style={text}>
              Nous vous confirmons l'annulation de votre rendez-vous pour {serviceName} du {appointmentDate} à{" "}
              {appointmentTime} chez {professionalName}.
            </Text>
            <Text style={text}>
              <strong>Détails du remboursement :</strong>
            </Text>
            <Text style={text}>
              Montant initial : {paymentAmount}
              <br />
              Pourcentage de remboursement : {refundPercent}%
              <br />
              Montant remboursé : {refundAmount}
            </Text>
            {refundPercent < 100 ? (
              <Text style={text}>
                Conformément à la politique d'annulation du professionnel, un remboursement partiel de {refundPercent}%
                vous a été accordé.
              </Text>
            ) : (
              <Text style={text}>Un remboursement total vous a été accordé.</Text>
            )}
            <Text style={text}>
              Le remboursement sera traité dans les 5 à 10 jours ouvrables sur votre moyen de paiement initial.
            </Text>
            <Text style={text}>Nous espérons vous revoir bientôt sur Biume.</Text>
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
