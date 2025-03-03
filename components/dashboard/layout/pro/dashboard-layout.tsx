import { DashboardNavbar } from "./dashboard-navbar";

export default function DashboardLayout({
  children,
  companyId,
}: {
  children: React.ReactNode;
  companyId: string;
}) {
  return (
    <div className="h-screen w-screen bg-background flex flex-col">
      <DashboardNavbar companyId={companyId} />
      <main className="h-full w-full p-2 overflow-y-auto">{children}</main>
    </div>
  );
}
