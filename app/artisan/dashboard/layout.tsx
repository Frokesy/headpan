import type { ReactNode } from "react";
import ArtisanDashboardSidebar from "../../components/dashboard/ArtisanDashboardSidebar";

export default function ArtisanDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8FAF8] lg:flex-row">
      <ArtisanDashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-7 lg:px-10 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}
