"use client";

import Image from "next/image";
import { useState } from "react";
import { FacebookIcon, GoogleIcon, GreenCheck } from "../icons";

export type SignupContact = { email: string; phone: string };
type Props = { titleId: string; onSuccess: (contact: SignupContact) => void };
const benefits = [
  "Get discovered by more clients",
  "Showcase your work",
  "Grow your business",
  "Join a community of artisans",
];

function FieldIcon({ type }: { type: "user" | "email" | "phone" | "lock" }) {
  const paths = {
    user: (
      <>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.5 19c.6-3.3 2.8-5 6.5-5s5.9 1.7 6.5 5" />
      </>
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    phone: (
      <path d="M7.4 3.5 10 7.8 7.9 10c1.2 2.8 3.3 4.9 6.1 6.1l2.2-2.1 4.3 2.6-.8 3.1c-.2.8-1 1.3-1.8 1.3C9.7 20.5 3.5 14.3 3 6.1c0-.8.5-1.6 1.3-1.8l3.1-.8Z" />
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[type]}
    </svg>
  );
}

function InputField({
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  autoComplete: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const icon =
    type === "email" ? "email" : type === "password" ? "lock" : "user";
  return (
    <label className="flex items-center gap-3 rounded-xl border border-[#D8E2DA] bg-white px-4 text-[#718075] transition focus-within:border-[#346739] focus-within:ring-2 focus-within:ring-[#346739]/10">
      <FieldIcon type={icon} />
      <span className="sr-only">{placeholder}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-[#293A2D] outline-none placeholder:text-[#819085]"
      />
    </label>
  );
}

export default function SignupStep({ titleId, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  return (
    <>
      <section className="relative hidden min-h-[680px] flex-col overflow-hidden bg-[#F0FFF6] px-9 pb-0 pt-10 lg:flex">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B8D70]">
            Join Headpan
          </p>
          <h2
            id={titleId}
            className="mt-3 max-w-[300px] text-[32px] font-bold leading-tight text-[#294F2E]"
          >
            Create your artisan account
          </h2>
          <p className="mt-4 max-w-[315px] text-sm leading-6 text-[#4F6552]">
            Join thousands of skilled artisans growing their business on{" "}
            <strong>Headpan.ng</strong>
          </p>
          <ul className="mt-7 grid gap-4">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 text-sm font-medium text-[#344A38]"
              >
                <GreenCheck width={20} height={20} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto mt-auto h-[270px] w-full max-w-[330px]">
          <Image
            src="/auth/signup-img.png"
            alt="Artisan working in her studio"
            width={352}
            height={377}
            className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_37%,rgba(240,255,246,0.38)_60%,#F0FFF6_83%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F0FFF6] to-transparent"
          />
        </div>
      </section>
      <section className="px-6 py-9 sm:px-10 md:px-12 md:py-12">
        <div className="mx-auto max-w-[500px]">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-[#293A2D]">Sign up</h3>
            <p className="mt-2 text-lg text-[#718075]">
              Create your account to get started
            </p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSuccess({ email, phone: `${countryCode} ${phone}` });
            }}
            className="space-y-4"
          >
            <InputField
              type="text"
              placeholder="Full name"
              autoComplete="name"
            />
            <InputField
              type="email"
              placeholder="Email address"
              autoComplete="email"
              value={email}
              onChange={setEmail}
            />
            <label className="flex overflow-hidden rounded-xl border border-[#D8E2DA] bg-white text-[#718075] transition focus-within:border-[#346739] focus-within:ring-2 focus-within:ring-[#346739]/10">
              <span className="sr-only">Country code</span>
              <select
                aria-label="Country code"
                value={countryCode}
                onChange={(event) => setCountryCode(event.target.value)}
                className="border-r border-[#D8E2DA] bg-[#F8FBF8] px-3 text-sm font-semibold text-[#346739] outline-none"
              >
                <option>+234</option>
                <option>+233</option>
                <option>+44</option>
                <option>+1</option>
              </select>
              <span className="flex items-center pl-4">
                <FieldIcon type="phone" />
              </span>
              <span className="sr-only">Phone number</span>
              <input
                required
                type="tel"
                placeholder="Phone number"
                autoComplete="tel-national"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-[#293A2D] outline-none placeholder:text-[#819085]"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                type="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              <InputField
                type="password"
                placeholder="Confirm password"
                autoComplete="new-password"
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 py-1 text-xs leading-5 text-[#657568]">
              <input
                required
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-[#346739]"
              />
              <span>
                I agree to Headpan&apos;s{" "}
                <a href="#" className="font-semibold text-[#346739] underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-[#346739] underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#346739] py-3.5 text-sm font-bold text-white transition hover:bg-[#294F2E]"
            >
              Create account
            </button>
          </form>
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#E0E8E1]" />
            <span className="text-xs text-[#879289]">Or continue with</span>
            <span className="h-px flex-1 bg-[#E0E8E1]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-[#D8E2DA] px-4 py-3 text-sm font-semibold text-[#293A2D] transition hover:bg-[#F7FAF7]"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-[#D8E2DA] px-4 py-3 text-sm font-semibold text-[#293A2D] transition hover:bg-[#F7FAF7]"
            >
              <FacebookIcon />
              Facebook
            </button>
          </div>
          <p className="mt-7 text-center text-sm text-[#718075]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-[#346739] hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
