"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { DashboardCheckIcon, DashboardEditIcon as PencilIcon, DashboardTrashIcon as TrashIcon } from "../../../components/dashboardIcons";

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const initialServices: Service[] = [
  {
    id: 1,
    title: "Native Wear",
    description: "Custom-fitted traditional outfits for weddings, celebrations and everyday elegance.",
    image: "/artisans/designer.jpg",
  },
  {
    id: 2,
    title: "Corporate Outfits",
    description: "Clean, professional pieces tailored to fit your body, style and work environment.",
    image: "/artisans/designer.jpg",
  },
  {
    id: 3,
    title: "Bridal Wear",
    description: "Beautifully crafted bridal looks with thoughtful finishing for your special day.",
    image: "/artisans/hairstylist.jpg",
  },
];

function Toggle({ enabled, onChange, label }: { enabled: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-[52px] shrink-0 rounded-full p-[3px] shadow-inner transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#346739]/25 focus:ring-offset-2 ${enabled ? "bg-[#346739]" : "bg-[#D5DDD7]"}`}
    >
      <span
        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white text-[#346739] shadow-[0_2px_5px_rgba(30,55,35,0.25)] transition-transform duration-300 ease-out ${enabled ? "translate-x-6" : "translate-x-0"}`}
      >
        {enabled && (
          <DashboardCheckIcon />
        )}
      </span>
    </button>
  );
}

export default function ServicesScreen() {
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [skills, setSkills] = useState(["Pattern drafting", "Fabric selection", "Hand finishing"]);
  const [skill, setSkill] = useState("");
  const [showPublicly, setShowPublicly] = useState(true);
  const [allowCustom, setAllowCustom] = useState(true);
  const skillInput = useRef<HTMLInputElement>(null);

  function addSkill(event?: FormEvent) {
    event?.preventDefault();
    const value = skill.trim();
    if (!value || skills.length >= 5 || skills.some((item) => item.toLowerCase() === value.toLowerCase())) {
      skillInput.current?.focus();
      return;
    }
    setSkills((current) => [...current, value]);
    setSkill("");
    skillInput.current?.focus();
  }

  function updateService(id: number, field: "title" | "description", value: string) {
    setServices((current) => current.map((service) => service.id === id ? { ...service, [field]: value } : service));
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 pb-10">
      <p className="text-base font-medium text-[#4F6552] sm:text-lg">
        Manage the services you offer and highlight your expertise.
      </p>

      <section className="overflow-hidden rounded-2xl border border-[#E3EAE4] bg-white p-4 shadow-[0_7px_24px_rgba(41,58,45,0.05)] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-[#293A2D] sm:text-xl">Services offered</h1>
            <p className="mt-1 text-xs leading-5 text-[#78867C]">Keep your services clear and up to date for potential clients.</p>
          </div>
          <button type="button" className="shrink-0 rounded-xl bg-[#346739] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#29562E] sm:px-5 sm:text-sm">
            + Add service
          </button>
        </div>

        <div className="-mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-color:#BFD1C2_transparent] sm:-mx-6 sm:px-6">
          {services.map((service) => {
            const editing = editingId === service.id;
            return (
              <article key={service.id} className="w-[270px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#E1E8E2] bg-white sm:w-[300px]">
                <div className="relative h-40 overflow-hidden bg-[#EDF2EE]">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="flex min-h-[210px] flex-col p-4">
                  {editing ? (
                    <>
                      <input value={service.title} onChange={(event) => updateService(service.id, "title", event.target.value)} aria-label="Service title" className="rounded-lg border border-[#C8D5CA] px-3 py-2 text-sm font-bold text-[#293A2D] outline-none focus:border-[#346739]" />
                      <textarea value={service.description} onChange={(event) => updateService(service.id, "description", event.target.value)} aria-label="Service description" rows={4} className="mt-3 resize-none rounded-lg border border-[#C8D5CA] px-3 py-2 text-xs leading-5 text-[#667469] outline-none focus:border-[#346739]" />
                    </>
                  ) : (
                    <>
                      <h2 className="text-base font-bold text-[#293A2D]">{service.title}</h2>
                      <p className="mt-2 text-xs leading-5 text-[#718075]">{service.description}</p>
                    </>
                  )}
                  <div className="mt-auto flex items-center justify-between border-t border-[#E8EDE9] pt-4">
                    <button type="button" onClick={() => setEditingId(editing ? null : service.id)} className="flex items-center gap-2 rounded-lg px-1 py-2 text-xs font-bold text-[#346739] transition hover:text-[#254E29]">
                      <PencilIcon /> {editing ? "Save" : "Edit"}
                    </button>
                    <button type="button" aria-label={`Delete ${service.title}`} onClick={() => setServices((current) => current.filter((item) => item.id !== service.id))} className="flex h-8 w-8 items-center justify-center rounded-full text-[#B84A4A] transition hover:bg-[#FFF0F0] hover:text-[#9D3434]">
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-[#E3EAE4] bg-white p-4 shadow-[0_7px_24px_rgba(41,58,45,0.05)] sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-[#293A2D] sm:text-xl">Skills &amp; expertise</h2>
          <p className="mt-1 text-xs text-[#78867C]">Add up to 5 skills that best describe your expertise.</p>
        </div>

        <form onSubmit={addSkill} className="mt-5 flex max-w-[700px] flex-col gap-3 sm:flex-row">
          <input ref={skillInput} value={skill} onChange={(event) => setSkill(event.target.value)} disabled={skills.length >= 5} placeholder={skills.length >= 5 ? "You have added the maximum of 5 skills" : "Enter a skill"} className="h-12 min-w-0 flex-1 rounded-xl border border-[#D7E0D9] px-4 text-sm text-[#293A2D] outline-none placeholder:text-[#98A29A] focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10 disabled:bg-[#F4F6F4]" />
          <button type="submit" disabled={!skill.trim() || skills.length >= 5} className="h-12 rounded-xl bg-[#346739] px-6 text-sm font-bold text-white transition hover:bg-[#29562E] disabled:cursor-not-allowed disabled:bg-[#B7C4B9]">Add skill</button>
        </form>

        <div className="mt-4 flex min-h-10 flex-wrap gap-2">
          {skills.map((item) => (
            <span key={item} className="inline-flex items-center gap-2 rounded-full bg-[#EAF7EF] px-3.5 py-2 text-xs font-semibold text-[#346739]">
              {item}
              <button type="button" onClick={() => setSkills((current) => current.filter((skillItem) => skillItem !== item))} aria-label={`Remove ${item}`} className="text-base leading-none text-[#66826B] hover:text-[#B84A4A]">×</button>
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11px] font-medium text-[#829087]">{skills.length}/5 skills added</p>

        <div className="mt-7 border-t border-[#E5EBE6] pt-6">
          <h3 className="text-base font-bold text-[#293A2D]">Service settings</h3>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="flex items-center justify-between gap-5 rounded-xl border border-[#E1E8E2] p-4 sm:p-5">
              <div>
                <p className="text-sm font-bold text-[#34473A]">Show services on my public profile</p>
                <p className="mt-1 text-xs leading-5 text-[#7D8980]">Allow visitors to see your listed services.</p>
              </div>
              <Toggle enabled={showPublicly} onChange={() => setShowPublicly((current) => !current)} label="Show services on my public profile" />
            </div>
            <div className="flex items-center justify-between gap-5 rounded-xl border border-[#E1E8E2] p-4 sm:p-5">
              <div>
                <p className="text-sm font-bold text-[#34473A]">Let clients request custom services</p>
                <p className="mt-1 text-xs leading-5 text-[#7D8980]">Receive enquiries outside your listed services.</p>
              </div>
              <Toggle enabled={allowCustom} onChange={() => setAllowCustom((current) => !current)} label="Let clients request custom services" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
