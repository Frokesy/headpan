import type { ReactNode } from "react";
import ArtisanDashboardShell from "../../components/dashboard/ArtisanDashboardShell";

export default function ArtisanDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ArtisanDashboardShell>{children}</ArtisanDashboardShell>;
}
