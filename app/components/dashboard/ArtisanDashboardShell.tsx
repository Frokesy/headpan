"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import ArtisanDashboardSidebar from "./ArtisanDashboardSidebar";
import DashboardTopNav from "./DashboardTopNav";

export default function ArtisanDashboardShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isMessagesPage = pathname === "/artisan/dashboard/messages";

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8FAF8] lg:flex-row">
      <ArtisanDashboardSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardTopNav
          mobileOpen={mobileOpen}
          onMenuToggle={() => setMobileOpen((current) => !current)}
        />
        <main
          className={`min-h-0 flex-1 overscroll-contain ${
            isMessagesPage
              ? "overflow-hidden"
              : "overflow-y-auto px-3 py-5 sm:px-4 lg:px-5 lg:py-7"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
