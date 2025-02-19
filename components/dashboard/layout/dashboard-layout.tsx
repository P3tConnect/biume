import { SidebarComponent } from "./sidebar-pro/sidebar";
import { Navbar } from "./navbar";
import { ScrollArea } from "@/components/ui";

export default function DashboardLayout({
  children,
  companyId,
}: {
  children: React.ReactNode;
  companyId: string;
}) {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <SidebarComponent companyId={companyId} />
      <main className="h-full w-full px-1 py-2 ease-in-out duration-300 flex flex-col">
        <Navbar />
        <ScrollArea
          className="pr-4 overflow-y-auto"
        >
          {children}
        </ScrollArea>
      </main>
    </div>
  );
}
