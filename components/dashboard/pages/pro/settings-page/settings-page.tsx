"use client"

import {
  Briefcase,
  Building2,
  Clock,
  FileText,
  Image as ImageIcon,
  Settings,
  Users,
  FileKey,
  CircleDollarSign,
  LayoutDashboard,
  CalendarRange,
  ScrollText,
  CreditCard
} from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui"
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
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />,
      tabs: [
        { id: "profile", label: "Profil", icon: <Building2 className="h-4 w-4" /> },
        { id: "images", label: "Images", icon: <ImageIcon className="h-4 w-4" /> },
        { id: "team", label: "Équipe", icon: <Users className="h-4 w-4" /> }
      ]
    },
    {
      id: "services",
      name: "Services & Agenda",
      icon: <CalendarRange className="h-5 w-5 mr-2" />,
      tabs: [
        { id: "services", label: "Services", icon: <Briefcase className="h-4 w-4" /> },
        { id: "options", label: "Options", icon: <Settings className="h-4 w-4" /> },
        { id: "slots", label: "Créneaux", icon: <Clock className="h-4 w-4" /> }
      ]
    },
    {
      id: "documents",
      name: "Documents & Légal",
      icon: <ScrollText className="h-5 w-5 mr-2" />,
      tabs: [
        { id: "documents", label: "Documents", icon: <FileText className="h-4 w-4" /> },
        { id: "kyb", label: "KYB", icon: <FileKey className="h-4 w-4" /> }
      ]
    },
    {
      id: "finance",
      name: "Finance",
      icon: <CreditCard className="h-5 w-5 mr-2" />,
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
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col md:flex-row w-full h-full gap-4">
        {/* Navigation latérale */}
        <div className="w-full md:w-72 lg:w-80 shrink-0">
          <Card className="sticky top-0">
            <CardHeader>
              <CardTitle>Paramètres</CardTitle>
              <CardDescription>Gérez les paramètres et les préférences de votre organisation</CardDescription>
            </CardHeader>
            <div className="p-2">
              <Accordion
                type="multiple"
                defaultValue={[findCategoryForTab(activeTab)]}
                className="w-full"
              >
                {categories.map((category) => (
                  <AccordionItem value={category.id} key={category.id} className="border-0">
                    <AccordionTrigger className="py-3 px-2 text-sm font-medium rounded-md hover:bg-primary/30 hover:no-underline transition-colors">
                      <div className="flex items-center">
                        {category.icon}
                        {category.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-1 pl-2">
                        {category.tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-colors ${activeTab === tab.id
                              ? "bg-primary text-primary-foreground font-medium"
                              : "hover:bg-primary/30"
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
        <div className="w-full">
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
      </div>
    </div>
  )
}

export default SettingsPageComponent
