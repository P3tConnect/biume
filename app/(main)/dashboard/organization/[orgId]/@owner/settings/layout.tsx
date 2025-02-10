import SettingsLayout from "@/components/dashboard/pages/pro/settings-page/layout/settings-layout";
import React from "react";

const DashboardOrganizationSettingsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SettingsLayout>{children}</SettingsLayout>;
};

export default DashboardOrganizationSettingsLayout;
