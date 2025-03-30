"use client"

import {
  Briefcase,
  Building2,
  Clock,
  CreditCard,
  FileText,
  Image as ImageIcon,
  Settings,
  Users,
  FileKey,
  CircleDollarSign,
  ScrollText
} from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { BillingSection } from "./sections/billing-section"
import DocumentsSection from "./sections/documents-section"
import ImagesSection from "./sections/images-section"
import KYBSection from "./sections/kyb-section"
import { OptionsSection } from "./sections/options-section"
import { ProfileSection } from "./sections/profile-section"
import { ServicesSection } from "./sections/services-section"
import SlotsSection from "./sections/slots-section"
import { TeamSection } from "./sections/team-section"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

const SettingsPageComponent = () => {
  const query = useSearchParams()
  const defaultTab = query.get("tab") || "profile"
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    if (query.get("tab")) {
      setActiveTab(query.get("tab") || "profile")
    }
  }, [query])

  // Configuration des catégories et de leurs onglets
  const categories = [
    {
      id: "organisation",
      name: "Organisation",
      tabs: [
        { id: "profile", label: "Profil", icon: <Building2 className="h-4 w-4" /> },
        { id: "images", label: "Images", icon: <ImageIcon className="h-4 w-4" /> },
        { id: "team", label: "Équipe", icon: <Users className="h-4 w-4" /> }
      ]
    },
    {
      id: "services",
      name: "Services & Agenda",
      tabs: [
        { id: "services", label: "Services", icon: <Briefcase className="h-4 w-4" /> },
        { id: "options", label: "Options", icon: <Settings className="h-4 w-4" /> },
        { id: "slots", label: "Créneaux", icon: <Clock className="h-4 w-4" /> }
      ]
    },
    {
      id: "documents",
      name: "Documents & Légal",
      tabs: [
        { id: "documents", label: "Documents", icon: <FileText className="h-4 w-4" /> },
        { id: "kyb", label: "KYB", icon: <FileKey className="h-4 w-4" /> }
      ]
    },
    {
      id: "finance",
      name: "Finance",
      tabs: [
        { id: "billing", label: "Facturation", icon: <CircleDollarSign className="h-4 w-4" /> }
      ]
    }
  ]

  // Trouver la catégorie du tab actif
  const findCategoryForTab = (tabId: string) => {
    return categories.find(category =>
      category.tabs.some(tab => tab.id === tabId)
    )?.id || categories[0].id
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="overflow-hidden rounded-2xl mb-4 w-full">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Paramètres de l&apos;organisation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Gérez les paramètres et les préférences de votre organisation
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* Navigation latérale */}
        <div className="w-full md:w-64 shrink-0">
          <Card className="sticky top-4">
            <div className="p-2">
              <Accordion
                type="multiple"
                defaultValue={[findCategoryForTab(activeTab)]}
                className="w-full"
              >
                {categories.map((category) => (
                  <AccordionItem value={category.id} key={category.id}>
                    <AccordionTrigger className="py-3 px-2 text-sm font-medium">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-1 pl-2">
                        {category.tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-colors ${activeTab === tab.id
                              ? "bg-primary text-primary-foreground font-medium"
                              : "hover:bg-secondary"
                              }`}
                          >
                            {tab.icon}
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Card>
        </div>

        {/* Contenu */}
        <div className="flex-1">
          <Card className="w-full">
            <div className="p-6">
              {activeTab === "profile" && <ProfileSection />}
              {activeTab === "images" && <ImagesSection />}
              {activeTab === "services" && <ServicesSection />}
              {activeTab === "options" && <OptionsSection />}
              {activeTab === "slots" && <SlotsSection />}
              {activeTab === "documents" && <DocumentsSection />}
              {activeTab === "billing" && <BillingSection />}
              {activeTab === "kyb" && <KYBSection />}
              {activeTab === "team" && <TeamSection />}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SettingsPageComponent
