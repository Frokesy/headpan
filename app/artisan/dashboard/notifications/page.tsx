"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DashboardFilterIcon,
  MessageIcon,
  NotificationIcon,
  PeopleIcon,
  StarIcon,
  UploadIcon,
} from "../../../components/dashboardIcons";

type NotificationItem = {
  id: number;
  group: "Today" | "Earlier";
  category: "Messages" | "Leads" | "Reviews" | "Profile";
  title: string;
  description: string;
  time: string;
  action: string;
  href: string;
  unread: boolean;
  icon: typeof MessageIcon;
  accent: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    group: "Today",
    category: "Messages",
    title: "New message from Sarah Joy",
    description:
      "Hi Janet, I would like to discuss a custom bridal outfit for an event next month.",
    time: "8 minutes ago",
    action: "View message",
    href: "/artisan/dashboard/messages",
    unread: true,
    icon: MessageIcon,
    accent: "bg-[#E8F4FF] text-[#3478B9]",
  },
  {
    id: 2,
    group: "Today",
    category: "Leads",
    title: "You received a new lead",
    description:
      "A client near Ikeja is looking for an artisan for three corporate outfits.",
    time: "42 minutes ago",
    action: "View lead",
    href: "/artisan/dashboard/messages",
    unread: true,
    icon: PeopleIcon,
    accent: "bg-[#EAF7EF] text-[#346739]",
  },
  {
    id: 3,
    group: "Today",
    category: "Reviews",
    title: "New 5-star review",
    description:
      "Amaka loved your work and left a review on your public profile.",
    time: "2 hours ago",
    action: "View review",
    href: "/artisan/dashboard/reviews",
    unread: true,
    icon: StarIcon,
    accent: "bg-[#FFF5D9] text-[#D19A00]",
  },
  {
    id: 4,
    group: "Earlier",
    category: "Profile",
    title: "Your work gallery is getting noticed",
    description: "Your Native Wears collection received 126 views this week.",
    time: "Yesterday",
    action: "View analytics",
    href: "/artisan/dashboard/analytics",
    unread: false,
    icon: UploadIcon,
    accent: "bg-[#F5EAF8] text-[#8F5E9B]",
  },
  {
    id: 5,
    group: "Earlier",
    category: "Profile",
    title: "Complete your artisan profile",
    description:
      "Add two more work samples to increase your profile completion score.",
    time: "2 days ago",
    action: "Complete profile",
    href: "/artisan/dashboard/profile",
    unread: false,
    icon: NotificationIcon,
    accent: "bg-[#FFF0E5] text-[#C76C27]",
  },
];

const preferenceItems = [
  {
    id: "email",
    title: "Email notifications",
    description: "Receive important account and client updates by email.",
    icon: NotificationIcon,
    accent: "bg-[#EAF7EF] text-[#346739]",
  },
  {
    id: "sms",
    title: "SMS notifications",
    description: "Get urgent lead and booking alerts on your phone.",
    icon: MessageIcon,
    accent: "bg-[#E8F4FF] text-[#3478B9]",
  },
  {
    id: "push",
    title: "Push notifications",
    description: "See real-time alerts while using your dashboard.",
    icon: UploadIcon,
    accent: "bg-[#F5EAF8] text-[#8F5E9B]",
  },
] as const;

function PreferenceToggle({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-[50px] shrink-0 rounded-full p-[3px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#346739]/20 focus:ring-offset-2 ${enabled ? "bg-[#346739]" : "bg-[#CBD4CD]"}`}
    >
      <span
        className={`block h-[22px] w-[22px] rounded-full bg-white shadow-[0_2px_5px_rgba(30,55,35,0.22)] transition-transform duration-200 ${enabled ? "translate-x-[22px]" : "translate-x-0"}`}
      />
    </button>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<number[]>([]);
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const filtered = useMemo(
    () =>
      notifications.filter(
        (item) => category === "All" || item.category === category,
      ),
    [category, notifications],
  );
  const allSelected =
    filtered.length > 0 && filtered.every((item) => selected.includes(item.id));

  function toggleAll() {
    if (allSelected)
      setSelected((current) =>
        current.filter((id) => !filtered.some((item) => item.id === id)),
      );
    else
      setSelected((current) =>
        Array.from(new Set([...current, ...filtered.map((item) => item.id)])),
      );
  }

  function markRead() {
    setNotifications((current) =>
      current.map((item) =>
        selected.length === 0 || selected.includes(item.id)
          ? { ...item, unread: false }
          : item,
      ),
    );
    setSelected([]);
  }

  return (
    <div className="w-full space-y-6 pb-10">
      <header>
        <div>
          <p className="mt-1.5 text-sm text-[#718075]">
            Stay updated with your business activities.
          </p>
        </div>
      </header>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="overflow-hidden rounded-2xl border border-[#E2E9E3] bg-white shadow-[0_7px_24px_rgba(41,58,45,0.05)]">
          <div className="flex flex-col gap-3 border-b border-[#E5EBE6] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#58685C]">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 accent-[#346739]"
              />
              Select all
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={markRead}
                className="h-10 rounded-xl px-3 text-left text-xs font-bold text-[#346739] transition hover:bg-[#F0FFF6]"
              >
                Mark all as read
              </button>
              <label className="flex h-10 w-full items-center gap-2 rounded-xl bg-[#F1F4F2] px-3 text-[#68786C] sm:w-[190px]">
                <DashboardFilterIcon />
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  aria-label="Filter notifications by category"
                  className="min-w-0 flex-1 bg-transparent text-xs font-semibold outline-none"
                >
                  <option>All</option>
                  <option>Messages</option>
                  <option>Leads</option>
                  <option>Reviews</option>
                  <option>Profile</option>
                </select>
              </label>
            </div>
          </div>

          {(["Today", "Earlier"] as const).map((group) => {
            const items = filtered.filter((item) => item.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="px-4 py-5 sm:px-5">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#849087]">
                  {group}
                </h2>
                <div className="divide-y divide-[#E8EDE9]">
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article
                        key={item.id}
                        className={`relative flex items-start gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4 ${item.unread ? "after:absolute after:right-0 after:top-5 after:h-2 after:w-2 after:rounded-full after:bg-[#346739]" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() =>
                            setSelected((current) =>
                              current.includes(item.id)
                                ? current.filter((id) => id !== item.id)
                                : [...current, item.id],
                            )
                          }
                          aria-label={`Select ${item.title}`}
                          className="mt-3 h-4 w-4 shrink-0 accent-[#346739]"
                        />
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 [&_svg]:h-5 [&_svg]:w-5 [&_path]:fill-current ${item.accent}`}
                        >
                          <Icon />
                        </span>
                        <div className="min-w-0 flex-1 pr-3">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <h3
                              className={`text-sm text-[#34473A] ${item.unread ? "font-bold" : "font-semibold"}`}
                            >
                              {item.title}
                            </h3>
                            <span className="shrink-0 text-[10px] text-[#929C94]">
                              {item.time}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-5 text-[#718075]">
                            {item.description}
                          </p>
                          <Link
                            href={item.href}
                            className="mt-2 inline-flex text-[11px] font-bold text-[#346739] hover:underline"
                          >
                            {item.action} →
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        <aside className="rounded-2xl border border-[#E2E9E3] bg-white p-4 shadow-[0_7px_24px_rgba(41,58,45,0.05)] sm:p-5">
          <h2 className="text-lg font-bold text-[#293A2D]">
            Notification preferences
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#7D8980]">
            Choose how you want to receive updates.
          </p>
          <div className="mt-5 space-y-3">
            {preferenceItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl bg-[#F5F7F5] p-3.5"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg [&_svg]:h-[18px] [&_svg]:w-[18px] [&_path]:fill-current ${item.accent}`}
                  >
                    <Icon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-[#35473A]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[10px] leading-4 text-[#7B8880]">
                      {item.description}
                    </p>
                  </div>
                  <PreferenceToggle
                    enabled={preferences[item.id]}
                    onChange={() =>
                      setPreferences((current) => ({
                        ...current,
                        [item.id]: !current[item.id],
                      }))
                    }
                    label={item.title}
                  />
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
