import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "fr",
})

export const { Link, getPathname, permanentRedirect, redirect, usePathname, useRouter } = createNavigation(routing)
