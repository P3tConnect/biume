"use client"

import { AlignLeft, Activity, Image } from "lucide-react"

type CommonTabs = "clinical" | "notes"
type ExtendedTabs = CommonTabs | "images"

interface TabNavigationProps {
  activeTab: ExtendedTabs
  setActiveTab: (tab: ExtendedTabs) => void
  showImagesTab?: boolean
}

export function TabNavigation({ activeTab, setActiveTab, showImagesTab = false }: TabNavigationProps) {
  return (
    <div className="px-4 pt-4 pb-0 flex border-b">
      <button
        className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === "clinical" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        onClick={() => setActiveTab("clinical")}
      >
        <Activity className="h-4 w-4 mr-2" />
        Examen clinique
      </button>

      {showImagesTab && (
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === "images" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("images")}
        >
          <Image className="h-4 w-4 mr-2" />
          Images
        </button>
      )}

      <button
        className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === "notes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        onClick={() => setActiveTab("notes")}
      >
        <AlignLeft className="h-4 w-4 mr-2" />
        Notes
      </button>
    </div>
  )
} 