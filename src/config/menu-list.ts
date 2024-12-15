import {
  Calendar,
  Contact2,
  Eye,
  FolderOpen,
  LayoutGrid,
  LineChart,
  LucideIcon,
  LucideMessageCircleQuestion,
  PawPrint,
  Ticket,
  Timer,
  UsersRound,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function proMenuList(
  pathname: string,
  companyId: string,
): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/dashboard/${companyId}`,
          label: "dashboard.sidebar.dashboard",
          active: pathname == `/dashboard/${companyId}`,
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: `/dashboard/${companyId}/timetable`,
          label: "dashboard.sidebar.calendar",
          active: pathname == `/dashboard/${companyId}/timetable`,
          icon: Calendar,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "dashboard.sidebar.groupLabels.management",
      menus: [
        {
          href: `/dashboard/${companyId}/accounting`,
          label: "dashboard.sidebar.accounting",
          active: pathname == `/dashboard/${companyId}/accounting`,
          icon: FolderOpen,
          submenus: [],
        },
        {
          href: `/dashboard/${companyId}/team`,
          label: "dashboard.sidebar.team",
          active: pathname == `/dashboard/${companyId}/team`,
          icon: UsersRound,
          submenus: [],
        },
        {
          href: `/dashboard/${companyId}/reminders`,
          label: "dashboard.sidebar.reminders",
          active: pathname == `/dashboard/${companyId}/reminders`,
          icon: Timer,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "dashboard.sidebar.groupLabels.services",
      menus: [
        {
          href: `/dashboard/${companyId}/clients`,
          label: "dashboard.sidebar.clients",
          active: pathname == `/dashboard/${companyId}/clients`,
          icon: Contact2,
          submenus: [],
        },
        {
          href: `/dashboard/${companyId}/patients`,
          label: "dashboard.sidebar.patients",
          active: pathname == `/dashboard/${companyId}/patients`,
          icon: PawPrint,
          submenus: [],
        },
        {
          href: `/dashboard/${companyId}/reports`,
          label: "dashboard.sidebar.reports",
          active: pathname == `/dashboard/${companyId}/reports`,
          icon: LineChart,
          submenus: [],
        },
        {
          href: `/dashboard/${companyId}/observations`,
          label: "dashboard.sidebar.observations",
          active: pathname == `/dashboard/${companyId}/observations`,
          icon: Eye,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "dashboard.sidebar.groupLabels.informations",
      menus: [
        {
          href: `/help`,
          label: "dashboard.sidebar.help",
          active: pathname == `/help`,
          icon: LucideMessageCircleQuestion,
          submenus: [],
        },
      ],
    },
  ];
}

export function clientMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/dashboard`,
          label: "Dashboard",
          active: pathname == `/dashboard`,
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: `/dashboard/timetable`,
          label: "Agenda",
          active: pathname == `/dashboard/timetable`,
          icon: Calendar,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Mon compte",
      menus: [
        {
          href: `/dashboard/reservations`,
          label: "Mes réservations",
          active: pathname == `/dashboard/reservations`,
          icon: Ticket,
          submenus: [],
        },
        {
          href: `/dashboard/pets`,
          label: "Mes animaux",
          active: pathname == `/dashboard/pets`,
          icon: PawPrint,
          submenus: [],
        },
        {
          href: '/dashboard/settings',
          label: "Réglages",
          active: pathname == '/dashboard/settings',
          icon: UsersRound,
          submenus: [],
        }
      ],
    },
  ];
}
