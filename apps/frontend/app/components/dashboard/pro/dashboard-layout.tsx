import { ScrollArea } from "@/components/ui/scroll-area"
import { NavbarPro } from "./components/navbar"
import DashboardSidebarPro from "./sidebar/sidebar"
import { ReactNode } from "react"

const DashboardProLayout = ({ children, companyId }: { children: ReactNode, companyId: string }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <DashboardSidebarPro companyId={companyId} />
      <main className="h-full w-full px-1 py-2 ease-in-out duration-300 flex flex-col">
        <NavbarPro />
        <ScrollArea
          className="pr-4 overflow-y-auto"
        >
          {children}
        </ScrollArea>
      </main>
    </div>
  )
}

export default DashboardProLayout