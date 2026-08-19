"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmergencyAlertIcon, HomeIcon } from "../icons";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM",
];

const fieldClassName =
  "w-full rounded-xl border border-[#D7E0D9] bg-white px-4 py-3.5 text-sm text-[#445247] outline-none placeholder:text-[#9AA59C] focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10";

function FieldLabel({ children, optional = false }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <span className="mb-2 block text-sm font-semibold text-[#293A2D]">
      {children}
      {optional ? (
        <span className="ml-1 font-normal text-[#859188]">(optional)</span>
      ) : (
        <span className="ml-0.5 text-[#346739]">*</span>
      )}
    </span>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? "bg-[#346739]" : "bg-[#CCD4CE]"}`}
    >
      <span
        className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

export default function ContactAvailabilityForm() {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [homeServices, setHomeServices] = useState(false);
  const [emergencyAvailable, setEmergencyAvailable] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays((current) =>
      current.includes(day) ? current.filter((item) => item !== day) : [...current, day],
    );
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!selectedDays.length) return;
        router.push("/artisan/onboarding/verification");
      }}
      className="mx-auto max-w-[1050px] pb-14"
    >
      <div className="flex flex-col gap-7 border-b border-[#E4EBE6] pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.push("/artisan/onboarding/work")}
            aria-label="Go back to upload your work"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7E0D9] text-xl text-[#293A2D] transition hover:bg-[#F5FFF9]"
          >
            ‹
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6D8772]">Step 4 of 5</p>
            <h1 className="mt-2 text-[18px] font-bold text-[#293A2D] sm:text-3xl">
              Contact &amp; Availability
            </h1>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#718075]">
              Let clients know how to reach you and when you are available to work.
            </p>
          </div>
        </div>
        <div className="w-full md:max-w-[300px]">
          <div className="h-2 overflow-hidden rounded-full bg-[#E1E8E3]">
            <div className="h-full w-4/5 rounded-full bg-[#346739]" />
          </div>
          <p className="mt-2 text-right text-xs font-semibold text-[#346739]">80% complete</p>
        </div>
      </div>

      <section className="space-y-5 border-b border-[#E4EBE6] py-8">
        <div>
          <h2 className="text-lg font-bold text-[#293A2D]">Contact information</h2>
          <p className="mt-1 text-sm text-[#718075]">Provide the contact details clients can use to reach you.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <label>
            <FieldLabel>Phone number</FieldLabel>
            <div className="flex rounded-xl border border-[#D7E0D9] bg-white focus-within:border-[#346739] focus-within:ring-2 focus-within:ring-[#346739]/10">
              <span className="flex items-center border-r border-[#D7E0D9] px-4 text-sm font-semibold text-[#445247]">+234</span>
              <input
                required
                type="tel"
                inputMode="tel"
                placeholder="801 234 5678"
                className="min-w-0 flex-1 rounded-r-xl px-4 py-3.5 text-sm outline-none placeholder:text-[#9AA59C]"
              />
            </div>
          </label>
          <label>
            <FieldLabel optional>Email address</FieldLabel>
            <input type="email" placeholder="you@example.com" className={fieldClassName} />
          </label>
        </div>
      </section>

      <section className="space-y-5 border-b border-[#E4EBE6] py-8">
        <div>
          <h2 className="text-lg font-bold text-[#293A2D]">Availability</h2>
          <p className="mt-1 text-sm text-[#718075]">Set the days and hours you are open for work.</p>
        </div>
        <div className="grid gap-8 rounded-2xl border border-[#E6ECE8] bg-white p-5 shadow-[0_8px_30px_rgba(41,58,45,0.08)] sm:p-7 lg:grid-cols-[1.25fr_1fr]">
          <fieldset>
            <legend className="text-sm font-bold text-[#293A2D]">Working days</legend>
            <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-7">
              {days.map((day) => {
                const checked = selectedDays.includes(day);
                return (
                  <label key={day} className="flex cursor-pointer flex-col items-center gap-3 text-xs font-semibold text-[#445247]">
                    {day}
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDay(day)}
                      className="h-5 w-5 accent-[#346739]"
                    />
                  </label>
                );
              })}
            </div>
            <p className="mt-5 text-xs text-[#718075]">Select all days that apply</p>
            {!selectedDays.length && <p className="mt-1 text-xs text-[#8B968D]">At least one working day is required.</p>}
          </fieldset>

          <div className="border-t border-[#E4EBE6] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h3 className="text-sm font-bold text-[#293A2D]">Working hours</h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <label>
                <span className="mb-2 block text-xs font-semibold text-[#718075]">From</span>
                <select required defaultValue="09:00 AM" className={fieldClassName}>
                  {times.map((time) => <option key={time}>{time}</option>)}
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold text-[#718075]">To</span>
                <select required defaultValue="05:00 PM" className={fieldClassName}>
                  {times.map((time) => <option key={time}>{time}</option>)}
                </select>
              </label>
            </div>
            <p className="mt-5 text-xs text-[#718075]">Your daily working hours</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex items-start justify-between gap-5 rounded-2xl border border-[#E4EBE6] p-5 sm:p-6">
            <div className="flex min-w-0 gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0FFF6] text-[#346739]"><HomeIcon /></div>
              <div>
                <h3 className="text-sm font-bold text-[#293A2D]">Home services</h3>
                <p className="mt-1 text-xs leading-5 text-[#718075]">Do you offer services at your client&apos;s location?</p>
              </div>
            </div>
            <Toggle checked={homeServices} onChange={() => setHomeServices((value) => !value)} label="Offer home services" />
          </div>
          <div className="flex items-start justify-between gap-5 rounded-2xl border border-[#E4EBE6] p-5 sm:p-6">
            <div className="flex min-w-0 gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0FFF6] text-[#346739]"><EmergencyAlertIcon /></div>
              <div>
                <h3 className="text-sm font-bold text-[#293A2D]">Emergency Availability</h3>
                <p className="mt-1 text-xs leading-5 text-[#718075]">Available for urgent or last minute requests?</p>
              </div>
            </div>
            <Toggle checked={emergencyAvailable} onChange={() => setEmergencyAvailable((value) => !value)} label="Emergency availability" />
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse justify-between gap-3 pt-7 sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/artisan/onboarding/work")}
          className="w-full rounded-xl border border-[#D7E0D9] px-8 py-3.5 text-sm font-bold text-[#445247] transition hover:bg-[#F5FFF9] sm:w-auto"
        >
          Go back
        </button>
        <button
          type="submit"
          className="w-full rounded-xl border border-[#346739] bg-transparent px-8 py-3.5 text-sm font-bold text-[#346739] transition hover:bg-[#346739] hover:text-white sm:w-auto"
        >
          Save and Proceed
        </button>
      </div>
    </form>
  );
}
