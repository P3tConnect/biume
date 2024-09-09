import { Calendar, Contact2, Eye, FolderOpen, LayoutGrid, LineChart, LucideIcon, LucideMessageCircleQuestion, PawPrint, Tag, Timer, UsersRound } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
}

export type Menu = {
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

export function proSimpleMenuList(pathname: string, locale: string) {
  return [
    {
      href: `/${locale}/dashboard`,
      label: "Dashboard",
      active: pathname == `/${locale}/dashboard`,
    },
    {
      href: `/${locale}/dashboard/timetable`,
      label: "Agenda",
      active: pathname == `/${locale}/dashboard/timetable`,
    },
    {
      href: `/${locale}/dashboard/accounting`,
      label: "Administratif",
      active: pathname == `/${locale}/dashboard/accounting`,
    },
    {
      href: `/${locale}/dashboard/team`,
      label: "Equipe",
      active: pathname == `/${locale}/dashboard/team`,
    },
    {
      href: `/${locale}/dashboard/reminders`,
      label: "Rappels",
      active: pathname == `/${locale}/dashboard/reminders`,
    },
    {
      href: `/${locale}/dashboard/clients`,
      label: "Clients",
      active: pathname == `/${locale}/dashboard/clients`,
    },
    {
      href: `/${locale}/dashboard/patients`,
      label: "Patients",
      active: pathname == `/${locale}/dashboard/patients`,
    },
    {
      href: `/${locale}/dashboard/reports`,
      label: "Rapports",
      active: pathname == `/${locale}/dashboard/reports`,
    },
    {
      href: `/${locale}/dashboard/observations`,
      label: "Observations",
      active: pathname == `/${locale}/dashboard/observations`,
    }
  ];
}

export function proMenuList(pathname: string, locale: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/${locale}/dashboard`,
          label: "Dashboard",
          active: pathname == `/${locale}/dashboard`,
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/timetable`,
          label: "Agenda",
          active: pathname == `/${locale}/dashboard/timetable`,
          icon: Calendar,
          submenus: [],
        }
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: `/${locale}/dashboard/accounting`,
          label: "Administratif",
          active: pathname == `/${locale}/dashboard/accounting`,
          icon: FolderOpen,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/team`,
          label: "Equipe",
          active: pathname == `/${locale}/dashboard/team`,
          icon: UsersRound,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/reminders`,
          label: "Rappels",
          active: pathname == `/${locale}/dashboard/reminders`,
          icon: Timer,
          submenus: [],
        }
      ],
    },
    {
      groupLabel: "Gestion",
      menus: [
        {
          href: `/${locale}/dashboard/clients`,
          label: "Clients",
          active: pathname == `/${locale}/dashboard/clients`,
          icon: Contact2,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/patients`,
          label: "Patients",
          active: pathname == `/${locale}/dashboard/patients`,
          icon: PawPrint,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/reports`,
          label: "Rapports",
          active: pathname == `/${locale}/dashboard/reports`,
          icon: LineChart,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/observations`,
          label: "Observations",
          active: pathname == `/${locale}/dashboard/observations`,
          icon: Eye,
          submenus: [],
        }
      ],
    },
    {
      groupLabel: "Informations",
      menus: [
        {
          href: `/${locale}/help`,
          label: "Aide et Assistance",
          active: pathname == `/${locale}/help`,
          icon: LucideMessageCircleQuestion,
          submenus: [],
        },
      ],
    }
  ]
};

export function clientMenuList(pathname: string): Group[] {
  return [];
};