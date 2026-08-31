import Link from "next/link";
import { ProSubIcon } from "../dashboardIcons";

export default function DashboardUpgradeCard() {
  return (
    <section className="rounded-2xl bg-[#346739] p-4 text-white shadow-[0_10px_25px_rgba(52,103,57,0.2)]">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#346739] [&_path]:fill-current [&_svg]:h-7 [&_svg]:w-7">
        <ProSubIcon />
      </span>
      <h2 className="mt-4 text-base font-bold">Go Pro Today!</h2>
      <p className="mt-1.5 text-xs leading-5 text-[#DCEEDF]">
        Get more visibility, premium badge and exclusive leads
      </p>
      <Link
        href="/artisan/dashboard/subscription"
        className="mt-4 block w-full rounded-xl bg-white px-4 py-3 text-center text-xs font-bold text-[#346739] transition hover:bg-[#EFF9F1]"
      >
        Upgrade now
      </Link>
    </section>
  );
}
