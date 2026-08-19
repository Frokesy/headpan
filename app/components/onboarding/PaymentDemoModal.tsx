"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CalendarIcon, CircledCheck, GroupAvatars } from "../icons";

export type PaymentMethod = "card" | "transfer" | "ussd";

const methodTitles: Record<PaymentMethod, string> = {
  card: "Pay with card",
  transfer: "Pay with bank transfer",
  ussd: "Pay with USSD",
};

const inputClassName =
  "w-full rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none placeholder:text-[#9AA59C] focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10";

function ClockIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function PaymentDemoModal({
  open,
  method,
  onClose,
}: {
  open: boolean;
  method: PaymentMethod | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const closeModal = useCallback(() => {
    setSubmitted(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeModal]);

  if (!open || !method) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#132216]/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative my-auto w-full overflow-hidden rounded-[24px] bg-white shadow-2xl transition-[max-width] ${submitted ? "max-w-[760px]" : "max-w-[520px]"}`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={closeModal}
          aria-label="Close payment modal"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#346739] shadow-sm transition hover:rotate-90"
        >
          ×
        </button>

        {submitted ? (
          <div className="max-h-[92vh] overflow-y-auto px-5 py-8 sm:px-9 sm:py-10">
            <section className="mx-auto max-w-[620px] text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8ED]">
                <CircledCheck width={44} height={44} />
              </div>
              <h2 id={titleId} className="mt-5 text-2xl font-bold text-[#293A2D] sm:text-3xl">
                Verification submitted successfully
              </h2>
              <p className="mx-auto mt-3 max-w-[590px] text-sm leading-6 text-[#718075]">
                Your documents and payment have been received successfully. We will review your information and notify you once your account has been verified.
              </p>
            </section>

            <section className="mt-8 grid gap-6 rounded-2xl border border-[#E5EAE6] bg-[#FAFCFA] p-5 sm:grid-cols-[minmax(0,1fr)_190px] sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF0D8] text-[#D47A12]">
                  <ClockIcon />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-[#293A2D]">Pending verification</h3>
                    <span className="rounded-full bg-[#FFF0D8] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#C66C08]">PENDING</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#718075]">
                    Your profile is under review by our team. You will be notified via email and dashboard once approved.
                  </p>
                </div>
              </div>
              <div className="border-t border-[#DDE5DF] pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <h3 className="text-xs font-bold text-[#445247]">Expected Review time</h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F8ED]">
                    <CalendarIcon width={22} height={22} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#293A2D]">24–48 hours</p>
                    <p className="mt-0.5 text-[11px] text-[#718075]">(1–2 Business days)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 flex flex-col items-center rounded-2xl bg-[#F0FFF6] px-5 py-6 text-center sm:px-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#346739] shadow-sm">
                <GroupAvatars width={30} height={24} />
              </span>
              <h3 className="mt-3 text-lg font-bold text-[#293A2D]">Join our artisan community</h3>
              <p className="mt-2 max-w-[520px] text-xs leading-5 text-[#718075]">
                Connect with fellow artisans, exchange ideas, discover opportunities and grow your business together.
              </p>
            </section>

            <div className="mx-auto mt-7 flex w-full flex-col gap-3 sm:w-4/5">
              <a href="/artisan/dashboard" className="rounded-xl bg-[#346739] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#294F2E]">
                Go to dashboard
              </a>
              <a href="/community" className="rounded-xl border border-[#346739] bg-transparent px-6 py-3.5 text-center text-sm font-bold text-[#346739] transition hover:bg-[#F5FFF9]">
                Join community
              </a>
            </div>
          </div>
        ) : (
        <>
        <div className="bg-[#F0FFF6] px-6 py-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#5F7F65]">Payment demo</p>
          <h2 id={titleId} className="mt-2 pr-10 text-2xl font-bold text-[#293A2D]">{methodTitles[method]}</h2>
          <div className="mt-4 flex items-end justify-between border-t border-[#D8E8DC] pt-4">
            <span className="text-sm text-[#718075]">Verification fee</span>
            <span className="text-2xl font-bold text-[#346739]">₦5,000</span>
          </div>
        </div>

        <div className="space-y-5 px-6 py-7 sm:px-8">
          {method === "card" && (
            <>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#293A2D]">Card number</span>
                <input inputMode="numeric" placeholder="0000 0000 0000 0000" className={inputClassName} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#293A2D]">Name on card</span>
                <input type="text" placeholder="Enter cardholder name" className={inputClassName} />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label>
                  <span className="mb-2 block text-sm font-semibold text-[#293A2D]">Expiry date</span>
                  <input inputMode="numeric" placeholder="MM / YY" className={inputClassName} />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-semibold text-[#293A2D]">CVV</span>
                  <input inputMode="numeric" placeholder="123" className={inputClassName} />
                </label>
              </div>
            </>
          )}

          {method === "transfer" && (
            <div className="rounded-2xl border border-[#DCE6DE] bg-[#FAFCFA] p-5">
              <p className="text-xs text-[#718075]">Transfer exactly ₦5,000 to:</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-[#718075]">Bank</dt><dd className="font-bold text-[#293A2D]">Headpan Demo Bank</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[#718075]">Account number</dt><dd className="font-bold text-[#293A2D]">0123456789</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[#718075]">Account name</dt><dd className="text-right font-bold text-[#293A2D]">Headpan Nigeria</dd></div>
              </dl>
              <p className="mt-5 rounded-lg bg-[#FFF7E6] px-3 py-2 text-xs leading-5 text-[#755B20]">Demo details only—do not make a real transfer.</p>
            </div>
          )}

          {method === "ussd" && (
            <div className="text-center">
              <p className="text-sm leading-6 text-[#718075]">Dial this demo code on the phone linked to your bank account:</p>
              <div className="mt-5 rounded-2xl border border-dashed border-[#AFC1B3] bg-[#F5FFF9] px-5 py-7 text-2xl font-bold tracking-wide text-[#346739]">*000*0000#</div>
              <p className="mt-4 text-xs text-[#718075]">The code expires in 10 minutes.</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="w-full rounded-xl bg-[#346739] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#294F2E]"
          >
            {method === "card" ? "Pay ₦5,000" : method === "transfer" ? "I've made the payment" : "I have completed the payment"}
          </button>
          <p className="text-center text-[11px] leading-5 text-[#8B968D]">This is a frontend demonstration. No payment will be processed.</p>
        </div>
        </>
        )}
      </section>
    </div>
  );
}
