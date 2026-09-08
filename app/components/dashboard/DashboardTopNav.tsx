"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageIcon, NotificationIcon } from "../dashboardIcons";
import { ArrowDown, DummyAvatar, Hamburger, Logo } from "../icons";

const pageNames: Record<string, string> = {
  profile: "Profile",
  services: "Services",
  work: "Upload Work",
  messages: "Messages",
  reviews: "Reviews",
  analytics: "Analytics",
  community: "Community",
  verification: "Verification",
  subscription: "Pro Subscription",
  notifications: "Notifications",
  settings: "Settings",
  support: "Support",
};

function HelpIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 3.3 2.1c-.7.4-1.1.9-1.1 1.9M12 17h.01"/></svg>;
}

function HeaderIconButton({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={`${label}, ${count} unread`}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F4F2] text-[#293A2D] transition hover:bg-[#E7EEE9] [&_path]:fill-current"
    >
      {children}
      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#E05252] px-1 text-[9px] font-bold leading-none text-white">
        {count}
      </span>
    </button>
  );
}

export default function DashboardTopNav({
  mobileOpen,
  onMenuToggle,
}: {
  mobileOpen: boolean;
  onMenuToggle: () => void;
}) {
  const pathname = usePathname();
  const section = pathname.split("/")[3];
  const pageName = pathname.startsWith("/artisan/verification-centre")
    ? "Verification Centre"
    : section
      ? pageNames[section] ?? "Dashboard"
      : "Dashboard";

  return (
    <header className="relative z-[70] flex h-[68px] shrink-0 items-center justify-between border-b border-[#E5EBE6] bg-white px-4 sm:px-6 lg:h-[76px] lg:px-8">
      <div className="flex min-w-0 items-center">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label={mobileOpen ? "Close dashboard menu" : "Open dashboard menu"}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[#346739] lg:hidden [&_svg]:h-9 [&_svg]:w-9"
        >
          <Hamburger />
        </button>
        <Link href="/" aria-label="Headpan home" className="ml-2 shrink-0 lg:hidden">
          <Logo />
        </Link>
        <h1 className="hidden truncate text-xl font-bold text-[#293A2D] lg:block">{pageName}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button type="button" className="mr-1 hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#4F6552] transition hover:bg-[#F5FFF9] lg:flex">
          <HelpIcon />
          Need help?
        </button>
        <HeaderIconButton label="Messages" count={4}><MessageIcon /></HeaderIconButton>
        <HeaderIconButton label="Notifications" count={7}><NotificationIcon /></HeaderIconButton>
        <button type="button" className="ml-0.5 flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="hidden max-w-36 truncate text-sm font-semibold text-[#293A2D] lg:block">Segun Adewale</span>
          <span className="relative shrink-0 [&_svg]:h-10 [&_svg]:w-10">
            <DummyAvatar />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#27A844]" aria-label="Online" />
          </span>
          <span className="hidden lg:block"><ArrowDown /></span>
        </button>
      </div>
    </header>
  );
}
