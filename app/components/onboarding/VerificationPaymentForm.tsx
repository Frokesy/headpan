"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CameraIcon, WalletIcon } from "../icons";

type DocumentKey = "governmentId" | "cacCertificate" | "selfie";
type PaymentMethod = "card" | "transfer" | "ussd";

const documentLabels: Record<DocumentKey, string> = {
  governmentId: "Government ID",
  cacCertificate: "CAC Certificate",
  selfie: "Selfie Verification",
};

function PaymentMethodIcon({ type }: { type: PaymentMethod }) {
  if (type === "card") {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/><path d="M2 9h20M6 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
  }
  if (type === "transfer") {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18M12 3l9 5H3l9-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.8"/><path d="M9 6h6M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}

function UploadBox({
  documentKey,
  file,
  onFile,
  selfie = false,
}: {
  documentKey: DocumentKey;
  file?: File;
  onFile: (key: DocumentKey, file: File) => void;
  selfie?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
      }}
      className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B8C9BC] bg-[#FAFCFA] px-4 text-center transition hover:border-[#346739] hover:bg-[#F5FFF9]"
    >
      <CameraIcon />
      {selfie && <p className="mt-3 text-xs font-semibold text-[#445247]">Take a clear photo of your face</p>}
      <p className="mt-2 max-w-[230px] truncate text-xs font-semibold text-[#346739]">
        {file ? file.name : "Click to browse"}
      </p>
      <p className="mt-1 text-[11px] leading-4 text-[#718075]">Supported: JPG, PNG or PDF, up to 5MB</p>
      <input
        ref={inputRef}
        type="file"
        accept={selfie ? "image/jpeg,image/png" : "image/jpeg,image/png,application/pdf"}
        className="sr-only"
        onChange={(event) => {
          const selected = event.target.files?.[0];
          if (selected) onFile(documentKey, selected);
        }}
      />
    </div>
  );
}

const paymentMethods: Array<{ value: PaymentMethod; title: string; description: string }> = [
  { value: "card", title: "Credit/Debit Card", description: "Pay securely with your bank card" },
  { value: "transfer", title: "Bank Transfer", description: "Transfer directly from your bank" },
  { value: "ussd", title: "USSD", description: "Pay using your bank's USSD code" },
];

export default function VerificationPaymentForm() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Partial<Record<DocumentKey, File>>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const saveDocument = (key: DocumentKey, file: File) => {
    setDocuments((current) => ({ ...current, [key]: file }));
  };

  const allDocumentsUploaded = Object.keys(documentLabels).every(
    (key) => documents[key as DocumentKey],
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!allDocumentsUploaded || !paymentMethod) return;
      }}
      className="mx-auto max-w-[1180px] pb-14"
    >
      <div className="flex flex-col gap-7 border-b border-[#E4EBE6] pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.push("/artisan/onboarding/contact")}
            aria-label="Go back to contact and availability"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7E0D9] text-xl text-[#293A2D] transition hover:bg-[#F5FFF9]"
          >
            ‹
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6D8772]">Step 5 of 5</p>
            <h1 className="mt-2 text-[18px] font-bold text-[#293A2D] sm:text-3xl">Verification &amp; Payment</h1>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#718075]">
              Verify your identity and business before completing your artisan profile.
            </p>
          </div>
        </div>
        <div className="w-full md:max-w-[300px]">
          <div className="h-2 overflow-hidden rounded-full bg-[#E1E8E3]">
            <div className="h-full w-[96%] rounded-full bg-[#346739]" />
          </div>
          <p className="mt-2 text-right text-xs font-semibold text-[#346739]">96% complete</p>
        </div>
      </div>

      <div className="grid items-start gap-6 py-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <section className="space-y-8 rounded-2xl border border-[#E6ECE8] bg-white p-5 shadow-[0_8px_30px_rgba(41,58,45,0.08)] sm:p-7">
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_260px] sm:items-center">
            <div>
              <h2 className="text-base font-bold text-[#293A2D]">Government ID</h2>
              <p className="mt-2 text-sm leading-6 text-[#718075]">
                Upload a valid government issued ID. Accepted: NIN Slip, Driver&apos;s License, Voter&apos;s card, international passport.
              </p>
            </div>
            <UploadBox documentKey="governmentId" file={documents.governmentId} onFile={saveDocument} />
          </div>

          <div className="border-t border-[#E4EBE6] pt-8">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_260px] sm:items-center">
              <div>
                <h2 className="text-base font-bold text-[#293A2D]">CAC Certificate</h2>
                <p className="mt-2 text-sm leading-6 text-[#718075]">Upload your CAC certificate to verify your business.</p>
              </div>
              <UploadBox documentKey="cacCertificate" file={documents.cacCertificate} onFile={saveDocument} />
            </div>
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-semibold text-[#293A2D]">Registration number<span className="ml-0.5 text-[#346739]">*</span></span>
              <input
                required
                type="text"
                placeholder="Enter your RC or BN number (e.g RC1234567890)"
                className="w-full rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none placeholder:text-[#9AA59C] focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10"
              />
            </label>
          </div>

          <div className="grid gap-5 border-t border-[#E4EBE6] pt-8 sm:grid-cols-[minmax(0,1fr)_260px] sm:items-center">
            <div>
              <h2 className="text-base font-bold text-[#293A2D]">Selfie Verification</h2>
              <p className="mt-2 text-sm leading-6 text-[#718075]">Take a clear selfie for identity verification.</p>
            </div>
            <UploadBox documentKey="selfie" file={documents.selfie} onFile={saveDocument} selfie />
          </div>
        </section>

        <aside className="rounded-2xl border border-[#E6ECE8] bg-white p-5 shadow-[0_8px_30px_rgba(41,58,45,0.08)] sm:p-7">
          <section>
            <h2 className="text-base font-bold text-[#293A2D]">Verification summary</h2>
            <div className="mt-5 space-y-4">
              {(Object.keys(documentLabels) as DocumentKey[]).map((key) => (
                <div key={key} className="flex items-center gap-3 text-xs">
                  <span className="font-semibold text-[#445247]">{documentLabels[key]}</span>
                  <span className="h-px min-w-3 flex-1 border-t border-dashed border-[#C9D2CB]" />
                  <span className={`font-semibold ${documents[key] ? "text-[#346739]" : "text-[#8B968D]"}`}>
                    {documents[key] ? "Uploaded" : "Not uploaded"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7 border-t border-[#E4EBE6] pt-7">
            <h2 className="text-base font-bold text-[#293A2D]">Verification fee</h2>
            <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#F5FFF9] p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#346739]"><WalletIcon /></span>
              <div>
                <p className="text-xl font-bold text-[#293A2D]">₦5,000</p>
                <p className="mt-1 text-xs leading-5 text-[#718075]">This is a one-time verification fee. No recurring charges.</p>
              </div>
            </div>
          </section>

          <fieldset className="mt-7 border-t border-[#E4EBE6] pt-7">
            <legend className="text-base font-bold text-[#293A2D]">Choose payment method</legend>
            <div className="mt-4 space-y-3">
              {paymentMethods.map((method) => {
                const selected = paymentMethod === method.value;
                return (
                  <label
                    key={method.value}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${selected ? "border-[#346739] bg-[#F5FFF9]" : "border-[#DDE5DF] hover:border-[#AFC1B3]"}`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={method.value}
                      checked={selected}
                      onChange={() => setPaymentMethod(method.value)}
                      className="sr-only"
                    />
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${selected ? "bg-[#346739] text-white" : "bg-[#EFF3F0] text-[#445247]"}`}>
                      <PaymentMethodIcon type={method.value} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-[#293A2D]">{method.title}</span>
                      <span className="mt-1 block text-xs text-[#718075]">{method.description}</span>
                    </span>
                    <span className={`ml-auto h-4 w-4 shrink-0 rounded-full border-4 ${selected ? "border-[#346739] bg-white" : "border-[#BCC7BE]"}`} />
                  </label>
                );
              })}
            </div>
            {!paymentMethod && <p className="mt-2 text-xs text-[#8B968D]">Select a payment method to continue.</p>}
          </fieldset>
        </aside>
      </div>

      <div className="flex flex-col-reverse justify-between gap-3 border-t border-[#E4EBE6] pt-7 sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/artisan/onboarding/contact")}
          className="w-full rounded-xl border border-[#D7E0D9] px-8 py-3.5 text-sm font-bold text-[#445247] transition hover:bg-[#F5FFF9] sm:w-auto"
        >
          Go back
        </button>
        <button
          type="submit"
          className="w-full rounded-xl border border-[#346739] bg-transparent px-8 py-3.5 text-sm font-bold text-[#346739] transition hover:bg-[#346739] hover:text-white sm:w-auto"
        >
          Proceed to Payment
        </button>
      </div>
    </form>
  );
}
