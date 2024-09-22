"use client";

import { useStore } from "@/src/hooks/useStore";
import { Sidebar } from "@/components/dashboard/layout/sidebar";
import { useSidebarToggle } from "@/src/hooks/useSidebarToggle";
import { Navbar } from "./navbar";
import { Menu, proMenuList, proSimpleMenuList } from "@/src/config/menu-list";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "@/src/locales";
import DashboardBubbles from "./dashboard-bubbles";
import { logger } from "@/src/lib";

export default function DashboardLayout({
  children,
  companyId
}: {
  children: React.ReactNode;
  companyId: string;
}) {
  const pathname = usePathname();
  const locale = useCurrentLocale();
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  const menu = proMenuList(pathname, locale, companyId).find((item) => item)?.menus.find((item) => item.active);

  console.log(menu, "menu");

  return (
    <div className="p-3 h-[100vh] w-[100vw] relative overflow-hidden flex justify-center items-center">
      <div className="overflow-auto flex flex-row h-full w-full justify-start items-center pt-4 pb-4 bg-gray-100/40 dark:bg-gray-800/50 backdrop-blur-3xl backdrop-opacity-80 shadow-2xl rounded-2xl border border-border">
        <Sidebar companyId={companyId} />
        <main
          className="min-h-[calc(100vh_-_56px)] w-full px-5 transition-[margin-left] ease-in-out duration-300 flex flex-col lg:pl-0"
        >
          <Navbar menu={menu as Menu} sidebar={sidebar} />
          {children}
        </main>
      </div>
      <DashboardBubbles />
    </div>
  );
}