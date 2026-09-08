import {
  DownloadIcon,
  FunnelChart,
  LineGraph,
  MessageIcon,
  PeopleIcon,
  PhoneIcon,
  PiChartOne,
  PiChartTwo,
  SuitcaseIcon,
} from "../../../components/dashboardIcons";
import { CalendarIcon } from "../../../components/icons";

const stats = [
  {
    label: "Profile Views",
    value: "2,480",
    change: "+10%",
    icon: PeopleIcon,
    iconStyle: "bg-[#E8F8ED] text-[#346739] [&_path]:fill-current",
  },
  {
    label: "Work Gallery Views",
    value: "1,245",
    change: "+8.2%",
    icon: SuitcaseIcon,
    iconStyle: "bg-[#FFF4E8] text-[#DA782B] [&_path]:fill-current",
  },
  {
    label: "Messages Received",
    value: "186",
    change: "+18.7%",
    icon: MessageIcon,
    iconStyle: "bg-[#EAF4FF] text-[#2B6FB6] [&_path]:fill-current",
  },
  {
    label: "Contact Requests",
    value: "94",
    change: "+6.4%",
    icon: PhoneIcon,
    iconStyle: "bg-[#FFF0E5]",
  },
];

const services = [
  { label: "Native wears", value: "42%", color: "bg-[#346739]" },
  { label: "Corporate outfits", value: "28%", color: "bg-[#EBB400]" },
  { label: "Alterations", value: "18%", color: "bg-[#2B6FB6]" },
  { label: "Bridal wears", value: "12%", color: "bg-[#C6DCC8]" },
];

const audiences = [
  { label: "New visitors", value: "64%", color: "bg-[#9810FA]" },
  { label: "Returning visitors", value: "36%", color: "bg-[#E2B7FF]" },
];

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`min-w-0 rounded-2xl border border-[#E5EBE6] bg-white p-5 shadow-[0_7px_24px_rgba(41,58,45,0.05)] sm:p-6 ${className}`}
    >
      {children}
    </article>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-medium text-[#4F6552] sm:text-lg">
          Track your performance and grow your business.
        </p>
        <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <label className="relative w-[165px] sm:w-auto">
            <span className="sr-only">Select date range</span>
            <select
              defaultValue="30"
              className="h-11 w-full appearance-none rounded-xl bg-[#EEF1EF] py-2 pl-4 pr-9 text-xs font-semibold text-[#445247] outline-none transition focus:ring-2 focus:ring-[#346739]/20 sm:w-auto"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="year">This year</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#718075]">
              ▼
            </span>
          </label>
          <button
            type="button"
            className="flex h-11 w-[165px] items-center justify-center gap-2 rounded-xl bg-[#EEF1EF] px-4 text-xs font-semibold text-[#445247] transition hover:bg-[#E3E8E4] sm:w-auto"
          >
            <DownloadIcon />
            <span>Export report</span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Panel
              key={stat.label}
              className="min-h-[154px] !rounded-xl !p-3.5 sm:min-h-0 sm:!rounded-2xl sm:!p-5"
            >
              <div className="grid grid-cols-[auto_1fr] items-center gap-x-2.5 sm:items-start sm:gap-x-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg [&_svg]:h-[17px] [&_svg]:w-[17px] sm:row-span-3 sm:h-10 sm:w-10 sm:[&_svg]:h-5 sm:[&_svg]:w-5 ${stat.iconStyle}`}
                >
                  <Icon />
                </span>
                <p className="min-w-0 text-[11px] font-semibold leading-[15px] text-[#4F6552] sm:text-xs">
                  {stat.label}
                </p>
                <p className="col-span-2 mt-4 text-[25px] font-bold leading-none tracking-[-0.02em] text-[#293A2D] sm:col-span-1 sm:mt-2 sm:text-2xl">
                  {stat.value}
                </p>
                <p className="col-span-2 mt-2 text-[10px] leading-[15px] text-[#8A968C] sm:col-span-1 sm:mt-1 sm:leading-4">
                  <span className="mr-1 inline-block rounded-full bg-[#E8F8ED] px-1.5 py-0.5 font-bold text-[#346739] sm:bg-transparent sm:p-0">
                    {stat.change}
                  </span>
                  <span className="whitespace-nowrap">vs Apr 13 - May 13</span>
                </p>
              </div>
            </Panel>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#293A2D] sm:text-lg">
                Views Over Time
              </h2>
              <p className="mt-1 text-xs text-[#819085]">
                Profile and gallery views
              </p>
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-[#EEF1EF] px-3 py-2 text-xs font-semibold text-[#445247] [&_svg]:h-4 [&_svg]:w-4"
            >
              <CalendarIcon width={16} height={16} /> Monthly{" "}
              <span className="text-[9px]">▼</span>
            </button>
          </div>
          <div className="mt-7 w-full overflow-hidden [&_svg]:h-auto [&_svg]:w-full">
            <LineGraph />
          </div>
        </Panel>

        <Panel>
          <h2 className="text-base font-bold text-[#293A2D] sm:text-lg">
            Top Performing Services
          </h2>
          <p className="mt-1 text-xs text-[#819085]">
            Share of total service views
          </p>
          <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-center">
            <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#346739_0_42%,#EBB400_42%_70%,#2B6FB6_70%_88%,#C6DCC8_88%_100%)]">
              <span className="absolute h-20 w-20 rounded-full bg-white" />
              <span className="relative z-10 [&_svg]:h-8 [&_svg]:w-8">
                <PiChartOne />
              </span>
            </div>
            <div className="w-full space-y-3">
              {services.map((service) => (
                <div
                  key={service.label}
                  className="flex items-center gap-2 text-xs"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${service.color}`}
                  />
                  <span className="flex-1 text-[#607064]">{service.label}</span>
                  <span className="font-bold text-[#293A2D]">
                    {service.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <h2 className="text-base font-bold text-[#293A2D] sm:text-lg">
            Audience Overview
          </h2>
          <p className="mt-1 text-xs text-[#819085]">
            Understand who is viewing your profile
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-8 sm:flex-row">
            <div className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#9810FA_0_64%,#E2B7FF_64%_100%)]">
              <span className="absolute h-[102px] w-[102px] rounded-full bg-white" />
              <span className="relative z-10">
                <PiChartTwo />
              </span>
            </div>
            <div className="w-full max-w-[260px] space-y-4">
              {audiences.map((audience) => (
                <div
                  key={audience.label}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className={`h-3 w-3 rounded-full ${audience.color}`} />
                  <span className="flex-1 text-[#607064]">
                    {audience.label}
                  </span>
                  <b className="text-[#293A2D]">{audience.value}</b>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel>
          <h2 className="text-base font-bold text-[#293A2D] sm:text-lg">
            Conversion Funnel
          </h2>
          <p className="mt-1 text-xs text-[#819085]">
            From profile discovery to client enquiries
          </p>
          <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-center">
            <div className="shrink-0 [&_svg]:h-auto [&_svg]:w-[180px] sm:[&_svg]:w-[210px]">
              <FunnelChart />
            </div>
            <div className="w-full space-y-4 text-xs">
              <div className="flex justify-between gap-5">
                <span className="text-[#607064]">Profile views</span>
                <b className="text-[#293A2D]">2,480</b>
              </div>
              <div className="flex justify-between gap-5">
                <span className="text-[#607064]">Gallery interactions</span>
                <b className="text-[#293A2D]">1,245</b>
              </div>
              <div className="flex justify-between gap-5">
                <span className="text-[#607064]">Messages received</span>
                <b className="text-[#293A2D]">186</b>
              </div>
              <div className="flex justify-between gap-5">
                <span className="text-[#607064]">Contact requests</span>
                <b className="text-[#293A2D]">94</b>
              </div>
              <div className="border-t border-[#E4EAE5] pt-3 text-[#346739]">
                <span className="font-bold">3.8% conversion rate</span>
              </div>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
