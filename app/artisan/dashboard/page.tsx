import Link from "next/link";
import {
  AnalyticsIcon,
  MessageIcon,
  ProfileIcon,
  ServiceIcon,
  StarIcon,
  UploadIcon,
  VerificationIcon,
} from "../../components/dashboardIcons";

const stats = [
  { label: "Profile views", value: "1,248", change: "+18%", icon: ProfileIcon },
  { label: "New enquiries", value: "24", change: "+8%", icon: MessageIcon },
  {
    label: "Services listed",
    value: "6",
    change: "2 drafts",
    icon: ServiceIcon,
  },
  {
    label: "Average rating",
    value: "4.8",
    change: "36 reviews",
    icon: StarIcon,
  },
];

const enquiries = [
  {
    name: "Amaka Obi",
    request: "Two-piece native outfit",
    time: "12 min ago",
    status: "New",
  },
  {
    name: "Tunde Balogun",
    request: "Corporate shirt alteration",
    time: "1 hr ago",
    status: "Replied",
  },
  {
    name: "Zainab Musa",
    request: "Bridal train consultation",
    time: "Yesterday",
    status: "New",
  },
];

export default function ArtisanDashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-7">
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#346739]">
            Thursday, 4 September
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[#293A2D] sm:text-3xl">
            Welcome back, Segun 👋
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#718075]">
            Here&apos;s what is happening with your artisan business today.
          </p>
        </div>
        <Link
          href="/artisan/dashboard/profile"
          className="rounded-xl bg-[#346739] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#294F2E]"
        >
          View public profile
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-[#E2EAE4] bg-white p-5 shadow-[0_6px_22px_rgba(41,58,45,0.05)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FFF6] text-[#346739] [&_path]:fill-current">
                  <Icon />
                </span>
                <span className="rounded-full bg-[#E9F8EE] px-2.5 py-1 text-[10px] font-bold text-[#346739]">
                  {stat.change}
                </span>
              </div>
              <p className="mt-5 text-2xl font-bold text-[#293A2D]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#718075]">
                {stat.label}
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
        <article className="rounded-2xl border border-[#E2EAE4] bg-white p-5 shadow-[0_6px_22px_rgba(41,58,45,0.05)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#293A2D]">
                Recent enquiries
              </h3>
              <p className="mt-1 text-xs text-[#718075]">
                Your latest messages from potential clients.
              </p>
            </div>
            <Link
              href="/artisan/dashboard/messages"
              className="text-xs font-bold text-[#346739] hover:underline"
            >
              View all messages
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[#E8EDE9]">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry.name}
                className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7F3EA] text-sm font-bold text-[#346739]">
                  {enquiry.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#293A2D]">
                    {enquiry.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#718075]">
                    {enquiry.request}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${enquiry.status === "New" ? "bg-[#E9F8EE] text-[#346739]" : "bg-[#F1F3F2] text-[#718075]"}`}
                  >
                    {enquiry.status}
                  </span>
                  <p className="mt-1 text-[10px] text-[#8B968D]">
                    {enquiry.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#E2EAE4] bg-white p-5 shadow-[0_6px_22px_rgba(41,58,45,0.05)] sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#293A2D]">
              Profile completion
            </h3>
            <span className="text-sm font-bold text-[#346739]">76%</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E4EAE5]">
            <div className="h-full w-[76%] rounded-full bg-[#346739]" />
          </div>
          <ul className="mt-5 space-y-3 text-xs text-[#58675B]">
            <li className="flex justify-between gap-4">
              <span>Add three more work samples</span>
              <b className="text-[#346739]">+12%</b>
            </li>
            <li className="flex justify-between gap-4">
              <span>Complete verification</span>
              <b className="text-[#346739]">+8%</b>
            </li>
            <li className="flex justify-between gap-4">
              <span>Add your FAQs</span>
              <b className="text-[#346739]">+4%</b>
            </li>
          </ul>
          <Link
            href="/artisan/dashboard/profile"
            className="mt-6 block w-full rounded-xl border border-[#346739] px-4 py-3 text-center text-xs font-bold text-[#346739] transition hover:bg-[#F0FFF6]"
          >
            Complete profile
          </Link>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(330px,0.8fr)]">
        <article className="rounded-2xl bg-[#346739] p-6 text-white sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white [&_path]:fill-current">
              <VerificationIcon />
            </span>
            <div>
              <h3 className="text-lg font-bold">
                Get your verified artisan badge
              </h3>
              <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#DDEEE0]">
                Build client trust, improve your visibility and unlock more
                qualified leads by completing verification.
              </p>
            </div>
          </div>
          <Link
            href="/artisan/verification-centre"
            className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#346739]"
          >
            Start verification
          </Link>
        </article>
        <article className="rounded-2xl border border-[#E2EAE4] bg-white p-5 sm:p-6">
          <h3 className="text-lg font-bold text-[#293A2D]">Quick actions</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/artisan/dashboard/work"
              className="rounded-xl bg-[#F0FFF6] p-4 text-xs font-bold text-[#346739] transition hover:-translate-y-0.5"
            >
              <UploadIcon />
              <span className="mt-3 block">Upload work</span>
            </Link>
            <Link
              href="/artisan/dashboard/analytics"
              className="rounded-xl bg-[#F0FFF6] p-4 text-xs font-bold text-[#346739] transition hover:-translate-y-0.5"
            >
              <AnalyticsIcon />
              <span className="mt-3 block">View analytics</span>
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
