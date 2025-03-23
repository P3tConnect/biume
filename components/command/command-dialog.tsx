"use client"

import {
  ArrowUpRight,
  BadgeHelp,
  Calendar,
  CalendarClock,
  CheckCircle2,
  Clipboard,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LucideIcon,
  MessagesSquare,
  PawPrint,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DialogTitle,
  CommandDialog as UICommandDialog,
} from "@/components/ui"
import { useEffect, useState } from "react"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { getClients } from "@/src/actions/client.action"
import { getPetsAction } from "@/src/actions/pets.action"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

// Définition des types de résultats de recherche
type SearchResultType = "client" | "patient" | "page" | "action"

interface SearchResultBase {
  id: string
  type: SearchResultType
  title: string
  description?: string
  icon: LucideIcon
}

interface ClientSearchResult extends SearchResultBase {
  type: "client"
  email: string
  phoneNumber?: string
}

interface PatientSearchResult extends SearchResultBase {
  type: "patient"
  owner: string
  animalType: string
}

interface PageSearchResult extends SearchResultBase {
  type: "page"
  href: string
}

interface ActionSearchResult extends SearchResultBase {
  type: "action"
  handler: () => void
}

type SearchResult = ClientSearchResult | PatientSearchResult | PageSearchResult | ActionSearchResult

// Type pour les clients retournés par l'API
interface ClientData {
  id: string
  name: string
  email: string
  phoneNumber: string | null
  status: string
  // autres propriétés si nécessaire
}

// Type pour les patients (animaux) retournés par l'API
interface PatientData {
  id: string
  name: string | null
  breed: string | null
  description: string | null
  type: string | null
  owner: {
    id: string
    name: string
  } | null
  // autres propriétés si nécessaire
}

// Définition des propriétés du composant CommandDialog
interface CommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyId: string
}

export function CommandDialog({ open, onOpenChange, companyId }: CommandDialogProps) {
  const router = useRouter()
  const t = useTranslations()
  const [searchTerm, setSearchTerm] = useState("")
  const [recentlyViewed, setRecentlyViewed] = useState<SearchResult[]>([])

  // Recherche de clients
  const { data: clientsData, isFetching: isLoadingClients } = useQuery<ClientData[]>({
    queryKey: ["command-dialog-clients", searchTerm],
    queryFn: async () => {
      const result = await getClients({ search: searchTerm, status: "all" })
      if ("error" in result) {
        throw new Error(result.error)
      }
      return result.data || []
    },
    enabled: open && searchTerm.length > 1,
  })

  // Recherche de patients (animaux)
  const { data: patientsData, isFetching: isLoadingPatients } = useQuery<PatientData[]>({
    queryKey: ["command-dialog-patients", searchTerm],
    queryFn: async () => {
      const result = await getPetsAction({})

      if ("error" in result) {
        throw new Error(result.error)
        return []
      }

      const pets =
        result.data?.pets?.filter(
          (pet: PatientData) =>
            pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.description?.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []

      return pets
    },
    enabled: open && searchTerm.length > 1,
  })

  // Formatage des résultats de recherche pour les clients
  const clientResults: ClientSearchResult[] = clientsData
    ? clientsData.map((client: ClientData) => ({
        id: client.id,
        type: "client",
        title: client.name,
        description: client.email,
        icon: Users,
        email: client.email,
        phoneNumber: client.phoneNumber || undefined,
      }))
    : []

  // Formatage des résultats de recherche pour les patients (animaux)
  const patientResults: PatientSearchResult[] = patientsData
    ? patientsData.map((patient: PatientData) => ({
        id: patient.id,
        type: "patient",
        title: patient.name || "",
        description: patient.breed || undefined,
        icon: PawPrint,
        owner: patient.owner?.name || "Propriétaire inconnu",
        animalType: patient.type || "",
      }))
    : []

  // Pages principales
  const mainPages: PageSearchResult[] = [
    {
      id: "dashboard",
      type: "page",
      title: "Tableau de bord",
      description: "Vue d'ensemble de votre activité",
      icon: LayoutDashboard,
      href: `/dashboard/organization/${companyId}`,
    },
    {
      id: "appointments",
      type: "page",
      title: "Rendez-vous",
      description: "Gérer votre agenda",
      icon: Calendar,
      href: `/dashboard/organization/${companyId}/timetable`,
    },
    {
      id: "clients",
      type: "page",
      title: "Clients",
      description: "Gérer vos clients",
      icon: Users,
      href: `/dashboard/organization/${companyId}/clients`,
    },
    {
      id: "patients",
      type: "page",
      title: "Patients",
      description: "Gérer vos patients",
      icon: PawPrint,
      href: `/dashboard/organization/${companyId}/patients`,
    },
    {
      id: "reports",
      type: "page",
      title: "Rapports",
      description: "Consulter vos rapports",
      icon: ClipboardList,
      href: `/dashboard/organization/${companyId}/reports`,
    },
    {
      id: "settings",
      type: "page",
      title: "Paramètres",
      description: "Configurer votre compte",
      icon: Settings,
      href: `/dashboard/organization/${companyId}/settings`,
    },
    {
      id: "help",
      type: "page",
      title: "Aide",
      description: "Besoin d'assistance ?",
      icon: BadgeHelp,
      href: `/dashboard/organization/${companyId}/help`,
    },
  ]

  // Actions rapides
  const quickActions: ActionSearchResult[] = [
    {
      id: "new-client",
      type: "action",
      title: "Nouveau client",
      description: "Ajouter un nouveau client",
      icon: Plus,
      handler: () => {
        onOpenChange(false)
        // Rediriger vers la page des clients avec le mode création
        router.push(`/dashboard/organization/${companyId}/clients?action=create`)
      },
    },
    {
      id: "new-patient",
      type: "action",
      title: "Nouveau patient",
      description: "Ajouter un nouveau patient",
      icon: PawPrint,
      handler: () => {
        onOpenChange(false)
        // Rediriger vers la page des patients avec le mode création
        router.push(`/dashboard/organization/${companyId}/patients?action=create`)
      },
    },
    {
      id: "new-appointment",
      type: "action",
      title: "Nouveau rendez-vous",
      description: "Planifier un rendez-vous",
      icon: Calendar,
      handler: () => {
        onOpenChange(false)
        // Rediriger vers la page des rendez-vous avec le mode création
        router.push(`/dashboard/organization/${companyId}/appointments?action=create`)
      },
    },
    {
      id: "new-report",
      type: "action",
      title: "Nouveau rapport",
      description: "Créer un nouveau rapport",
      icon: FileText,
      handler: () => {
        onOpenChange(false)
        // Rediriger vers la page des rapports avec le mode création
        router.push(`/dashboard/organization/${companyId}/reports?action=create`)
      },
    },
    {
      id: "new-message",
      type: "action",
      title: "Nouveau message",
      description: "Envoyer un message à un client",
      icon: MessagesSquare,
      handler: () => {
        onOpenChange(false)
        // Rediriger vers la page des messages
        router.push(`/dashboard/organization/${companyId}/messages`)
      },
    },
    {
      id: "schedule-availability",
      type: "action",
      title: "Configurer disponibilités",
      description: "Gérer vos heures de disponibilité",
      icon: CalendarClock,
      handler: () => {
        onOpenChange(false)
        // Rediriger vers la page des paramètres avec focus sur disponibilités
        router.push(`/dashboard/organization/${companyId}/settings/availability`)
      },
    },
  ]

  // Gestion des raccourcis clavier
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  // Gestion des redirections et actions
  const handleSelect = (result: SearchResult) => {
    // Fermer la boîte de dialogue
    onOpenChange(false)

    // Ajouter aux éléments récemment consultés
    const updatedRecentlyViewed = [result, ...recentlyViewed.filter(item => item.id !== result.id).slice(0, 4)]
    setRecentlyViewed(updatedRecentlyViewed)

    // Gérer la sélection en fonction du type
    switch (result.type) {
      case "client":
        router.push(`/dashboard/organization/${companyId}/clients/${result.id}`)
        break
      case "patient":
        router.push(`/dashboard/organization/${companyId}/patients/${result.id}`)
        break
      case "page":
        router.push(result.href)
        break
      case "action":
        result.handler()
        break
    }
  }

  // Effacement du terme de recherche à la fermeture
  useEffect(() => {
    if (!open) {
      setSearchTerm("")
    }
  }, [open])

  // Rendu du composant
  return (
    <UICommandDialog open={open} onOpenChange={onOpenChange}>
      <VisuallyHidden>
        <DialogTitle>Recherche</DialogTitle>
      </VisuallyHidden>

      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandInput
          placeholder="Que recherchez-vous ?"
          className="h-14 w-full bg-transparent px-0 py-3 text-base outline-none placeholder:text-muted-foreground/70 focus:ring-0 focus:outline-none border-0"
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
      </div>

      <CommandList className="max-h-[60vh] overflow-y-auto py-2 px-1">
        <CommandEmpty>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-muted/30 p-3 mb-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Aucun résultat trouvé.</p>
            <p className="text-xs text-muted-foreground/70">Essayez avec des termes différents.</p>
          </div>
        </CommandEmpty>

        {/* Résultats des clients */}
        {clientResults.length > 0 && (
          <CommandGroup
            heading={
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs font-medium">Clients</span>
                {isLoadingClients && (
                  <div className="ml-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
              </div>
            }
          >
            {clientResults.slice(0, 5).map(client => (
              <CommandItem
                key={client.id}
                onSelect={() => handleSelect(client)}
                className="rounded-lg py-2.5 px-2 flex items-center gap-3 text-sm hover:bg-accent/50"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                  <client.icon className="h-4 w-4 text-foreground/80" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium truncate">{client.title}</span>
                  <span className="text-xs text-muted-foreground/70 truncate">{client.email}</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              </CommandItem>
            ))}
            {clientResults.length > 5 && (
              <CommandItem
                onSelect={() => {
                  onOpenChange(false)
                  router.push(`/dashboard/organization/${companyId}/clients?search=${encodeURIComponent(searchTerm)}`)
                }}
                className="rounded-lg py-1.5 px-2 text-xs text-center text-muted-foreground hover:bg-accent/30"
              >
                Voir tous les clients ({clientResults.length})
              </CommandItem>
            )}
          </CommandGroup>
        )}

        {/* Résultats des patients */}
        {patientResults.length > 0 && (
          <CommandGroup
            heading={
              <div className="flex items-center">
                <PawPrint className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs font-medium">Patients</span>
                {isLoadingPatients && (
                  <div className="ml-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
              </div>
            }
          >
            {patientResults.slice(0, 5).map(patient => (
              <CommandItem
                key={patient.id}
                onSelect={() => handleSelect(patient)}
                className="rounded-lg py-2.5 px-2 flex items-center gap-3 text-sm hover:bg-accent/50"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                  <patient.icon className="h-4 w-4 text-foreground/80" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium truncate">{patient.title}</span>
                  <span className="text-xs text-muted-foreground/70 truncate">
                    {patient.animalType} • Propriétaire: {patient.owner}
                  </span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              </CommandItem>
            ))}
            {patientResults.length > 5 && (
              <CommandItem
                onSelect={() => {
                  onOpenChange(false)
                  router.push(`/dashboard/organization/${companyId}/patients?search=${encodeURIComponent(searchTerm)}`)
                }}
                className="rounded-lg py-1.5 px-2 text-xs text-center text-muted-foreground hover:bg-accent/30"
              >
                Voir tous les patients ({patientResults.length})
              </CommandItem>
            )}
          </CommandGroup>
        )}

        {/* Pages récemment consultées */}
        {!searchTerm && recentlyViewed.length > 0 && (
          <CommandGroup
            heading={
              <div className="flex items-center">
                <Clipboard className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs font-medium">Récemment consulté</span>
              </div>
            }
          >
            {recentlyViewed.map(item => (
              <CommandItem
                key={`${item.type}-${item.id}`}
                onSelect={() => handleSelect(item)}
                className="rounded-lg py-2 px-2 flex items-center gap-3 text-sm hover:bg-accent/50"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                  <item.icon className="h-3.5 w-3.5 text-foreground/80" />
                </div>
                <span className="font-medium">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Pages principales lorsqu'aucun terme de recherche n'est saisi */}
        {!searchTerm && (
          <CommandGroup
            heading={
              <div className="flex items-center">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs font-medium">Pages principales</span>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-1 px-1 py-1">
              {mainPages.map(page => (
                <CommandItem
                  key={page.id}
                  onSelect={() => handleSelect(page)}
                  className="rounded-lg py-2 px-2 flex items-center gap-2.5 text-sm col-span-1 hover:bg-accent/50"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                    <page.icon className="h-3.5 w-3.5 text-foreground/80" />
                  </div>
                  <span className="font-medium">{page.title}</span>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        )}

        {/* Actions rapides */}
        {!searchTerm && (
          <CommandGroup
            heading={
              <div className="flex items-center">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs font-medium">Actions rapides</span>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-1 px-1 py-1">
              {quickActions.map(action => (
                <CommandItem
                  key={action.id}
                  onSelect={() => handleSelect(action)}
                  className="rounded-lg py-2 px-2 flex items-center gap-2.5 text-sm col-span-1 hover:bg-accent/50"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                    <action.icon className="h-3.5 w-3.5 text-foreground/80" />
                  </div>
                  <span className="font-medium">{action.title}</span>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        )}
      </CommandList>

      <div className="flex items-center justify-between border-t border-border/30 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Parcourir</span>
          <span className="flex items-center justify-center rounded-sm border border-border/40 bg-muted/30 h-5 w-5 text-center">
            ↑
          </span>
          <span className="flex items-center justify-center rounded-sm border border-border/40 bg-muted/30 h-5 w-5 text-center">
            ↓
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Sélectionner</span>
          <span className="flex items-center justify-center rounded-sm border border-border/40 bg-muted/30 h-5 w-5 text-center">
            ↵
          </span>
        </div>
      </div>
    </UICommandDialog>
  )
}
