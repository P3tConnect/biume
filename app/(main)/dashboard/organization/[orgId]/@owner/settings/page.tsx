import SettingsPageComponent from "@/components/dashboard/pages/pro/settings-page/settings-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paramètres | Dashboard",
  description: "Paramètres",
}

const SettingsPage = () => {
  return <SettingsPageComponent />
}

export default SettingsPage
