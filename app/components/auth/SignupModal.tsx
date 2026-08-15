"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import SignupStep from "./SignupStep";
import VerifyEmailStep from "./VerifyEmailStep";

type SignupModalProps = { open: boolean; onClose: () => void };

export default function SignupModal({ open, onClose }: SignupModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [emailToVerify, setEmailToVerify] = useState("");

  const closeModal = useCallback(() => {
    setStep("signup");
    setEmailToVerify("");
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

  if (!open) return null;

  return <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#132216]/65 p-3 backdrop-blur-sm sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative my-auto grid max-h-[94vh] w-full max-w-[1040px] overflow-y-auto rounded-[28px] bg-white shadow-2xl md:grid-cols-[38%_62%]">
      <button ref={closeRef} type="button" onClick={closeModal} aria-label={step === "signup" ? "Close signup modal" : "Close email verification modal"} className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#346739] shadow-md transition hover:rotate-90">×</button>
      {step === "signup" ? <SignupStep titleId={titleId} onSuccess={(email) => { setEmailToVerify(email); setStep("verify"); }} /> : <VerifyEmailStep titleId={titleId} email={emailToVerify} onUseDifferentEmail={() => setStep("signup")} />}
    </div>
  </div>;
}
