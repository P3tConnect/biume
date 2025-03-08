"use server"

import { headers } from "next/headers"

import { stripe } from "@/src/lib"
import { auth } from "@/src/lib/auth"

// Créer un compte Connect vide
export async function createEmptyStripeConnectAccount() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user) {
      return { error: "Non autorisé" }
    }

    const account = await stripe.accounts.create({
      type: "custom",
      country: "FR", // Ou dynamique selon le pays de l'utilisateur
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      // Lier à un utilisateur dans votre système
      metadata: {
        userId: session.user.id,
      },
      business_type: "company",
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: "127.0.0.1", // Idéalement, utilisez l'adresse IP réelle de l'utilisateur
      },
    })

    return {
      data: account.id,
      error: null,
    }
  } catch (error: any) {
    console.error("Erreur création compte Stripe:", error)
    return {
      data: null,
      error: error.message,
    }
  }
}

// Fonction pour récupérer les informations du compte
export async function getStripeConnectAccountInfo({ accountId }: { accountId: string }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user) {
      return { error: "Non autorisé" }
    }

    const account = await stripe.accounts.retrieve(accountId)

    return {
      data: account,
      error: null,
    }
  } catch (error: any) {
    console.error("Erreur récupération compte Stripe:", error)
    return {
      data: null,
      error: error.message,
    }
  }
}

// Mettre à jour le profil business
export async function updateStripeConnectBusinessProfile({
  accountId,
  businessProfile,
}: {
  accountId: string
  businessProfile: {
    name: string
    url?: string
    mcc: string
    description: string
    support_email: string
    support_phone: string
  }
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user) {
      return { error: "Non autorisé" }
    }

    const account = await stripe.accounts.update(accountId, {
      business_profile: {
        name: businessProfile.name,
        url: businessProfile.url,
        mcc: businessProfile.mcc,
        product_description: businessProfile.description,
        support_email: businessProfile.support_email,
        support_phone: businessProfile.support_phone,
      },
    })

    return {
      data: account,
      error: null,
    }
  } catch (error: any) {
    console.error("Erreur mise à jour profil:", error)
    return {
      data: null,
      error: error.message,
    }
  }
}

// Ajouter un compte bancaire externe
export async function addStripeConnectBankAccount({
  accountId,
  bankAccountData,
}: {
  accountId: string
  bankAccountData: {
    country: string
    currency: string
    accountNumber: string
    accountHolderName: string
    accountHolderType: "individual" | "company"
  }
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user) {
      return { error: "Non autorisé" }
    }

    // Pour le typage correct, nous utilisons une chaîne directement
    // Cela sera converti par l'API Stripe en objet BankAccount
    const bankAccount = await stripe.accounts.createExternalAccount(accountId, {
      external_account: {
        object: "bank_account" as const,
        country: bankAccountData.country,
        currency: bankAccountData.currency,
        account_number: bankAccountData.accountNumber,
        account_holder_name: bankAccountData.accountHolderName,
        account_holder_type: bankAccountData.accountHolderType,
      } as any,
    })

    return {
      data: bankAccount,
      error: null,
    }
  } catch (error: any) {
    console.error("Erreur ajout compte bancaire:", error)
    return {
      data: null,
      error: error.message,
    }
  }
}

// Mettre à jour les informations légales de l'entreprise
export async function updateStripeConnectCompanyInfo({
  accountId,
  companyData,
}: {
  accountId: string
  companyData: {
    name: string
    tax_id: string
    address: {
      line1: string
      city: string
      postal_code: string
      country: string
    }
    phone: string
  }
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user) {
      return { error: "Non autorisé" }
    }

    const account = await stripe.accounts.update(accountId, {
      company: {
        name: companyData.name,
        tax_id: companyData.tax_id,
        address: {
          line1: companyData.address.line1,
          city: companyData.address.city,
          postal_code: companyData.address.postal_code,
          country: companyData.address.country,
        },
        phone: companyData.phone,
      },
    })

    return {
      data: account,
      error: null,
    }
  } catch (error: any) {
    console.error("Erreur mise à jour infos entreprise:", error)
    return {
      data: null,
      error: error.message,
    }
  }
}

// Ajouter/mettre à jour un représentant légal
export async function updateStripeConnectPerson({
  accountId,
  personData,
}: {
  accountId: string
  personData: {
    first_name: string
    last_name: string
    email: string
    phone: string
    dob: {
      day: number
      month: number
      year: number
    }
    address: {
      line1: string
      city: string
      postal_code: string
      country: string
    }
    relationship: {
      title: string
      owner: boolean
      representative: boolean
      executive: boolean
    }
    id_number?: string
  }
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user) {
      return { error: "Non autorisé" }
    }

    // Créer une nouvelle personne ou mettre à jour une existante
    // Dans un système complet, vous devriez gérer plusieurs personnes
    const person = await stripe.accounts.createPerson(accountId, {
      first_name: personData.first_name,
      last_name: personData.last_name,
      email: personData.email,
      phone: personData.phone,
      dob: personData.dob,
      address: personData.address,
      relationship: personData.relationship,
      id_number: personData.id_number,
    })

    return {
      data: person,
      error: null,
    }
  } catch (error: any) {
    console.error("Erreur mise à jour représentant:", error)
    return {
      data: null,
      error: error.message,
    }
  }
}
