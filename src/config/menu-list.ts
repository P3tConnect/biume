import {
  Calendar,
  Contact2,
  DollarSignIcon,
  Eye,
  FileText,
  FolderOpen,
  LayoutGrid,
  LucideIcon,
  NotepadText,
  PawPrint,
  Receipt,
  Settings,
  Timer,
} from "lucide-react"

export type Submenu = {
  href: string
  label: string
  active: boolean
  comingSoon?: boolean
  icon: LucideIcon
}

export type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus?: Submenu[]
  comingSoon?: boolean
}

export type Group = {
  groupLabel: string
  menus: Menu[]
}

export function proMenuList(pathname: string, companyId: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/dashboard/organization/${companyId}`,
          label: "dashboard.sidebar.dashboard",
          active: pathname == `/dashboard/organization/${companyId}`,
          icon: LayoutGrid,
        },
        {
          href: `/dashboard/organization/${companyId}/timetable`,
          label: "dashboard.sidebar.calendar",
          active: pathname == `/dashboard/organization/${companyId}/timetable`,
          icon: Calendar,
        },
      ],
    },
    {
      groupLabel: "dashboard.sidebar.groupLabels.management",
      menus: [
        {
          href: `/dashboard/organization/${companyId}/accounting`,
          label: "dashboard.sidebar.accounting",
          active: pathname.startsWith(`/dashboard/organization/${companyId}/accounting`),
          icon: FolderOpen,
          submenus: [
            {
              href: `/dashboard/organization/${companyId}/accounting`,
              label: "dashboard.sidebar.home",
              active: pathname === `/dashboard/organization/${companyId}/accounting`,
              icon: Contact2,
            },
            {
              href: `/dashboard/organization/${companyId}/accounting/estimates`,
              label: "dashboard.sidebar.estimates",
              active: pathname === `/dashboard/organization/${companyId}/accounting/estimates`,
              comingSoon: true,
              icon: FileText,
            },
            {
              href: `/dashboard/organization/${companyId}/accounting/invoices`,
              label: "dashboard.sidebar.invoices",
              active: pathname === `/dashboard/organization/${companyId}/accounting/invoices`,
              icon: Receipt,
            },
            {
              href: `/dashboard/organization/${companyId}/accounting/expenses`,
              label: "dashboard.sidebar.expenses",
              active: pathname === `/dashboard/organization/${companyId}/accounting/expenses`,
              icon: DollarSignIcon,
            },
          ],
        },
        {
          href: `/dashboard/organization/${companyId}/clients`,
          label: "dashboard.sidebar.clients",
          active: pathname == `/dashboard/organization/${companyId}/clients`,
          icon: Contact2,
        },
        {
          href: `/dashboard/organization/${companyId}/patients`,
          label: "dashboard.sidebar.patients",
          active: pathname == `/dashboard/organization/${companyId}/patients`,
          icon: PawPrint,
        },
      ],
    },
    {
      groupLabel: "dashboard.sidebar.groupLabels.services",
      menus: [
        {
          href: `/dashboard/organization/${companyId}/reports`,
          label: "dashboard.sidebar.reports",
          active: pathname == `/dashboard/organization/${companyId}/reports`,
          icon: NotepadText,
        },
        {
          href: `/dashboard/organization/${companyId}/observations`,
          label: "dashboard.sidebar.observations",
          comingSoon: true,
          active:
            pathname == `/dashboard/organization/${companyId}/observations`,
          icon: Eye,
        },
        {
          href: `/dashboard/organization/${companyId}/reminders`,
          label: "dashboard.sidebar.reminders",
          active: pathname == `/dashboard/organization/${companyId}/reminders`,
          icon: Timer,
        },
      ],
    },
    {
      groupLabel: "dashboard.sidebar.groupLabels.informations",
      menus: [
        {
          href: `/dashboard/organization/${companyId}/settings`,
          label: "Paramètres",
          active: pathname.includes(`/dashboard/organization/${companyId}/settings`),
          icon: Settings,
        },
      ],
    },
  ]
}
