"use client"

import { AlignLeft, Activity, Image, Eye, UserCog, MoveHorizontal, Stethoscope } from "lucide-react"

type TabType = "clinical" | "notes" | "images"

interface TabNavigationProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  showImagesTab?: boolean
}

export function TabNavigation({ activeTab, setActiveTab, showImagesTab = false }: TabNavigationProps) {
  return (
    <div className="px-4 pt-4 pb-0 flex border-b overflow-x-auto">
      <button
        className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${activeTab === "clinical" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        onClick={() => setActiveTab("clinical")}
      >
        <Eye className="h-4 w-4 mr-2" />
        Observations cliniques
      </button>

      {showImagesTab && (
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${activeTab === "images" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("images")}
        >
          <Image className="h-4 w-4 mr-2" />
          Images
        </button>
      )}

      <button
        className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${activeTab === "notes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        onClick={() => setActiveTab("notes")}
      >
        <AlignLeft className="h-4 w-4 mr-2" />
        Notes
      </button>
    </div>
  )
}
