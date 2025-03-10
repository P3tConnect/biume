"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Clock, ExternalLink, RefreshCw, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createStripeConnectOnboardingLink, getStripeConnectAccountInfo } from "@/src/actions/stripe.action"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"

interface StripeConnectAccountInfo {
  id: string
  chargesEnabled: boolean
  payoutsEnabled: boolean
  detailsSubmitted: boolean
  requirements: {
    currently_due: string[]
    eventually_due: string[]
    past_due: string[]
    pending_verification: string[]
  }
  email: string
  businessProfile: {
    name?: string
    url?: string
  }
}

// Ajouter ce composant pour l'indicateur de progression circulaire
const CircularProgress = ({
  value,
  size = 120,
  strokeWidth = 10,
  className = "",
  label,
  color = "text-primary",
}: {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  label?: string | React.ReactNode
  color?: string
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const dash = (value * circumference) / 100

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-800"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          className={color}
          strokeLinecap="round"
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {typeof label !== "undefined" ? (
          label
        ) : (
          <>
            <span className="text-2xl font-bold">{Math.round(value)}%</span>
            <span className="text-xs text-muted-foreground">Complété</span>
          </>
        )}
      </div>
    </div>
  )
}

export default function KYBSection() {
  const [onboardingLoading, setOnboardingLoading] = useState(false)
  const [accountInfo, setAccountInfo] = useState<StripeConnectAccountInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDashboardLink, setShowDashboardLink] = useState(false)

  const {
    data: accountInfoData,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["stripeConnectAccount"],
    queryFn: async () => {
      const result = await getStripeConnectAccountInfo({})
      if (result.error) {
        throw new Error(result.error)
      }
      return result.data as unknown as StripeConnectAccountInfo
    },
    refetchOnWindowFocus: false,
  })

  console.log(accountInfoData, "accountInfoData");

  // Mettre à jour accountInfo quand accountInfoData change
  useEffect(() => {
    if (accountInfoData) {
      setAccountInfo(accountInfoData)
      setLoading(false)

      // Montrer le lien vers le dashboard si le compte est configuré
      if (accountInfoData.detailsSubmitted) {
        setShowDashboardLink(true)
      }
    }
  }, [accountInfoData])

  const error = queryError
    ? (queryError as Error).message || "Erreur lors de la récupération des informations du compte"
    : null

  const startOnboarding = async () => {
    try {
      setOnboardingLoading(true)
      const result = await createStripeConnectOnboardingLink({})
      if (result.error) {
        throw new Error(result.error)
      }
      const onboardingUrl = result.data as string
      window.open(onboardingUrl, "_blank")
      toast.success("Lien d'onboarding généré", {
        description: "Une nouvelle fenêtre a été ouverte pour compléter l'onboarding Stripe.",
      })
      // Actualiser les informations après 5 secondes
      setTimeout(() => {
        refetch()
      }, 5000)
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur inconnue"
      toast.error("Erreur", {
        description: errorMessage || "Impossible de générer le lien d'onboarding",
      })
    } finally {
      setOnboardingLoading(false)
    }
  }

  // Fonction pour calculer le pourcentage de progression
  const getVerificationProgress = () => {
    if (!accountInfo) return 0

    // Vérifier s'il reste des exigences à satisfaire
    const requirements = accountInfo.requirements || {
      currently_due: [],
      eventually_due: [],
      past_due: [],
    }

    const hasRequirements = (
      (requirements.currently_due?.length > 0) ||
      (requirements.eventually_due?.length > 0) ||
      (requirements.past_due?.length > 0)
    )

    // Ne retourner 100% que si toutes les exigences sont satisfaites ET que les paiements sont activés
    if (accountInfo.chargesEnabled && accountInfo.payoutsEnabled && !hasRequirements) return 100

    const totalReqs =
      (requirements.currently_due?.length || 0) +
      (requirements.eventually_due?.length || 0) +
      (requirements.past_due?.length || 0)

    if (totalReqs === 0) return 90 // Presque terminé

    // Donner plus de poids aux exigences passées dues
    const pastDueWeight = 2
    const weightedTotal =
      (requirements.currently_due?.length || 0) +
      (requirements.eventually_due?.length || 0) +
      (requirements.past_due?.length || 0) * pastDueWeight

    const possibleTotal = totalReqs + (requirements.past_due?.length || 0) * (pastDueWeight - 1)

    // Plafonner entre 10% et 80%
    const progressPercent =
      100 - Math.min(80, Math.max(10, (weightedTotal / (possibleTotal > 0 ? possibleTotal : 1)) * 100))

    return Math.round(progressPercent)
  }

  // Fonction pour traduire les exigences de Stripe
  const translateRequirement = (requirement: string) => {
    const translations: Record<string, string> = {
      external_account: "Compte bancaire",
      "tos_acceptance.date": "Acceptation des conditions d'utilisation",
      "tos_acceptance.ip": "Adresse IP d'acceptation",
      "business_profile.url": "URL du site web",
      "business_profile.mcc": "Catégorie d'activité",
      "company.address.city": "Ville de l'entreprise",
      "company.address.line1": "Adresse de l'entreprise",
      "company.address.postal_code": "Code postal de l'entreprise",
      "company.name": "Nom de l'entreprise",
      "company.phone": "Téléphone de l'entreprise",
      "company.tax_id": "Numéro de TVA",
      "person.address.city": "Ville du représentant légal",
      "person.address.line1": "Adresse du représentant légal",
      "person.address.postal_code": "Code postal du représentant légal",
      "person.dob.day": "Jour de naissance du représentant légal",
      "person.dob.month": "Mois de naissance du représentant légal",
      "person.dob.year": "Année de naissance du représentant légal",
      "person.email": "Email du représentant légal",
      "person.first_name": "Prénom du représentant légal",
      "person.last_name": "Nom du représentant légal",
      "person.phone": "Téléphone du représentant légal",
      "person.id_number": "Numéro d'identité du représentant légal",
      "individual.verification.document": "Document d'identité à vérifier",
    }

    return translations[requirement] || requirement
  }

  // Afficher le statut de vérification
  const renderVerificationStatus = () => {
    if (!accountInfo) return null

    if (!accountInfo.detailsSubmitted) {
      return (
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Vérification non commencée</AlertTitle>
          <AlertDescription>
            Pour recevoir des paiements en ligne, vous devez vérifier votre entreprise avec Stripe.
          </AlertDescription>
        </Alert>
      )
    }

    const progress = getVerificationProgress()

    // Vérifier s'il reste des exigences à satisfaire
    const requirements = accountInfo.requirements || {
      currently_due: [],
      eventually_due: [],
      past_due: [],
    }

    const hasRequirements = (
      (requirements.currently_due?.length > 0) ||
      (requirements.eventually_due?.length > 0) ||
      (requirements.past_due?.length > 0)
    )

    if (accountInfo.detailsSubmitted && !hasRequirements && accountInfo.chargesEnabled && accountInfo.payoutsEnabled) {
      return (
        <div className="mb-6">
          <Alert className="mb-4 bg-green-50 dark:bg-green-900/20">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle>Vérification complète</AlertTitle>
            <AlertDescription>Votre compte est vérifié et vous pouvez recevoir des paiements.</AlertDescription>
          </Alert>

          <div className="flex justify-center my-8">
            <CircularProgress
              value={100}
              color="text-green-500"
              size={150}
              label={
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-1" />
                  <span className="text-sm font-medium">Vérifié</span>
                </div>
              }
            />
          </div>
        </div>
      )
    }

    const hasPastDue = accountInfo.requirements.past_due.length > 0

    // Calculer les exigences dues
    const totalRequirements =
      (requirements.currently_due?.length || 0) +
      (requirements.eventually_due?.length || 0) +
      (requirements.past_due?.length || 0)

    const completedRequirements =
      totalRequirements === 0
        ? 90 // Presque terminé si aucune exigence n'est en attente
        : Math.round(progress)

    // Récupérer toutes les exigences pour les afficher
    const allPendingRequirements = [
      ...(requirements.past_due || []).map(req => ({
        req,
        type: "past_due",
        label: translateRequirement(req),
        color: "text-red-500",
      })),
      ...(requirements.currently_due || []).map(req => ({
        req,
        type: "currently_due",
        label: translateRequirement(req),
        color: "text-amber-500",
      })),
      ...(requirements.eventually_due || []).map(req => ({
        req,
        type: "eventually_due",
        label: translateRequirement(req),
        color: "text-gray-400",
      })),
    ] // Afficher toutes les exigences sans limitation

    return (
      <div className="mb-6">
        <Alert
          variant={hasPastDue ? "destructive" : "default"}
          className={`mb-4 ${hasPastDue ? "bg-red-50 dark:bg-red-900/20" : "bg-amber-50 dark:bg-amber-900/20"}`}
        >
          {hasPastDue ? <XCircle className="h-4 w-4 text-red-500" /> : <Clock className="h-4 w-4 text-amber-500" />}
          <AlertTitle>{hasPastDue ? "Action requise immédiatement" : "Vérification en cours"}</AlertTitle>
          <AlertDescription>
            {hasPastDue
              ? "Certaines informations sont manquantes ou nécessitent votre attention immédiate."
              : "Votre compte est en cours de vérification par Stripe."}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col md:flex-row items-center gap-6 my-8 justify-center">
          <CircularProgress
            value={completedRequirements}
            size={180}
            color={hasPastDue ? "text-red-500" : "text-amber-500"}
            label={
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">{completedRequirements}%</span>
                <span className="text-xs text-muted-foreground text-center">Remplissage du profil</span>
              </div>
            }
          />

          <div className="space-y-2 max-w-xs">
            <h4 className="font-medium text-sm">Prochaines étapes :</h4>
            {allPendingRequirements.length > 0 ? (
              <ul className="space-y-2">
                {allPendingRequirements.map(({ req, type, label, color }, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {type === "past_due" ? (
                      <XCircle className="h-4 w-4 mt-0.5 text-red-500 flex-shrink-0" />
                    ) : type === "currently_due" ? (
                      <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${color}`}>{label}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Votre dossier est en cours d&apos;examen par Stripe. Vous recevrez bientôt une notification.
              </p>
            )}

            <div className="flex flex-col gap-2 mt-2">
              <Button onClick={() => startOnboarding()} disabled={onboardingLoading} className="w-full" size="sm">
                Continuer avec Stripe
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Compte Stripe Connect</CardTitle>
        <CardDescription>Gérez votre compte Stripe Connect pour recevoir des paiements</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : error ? (
          <Alert
            variant="destructive"
            className="bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
          >
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertTitle className="text-red-700 dark:text-red-300">Erreur</AlertTitle>
            <AlertDescription className="flex flex-col gap-2 text-red-600 dark:text-red-300">
              <div>{error}</div>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Réessayer
                </Button>
                <span className="text-xs italic">
                  Si cette erreur persiste, veuillez contacter Biume pour résoudre le problème.
                </span>
              </div>
            </AlertDescription>
          </Alert>
        ) : !accountInfo ? (
          <div>
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Compte non configuré</AlertTitle>
              <AlertDescription>
                Vous devez configurer votre compte Stripe Connect pour recevoir des paiements.
              </AlertDescription>
            </Alert>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Choisissez votre méthode d&apos;onboarding :</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-36 flex flex-col"
                  onClick={() => startOnboarding()}
                  disabled={onboardingLoading}
                >
                  {onboardingLoading ? (
                    <RefreshCw className="w-8 h-8 mb-2 animate-spin" />
                  ) : (
                    <ExternalLink className="w-8 h-8 mb-2" />
                  )}
                  <span className="font-medium">Onboarding standard</span>
                  <span className="text-sm text-gray-500 text-center mt-2 px-4">
                    Utiliser le formulaire préconfiguré de Stripe pour compléter l&apos;onboarding
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">ID du compte</h3>
                <p className="text-sm font-mono">{accountInfo.id}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-sm">{accountInfo.email}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Nom commercial</h3>
                <p className="text-sm">{accountInfo.businessProfile?.name || "Non défini"}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Site web</h3>
                <p className="text-sm">
                  {accountInfo.businessProfile?.url ? (
                    <Link
                      href={accountInfo.businessProfile.url}
                      target="_blank"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      {accountInfo.businessProfile.url}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  ) : (
                    "Non défini"
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                className={
                  accountInfo.detailsSubmitted
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {accountInfo.detailsSubmitted ? "Informations complètes" : "Informations incomplètes"}
              </Badge>
              <Badge
                className={
                  accountInfo.chargesEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {accountInfo.chargesEnabled ? "Paiements activés" : "Paiements désactivés"}
              </Badge>
              <Badge
                className={
                  accountInfo.payoutsEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {accountInfo.payoutsEnabled ? "Virements activés" : "Virements désactivés"}
              </Badge>
            </div>

            {renderVerificationStatus()}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="w-full flex justify-between">
          <div>
            {accountInfo?.detailsSubmitted && (
              <Badge
                variant={
                  (accountInfo.payoutsEnabled && accountInfo.chargesEnabled &&
                    !(accountInfo.requirements.currently_due?.length > 0 ||
                      accountInfo.requirements.eventually_due?.length > 0 ||
                      accountInfo.requirements.past_due?.length > 0))
                    ? "default"
                    : "outline"
                }
                className={`mb-2 ${(accountInfo.payoutsEnabled && accountInfo.chargesEnabled &&
                  !(accountInfo.requirements.currently_due?.length > 0 ||
                    accountInfo.requirements.eventually_due?.length > 0 ||
                    accountInfo.requirements.past_due?.length > 0))
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : ""
                  }`}
              >
                {(accountInfo.payoutsEnabled && accountInfo.chargesEnabled &&
                  !(accountInfo.requirements.currently_due?.length > 0 ||
                    accountInfo.requirements.eventually_due?.length > 0 ||
                    accountInfo.requirements.past_due?.length > 0)) ? (
                  <>
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Compte activé
                  </>
                ) : (
                  "Configuration en cours"
                )}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualiser
            </Button>

            {(!accountInfo?.payoutsEnabled || !accountInfo?.chargesEnabled) && (
              <>
                <Button onClick={startOnboarding} disabled={onboardingLoading}>
                  {onboardingLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {accountInfo?.detailsSubmitted
                        ? "Mettre à jour les informations"
                        : "Compléter l'onboarding standard"}
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
