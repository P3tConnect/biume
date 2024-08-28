import { Calendar, Contact2, Eye, FolderOpen, LayoutGrid, LineChart, LucideIcon, PawPrint, Tag, Timer, UsersRound } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
}

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
}

type Group = {
  groupLabel: string;
  menus: Menu[];
}

export function proMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.startsWith("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/dashboard/agenda",
          label: "Agenda",
          active: pathname.startsWith("/dashboard/agenda"),
          icon: Calendar,
          submenus: [],
        }
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "/dashboard/accounting",
          label: "Administratif",
          active: pathname.startsWith("/dashboard/accounting"),
          icon: FolderOpen,
          submenus: [],
        },
        {
          href: "/dashboard/team",
          label: "Equipe",
          active: pathname.startsWith("/dashboard/team"),
          icon: UsersRound,
          submenus: [],
        },
        {
          href: "/dashboard/reminders",
          label: "Rappels",
          active: pathname.startsWith("/dashboard/reminders"),
          icon: Timer,
          submenus: [],
        }
      ],
    },
    {
      groupLabel: "Gestion",
      menus: [
        {
          href: "/dashboard/clients",
          label: "Clients",
          active: pathname.startsWith("/dashboard/clients"),
          icon: Contact2,
          submenus: [],
        },
        {
          href: "/dashboard/patients",
          label: "Patients",
          active: pathname.startsWith("/dashboard/patients"),
          icon: PawPrint,
          submenus: [],
        },
        {
          href: "/dashboard/reports",
          label: "Rapports",
          active: pathname.startsWith("/dashboard/reports"),
          icon: LineChart,
          submenus: [],
        },
        {
          href: "/dashboard/observations",
          label: "Observations",
          active: pathname.startsWith("/dashboard/observations"),
          icon: Eye,
          submenus: [],
        }
      ],
    }
  ]
};

export function clientMenuList(pathname: string): Group[] {
  return [];
};