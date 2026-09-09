"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CameraIcon } from "../../../components/icons";
import { DashboardProfileUiIcon as UiIcon } from "../../../components/dashboardIcons";

type Detail = {
  id: string;
  label: string;
  value: string;
  icon:
    | "user"
    | "mail"
    | "phone"
    | "business"
    | "work"
    | "location"
    | "experience"
    | "store";
  locked?: boolean;
};

type Faq = { id: number; question: string; answer: string };

const initialPersonal: Detail[] = [
  { id: "name", label: "Full name", value: "Segun Adewale", icon: "user" },
  {
    id: "email",
    label: "Email address",
    value: "segun.adewale@email.com",
    icon: "mail",
    locked: true,
  },
  {
    id: "phone",
    label: "Phone number",
    value: "+234 803 456 7890",
    icon: "phone",
    locked: true,
  },
  {
    id: "location",
    label: "Location",
    value: "Lagos, Nigeria",
    icon: "location",
  },
];

const initialBusiness: Detail[] = [
  {
    id: "business",
    label: "Business name",
    value: "Adewale Stitches",
    icon: "business",
  },
  {
    id: "profession",
    label: "Category / Profession",
    value: "Fashion Designer",
    icon: "work",
  },
  {
    id: "experience",
    label: "Years of experience",
    value: "8 years",
    icon: "experience",
  },
  {
    id: "store",
    label: "Shop address",
    value: "21 Allen Avenue, Ikeja, Lagos",
    icon: "store",
  },
];

const initialFaqs: Faq[] = [
  {
    id: 1,
    question: "How long does it take to complete an outfit?",
    answer:
      "Most outfits take between 7 and 14 working days, depending on the design and current workload.",
  },
  {
    id: 2,
    question: "Do you provide fabrics?",
    answer:
      "Yes. I can source quality fabrics based on your budget, preferred colour and the style you want.",
  },
  {
    id: 3,
    question: "Do you offer home measurement services?",
    answer:
      "Yes, home measurement is available within Lagos and can be arranged when confirming your order.",
  },
];

function DetailGroup({
  title,
  details,
  onChange,
}: {
  title: string;
  details: Detail[];
  onChange: (id: string, value: string) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  return (
    <div className="min-w-0">
      <h3 className="mb-3 text-sm font-bold text-[#293A2D]">{title}</h3>
      <div className="space-y-2.5">
        {details.map((detail) => (
          <div
            key={detail.id}
            className="flex min-h-[62px] items-center gap-3 rounded-xl bg-[#F1F4F2] px-3.5 py-2.5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#527158]">
              <UiIcon name={detail.icon} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-[#829087]">
                {detail.label}
              </p>
              {editing === detail.id ? (
                <input
                  autoFocus
                  value={detail.value}
                  onChange={(event) => onChange(detail.id, event.target.value)}
                  onKeyDown={(event) =>
                    event.key === "Enter" && setEditing(null)
                  }
                  onBlur={() => setEditing(null)}
                  className="mt-0.5 w-full border-b border-[#346739] bg-transparent text-xs font-semibold text-[#293A2D] outline-none"
                />
              ) : (
                <p
                  className="mt-0.5 truncate text-xs font-semibold text-[#35473A]"
                  title={detail.value}
                >
                  {detail.value}
                </p>
              )}
            </div>
            {detail.locked ? (
              <span
                title="This verified information is locked"
                className="flex h-8 w-8 shrink-0 items-center justify-center text-[#909B92]"
              >
                <UiIcon name="lock" />
              </span>
            ) : (
              <button
                type="button"
                aria-label={`Edit ${detail.label}`}
                onClick={() => setEditing(detail.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#65766A] transition hover:bg-white hover:text-[#346739]"
              >
                <UiIcon name="edit" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditableCard({
  title,
  children,
  editing,
  onEdit,
  onSave,
}: {
  title: string;
  children: React.ReactNode;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
}) {
  return (
    <section className="rounded-2xl bg-[#F1F4F2] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-[#293A2D]">{title}</h3>
        <button
          type="button"
          onClick={editing ? onSave : onEdit}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-[#346739] hover:bg-white"
        >
          <UiIcon name={editing ? "check" : "edit"} />
          {editing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ProfileScreen() {
  const profileInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState("/artisans/designer.jpg");
  const [coverImage, setCoverImage] = useState("/service_imgs/tailoring.png");
  const [personal, setPersonal] = useState(initialPersonal);
  const [business, setBusiness] = useState(initialBusiness);
  const [about, setAbout] = useState(
    "I am a Lagos-based fashion designer with eight years of experience creating well-fitted native, corporate and bridal outfits. I combine careful craftsmanship with a collaborative process that keeps every client involved.",
  );
  const [reasons, setReasons] = useState([
    "Precise fitting and clean finishing",
    "Quality fabric recommendations",
    "Reliable delivery and clear communication",
  ]);
  const [availability, setAvailability] = useState(
    "Monday – Saturday, 9:00 AM – 6:00 PM",
  );
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [editingFaq, setEditingFaq] = useState<number | null>(null);

  function chooseImage(
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void,
  ) {
    const file = event.target.files?.[0];
    if (file?.type.startsWith("image/")) setter(URL.createObjectURL(file));
  }

  function updateDetail(
    setter: React.Dispatch<React.SetStateAction<Detail[]>>,
    id: string,
    value: string,
  ) {
    setter((current) =>
      current.map((detail) =>
        detail.id === id ? { ...detail, value } : detail,
      ),
    );
  }

  function updateFaq(id: number, field: "question" | "answer", value: string) {
    setFaqs((current) =>
      current.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
    );
  }

  function addFaq() {
    const id = Date.now();
    setFaqs((current) => [
      ...current,
      { id, question: "Enter your question", answer: "Enter your answer" },
    ]);
    setEditingFaq(id);
  }

  return (
    <div className="w-full space-y-6 pb-10">
      <section className="w-full rounded-2xl border border-[#E2E9E3] bg-white p-4 shadow-[0_7px_24px_rgba(41,58,45,0.05)] sm:p-6">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className="min-w-0">
            <div className="relative h-[220px] overflow-visible rounded-2xl bg-[#E8EEE9] sm:h-[280px]">
              <Image
                src={coverImage}
                alt="Adewale Stitches cover"
                fill
                unoptimized
                className="rounded-2xl object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute -bottom-10 left-4 h-24 w-24 rounded-full border-4 border-white bg-white shadow-md sm:left-6 sm:h-28 sm:w-28">
                <Image
                  src={profileImage}
                  alt="Segun Adewale"
                  fill
                  unoptimized
                  className="rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => profileInput.current?.click()}
                  aria-label="Change profile photo"
                  className="absolute right-[-14px] top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E1E8E2] bg-white text-[#346739] shadow-md transition hover:bg-[#F0FFF6] [&_svg]:h-4 [&_svg]:w-4 [&_path]:fill-current"
                >
                  <CameraIcon />
                </button>
                <input
                  ref={profileInput}
                  type="file"
                  accept="image/*"
                  onChange={(event) => chooseImage(event, setProfileImage)}
                  className="sr-only"
                />
              </div>
              <button
                type="button"
                onClick={() => coverInput.current?.click()}
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-[#34473A] shadow-md transition hover:bg-[#F0FFF6] [&_svg]:h-4 [&_svg]:w-4 [&_path]:fill-current"
              >
                <CameraIcon />
                Change cover photo
              </button>
              <input
                ref={coverInput}
                type="file"
                accept="image/*"
                onChange={(event) => chooseImage(event, setCoverImage)}
                className="sr-only"
              />
            </div>
            <div className="mb-6 ml-[120px] mt-3 min-h-9 sm:ml-[150px]">
              <h1 className="text-lg font-bold text-[#293A2D] sm:text-xl">
                Segun Adewale
              </h1>
              <p className="text-xs text-[#718075]">Fashion Designer</p>
            </div>

            <div className="grid gap-5 rounded-2xl bg-[#F8FAF8] p-4 md:grid-cols-2 sm:p-5">
              <DetailGroup
                title="Personal information"
                details={personal}
                onChange={(id, value) => updateDetail(setPersonal, id, value)}
              />
              <DetailGroup
                title="Business information"
                details={business}
                onChange={(id, value) => updateDetail(setBusiness, id, value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <EditableCard
              title="About"
              editing={editingSection === "about"}
              onEdit={() => setEditingSection("about")}
              onSave={() => setEditingSection(null)}
            >
              {editingSection === "about" ? (
                <textarea
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                  rows={7}
                  className="w-full resize-none rounded-xl border border-[#C7D3C9] bg-white p-3 text-xs leading-6 text-[#536158] outline-none focus:border-[#346739]"
                />
              ) : (
                <p className="text-xs leading-6 text-[#617065]">{about}</p>
              )}
            </EditableCard>

            <EditableCard
              title="Why choose me"
              editing={editingSection === "reasons"}
              onEdit={() => setEditingSection("reasons")}
              onSave={() => setEditingSection(null)}
            >
              <div className="space-y-2.5">
                {reasons.map((reason, index) =>
                  editingSection === "reasons" ? (
                    <input
                      key={index}
                      value={reason}
                      onChange={(event) =>
                        setReasons((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index ? event.target.value : item,
                          ),
                        )
                      }
                      className="h-10 w-full rounded-lg border border-[#C7D3C9] bg-white px-3 text-xs text-[#536158] outline-none focus:border-[#346739]"
                    />
                  ) : (
                    <p
                      key={reason}
                      className="flex gap-2 text-xs leading-5 text-[#5F6E63]"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#DCEEE0] text-[#346739]">
                        <UiIcon name="check" className="h-2.5 w-2.5" />
                      </span>
                      {reason}
                    </p>
                  ),
                )}
              </div>
            </EditableCard>

            <EditableCard
              title="Availability"
              editing={editingSection === "availability"}
              onEdit={() => setEditingSection("availability")}
              onSave={() => setEditingSection(null)}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#346739]">
                  <UiIcon name="clock" />
                </span>
                {editingSection === "availability" ? (
                  <input
                    value={availability}
                    onChange={(event) => setAvailability(event.target.value)}
                    className="h-10 min-w-0 flex-1 rounded-lg border border-[#C7D3C9] bg-white px-3 text-xs text-[#536158] outline-none focus:border-[#346739]"
                  />
                ) : (
                  <div>
                    <p className="text-xs font-bold text-[#35473A]">
                      Working hours
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#718075]">
                      {availability}
                    </p>
                  </div>
                )}
              </div>
            </EditableCard>
          </div>
        </div>
      </section>

      <section className="w-full rounded-2xl border border-[#E2E9E3] bg-white p-4 shadow-[0_7px_24px_rgba(41,58,45,0.05)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#293A2D] sm:text-xl">
              Frequently asked questions
            </h2>
            <p className="mt-1 text-xs text-[#78867C]">
              Manage the answers clients see on your public profile.
            </p>
          </div>
          <button
            type="button"
            onClick={addFaq}
            className="shrink-0 rounded-xl bg-[#346739] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#29562E] sm:px-5 sm:text-sm"
          >
            + Add FAQ
          </button>
        </div>
        <div className="mt-5 divide-y divide-[#E5EBE6] rounded-2xl border border-[#E2E9E3] px-4 sm:px-5">
          {faqs.map((faq) => (
            <article key={faq.id} className="py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  {editingFaq === faq.id ? (
                    <div className="space-y-3">
                      <input
                        value={faq.question}
                        onChange={(event) =>
                          updateFaq(faq.id, "question", event.target.value)
                        }
                        aria-label="FAQ question"
                        className="h-11 w-full rounded-lg border border-[#C7D3C9] px-3 text-sm font-bold text-[#293A2D] outline-none focus:border-[#346739]"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(event) =>
                          updateFaq(faq.id, "answer", event.target.value)
                        }
                        aria-label="FAQ answer"
                        rows={3}
                        className="w-full resize-none rounded-lg border border-[#C7D3C9] p-3 text-xs leading-5 text-[#617065] outline-none focus:border-[#346739]"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-sm font-bold text-[#34473A]">
                        {faq.question}
                      </h3>
                      <p className="mt-2 max-w-[900px] text-xs leading-6 text-[#718075]">
                        {faq.answer}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingFaq(editingFaq === faq.id ? null : faq.id)
                    }
                    aria-label={editingFaq === faq.id ? "Save FAQ" : "Edit FAQ"}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#346739] hover:bg-[#EFF8F1]"
                  >
                    <UiIcon name={editingFaq === faq.id ? "check" : "edit"} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFaqs((current) =>
                        current.filter((item) => item.id !== faq.id),
                      )
                    }
                    aria-label="Delete FAQ"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#B84A4A] hover:bg-[#FFF0F0]"
                  >
                    <UiIcon name="trash" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
