"use client";

import { SidebarComponent } from "./sidebar/sidebar";
import { Navbar } from "./navbar";
import { Menu, proMenuList } from "@/src/config/menu-list";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui";
import useWindowSize from "@/src/hooks/use-window-size";
import { useLocale } from "next-intl";

export default function DashboardLayout({
  children,
  companyId,
}: {
  children: React.ReactNode;
  companyId: string;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const { windowSize } = useWindowSize();

  const menu = proMenuList(pathname, locale, companyId)
    .map((item) => item.menus)
    .find((item) => item.find((item) => item.active))
    ?.find((item) => item.active);

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <SidebarComponent companyId={companyId} />
      <main className="min-h-[calc(100vh_-_22px)] w-full px-1 ease-in-out duration-300 flex flex-col">
        <Navbar menu={menu as Menu} companyId={companyId} />
        <ScrollArea
          className="pr-3"
          style={{ height: `${windowSize.height! - 85}px` }}
        >
          {children}
        </ScrollArea>
      </main>
    </div>
  );
}
