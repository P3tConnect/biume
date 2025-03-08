import { CheckCircle, CircleDot, Clock } from "lucide-react"

export type MilestoneStatus = "completed" | "in-progress" | "planned"

export interface Milestone {
  date: string
  title: string
  description: string
  status: MilestoneStatus
}

interface RoadmapSectionProps {
  milestones: Milestone[]
}

export function RoadmapSection({ milestones }: RoadmapSectionProps) {
  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "in-progress":
        return <Clock className="h-6 w-6 text-amber-500 animate-pulse" />
      case "planned":
        return <CircleDot className="h-6 w-6 text-muted-foreground" />
    }
  }

  const getStatusClass = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-500/10"
      case "in-progress":
        return "border-amber-500 bg-amber-500/10"
      case "planned":
        return "border-muted-foreground/30 bg-muted-foreground/5"
    }
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Notre progression et nos objectifs</h2>

        <div className="relative">
          {/* Ligne verticale de la timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-muted-foreground/20"></div>

          <div className="space-y-24">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Point central de la timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-muted-foreground/20 z-10">
                  {getStatusIcon(milestone.status)}
                </div>

                {/* Contenu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div
                    className={`${index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"} p-6 rounded-lg border ${getStatusClass(milestone.status)} ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}
                  >
                    <div className="font-mono text-sm mb-2">{milestone.date}</div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className={`hidden md:block ${index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
