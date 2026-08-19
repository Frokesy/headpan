"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CameraIcon, FileUploadIcon } from "../icons";

const categories = [
  "Fashion & Tailoring",
  "Barbing",
  "Hair Styling",
  "Painting",
  "Baking",
  "Carpentry",
  "Electrical Services",
  "Photography",
  "Other",
];
const states = [
  "Abia",
  "Abuja (FCT)",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Cross River",
  "Delta",
  "Edo",
  "Ekiti",
  "Enugu",
  "Imo",
  "Kaduna",
  "Kano",
  "Kwara",
  "Lagos",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-sm font-semibold text-[#293A2D]">
      {children}
      <span className="ml-0.5 text-[#346739]">*</span>
    </span>
  );
}

function UploadField({
  title,
  description,
  type,
  preview,
  onFile,
}: {
  title: string;
  description: string;
  type: "profile" | "cover";
  preview: string;
  onFile: (file: File) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-center">
      <div>
        <FieldLabel>{title}</FieldLabel>
        <p className="text-xs leading-5 text-[#718075]">{description}</p>
      </div>
      <label className="relative flex h-[130px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#B8C9BC] bg-[#FAFCFA] transition hover:border-[#346739] hover:bg-[#F5FFF9]">
        {preview ? (
          <Image
            src={preview}
            alt={`${title} preview`}
            fill
            unoptimized
            className="object-cover"
          />
        ) : type === "profile" ? (
          <CameraIcon />
        ) : (
          <FileUploadIcon />
        )}
        <input
          required
          type="file"
          accept="image/*"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onFile(file);
          }}
        />
      </label>
    </div>
  );
}

export default function BusinessInformationForm() {
  const router = useRouter();
  const reasonRef = useRef<HTMLInputElement>(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [shopPreview, setShopPreview] = useState("");
  const [hasShop, setHasShop] = useState<"yes" | "no" | null>(null);
  const [reason, setReason] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);

  const readImage = (file: File, setter: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => setter(String(reader.result));
    reader.readAsDataURL(file);
  };
  const addReason = () => {
    const value = reason.trim();
    if (!value) {
      reasonRef.current?.focus();
      return;
    }
    if (!reasons.some((item) => item.toLowerCase() === value.toLowerCase()))
      setReasons((current) => [...current, value]);
    setReason("");
    reasonRef.current?.focus();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!hasShop || !reasons.length) return;
        router.push("/artisan/onboarding/services");
      }}
      className="mx-auto max-w-[1050px] pb-14"
    >
      <div className="flex flex-col gap-7 border-b border-[#E4EBE6] pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7E0D9] text-xl text-[#293A2D] transition hover:bg-[#F5FFF9]"
          >
            ‹
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6D8772]">
              Step 1 of 5
            </p>
            <h1 className="mt-2 text-[18px] font-bold text-[#293A2D] sm:text-3xl">
              Business information
            </h1>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#718075]">
              Tell clients about your business and what makes your work stand
              out.
            </p>
          </div>
        </div>
        <div className="w-full md:max-w-[300px]">
          <div className="h-2 overflow-hidden rounded-full bg-[#E1E8E3]">
            <div className="h-full w-1/5 rounded-full bg-[#346739]" />
          </div>
          <p className="mt-2 text-right text-xs font-semibold text-[#346739]">
            20% complete
          </p>
        </div>
      </div>

      <section className="grid gap-8 border-b border-[#E4EBE6] py-8 lg:grid-cols-2">
        <UploadField
          title="Upload Profile Photo"
          description="Use a clear photo of yourself. JPG or PNG, up to 5MB."
          type="profile"
          preview={profilePreview}
          onFile={(file) => readImage(file, setProfilePreview)}
        />
        <UploadField
          title="Upload cover photo"
          description="Show your workspace or a strong example of your craft."
          type="cover"
          preview={coverPreview}
          onFile={(file) => readImage(file, setCoverPreview)}
        />
      </section>

      <section className="space-y-6 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <label>
            <FieldLabel>Business name</FieldLabel>
            <input
              required
              type="text"
              placeholder="Enter your business name"
              className="w-full rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
            />
          </label>
          <label>
            <FieldLabel>Category/Profession</FieldLabel>
            <select
              required
              defaultValue=""
              className="w-full rounded-xl border border-[#D7E0D9] bg-white px-4 py-3.5 text-sm text-[#445247] outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
            >
              <option value="" disabled>
                Select your category
              </option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <FieldLabel>Tagline (short description)</FieldLabel>
          <input
            required
            type="text"
            maxLength={100}
            placeholder="e.g. Bespoke outfits made with precision and care"
            className="w-full rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
          />
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <label>
            <FieldLabel>Location (State)</FieldLabel>
            <select
              required
              defaultValue=""
              className="w-full rounded-xl border border-[#D7E0D9] bg-white px-4 py-3.5 text-sm text-[#445247] outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
            >
              <option value="" disabled>
                Select your state
              </option>
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </label>
          <label>
            <FieldLabel>Years of experience</FieldLabel>
            <input
              required
              type="number"
              min="0"
              max="70"
              placeholder="e.g. 5"
              className="w-full rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
            />
          </label>
        </div>
        <label className="block">
          <FieldLabel>About your business</FieldLabel>
          <textarea
            required
            rows={5}
            placeholder="Describe your business, experience and the kind of clients you serve"
            className="w-full resize-y rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm leading-6 outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
          />
        </label>

        <fieldset>
          <legend>
            <FieldLabel>Do you have a physical store/shop?</FieldLabel>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setHasShop("yes")}
              aria-pressed={hasShop === "yes"}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold ${hasShop === "yes" ? "border-[#346739] bg-[#F5FFF9] text-[#346739]" : "border-[#D7E0D9]"}`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded border ${hasShop === "yes" ? "border-[#346739] bg-[#346739] text-white" : "border-[#AEB9B0]"}`}
              >
                {hasShop === "yes" ? "✓" : ""}
              </span>
              Yes, I have
            </button>
            <button
              type="button"
              onClick={() => setHasShop("no")}
              aria-pressed={hasShop === "no"}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold ${hasShop === "no" ? "border-[#346739] bg-[#F5FFF9] text-[#346739]" : "border-[#D7E0D9]"}`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded border ${hasShop === "no" ? "border-[#346739] bg-[#346739] text-white" : "border-[#AEB9B0]"}`}
              >
                {hasShop === "no" ? "✓" : ""}
              </span>
              No, I don&apos;t
            </button>
          </div>
        </fieldset>

        <div className="max-w-[520px]">
          <UploadField
            title="Upload front shop/shop picture"
            description="Upload a clear photo showing the front of your store or workspace."
            type="profile"
            preview={shopPreview}
            onFile={(file) => readImage(file, setShopPreview)}
          />
        </div>
        <label className="block">
          <FieldLabel>Enter your shop/store address</FieldLabel>
          <input
            required
            type="text"
            placeholder="Enter the full shop address"
            className="w-full rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
          />
        </label>

        <div>
          <div className="flex items-center justify-between gap-4">
            <FieldLabel>Why choose me?</FieldLabel>
            <button
              type="button"
              onClick={addReason}
              className="mb-2 text-xs font-bold text-[#346739] hover:underline"
            >
              + Add more
            </button>
          </div>
          <p className="mb-3 text-xs text-[#718075]">
            Add short reasons that help clients understand your value.
          </p>
          {reasons.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {reasons.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-[#E8F8ED] px-3 py-2 text-xs font-semibold text-[#346739]"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() =>
                      setReasons((current) =>
                        current.filter((reasonItem) => reasonItem !== item),
                      )
                    }
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
              ref={reasonRef}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addReason();
                }
              }}
              type="text"
              placeholder="e.g. Fast response and reliable delivery"
              className="min-w-0 flex-1 rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
            />
            <button
              type="button"
              onClick={addReason}
              className="rounded-xl border border-[#346739] px-5 py-3 text-sm font-bold text-[#346739] transition hover:bg-[#F5FFF9]"
            >
              Add reason
            </button>
          </div>
          {!reasons.length && (
            <p className="mt-2 text-xs text-[#8B968D]">
              At least one reason is required.
            </p>
          )}
        </div>
      </section>
      <div className="flex justify-end border-t border-[#E4EBE6] pt-7">
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
