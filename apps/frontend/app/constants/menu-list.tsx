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
  Settings,
  Timer,
  FileText,
  Receipt,
  PieChart,
  DollarSignIcon,
  Ticket,
  UsersRound,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
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

export function proMenuList(pathname: string, companyId: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/dashboard/organization/${companyId}`,
          label: "Tableau de bord",
          active: pathname == `/dashboard/organization/${companyId}`,
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: `/dashboard/organization/${companyId}/timetable`,
          label: "Calendrier",
          active: pathname == `/dashboard/organization/${companyId}/timetable`,
          icon: Calendar,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Gestion",
      menus: [
        {
          href: `/dashboard/organization/${companyId}/accounting`,
          label: "Comptabilité",
          active: pathname.startsWith(
            `/dashboard/organization/${companyId}/accounting`,
          ),
          icon: FolderOpen,
          submenus: [
            {
              href: `/dashboard/organization/${companyId}/accounting`,
              label: "Accueil",
              active:
                pathname === `/dashboard/organization/${companyId}/accounting`,
              icon: Contact2,
            },
            {
              href: `/dashboard/organization/${companyId}/accounting/estimates`,
              label: "Devis",
              active:
                pathname ===
                `/dashboard/organization/${companyId}/accounting/estimates`,
              icon: FileText,
            },
            {
              href: `/dashboard/organization/${companyId}/accounting/invoices`,
              label: "Factures",
              active:
                pathname ===
                `/dashboard/organization/${companyId}/accounting/invoices`,
              icon: Receipt,
            },
            {
              href: `/dashboard/organization/${companyId}/accounting/expenses`,
              label: "Dépenses",
              active:
                pathname ===
                `/dashboard/organization/${companyId}/accounting/expenses`,
              icon: DollarSignIcon,
            },
            {
              href: `/dashboard/organization/${companyId}/accounting/reports`,
              label: "Comptes financiers",
              active:
                pathname ===
                `/dashboard/organization/${companyId}/accounting/reports`,
              icon: PieChart,
            },
          ],
        },
        {
          href: `/dashboard/organization/${companyId}/clients`,
          label: "Clients",
          active: pathname == `/dashboard/organization/${companyId}/clients`,
          icon: Contact2,
          submenus: [],
        },
        {
          href: `/dashboard/organization/${companyId}/patients`,
          label: "Patients",
          active: pathname == `/dashboard/organization/${companyId}/patients`,
          icon: PawPrint,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Services",
      menus: [
        {
          href: `/dashboard/organization/${companyId}/reports`,
          label: "Rapports",
          active: pathname == `/dashboard/organization/${companyId}/reports`,
          icon: LineChart,
          submenus: [],
        },
        {
          href: `/dashboard/organization/${companyId}/observations`,
          label: "Observations",
          active:
            pathname == `/dashboard/organization/${companyId}/observations`,
          icon: Eye,
          submenus: [],
        },
        {
          href: `/dashboard/organization/${companyId}/reminders`,
          label: "Rappels",
          active: pathname == `/dashboard/organization/${companyId}/reminders`,
          icon: Timer,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Autres",
      menus: [
        {
          href: `/dashboard/organization/${companyId}/settings/profile`,
          label: "Paramètres",
          active:
            pathname == `/dashboard/organization/${companyId}/settings/profile`,
          icon: Settings,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Informations",
      menus: [
        {
          href: `/help`,
          label: "Aide",
          active: pathname == `/help`,
          icon: LucideMessageCircleQuestion,
          submenus: [],
        },
      ],
    },
  ];
}

export function clientMenuList(pathname: string, userId: string) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/dashboard/user/${userId}`,
          label: "Tableau de bord",
          active: pathname == `/dashboard/user/${userId}`,
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: `/dashboard/user/${userId}/timetable`,
          label: "Calendrier",
          active: pathname == `/dashboard/user/${userId}/timetable`,
          icon: Calendar,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "compte",
      menus: [
        {
          href: `/dashboard/user/${userId}/reservations`,
          label: "Réservations",
          active: pathname == `/dashboard/user/${userId}/reservations`,
          icon: Ticket,
          submenus: [],
        },
        {
          href: `/dashboard/user/${userId}/pets`,
          label: "Animaux",
          active: pathname == `/dashboard/user/${userId}/pets`,
          icon: PawPrint,
          submenus: [],
        },
        {
          href: `/dashboard/user/${userId}/settings`,
          label: "Paramètres",
          active: pathname == `/dashboard/user/${userId}/settings`,
          icon: UsersRound,
          submenus: [],
        },
      ],
    },
  ];
}
