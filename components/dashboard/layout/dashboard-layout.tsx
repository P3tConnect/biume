"use client";

import { useStore } from "@/src/hooks/useStore";
import { Sidebar } from "@/components/dashboard/layout/sidebar";
import { useSidebarToggle } from "@/src/hooks/useSidebarToggle";
import { Navbar } from "./navbar";
import { Menu, proMenuList, proSimpleMenuList } from "@/src/config/menu-list";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "@/src/locales";
import { LucideIcon } from "lucide-react";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = useCurrentLocale();
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  const menu = proSimpleMenuList(pathname, locale).find((item) => item.active);

  return (
    <div className="p-5 h-[100vh] w-[100vw] justify-center items-center">
      <div className="flex flex-row h-full w-full justify-start items-center pt-5 pb-5 bg-background/90 backdrop-blur-xl backdrop-opacity-50 shadow-2xl rounded-2xl border border-border">
        <Sidebar />
        <main
          className="min-h-[calc(100vh_-_56px)] w-full pr-5 transition-[margin-left] ease-in-out duration-300 flex flex-col"
        >
          <Navbar menu={menu as Menu} sidebar={sidebar} />
          {children}
        </main>
      </div>
    </div>
  );
}