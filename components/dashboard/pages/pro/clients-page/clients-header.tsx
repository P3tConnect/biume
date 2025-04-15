import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { Button, Card, CardHeader, CardTitle } from "@/components/ui"
import ClientDialog from "@/components/dashboard/layout/dialogs/ClientDialog"

const ClientsHeader = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Card className="overflow-hidden rounded-2xl">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Mes Clients
              </CardTitle>
              <p className="text-sm text-muted-foreground">Aperçu de vos clients</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300"
                onClick={() => setIsOpen(true)}
              >
                <PlusIcon className="size-4 mr-2" />
                Ajouter un client
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <ClientDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}

export default ClientsHeader
