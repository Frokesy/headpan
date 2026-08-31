"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnalyticsIcon,
  CommunityIcon,
  DashboardIcon,
  MessageIcon,
  NotificationIcon,
  ProfileIcon,
  ProSubIcon,
  ServiceIcon,
  SettingsIcon,
  StarIcon,
  SupportIcon,
  UploadIcon,
  VerificationIcon,
} from "../dashboardIcons";
import { Logo } from "../icons";
import DashboardUpgradeCard from "./DashboardUpgradeCard";

const navigation = [
  { label: "Dashboard", href: "/artisan/dashboard", icon: DashboardIcon },
  { label: "My Profile", href: "/artisan/dashboard/profile", icon: ProfileIcon },
  { label: "Services & Skills", href: "/artisan/dashboard/services", icon: ServiceIcon },
  { label: "Upload My Work", href: "/artisan/dashboard/work", icon: UploadIcon },
  {
    label: "Messages",
    href: "/artisan/dashboard/messages",
    icon: MessageIcon,
    count: 4,
  },
  { label: "Reviews", href: "/artisan/dashboard/reviews", icon: StarIcon },
  {
    label: "Analytics",
    href: "/artisan/dashboard/analytics",
    icon: AnalyticsIcon,
  },
  {
    label: "Community",
    href: "/artisan/dashboard/community",
    icon: CommunityIcon,
  },
  {
    label: "Verification Centre",
    href: "/artisan/dashboard/verification",
    icon: VerificationIcon,
  },
  {
    label: "Pro Subscription",
    href: "/artisan/dashboard/subscription",
    icon: ProSubIcon,
  },
  {
    label: "Notifications",
    href: "/artisan/dashboard/notifications",
    icon: NotificationIcon,
    count: 7,
  },
  {
    label: "Settings",
    href: "/artisan/dashboard/settings",
    icon: SettingsIcon,
  },
  { label: "Help & Support", href: "/artisan/dashboard/support", icon: SupportIcon },
];


function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <span
        className={`absolute left-0 top-0.5 h-0.5 w-6 rounded bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
      />
      <span
        className={`absolute left-0 top-2.5 h-0.5 w-6 rounded bg-current transition ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`absolute left-0 top-[18px] h-0.5 w-6 rounded bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
      />
    </span>
  );
}

export default function ArtisanDashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/artisan/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const renderItems = (
    items: Array<{
      label: string;
      href: string;
      icon: React.ComponentType;
      count?: number;
    }>,
  ) =>
    items.map((item) => {
      const active = isActive(item.href);
      const Icon = item.icon;
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`group relative flex min-h-11 items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ease-out ${
              active
                ? "translate-x-1 bg-[#346739] text-white shadow-[0_7px_18px_rgba(52,103,57,0.22)]"
                : "text-[#4F6552] hover:translate-x-1 hover:bg-white hover:text-[#346739]"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center text-current [&_path]:fill-current ${active ? "scale-105" : "group-hover:scale-105"} transition-transform`}
            >
              <Icon />
            </span>
            <span className="truncate">{item.label}</span>
            {item.count !== undefined && (
              <span
                className={`ml-auto flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  active
                    ? "text-white bg-[#346739]"
                    : "text-[#E7F3EA] bg-[#346739]"
                }`}
              >
                {item.count}
              </span>
            )}
          </Link>
        </li>
      );
    });

  const sidebar = (
    <div className="flex h-full flex-col bg-[#F0FFF6]">
      <div className="flex h-[76px] shrink-0 items-center border-b border-[#E8EDE9] px-7">
        <Link href="/" aria-label="Headpan home">
          <Logo />
        </Link>
      </div>
      <nav
        aria-label="Artisan dashboard"
        className="min-h-0 flex-1 overflow-y-auto px-4 py-6"
      >
        <ul className="space-y-1.5">{renderItems(navigation)}</ul>
        <div className="mt-6" onClick={() => setOpen(false)}>
          <DashboardUpgradeCard />
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen w-[270px] shrink-0 border-r border-[#E8EDE9] lg:block">
        {sidebar}
      </aside>

      <header className="relative z-[70] flex h-[68px] shrink-0 items-center border-b border-[#E8EDE9] bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close dashboard menu" : "Open dashboard menu"}
          aria-expanded={open}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#346739]"
        >
          <MenuIcon open={open} />
        </button>
        <Link href="/" aria-label="Headpan home" className="ml-3 shrink-0">
          <Logo />
        </Link>
      </header>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-[#132216]/55 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Mobile artisan dashboard navigation"
        className={`fixed inset-y-0 left-0 z-[60] w-[min(84vw,290px)] border-r border-[#E8EDE9] bg-[#F0FFF6] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebar}
      </aside>
    </>
  );
}
