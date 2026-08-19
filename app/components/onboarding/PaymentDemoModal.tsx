"use client";

import { useCallback, useEffect, useId, useRef } from "react";

export type PaymentMethod = "card" | "transfer" | "ussd";

const methodTitles: Record<PaymentMethod, string> = {
  card: "Pay with card",
  transfer: "Pay with bank transfer",
  ussd: "Pay with USSD",
};

const inputClassName =
  "w-full rounded-xl border border-[#D7E0D9] px-4 py-3.5 text-sm outline-none placeholder:text-[#9AA59C] focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10";

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
  const closeModal = useCallback(() => onClose(), [onClose]);

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
        className="relative my-auto w-full max-w-[520px] overflow-hidden rounded-[24px] bg-white shadow-2xl"
      >
        <div className="bg-[#F0FFF6] px-6 py-6 sm:px-8">
          <button
            ref={closeRef}
            type="button"
            onClick={closeModal}
            aria-label="Close payment modal"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#346739] shadow-sm transition hover:rotate-90"
          >
            ×
          </button>
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
            onClick={closeModal}
            className="w-full rounded-xl bg-[#346739] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#294F2E]"
          >
            {method === "card" ? "Pay ₦5,000" : method === "transfer" ? "I have made the transfer" : "I have completed the payment"}
          </button>
          <p className="text-center text-[11px] leading-5 text-[#8B968D]">This is a frontend demonstration. No payment will be processed.</p>
        </div>
      </section>
    </div>
  );
}
