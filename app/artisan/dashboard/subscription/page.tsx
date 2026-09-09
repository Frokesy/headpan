"use client";

import { useState } from "react";
import Image from "next/image";
import {
  DashboardCheckIcon as CheckIcon,
  PaymentCardIcon as CardIcon,
  PaymentMethodIcon as PaymentIcon,
  ProSubIcon,
  SubscriptionFeatureIcon as FeatureIcon,
} from "../../../components/dashboardIcons";

const features = [
  {
    title: "Stand out with a Pro badge",
    text: "Build instant trust with a premium badge on your public profile.",
    icon: "badge",
  },
  {
    title: "Get more visibility",
    text: "Appear higher in search results so more clients discover your work.",
    icon: "eye",
  },
  {
    title: "Access exclusive leads",
    text: "Receive quality job opportunities reserved for Pro artisans.",
    icon: "spark",
  },
  {
    title: "Grow with insights",
    text: "Understand your profile performance with advanced analytics.",
    icon: "chart",
  },
  {
    title: "Showcase unlimited work",
    text: "Add more photos and videos to build a stronger portfolio.",
    icon: "spark",
  },
  {
    title: "Get priority support",
    text: "Receive faster help whenever you need assistance.",
    icon: "badge",
  },
];

const plans = [
  {
    id: "basic",
    name: "Basic",
    prices: { monthly: "₦0", quarterly: "₦0", yearly: "₦0" },
    note: "For artisans getting started",
    features: [
      "Public artisan profile",
      "List up to 3 services",
      "Receive client messages",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    prices: { monthly: "₦5,000", quarterly: "₦14,000", yearly: "₦48,000" },
    note: "For artisans ready to grow",
    badge: "MOST POPULAR",
    features: [
      "Everything in Basic",
      "Pro verification badge",
      "More visibility and leads",
      "Business analytics",
    ],
  },
  {
    id: "pro-plus",
    name: "Pro+",
    prices: { monthly: "₦10,000", quarterly: "₦28,000", yearly: "₦96,000" },
    note: "For established businesses",
    features: [
      "Everything in Pro",
      "Priority search placement",
      "Exclusive premium leads",
      "Priority support",
    ],
  },
];

const billingPeriods = {
  monthly: "/month",
  quarterly: "/quarter",
  yearly: "/year",
};

const inputClass =
  "h-12 w-full rounded-xl border border-[#D9E1DA] bg-white px-4 text-sm text-[#293A2D] outline-none transition placeholder:text-[#9BA49D] focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10";

export default function SubscriptionScreen() {
  const [plan, setPlan] = useState("pro");
  const [billing, setBilling] =
    useState<keyof typeof billingPeriods>("monthly");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "ussd">(
    "card",
  );
  const selectedPlan = plans.find((item) => item.id === plan) ?? plans[1];
  const selectedPrice = selectedPlan.prices[billing];

  return (
    <div className="w-full space-y-6 pb-10">
      <header>
        <p className="mt-1.5 text-sm text-[#718075]">
          Unlock more people, earn trust faster and unlock your artisan business
          with Headpan Pro.
        </p>
      </header>

      <section className="grid overflow-hidden rounded-3xl bg-[#F2F4F2] shadow-[0_10px_30px_rgba(41,58,45,0.08)] lg:grid-cols-[30%_70%]">
        <div className="relative flex flex-col items-start overflow-hidden bg-[#346739] p-6 text-white sm:p-8">
          <span className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[34px] border-white/[0.04]" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#346739] shadow-lg [&_svg]:h-7 [&_svg]:w-7 [&_path]:fill-current">
            <ProSubIcon />
          </span>
          <p className="relative mt-5 text-sm font-bold">Headpan Pro</p>
          <h2 className="relative mt-2 max-w-[280px] text-xl font-bold leading-7">
            Everything you need to stand out and get more clients.
          </h2>
          <div className="relative mt-7 flex items-center pl-1">
            {[
              "/artisans/designer.jpg",
              "/artisans/barber.jpg",
              "/artisans/hairstylist.jpg",
              "/artisans/cake.jpg",
            ].map((src, index) => (
              <span
                key={src}
                className={`relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#346739] bg-white ${index ? "-ml-2.5" : ""}`}
              >
                <Image
                  src={src}
                  alt="Headpan Pro artisan"
                  fill
                  className="object-cover"
                />
              </span>
            ))}
          </div>
          <p className="relative mt-3 text-xs font-semibold leading-5 text-[#D8E9DB]">
            Join 500+ artisans growing with Headpan Pro.
          </p>
        </div>

        <div className="p-5 sm:p-7 lg:p-8">
          <h2 className="text-xl font-bold text-[#293A2D]">
            Pro Plans includes
          </h2>
          <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-[0_3px_12px_rgba(41,58,45,0.035)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF7EF] text-[#346739]">
                  <FeatureIcon name={feature.icon} />
                </span>
                <div>
                  <h3 className="text-xs font-bold text-[#34473A]">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-5 text-[#78867C]">
                    {feature.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <section className="rounded-2xl border border-[#E2E9E3] bg-white p-5 shadow-[0_7px_24px_rgba(41,58,45,0.05)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="mt-1.5 text-xl font-bold text-[#293A2D]">
                Choose your plan
              </h2>
            </div>
            <div className="grid grid-cols-3 rounded-xl bg-[#F1F4F2] p-1">
              {(
                Object.keys(billingPeriods) as Array<
                  keyof typeof billingPeriods
                >
              ).map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setBilling(period)}
                  className={`rounded-lg px-3 py-2 text-[10px] font-bold capitalize transition sm:px-4 ${billing === period ? "bg-white text-[#346739] shadow-sm" : "text-[#748178] hover:text-[#346739]"}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {plans.map((item) => {
              const active = plan === item.id;
              return (
                <article
                  key={item.id}
                  className={`relative flex min-h-[310px] w-full flex-col items-start rounded-2xl border-2 p-5 text-left transition ${active ? "border-[#346739] bg-[#F0FFF6] shadow-[0_8px_22px_rgba(52,103,57,0.08)]" : "border-[#E3E9E4] bg-white"}`}
                >
                  {item.badge && (
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#346739] px-3 py-1 text-[8px] font-extrabold tracking-[0.08em] text-white">
                      {item.badge}
                    </span>
                  )}
                  <span>
                    <span className="block text-lg font-bold text-[#293A2D]">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[11px] text-[#7E8B81]">
                      {item.note}
                    </span>
                  </span>
                  <span className="mt-5">
                    <strong className="text-2xl text-[#293A2D]">
                      {item.prices[billing]}
                    </strong>
                    <span className="ml-1 text-[10px] text-[#859087]">
                      {billingPeriods[billing]}
                    </span>
                  </span>
                  <span className="mt-5 block w-full border-t border-[#DDE5DE] pt-4">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="flex items-center gap-2 py-1.5 text-[11px] font-medium text-[#607064]"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[#346739]">
                          <CheckIcon />
                        </span>
                        {feature}
                      </span>
                    ))}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPlan(item.id)}
                    className={`mt-auto w-full rounded-xl border border-[#346739] bg-white px-4 py-3 text-xs font-bold text-[#346739] transition hover:bg-[#346739] hover:text-white ${active ? "ring-2 ring-[#346739]/10" : ""}`}
                  >
                    {active ? `${item.name} selected` : `Choose ${item.name}`}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E9E3] bg-white p-5 shadow-[0_7px_24px_rgba(41,58,45,0.05)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="mt-1.5 text-xl font-bold text-[#293A2D]">
                Payment details
              </h2>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#3978A9]">
              <CardIcon />
            </span>
          </div>

          <form
            className="mt-6 grid items-start gap-5 lg:grid-cols-[0.72fr_1.3fr_0.78fr]"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="rounded-2xl bg-[#F5F7F5] p-4">
              <h3 className="text-sm font-bold text-[#293A2D]">
                Payment method
              </h3>
              <div className="mt-4 space-y-2">
                {(["card", "bank", "ussd"] as const).map((method) => {
                  const labels = {
                    card: "Card",
                    bank: "Bank transfer",
                    ussd: "USSD",
                  };
                  const active = paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${active ? "border-[#346739] bg-white text-[#346739]" : "border-transparent text-[#637166] hover:bg-white"}`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active ? "bg-[#EAF7EF]" : "bg-white"}`}
                      >
                        <PaymentIcon name={method} />
                      </span>
                      <span className="flex-1 text-xs font-bold">
                        {labels[method]}
                      </span>
                      <span
                        className={`h-4 w-4 rounded-full border-2 ${active ? "border-[5px] border-[#346739]" : "border-[#BAC4BC]"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-[#E2E9E3] p-4 sm:p-5">
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#293A2D]">
                    Card details
                  </h3>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-[#435247]">
                      Name on card
                    </span>
                    <input
                      type="text"
                      placeholder="Janet Adewale"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-[#435247]">
                      Card number
                    </span>
                    <input
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className={inputClass}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label>
                      <span className="mb-2 block text-xs font-bold text-[#435247]">
                        Expiry
                      </span>
                      <input
                        inputMode="numeric"
                        placeholder="MM / YY"
                        maxLength={7}
                        className={inputClass}
                      />
                    </label>
                    <label>
                      <span className="mb-2 block text-xs font-bold text-[#435247]">
                        CVV
                      </span>
                      <input
                        type="password"
                        inputMode="numeric"
                        placeholder="•••"
                        maxLength={4}
                        className={inputClass}
                      />
                    </label>
                  </div>
                </div>
              )}
              {paymentMethod === "bank" && (
                <div>
                  <h3 className="text-sm font-bold text-[#293A2D]">
                    Bank transfer details
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#7A887E]">
                    Transfer the exact amount to the account below.
                  </p>
                  <div className="mt-5 space-y-3 rounded-xl bg-[#F4F7F4] p-4">
                    <p className="text-[10px] text-[#859087]">
                      Bank name
                      <span className="mt-1 block text-sm font-bold text-[#293A2D]">
                        Providus Bank
                      </span>
                    </p>
                    <p className="text-[10px] text-[#859087]">
                      Account number
                      <span className="mt-1 block text-lg font-bold tracking-wider text-[#293A2D]">
                        0123456789
                      </span>
                    </p>
                    <p className="text-[10px] text-[#859087]">
                      Account name
                      <span className="mt-1 block text-sm font-bold text-[#293A2D]">
                        Headpan Technologies Ltd.
                      </span>
                    </p>
                  </div>
                </div>
              )}
              {paymentMethod === "ussd" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#293A2D]">
                    Pay with USSD
                  </h3>
                  <p className="text-xs leading-5 text-[#7A887E]">
                    Select your bank to generate a secure payment code.
                  </p>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-[#435247]">
                      Select bank
                    </span>
                    <select className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Choose your bank
                      </option>
                      <option>Access Bank</option>
                      <option>GTBank</option>
                      <option>UBA</option>
                    </select>
                  </label>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-[#F0FFF6] p-4 sm:p-5">
              <h3 className="text-sm font-bold text-[#293A2D]">
                Payment summary
              </h3>
              <div className="mt-5 space-y-3 border-b border-[#D9E7DC] pb-4 text-xs">
                <p className="flex justify-between gap-3 text-[#718075]">
                  <span>Selected plan</span>
                  <b className="text-[#293A2D]">{selectedPlan.name}</b>
                </p>
                <p className="flex justify-between gap-3 text-[#718075]">
                  <span>Billing cycle</span>
                  <b className="capitalize text-[#293A2D]">{billing}</b>
                </p>
                <p className="flex justify-between gap-3 text-[#718075]">
                  <span>Payment method</span>
                  <b className="capitalize text-[#293A2D]">
                    {paymentMethod === "bank" ? "Bank transfer" : paymentMethod}
                  </b>
                </p>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <span className="text-xs font-semibold text-[#718075]">
                  Total
                </span>
                <strong className="text-xl text-[#293A2D]">
                  {selectedPrice}
                </strong>
              </div>
              <button
                type="submit"
                className="mt-5 h-11 w-full rounded-xl bg-[#346739] text-xs font-bold text-white transition hover:bg-[#29562E]"
              >
                Complete payment
              </button>
              <p className="mt-3 text-center text-[9px] leading-4 text-[#849087]">
                Secure and encrypted payment.
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
