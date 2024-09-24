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
  locale: string,
  companyId: string,
): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/${locale}/dashboard/${companyId}`,
          label: "Dashboard",
          active: pathname == `/${locale}/dashboard/${companyId}`,
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/${companyId}/timetable`,
          label: "Agenda",
          active: pathname == `/${locale}/dashboard/${companyId}/timetable`,
          icon: Calendar,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: `/${locale}/dashboard/${companyId}/accounting`,
          label: "Administratif",
          active: pathname == `/${locale}/dashboard/${companyId}/accounting`,
          icon: FolderOpen,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/${companyId}/team`,
          label: "Equipe",
          active: pathname == `/${locale}/dashboard/${companyId}/team`,
          icon: UsersRound,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/${companyId}/reminders`,
          label: "Rappels",
          active: pathname == `/${locale}/dashboard/${companyId}/reminders`,
          icon: Timer,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Gestion",
      menus: [
        {
          href: `/${locale}/dashboard/${companyId}/clients`,
          label: "Clients",
          active: pathname == `/${locale}/dashboard/${companyId}/clients`,
          icon: Contact2,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/${companyId}/patients`,
          label: "Patients",
          active: pathname == `/${locale}/dashboard/${companyId}/patients`,
          icon: PawPrint,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/${companyId}/reports`,
          label: "Rapports",
          active: pathname == `/${locale}/dashboard/${companyId}/reports`,
          icon: LineChart,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/${companyId}/observations`,
          label: "Observations",
          active: pathname == `/${locale}/dashboard/${companyId}/observations`,
          icon: Eye,
          submenus: [],
        },
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
    },
  ];
}

export function clientMenuList(pathname: string, locale: string): Group[] {
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
        },
      ],
    },
    {
      groupLabel: "Mon compte",
      menus: [
        {
          href: `/${locale}/dashboard/reservations`,
          label: "Mes réservations",
          active: pathname == `/${locale}/dashboard/reservations`,
          icon: Ticket,
          submenus: [],
        },
        {
          href: `/${locale}/dashboard/pets`,
          label: "Mes animaux",
          active: pathname == `/${locale}/dashboard/pets`,
          icon: PawPrint,
          submenus: [],
        }
      ],
    },
  ];
}
