import Link from "next/link";
import {
  AnalyticsIcon,
  LineGraphTwo,
  MessageIcon,
  PeopleIcon,
  ProfileIcon,
  ServiceIcon,
  SettingsIcon,
  StarIcon,
  SuitcaseIcon,
  UploadIcon,
} from "../../components/dashboardIcons";

const stats = [
  {
    label: "Messages",
    value: "24",
    note: "+8 this week",
    icon: MessageIcon,
    cardStyle: "bg-[#EAF4FF]",
    iconStyle: "text-[#3478B9]",
  },
  {
    label: "New Leads",
    value: "18",
    note: "+12% this month",
    icon: PeopleIcon,
    cardStyle: "bg-[#EAF7EF]",
    iconStyle: "text-[#346739]",
  },
  {
    label: "Reviews",
    value: "36",
    note: "4.8 average rating",
    icon: StarIcon,
    cardStyle: "bg-[#FFF6DE]",
    iconStyle: "text-[#D19A00]",
  },
  {
    label: "Jobs Completed",
    value: "42",
    note: "+5 this month",
    icon: SuitcaseIcon,
    cardStyle: "bg-[#F5EAF8]",
    iconStyle: "text-[#8F5E9B]",
  },
];

const activities = [
  {
    title: "New message from Amaka Johnson",
    detail: "Asked about your Native Wear service",
    time: "12 minutes ago",
    icon: MessageIcon,
    style: "bg-[#E8F4FF] text-[#3478B9]",
  },
  {
    title: "You received a new 5-star review",
    detail: "Kemi loved the bridal outfit you delivered",
    time: "2 hours ago",
    icon: StarIcon,
    style: "bg-[#FFF5D9] text-[#D19A00]",
  },
  {
    title: "New lead for Corporate Outfits",
    detail: "Tunde requested a quote for three outfits",
    time: "Yesterday",
    icon: PeopleIcon,
    style: "bg-[#EAF7EF] text-[#346739]",
  },
  {
    title: "Work gallery updated",
    detail: "You added 4 new photos to Native Wears",
    time: "2 days ago",
    icon: UploadIcon,
    style: "bg-[#F5EAF8] text-[#8F5E9B]",
  },
];

const quickActions = [
  {
    label: "Edit profile",
    href: "/artisan/dashboard/profile",
    icon: ProfileIcon,
  },
  {
    label: "Add services",
    href: "/artisan/dashboard/services",
    icon: ServiceIcon,
  },
  { label: "Upload work", href: "/artisan/dashboard/work", icon: UploadIcon },
  {
    label: "View messages",
    href: "/artisan/dashboard/messages",
    icon: MessageIcon,
  },
  {
    label: "View analytics",
    href: "/artisan/dashboard/analytics",
    icon: AnalyticsIcon,
  },
  {
    label: "Account settings",
    href: "/artisan/dashboard/settings",
    icon: SettingsIcon,
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

const cardClass =
  "rounded-2xl border border-[#E2E9E3] bg-white shadow-[0_7px_24px_rgba(41,58,45,0.05)]";

export default function ArtisanDashboardPage() {
  return (
    <div className="w-full space-y-6 pb-10">
      <header>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#293A2D] sm:text-3xl">
          Welcome back, Janet
        </h1>
        <p className="mt-1.5 text-sm text-[#718075]">
          Here&apos;s what is happening with your business.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="flex min-h-[230px] items-center gap-5 rounded-2xl border border-[#DDECF7] bg-[#F2F9FF] p-5 shadow-[0_7px_24px_rgba(41,58,45,0.04)] sm:gap-8 sm:p-7">
          <div className="relative flex h-[118px] w-[118px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#346739_0_76%,#DCE8E0_76%_100%)] sm:h-[140px] sm:w-[140px]">
            <span className="absolute inset-[10px] rounded-full bg-[#F2F9FF] sm:inset-[12px]" />
            <span className="relative text-2xl font-bold text-[#346739] sm:text-3xl">
              76%
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <p className="text-xs font-semibold text-[#5E7180]">
              Profile completion
            </p>
            <h2 className="mt-2 text-lg font-bold leading-6 text-[#293A2D] sm:text-xl">
              Your profile is almost ready
            </h2>
            <p className="mt-2 text-xs leading-5 text-[#71808B]">
              Complete the remaining details to attract more clients and improve
              your visibility.
            </p>
            <Link
              href="/artisan/dashboard/profile"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#346739] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#29562E]"
            >
              View profile <ArrowIcon />
            </Link>
          </div>
        </article>

        <article
          className={`${cardClass} flex min-h-[230px] min-w-0 items-center gap-4 overflow-hidden p-5 sm:gap-6 sm:p-7`}
        >
          <div className="flex w-[42%] min-w-[125px] shrink-0 flex-col items-start">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F4FF] text-[#3478B9]">
              <EyeIcon />
            </span>
            <p className="mt-4 text-sm font-bold text-[#435449]">
              Profile views
            </p>
            <p className="mt-2 text-3xl font-bold leading-none text-[#293A2D] sm:text-4xl">
              102
            </p>
            <p className="mt-2 text-[10px] font-medium text-[#7B8980]">
              <span className="font-bold text-[#346739]">18%</span> from last
              week
            </p>
          </div>
          <div className="min-w-0 flex-1 overflow-hidden [&_svg]:h-auto [&_svg]:w-full">
            <LineGraphTwo />
          </div>
        </article>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const noteParts = stat.note.split(" ");
          return (
            <article
              key={stat.label}
              className={`min-w-0 rounded-2xl border border-white/60 p-3.5 shadow-[0_6px_18px_rgba(41,58,45,0.04)] sm:p-5 ${stat.cardStyle}`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white sm:h-11 sm:w-11 [&_svg]:h-[19px] [&_svg]:w-[19px] [&_path]:fill-current ${stat.iconStyle}`}
                >
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-[#718075] sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-xl font-bold text-[#293A2D] sm:text-2xl">
                    {stat.value}
                  </p>
                </div>
              </div>
              <p className="mt-3 truncate text-[9px] font-medium text-[#849087] sm:text-[10px]">
                <span className="font-bold text-[#346739]">{noteParts[0]}</span>{" "}
                {noteParts.slice(1).join(" ")}
              </p>
            </article>
          );
        })}
      </section>

      <section className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-0 lg:space-x-6">
        <article className={`${cardClass} w-full p-4 sm:p-6 lg:w-[50%]`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#293A2D]">
                Recent activities
              </h2>
              <p className="mt-1 text-xs text-[#7C8980]">
                Latest updates from your business.
              </p>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-[#346739] hover:underline"
            >
              View all
            </button>
          </div>
          <div className="mt-5 divide-y divide-[#E8EDE9]">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.title}
                  className="flex items-start gap-3 py-4 first:pt-0 last:pb-0 sm:items-center sm:gap-3.5"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-[18px] sm:[&_svg]:w-[18px] [&_path]:fill-current ${activity.style}`}
                  >
                    <Icon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold leading-5 text-[#35473A] sm:text-sm">
                      {activity.title}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#78867C] sm:truncate sm:text-xs">
                      {activity.detail}
                    </p>
                    <p className="mt-1 text-[9px] text-[#909B92] sm:hidden">
                      {activity.time}
                    </p>
                  </div>
                  <p className="hidden shrink-0 text-[10px] text-[#909B92] sm:block">
                    {activity.time}
                  </p>
                </div>
              );
            })}
          </div>
        </article>

        <div className="box-border grid w-full min-w-0 gap-4 overflow-hidden rounded-2xl bg-[#EDF7FF] p-3 sm:gap-2 sm:p-0 lg:w-[50%] lg:rounded-none">
          <article className="w-full min-w-0 p-0 sm:p-6">
            <h2 className="text-lg font-bold text-[#293A2D]">Quick actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex min-h-[82px] min-w-0 flex-col items-center justify-center rounded-xl bg-white p-2 text-center transition hover:-translate-y-0.5 hover:bg-[#DFF0FC] sm:min-h-[92px] sm:p-3"
                  >
                    <span className="text-[#526757] transition group-hover:text-[#346739] [&_svg]:h-5 [&_svg]:w-5 [&_path]:fill-current">
                      <Icon />
                    </span>
                    <span className="mt-2 text-[10px] font-bold leading-4 text-[#4F6153] sm:text-[11px]">
                      {action.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </article>

          <article className="w-full min-w-0 p-0 sm:p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#52738E]">
              Community update
            </p>
            <div className="flex items-center gap-3 rounded-xl bg-white p-3 sm:gap-3.5 sm:p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F4FF] text-[#3478B9] [&_path]:fill-current">
                <MessageIcon />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold text-[#34473A]">
                  New message from Sarah Joy
                </h2>
                <p className="mt-1 truncate text-xs text-[#718075]">
                  Shared an update in the Headpan artisan community.
                </p>
                <p className="mt-1 text-[9px] text-[#96A098] sm:hidden">
                  8 minutes ago
                </p>
              </div>
              <div className="hidden shrink-0 sm:block">
                <p className="mt-1.5 whitespace-nowrap text-[10px] text-[#96A098]">
                  8 minutes ago
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
