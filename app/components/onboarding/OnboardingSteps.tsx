"use client";

import { usePathname } from "next/navigation";

const steps = [
  {
    label: "Business information",
    subtext: "Tell us about your business",
    path: "/artisan/onboarding",
  },
  {
    label: "Services & Skills",
    subtext: "Add your services & skills",
    path: "/artisan/onboarding/services",
  },
  {
    label: "Upload Your work",
    subtext: "Showcase your best work",
    path: "/artisan/onboarding/work",
  },
  {
    label: "Contact & Availability",
    subtext: "Let Clients know how to reach you",
    path: "/artisan/onboarding/contact",
  },
  {
    label: "Verification & Payment",
    subtext: "Verify your identity and set up payment",
    path: "/artisan/onboarding/verification",
  },
];

export default function OnboardingSteps() {
  const pathname = usePathname();
  const activeIndex = Math.max(
    0,
    steps.findIndex((step, index) =>
      index === 0 ? pathname === step.path : pathname.startsWith(step.path),
    ),
  );

  return (
    <aside className="hidden shrink-0 overflow-hidden bg-[#F5FFF9] lg:block lg:h-full lg:w-[310px] lg:px-7 lg:py-12">
      <h2 className="text-[18px] font-semibold -mt-6">Artisan Onboarding</h2>
      <p className="mb-10 text-[12px] tracking-[0.18em] text-[#79907D] block">
        Complete your profile in 5 simple steps.
      </p>
      <ol className="flex overflow-x-auto pb-2 lg:block lg:overflow-visible lg:pb-0">
        {steps.map((step, index) => {
          const active = index === activeIndex;
          const complete = index < activeIndex;
          return (
            <li
              key={step.label}
              className="relative flex min-w-[190px] items-start lg:min-w-0 lg:pb-10 last:lg:pb-0"
            >
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-5 top-10 h-px w-[calc(100%-2.5rem)] lg:top-10 lg:h-[calc(100%-1rem)] lg:w-px ${complete ? "bg-[#346739]" : "bg-[#CFD8D1]"}`}
                />
              )}
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${active || complete ? "bg-[#346739] text-white" : "bg-[#E3E7E4] text-[#293A2D]"}`}
              >
                {complete ? "✓" : index + 1}
              </div>
              <div className="min-w-0 pl-3 pt-2 lg:pl-4">
                <p
                  className={`whitespace-nowrap text-sm font-semibold lg:whitespace-normal ${active ? "text-[#346739]" : "text-[#445247]"}`}
                >
                  {step.label}
                </p>
                <p className="mt-1 hidden text-xs text-[#78907C] lg:block">
                  {step.subtext}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
