export type Locale = (typeof locales)[number]

export const locales = ["en", "fr"] as const
export const defaultLocale: Locale = "en"

export enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
}
