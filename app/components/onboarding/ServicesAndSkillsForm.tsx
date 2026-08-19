"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Service = {
  name: string;
  description: string;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-sm font-semibold text-[#293A2D]">
      {children}
      <span className="ml-0.5 text-[#346739]">*</span>
    </span>
  );
}

const inputClassName =
  "w-full rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none placeholder:text-[#9AA59C] focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10";

export default function ServicesAndSkillsForm() {
  const router = useRouter();
  const serviceNameRef = useRef<HTMLInputElement>(null);
  const skillRef = useRef<HTMLInputElement>(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const addService = () => {
    const name = serviceName.trim();
    const description = serviceDescription.trim();
    if (!name || !description) {
      if (!name) serviceNameRef.current?.focus();
      return;
    }

    const alreadyAdded = services.some(
      (service) => service.name.toLowerCase() === name.toLowerCase(),
    );
    if (!alreadyAdded) setServices((current) => [...current, { name, description }]);
    setServiceName("");
    setServiceDescription("");
    serviceNameRef.current?.focus();
  };

  const addSkill = () => {
    const value = skill.trim();
    if (!value) {
      skillRef.current?.focus();
      return;
    }
    if (!skills.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setSkills((current) => [...current, value]);
    }
    setSkill("");
    skillRef.current?.focus();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!services.length || !skills.length) return;
        router.push("/artisan/onboarding/work");
      }}
      className="mx-auto max-w-[1050px] pb-14"
    >
      <div className="flex flex-col gap-7 border-b border-[#E4EBE6] pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.push("/artisan/onboarding")}
            aria-label="Go back to business information"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7E0D9] text-xl text-[#293A2D] transition hover:bg-[#F5FFF9]"
          >
            ‹
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6D8772]">
              Step 2 of 5
            </p>
            <h1 className="mt-2 text-[18px] font-bold text-[#293A2D] sm:text-3xl">
              Services &amp; Skills
            </h1>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#718075]">
              Add the services you offer and the skills that make you great at your craft.
            </p>
          </div>
        </div>
        <div className="w-full md:max-w-[300px]">
          <div className="h-2 overflow-hidden rounded-full bg-[#E1E8E3]">
            <div className="h-full w-2/5 rounded-full bg-[#346739]" />
          </div>
          <p className="mt-2 text-right text-xs font-semibold text-[#346739]">
            40% complete
          </p>
        </div>
      </div>

      <section className="space-y-6 border-b border-[#E4EBE6] py-8">
        <div>
          <h2 className="text-lg font-bold text-[#293A2D]">Services you offer</h2>
          <p className="mt-1 text-sm text-[#718075]">
            Tell clients what you can help them with.
          </p>
        </div>

        {services.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex max-w-full items-start gap-3 rounded-2xl bg-[#E8F8ED] px-4 py-3 text-[#346739]"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold">{service.name}</p>
                  <p className="mt-0.5 break-words text-xs leading-5 text-[#58775E]">
                    {service.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setServices((current) =>
                      current.filter((item) => item.name !== service.name),
                    )
                  }
                  aria-label={`Remove ${service.name}`}
                  className="text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="block">
          <FieldLabel>Name of service</FieldLabel>
          <input
            ref={serviceNameRef}
            value={serviceName}
            onChange={(event) => setServiceName(event.target.value)}
            type="text"
            placeholder="e.g. Custom outfit design"
            className={inputClassName}
          />
        </label>
        <div className="flex flex-col items-end gap-3 sm:flex-row">
          <label className="block min-w-0 flex-1 self-stretch">
            <FieldLabel>Service description</FieldLabel>
            <textarea
              value={serviceDescription}
              onChange={(event) => setServiceDescription(event.target.value)}
              rows={3}
              placeholder="Briefly describe what is included in this service"
              className={`${inputClassName} resize-y`}
            />
          </label>
          <button
            type="button"
            onClick={addService}
            className="w-full rounded-xl border border-[#346739] px-6 py-3.5 text-sm font-bold text-[#346739] transition hover:bg-[#F5FFF9] sm:w-auto"
          >
            Add service
          </button>
        </div>
        {!services.length && (
          <p className="text-xs text-[#8B968D]">At least one service is required.</p>
        )}
      </section>

      <section className="space-y-5 py-8">
        <div>
          <h2 className="text-lg font-bold text-[#293A2D]">Skills &amp; Expertise</h2>
          <p className="mt-1 text-sm text-[#718075]">
            Add each specialist skill separately.
          </p>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full bg-[#E8F8ED] px-3 py-2 text-xs font-semibold text-[#346739]"
              >
                {item}
                <button
                  type="button"
                  onClick={() => setSkills((current) => current.filter((value) => value !== item))}
                  aria-label={`Remove ${item}`}
                  className="text-base leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            ref={skillRef}
            value={skill}
            onChange={(event) => setSkill(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addSkill();
              }
            }}
            type="text"
            placeholder="e.g. Pattern drafting"
            aria-label="Skill or expertise"
            className={`min-w-0 flex-1 ${inputClassName}`}
          />
          <button
            type="button"
            onClick={addSkill}
            className="rounded-xl border border-[#346739] px-6 py-3.5 text-sm font-bold text-[#346739] transition hover:bg-[#F5FFF9]"
          >
            Add skill
          </button>
        </div>
        {!skills.length && (
          <p className="text-xs text-[#8B968D]">At least one skill is required.</p>
        )}
      </section>

      <div className="flex flex-col-reverse justify-between gap-3 border-t border-[#E4EBE6] pt-7 sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/artisan/onboarding")}
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
