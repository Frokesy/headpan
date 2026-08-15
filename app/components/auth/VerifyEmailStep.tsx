"use client";

import { useRef, useState } from "react";
import { VerifyEmailIcon } from "../icons";

type Props = {
  email: string;
  titleId: string;
  onUseDifferentEmail: () => void;
  onVerified: () => void;
};

export default function VerifyEmailStep({
  email,
  titleId,
  onUseDifferentEmail,
  onVerified,
}: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const update = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? digit : item)),
    );
    if (digit && index < 5) refs.current[index + 1]?.focus();
  };
  const keyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0)
      refs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0)
      refs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5)
      refs.current[index + 1]?.focus();
  };
  const paste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const digits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    if (!digits.length) return;
    event.preventDefault();
    setOtp(Array.from({ length: 6 }, (_, index) => digits[index] ?? ""));
    refs.current[Math.min(digits.length, 6) - 1]?.focus();
  };
  return (
    <>
      <section className="hidden min-h-[680px] bg-[#F0FFF6] px-8 py-10 md:flex">
        <div className="flex w-full flex-col items-center space-y-6 justify-center text-center">
          <VerifyEmailIcon />
          <h2 id={titleId} className="text-3xl font-bold text-[#294F2E]">
            Almost there
          </h2>
          <p className="max-w-[310px] text-sm leading-6 text-[#4F6552]">
            We just sent a verification code to{" "}
            <strong className="text-[#346739]">{email}</strong>
          </p>
          <p className="max-w-[310px] text-sm leading-6 text-[#4F6552]">
            Please check your inbox and enter the code to verify your email
            address.
          </p>
        </div>
      </section>
      <section className="flex items-start px-6 pb-8 pt-14 sm:px-10 md:min-h-[680px] md:items-center md:px-14 md:py-12">
        <div className="mx-auto w-full max-w-[510px] text-center">
          <div className="mx-auto mb-4 hidden h-[130px] overflow-hidden md:hidden [&>svg]:h-[130px] [&>svg]:w-auto">
            <VerifyEmailIcon />
          </div>
          <h3 className="text-2xl font-bold text-[#293A2D]">
            Verify your email
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#718075]">
            Enter the six-digit code sent to{" "}
            <strong className="text-[#346739]">{email}</strong>
          </p>
          <form onSubmit={(event) => { event.preventDefault(); onVerified(); }} className="mt-7 md:mt-9">
            <div onPaste={paste} className="grid grid-cols-6 gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    refs.current[index] = element;
                  }}
                  value={digit}
                  onChange={(event) => update(index, event.target.value)}
                  onKeyDown={(event) => keyDown(index, event)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  aria-label={`Verification digit ${index + 1}`}
                  className="aspect-square min-w-0 rounded-xl border border-[#CBD9CE] bg-white text-center text-xl font-bold text-[#346739] outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/15 sm:text-2xl"
                />
              ))}
            </div>
            <div className="text-center space-y-3 my-6 text-[#4F6552] text-[16px]">
              <span>Didn&apos;t see a code?</span> <br />
              <span>
                Resend code in{" "}
                <span className="text-[#346739] font-semibold">03:45</span>
              </span>
            </div>
            <button
              type="submit"
              disabled={otp.some((digit) => !digit)}
              className="w-full rounded-xl bg-[#346739] py-3.5 text-sm font-bold text-white transition hover:bg-[#294F2E] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Verify email
            </button>
            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#E0E8E1]" />
              <span className="text-xs text-[#879289]">Or</span>
              <span className="h-px flex-1 bg-[#E0E8E1]" />
            </div>
            <button
              type="button"
              onClick={onUseDifferentEmail}
              className="mt-3 w-full rounded-xl border border-[#346739] py-3.5 text-sm font-bold text-[#346739] transition hover:bg-[#F0FFF6]"
            >
              Use a different email
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
