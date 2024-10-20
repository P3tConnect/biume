"use client";

import { useStore } from "@/src/hooks/useStore";
import { Sidebar } from "@/components/dashboard/layout/sidebar";
import { useSidebarToggle } from "@/src/hooks/useSidebarToggle";
import { Navbar } from "./navbar";
import { Menu, proMenuList } from "@/src/config/menu-list";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "@/src/locales";
import DashboardBubbles from "./dashboard-bubbles";
import { ScrollArea } from "@/components/ui";
import useWindowSize from "@/src/hooks/use-window-size";
import { cn } from "@/src/lib";

export default function DashboardLayout({
  children,
  companyId,
}: {
  children: React.ReactNode;
  companyId: string;
}) {
  const pathname = usePathname();
  const locale = useCurrentLocale();
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const { windowSize } = useWindowSize();

  if (!sidebar) return null;

  const menu = proMenuList(pathname, locale, companyId)
    .map((item) => item.menus)
    .find((item) => item.find((item) => item.active))
    ?.find((item) => item.active);

  return (
    <div className="p-3 h-[100vh] w-[100vw] relative overflow-hidden flex justify-center items-center">
      <div className="flex flex-row h-full w-full justify-start items-center pt-4 pb-4 bg-gray-100/40 dark:bg-gray-800/50 backdrop-blur-3xl backdrop-opacity-80 shadow-2xl rounded-2xl border border-border">
        <Sidebar companyId={companyId} />
        <main className="min-h-[calc(100vh_-_56px)] w-full pr-5 transition-[margin-left] ease-in-out duration-300 flex flex-col">
          <Navbar menu={menu as Menu} sidebar={sidebar} />
          <ScrollArea className={cn(`h-[${windowSize.height! * 0.8}px] pr-3`)}>{children}</ScrollArea>
        </main>
      </div>
      <DashboardBubbles />
    </div>
  );
}
