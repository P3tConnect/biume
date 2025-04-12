import { ChevronLeftIcon, ClipboardIcon, EyeIcon, SaveIcon } from "lucide-react"

import { Button, Card, CardContent, CardHeader, Skeleton } from "@/components/ui"

const SimpleReportBuilderLoading = () => {
  return (
    <div className="h-full w-full bg-slate-50 flex flex-col overflow-hidden">
      {/* En-tête */}
      <Card className="mx-6 mt-6 mb-4 border shadow">
        <CardHeader className="pb-0 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" disabled>
              <ChevronLeftIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <EyeIcon className="h-4 w-4 mr-1" />
              Aperçu
            </Button>
            <Button size="sm" disabled>
              <SaveIcon className="h-4 w-4 mr-1" />
              Enregistrer
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ClipboardIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-8 w-full max-w-md" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden flex flex-col px-6 pb-6">
        <Card className="flex-1 overflow-hidden shadow border">
          <div className="px-6 py-3 bg-white border-b">
            <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-9 w-full" />
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="h-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-9 w-36" />
              </div>
              <div className="grid gap-4">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SimpleReportBuilderLoading
