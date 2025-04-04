"use client"

import { AlignLeft, Activity, Image, Eye, UserCog, MoveHorizontal, Stethoscope } from "lucide-react"

type TabType = "staticObs" | "dynamicObs" | "dysfunctions" | "recommendations" | "notes" | "images"

interface TabNavigationProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  showImagesTab?: boolean
}

export function TabNavigation({ activeTab, setActiveTab, showImagesTab = false }: TabNavigationProps) {
  return (
    <div className="px-4 pt-4 pb-0 flex border-b overflow-x-auto">
      <button
        className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${activeTab === "staticObs" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        onClick={() => setActiveTab("staticObs")}
      >
        <Eye className="h-4 w-4 mr-2" />
        Observation statique
      </button>

      <button
        className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${activeTab === "dynamicObs" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        onClick={() => setActiveTab("dynamicObs")}
      >
        <MoveHorizontal className="h-4 w-4 mr-2" />
        Observation dynamique
      </button>

      <button
        className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${activeTab === "dysfunctions" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        onClick={() => setActiveTab("dysfunctions")}
      >
        <Stethoscope className="h-4 w-4 mr-2" />
        Dysfonctions
      </button>

      <button
        className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${activeTab === "recommendations" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        onClick={() => setActiveTab("recommendations")}
      >
        <UserCog className="h-4 w-4 mr-2" />
        Conseils et recommandations
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
