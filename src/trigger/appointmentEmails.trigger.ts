import { task, schedules, schemaTask, wait } from "@trigger.dev/sdk/v3"
import { z } from "zod"
import NewReservationEmailPro from "@/emails/NewReservationEmailPro"
import ReservationWaitingEmailClient from "@/emails/ReservationWaitingEmailClient"
import RateEmail from "@/emails/RateEmail"
import AppointmentOTPEmail from "@/emails/AppointmentOTPEmail"
import PaymentReminderEmail from "@/emails/PaymentReminderEmail"
import { resend } from "@/src/lib/resend"
import { db } from "@/src/lib/db"
import { user } from "@/src/db"
import { eq } from "drizzle-orm"
import { cancelPolicies } from "@/src/db"
import CancellationRefundEmail from "@/emails/CancellationRefundEmail"
import CancellationPolicyEmail from "@/emails/CancellationPolicyEmail"

// Définition du schéma pour les données requises
const appointmentNotificationSchema = z.object({
  // Informations du client
  clientName: z.string(),
  clientEmail: z.string().email(),

  // Informations du professionnel
  professionalName: z.string(),
  professionalEmail: z.string().email(),

  // Informations du rendez-vous
  petNames: z.array(z.string()),
  serviceName: z.string(),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
  price: z.string(),

  // Identifiants optionnels
  appointmentId: z.string().optional(),
})

type AppointmentNotificationPayload = z.infer<typeof appointmentNotificationSchema>

export const sendAppointmentEmails = schemaTask({
  id: "send-appointment-emails",
  description: "Envoie des emails de confirmation au client et au professionnel lors de la prise d'un rendez-vous",
  schema: appointmentNotificationSchema,
  run: async payload => {
    console.log("Début de l'envoi des emails pour le rendez-vous", payload.appointmentId || "nouveau rendez-vous")

    // 1. Envoyer l'email au professionnel
    try {
      const proEmail = await resend.emails.send({
        from: "Biume <no-reply@biume.com>",
        to: payload.professionalEmail,
        subject: "Vous avez une nouvelle réservation",
        react: NewReservationEmailPro({
          customerName: payload.clientName,
          petName: payload.petNames.join(", "),
          serviceName: payload.serviceName,
          date: payload.appointmentDate,
          time: payload.appointmentTime,
          providerName: payload.professionalName,
          price: payload.price,
        }),
      })

      if (proEmail.error) {
        console.error("Erreur lors de l'envoi de l'email au professionnel:", proEmail.error)
        throw new Error(`Échec de l'envoi de l'email au professionnel: ${proEmail.error.message}`)
      }

      console.log("Email envoyé au professionnel avec succès")
    } catch (error) {
      console.error("Exception lors de l'envoi de l'email au professionnel:", error)
      throw error
    }

    // 2. Envoyer l'email au client
    try {
      const clientEmail = await resend.emails.send({
        from: "Biume <no-reply@biume.com>",
        to: payload.clientEmail,
        subject: "Merci pour votre réservation",
        react: ReservationWaitingEmailClient({
          clientName: payload.clientName,
          petName: payload.petNames.join(", "),
          serviceName: payload.serviceName,
          date: payload.appointmentDate,
          time: payload.appointmentTime,
          providerName: payload.professionalName,
        }),
      })

      if (clientEmail.error) {
        console.error("Erreur lors de l'envoi de l'email au client:", clientEmail.error)
        throw new Error(`Échec de l'envoi de l'email au client: ${clientEmail.error.message}`)
      }

      console.log("Email envoyé au client avec succès")
    } catch (error) {
      console.error("Exception lors de l'envoi de l'email au client:", error)
      throw error
    }

    return {
      success: true,
      professionalEmailSent: true,
      clientEmailSent: true,
      timestamp: new Date().toISOString(),
    }
  },
})

// Exemple de payload pour faciliter les tests
export const exampleAppointmentPayload: AppointmentNotificationPayload = {
  clientName: "Jean Dupont",
  clientEmail: "client@example.com",
  professionalName: "Clinique Vétérinaire ABC",
  professionalEmail: "pro@example.com",
  petNames: ["Rex", "Mimi"],
  serviceName: "Consultation de routine",
  appointmentDate: "15 juin 2023",
  appointmentTime: "14:30",
  price: "45€",
  appointmentId: "apt_123456789",
}

// Schéma pour les données d'évaluation
const rateOrganizationSchema = z.object({
  // Informations du client
  clientName: z.string(),
  clientEmail: z.string().email(),

  // Informations du professionnel
  professionalName: z.string(),

  // Informations du rendez-vous
  serviceName: z.string(),
  appointmentDate: z.string(),
  appointmentId: z.string(),
})

type RateOrganizationPayload = z.infer<typeof rateOrganizationSchema>

export const sendRateOrgEmail = schemaTask({
  id: "send-rate-org-email",
  description: "Envoie un email au client pour évaluer l'organisation 2 jours après la réservation",
  schema: rateOrganizationSchema,
  run: async payload => {
    console.log("Envoi d'un email d'évaluation pour le rendez-vous", payload.appointmentId)

    try {
      const emailResult = await resend.emails.send({
        from: "Biume <no-reply@biume.com>",
        to: payload.clientEmail,
        subject: `Comment s'est passé votre rendez-vous chez ${payload.professionalName} ?`,
        react: RateEmail({
          clientName: payload.clientName,
          professionalName: payload.professionalName,
          appointmentDate: payload.appointmentDate,
          appointmentId: payload.appointmentId,
          serviceName: payload.serviceName,
        }),
      })

      if (emailResult.error) {
        console.error("Erreur lors de l'envoi de l'email d'évaluation:", emailResult.error)
        throw new Error(`Échec de l'envoi de l'email d'évaluation: ${emailResult.error.message}`)
      }

      console.log("Email d'évaluation envoyé avec succès")
      return {
        success: true,
        emailSent: true,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Exception lors de l'envoi de l'email d'évaluation:", error)
      throw error
    }
  },
})

// Fonction pour planifier l'évaluation 2 jours après un rendez-vous
export const scheduleRatingEmail = schemaTask({
  id: "schedule-rating-email",
  description: "Planifie l'envoi d'un email d'évaluation 2 jours après un rendez-vous",
  schema: rateOrganizationSchema,
  run: async payload => {
    // Calcul de la date 2 jours après le rendez-vous
    // Convertir la date de format français en objet Date
    const dateParts = payload.appointmentDate.split(" ")
    const day = parseInt(dateParts[0])

    // Conversion du nom de mois français en nombre
    const monthNames = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ]
    const monthIndex = monthNames.indexOf(dateParts[1].toLowerCase())

    const year = parseInt(dateParts[2])

    const appointmentDate = new Date(year, monthIndex, day)
    const ratingDate = new Date(appointmentDate)
    ratingDate.setDate(ratingDate.getDate() + 2)

    // Planifier l'envoi de l'email d'évaluation à 10h00 du matin 2 jours après
    ratingDate.setHours(10, 0, 0, 0)

    // Vérifier que la date calculée est dans le futur
    const now = new Date()
    if (ratingDate <= now) {
      console.log("La date d'évaluation est déjà passée, envoi immédiat")
      return await sendRateOrgEmail.trigger(payload)
    }

    console.log(`Email d'évaluation programmé pour le ${ratingDate.toLocaleString("fr-FR")} via wait.until`)

    // Utilisation de wait.until au lieu du cron
    await wait.until({ date: ratingDate })

    // Une fois la date atteinte, déclencher l'envoi de l'email
    return await sendRateOrgEmail.trigger(payload)
  },
})

// Schéma pour les données d'OTP avant rendez-vous
const otpReminderSchema = z.object({
  // Informations du client
  clientId: z.string(),
  clientName: z.string(),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),

  // Informations du professionnel
  professionalName: z.string(),

  // Informations du rendez-vous
  serviceName: z.string(),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
  appointmentId: z.string(),

  // Préférences de notification (optionnel, sera vérifié en base si non fourni)
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
})

type OTPReminderPayload = z.infer<typeof otpReminderSchema>

// Fonction génératrice de code OTP
function generateOTP(length = 6): string {
  const digits = "0123456789"
  let otp = ""
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)]
  }
  return otp
}

// Tâche pour envoyer un OTP par email ou SMS (ou les deux) selon les préférences de l'utilisateur
export const sendAppointmentOTP = schemaTask({
  id: "send-appointment-otp",
  description: "Envoie un code OTP au client 1 heure avant son rendez-vous par email ou SMS selon ses préférences",
  schema: otpReminderSchema,
  run: async payload => {
    console.log("Envoi d'un code OTP pour le rendez-vous", payload.appointmentId)

    // Vérifier les préférences de notification si elles ne sont pas fournies
    let emailEnabled = payload.emailNotifications
    let smsEnabled = payload.smsNotifications

    if (emailEnabled === undefined || smsEnabled === undefined) {
      try {
        // Récupérer les préférences de l'utilisateur depuis la base de données
        const userPrefs = await db.query.user.findFirst({
          where: eq(user.id, payload.clientId),
          columns: {
            emailNotifications: true,
            smsNotifications: true,
            email: true,
            phoneNumber: true,
          },
        })

        if (userPrefs) {
          emailEnabled = emailEnabled ?? userPrefs.emailNotifications
          smsEnabled = smsEnabled ?? userPrefs.smsNotifications

          // Si email ou téléphone manquant dans le payload, utiliser ceux de la BDD
          if (!payload.clientEmail && userPrefs.email) {
            payload.clientEmail = userPrefs.email
          }

          if (!payload.clientPhone && userPrefs.phoneNumber) {
            payload.clientPhone = userPrefs.phoneNumber
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des préférences utilisateur:", error)
      }
    }

    // Générer un code OTP
    const otpCode = generateOTP(6)

    // TODO: Stocker l'OTP en BDD pour vérification ultérieure si nécessaire

    let emailSent = false
    let smsSent = false

    // Envoyer par email si activé
    if (emailEnabled && payload.clientEmail) {
      try {
        const emailResult = await resend.emails.send({
          from: "Biume <no-reply@biume.com>",
          to: payload.clientEmail,
          subject: `Votre code d'accès pour votre rendez-vous chez ${payload.professionalName}`,
          react: AppointmentOTPEmail({
            clientName: payload.clientName,
            professionalName: payload.professionalName,
            appointmentDate: payload.appointmentDate,
            appointmentTime: payload.appointmentTime,
            serviceName: payload.serviceName,
            otpCode,
          }),
        })

        if (emailResult.error) {
          console.error("Erreur lors de l'envoi de l'email OTP:", emailResult.error)
        } else {
          emailSent = true
          console.log("Email OTP envoyé avec succès")
        }
      } catch (error) {
        console.error("Exception lors de l'envoi de l'email OTP:", error)
      }
    }

    // Retourner le résultat
    return {
      success: emailSent || smsSent,
      emailSent,
      smsSent,
      otpCode,
      timestamp: new Date().toISOString(),
    }
  },
})

// Fonction pour planifier l'envoi de l'OTP 1 heure avant le rendez-vous
export const scheduleOTPReminder = schemaTask({
  id: "schedule-otp-reminder",
  description: "Planifie l'envoi d'un code OTP 1 heure avant un rendez-vous",
  schema: otpReminderSchema,
  run: async payload => {
    // Convertir la date et l'heure du rendez-vous en objet Date
    // Format: "15 juin 2023" "14:30"
    try {
      const dateParts = payload.appointmentDate.split(" ")
      const day = parseInt(dateParts[0])

      // Conversion du nom de mois français en nombre
      const monthNames = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ]
      const monthIndex = monthNames.indexOf(dateParts[1].toLowerCase())

      const year = parseInt(dateParts[2])

      // Extraction de l'heure et des minutes
      const timeParts = payload.appointmentTime.split(":")
      const hour = parseInt(timeParts[0])
      const minute = parseInt(timeParts[1])

      // Création de la date du rendez-vous
      const appointmentDate = new Date(year, monthIndex, day, hour, minute)

      // Calcul de la date 1 heure avant le rendez-vous
      const reminderDate = new Date(appointmentDate)
      reminderDate.setHours(reminderDate.getHours() - 1)

      // Vérifier que la date calculée est dans le futur
      const now = new Date()
      if (reminderDate <= now) {
        console.log("La date de rappel est déjà passée, envoi immédiat")
        return await sendAppointmentOTP.trigger(payload)
      }

      console.log(
        `Envoi d'OTP programmé pour le ${reminderDate.toLocaleString("fr-FR")} (1h avant le rendez-vous) via wait.until`
      )

      // Utilisation de wait.until au lieu du cron
      await wait.until({ date: reminderDate })

      // Une fois la date atteinte, déclencher l'envoi de l'OTP
      return await sendAppointmentOTP.trigger(payload)
    } catch (error) {
      console.error("Erreur lors de la programmation du rappel OTP:", error)
      throw error
    }
  },
})

// Schéma pour les données de rappel avant rendez-vous payé en ligne
const onlinePaymentReminderSchema = z.object({
  // Informations du client
  idClient: z.string(),
  clientName: z.string(),
  clientEmail: z.string().email(),

  // Informations du professionnel
  professionalName: z.string(),

  // Informations du rendez-vous
  petNames: z.array(z.string()).optional(),
  serviceName: z.string(),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
  appointmentId: z.string(),
  paymentAmount: z.string().optional(),
})

type OnlinePaymentReminderPayload = z.infer<typeof onlinePaymentReminderSchema>

// Tâche pour envoyer un rappel de rendez-vous payé en ligne
export const sendOnlinePaymentReminder = schemaTask({
  id: "send-online-payment-reminder",
  description: "Envoie un rappel au client 2 jours avant un rendez-vous payé en ligne",
  schema: onlinePaymentReminderSchema,
  run: async payload => {
    console.log("Envoi d'un rappel pour le rendez-vous payé en ligne", payload.appointmentId)

    try {
      const emailResult = await resend.emails.send({
        from: "Biume <no-reply@biume.com>",
        to: payload.clientEmail,
        subject: `Rappel : Votre rendez-vous chez ${payload.professionalName} dans 2 jours`,
        react: PaymentReminderEmail({
          idClient: payload.idClient,
          clientName: payload.clientName,
          professionalName: payload.professionalName,
          appointmentDate: payload.appointmentDate,
          appointmentTime: payload.appointmentTime,
          serviceName: payload.serviceName,
          petNames: payload.petNames,
          paymentAmount: payload.paymentAmount,
        }),
      })

      if (emailResult.error) {
        console.error("Erreur lors de l'envoi du rappel de rendez-vous payé en ligne:", emailResult.error)
        throw new Error(`Échec de l'envoi du rappel: ${emailResult.error.message}`)
      }

      console.log("Rappel de rendez-vous payé en ligne envoyé avec succès")
      return {
        success: true,
        emailSent: true,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Exception lors de l'envoi du rappel de rendez-vous payé en ligne:", error)
      throw error
    }
  },
})

// Fonction pour planifier l'envoi du rappel 2 jours avant un rendez-vous payé en ligne
export const scheduleOnlinePaymentReminder = schemaTask({
  id: "schedule-online-payment-reminder",
  description: "Planifie l'envoi d'un rappel 2 jours avant un rendez-vous payé en ligne",
  schema: onlinePaymentReminderSchema,
  run: async payload => {
    // Calcul de la date 2 jours avant le rendez-vous
    try {
      const dateParts = payload.appointmentDate.split(" ")
      const day = parseInt(dateParts[0])

      // Conversion du nom de mois français en nombre
      const monthNames = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ]
      const monthIndex = monthNames.indexOf(dateParts[1].toLowerCase())

      const year = parseInt(dateParts[2])

      // Extraction de l'heure et des minutes pour le contexte, mais on envoie à 10h du matin
      const appointmentDate = new Date(year, monthIndex, day)
      const reminderDate = new Date(appointmentDate)
      reminderDate.setDate(reminderDate.getDate() - 2) // 2 jours avant le rendez-vous

      // Envoyer le rappel à 10h du matin
      reminderDate.setHours(10, 0, 0, 0)

      // Vérifier que la date calculée est dans le futur
      const now = new Date()
      if (reminderDate <= now) {
        console.log("La date de rappel est déjà passée, envoi immédiat")
        return await sendOnlinePaymentReminder.trigger(payload)
      }

      console.log(
        `Rappel de rendez-vous payé en ligne programmé pour le ${reminderDate.toLocaleString("fr-FR")} (2 jours avant) via wait.until`
      )

      // Utilisation de wait.until au lieu du cron
      await wait.until({ date: reminderDate })

      // Une fois la date atteinte, déclencher l'envoi du rappel
      return await sendOnlinePaymentReminder.trigger(payload)
    } catch (error) {
      console.error("Erreur lors de la programmation du rappel de rendez-vous payé en ligne:", error)
      throw error
    }
  },
})

// Schéma pour les données d'annulation de rendez-vous avec paiement en ligne
const cancelPaymentSchema = z.object({
  // Informations du client
  clientId: z.string(),
  clientName: z.string(),
  clientEmail: z.string().email(),

  // Informations du professionnel
  professionalId: z.string(), // ID de l'organisation
  professionalName: z.string(),

  // Informations du rendez-vous
  appointmentId: z.string(),
  serviceName: z.string(),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
  paymentAmount: z.string(),

  // Date d'annulation
  cancelDate: z.string().optional(), // Si non fourni, utilise la date actuelle
})

type CancelPaymentPayload = z.infer<typeof cancelPaymentSchema>

// Email pour informer le client du remboursement lors d'une annulation
export const sendCancellationRefundEmail = schemaTask({
  id: "send-cancellation-refund-email",
  description: "Envoie un email au client pour l'informer du remboursement partiel ou total lors d'une annulation",
  schema: cancelPaymentSchema,
  run: async payload => {
    console.log("Traitement de l'annulation pour le rendez-vous", payload.appointmentId)

    try {
      // Vérifier les politiques d'annulation de l'organisation
      const cancelPoliciesResult = await db.query.cancelPolicies.findMany({
        where: eq(cancelPolicies.organizationId, payload.professionalId),
        orderBy: (cancelPolicies, { asc }) => [asc(cancelPolicies.daysBefore)],
      })

      if (!cancelPoliciesResult || cancelPoliciesResult.length === 0) {
        console.log("Aucune politique d'annulation trouvée pour cette organisation, remboursement complet")
        // Informer le client d'un remboursement à 100%
        const emailResult = await resend.emails.send({
          from: "Biume <no-reply@biume.com>",
          to: payload.clientEmail,
          subject: `Annulation de votre rendez-vous chez ${payload.professionalName}`,
          react: CancellationRefundEmail(),
        })

        if (emailResult.error) {
          throw new Error(`Échec de l'envoi de l'email d'annulation: ${emailResult.error.message}`)
        }

        return {
          success: true,
          refundPercent: 100,
          refundAmount: payload.paymentAmount,
          emailSent: true,
          timestamp: new Date().toISOString(),
        }
      }

      // Calculer le nombre de jours entre aujourd'hui et la date du rendez-vous
      const cancelDate = payload.cancelDate ? new Date(payload.cancelDate) : new Date()

      // Convertir la date du rendez-vous (format français) en objet Date
      const dateParts = payload.appointmentDate.split(" ")
      const day = parseInt(dateParts[0])
      const monthNames = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ]
      const monthIndex = monthNames.indexOf(dateParts[1].toLowerCase())
      const year = parseInt(dateParts[2])

      // Ajouter l'heure du rendez-vous
      const timeParts = payload.appointmentTime.split(":")
      const hour = parseInt(timeParts[0])
      const minute = parseInt(timeParts[1])

      const appointmentDate = new Date(year, monthIndex, day, hour, minute)

      // Calculer la différence en jours
      const differenceInTime = appointmentDate.getTime() - cancelDate.getTime()
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

      // Déterminer le pourcentage de remboursement en fonction des politiques d'annulation
      let refundPercent = 100 // Par défaut, remboursement total

      for (const policy of cancelPoliciesResult) {
        if (differenceInDays <= policy.daysBefore) {
          refundPercent = policy.refundPercent
          break
        }
      }

      // Calculer le montant du remboursement
      const paymentAmount = parseFloat(payload.paymentAmount.replace("€", "").replace(",", "."))
      const refundAmount = ((paymentAmount * refundPercent) / 100).toFixed(2) + "€"

      // Envoyer l'email avec les informations de remboursement
      const emailResult = await resend.emails.send({
        from: "Biume <no-reply@biume.com>",
        to: payload.clientEmail,
        subject: `Annulation de votre rendez-vous chez ${payload.professionalName}`,
        react: CancellationRefundEmail(),
      })

      if (emailResult.error) {
        throw new Error(`Échec de l'envoi de l'email d'annulation: ${emailResult.error.message}`)
      }

      console.log(`Email d'annulation avec remboursement de ${refundPercent}% envoyé avec succès`)

      // TODO: Déclencher le remboursement via Stripe ici si nécessaire

      return {
        success: true,
        refundPercent: refundPercent,
        refundAmount: refundAmount,
        emailSent: true,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Exception lors du traitement de l'annulation:", error)
      throw error
    }
  },
})

// Tâche pour vérifier si une politique d'annulation doit être appliquée
export const checkCancellationPolicy = schemaTask({
  id: "check-cancellation-policy",
  description: "Vérifie si une politique d'annulation doit être appliquée pour un rendez-vous payé en ligne",
  schema: cancelPaymentSchema,
  run: async payload => {
    try {
      // Vérifier si le rendez-vous a été payé en ligne
      // Ici, nous supposons que cette information est passée dans le payload

      console.log(`Vérification des politiques d'annulation pour le rendez-vous ${payload.appointmentId}`)

      // Nous utilisons wait.until pour attendre jusqu'à la date limite définie par la politique d'annulation
      // Pour l'exemple, nous supposons que nous voulons vérifier 48h avant le rendez-vous

      // Convertir la date du rendez-vous (format français) en objet Date
      const dateParts = payload.appointmentDate.split(" ")
      const day = parseInt(dateParts[0])
      const monthNames = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ]
      const monthIndex = monthNames.indexOf(dateParts[1].toLowerCase())
      const year = parseInt(dateParts[2])

      // Ajouter l'heure du rendez-vous
      const timeParts = payload.appointmentTime.split(":")
      const hour = parseInt(timeParts[0])
      const minute = parseInt(timeParts[1])

      const appointmentDate = new Date(year, monthIndex, day, hour, minute)

      // Récupérer les politiques d'annulation de l'organisation
      const cancelPoliciesResult = await db.query.cancelPolicies.findMany({
        where: eq(cancelPolicies.organizationId, payload.professionalId),
        orderBy: (cancelPolicies, { asc }) => [asc(cancelPolicies.daysBefore)],
      })

      if (!cancelPoliciesResult || cancelPoliciesResult.length === 0) {
        console.log("Aucune politique d'annulation trouvée pour cette organisation")
        return {
          success: false,
          message: "Aucune politique d'annulation définie",
        }
      }

      // Pour chaque politique d'annulation, programmer une vérification à la date limite
      for (const policy of cancelPoliciesResult) {
        // Calculer la date limite pour cette politique
        const deadlineDate = new Date(appointmentDate)
        deadlineDate.setDate(deadlineDate.getDate() - policy.daysBefore)

        // Vérifier si la date limite est déjà passée
        if (deadlineDate <= new Date()) {
          console.log(`La date limite pour la politique à ${policy.daysBefore} jours est déjà passée`)
          continue
        }

        console.log(
          `Programmation d'une vérification pour la politique à ${policy.daysBefore} jours le ${deadlineDate.toLocaleString("fr-FR")}`
        )

        // Attendre jusqu'à la date limite
        await wait.until({ date: deadlineDate })

        // À la date limite, envoyer un email au client pour l'informer de la politique d'annulation
        const emailResult = await resend.emails.send({
          from: "Biume <no-reply@biume.com>",
          to: payload.clientEmail,
          subject: `Information importante concernant votre rendez-vous chez ${payload.professionalName}`,
          react: CancellationPolicyEmail(),
        })

        if (emailResult.error) {
          console.error("Erreur lors de l'envoi de l'email de politique d'annulation:", emailResult.error)
        } else {
          console.log(`Email de politique d'annulation envoyé avec succès pour la limite de ${policy.daysBefore} jours`)
        }
      }

      return {
        success: true,
        message: "Toutes les vérifications de politique d'annulation ont été effectuées",
      }
    } catch (error) {
      console.error("Exception lors de la vérification des politiques d'annulation:", error)
      throw error
    }
  },
})
