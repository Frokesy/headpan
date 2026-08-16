"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef } from "react";
import { FacebookIcon, GoogleIcon } from "../icons";
import PasswordField from "./PasswordField";

type Props = { open: boolean; onClose: () => void; onCreateAccount: () => void };

function InputIcon() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

export default function LoginModal({ open, onClose, onCreateAccount }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeModal = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closeModal(); };
    document.addEventListener("keydown", keyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", keyDown); };
  }, [open, closeModal]);

  if (!open) return null;

  return <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#132216]/65 p-3 backdrop-blur-sm sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative my-auto grid max-h-[94vh] w-full max-w-[1040px] overflow-y-auto rounded-[28px] bg-white shadow-2xl md:grid-cols-[38%_62%]">
      <button ref={closeRef} type="button" onClick={closeModal} aria-label="Close login modal" className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#346739] shadow-md transition hover:rotate-90">×</button>
      <section className="relative hidden min-h-[650px] flex-col overflow-hidden bg-[#346739] px-9 pb-0 pt-10 text-white lg:flex"><div className="relative z-10"><h2 id={titleId} className="max-w-[300px] text-[32px] font-bold leading-tight text-white">Welcome back</h2><p className="mt-4 max-w-[315px] text-sm leading-6 text-[#E1F2E3]">Continue connecting with clients and growing your business.</p></div><div className="relative mx-auto mt-auto h-[330px] w-full max-w-[330px]"><Image src="/auth/login-img.png" alt="Artisan returning to Headpan" width={352} height={377} className="absolute inset-x-0 bottom-0 z-10 mx-auto h-full w-auto object-contain" /><div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t from-[#346739] to-transparent" /></div></section>
      <section className="flex min-h-[560px] items-center px-6 py-12 sm:px-10 md:min-h-[650px] md:px-14"><div className="mx-auto w-full max-w-[500px]"><div className="mb-9 text-center"><h3 className="text-2xl font-bold text-[#293A2D]">Sign in</h3><p className="mt-2 text-lg text-[#718075]">Welcome back to Headpan</p></div><form onSubmit={(event) => event.preventDefault()} className="space-y-4">
        <label className="flex items-center gap-3 rounded-xl border border-[#D8E2DA] px-4 text-[#718075] transition focus-within:border-[#346739] focus-within:ring-2 focus-within:ring-[#346739]/10"><InputIcon /><span className="sr-only">Email address</span><input required type="email" placeholder="Email address" autoComplete="email" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-[#293A2D] outline-none placeholder:text-[#819085]" /></label>
        <PasswordField autoComplete="current-password" />
        <div className="flex items-center justify-between gap-4 text-xs"><label className="flex cursor-pointer items-center gap-2 text-[#657568]"><input type="checkbox" className="h-4 w-4 accent-[#346739]" />Remember me</label><a href="/forgot-password" className="font-semibold text-[#346739] hover:underline">Forgot password?</a></div><button type="submit" className="w-full rounded-xl bg-[#346739] py-3.5 text-sm font-bold text-white transition hover:bg-[#294F2E]">Sign in</button>
      </form><div className="my-5 flex items-center gap-3"><span className="h-px flex-1 bg-[#E0E8E1]" /><span className="text-xs text-[#879289]">Or continue with</span><span className="h-px flex-1 bg-[#E0E8E1]" /></div><div className="grid gap-3 sm:grid-cols-2"><button type="button" className="flex items-center justify-center gap-3 rounded-xl border border-[#D8E2DA] px-4 py-3 text-sm font-semibold text-[#293A2D] transition hover:bg-[#F7FAF7]"><GoogleIcon />Google</button><button type="button" className="flex items-center justify-center gap-3 rounded-xl border border-[#D8E2DA] px-4 py-3 text-sm font-semibold text-[#293A2D] transition hover:bg-[#F7FAF7]"><FacebookIcon />Facebook</button></div><p className="mt-7 text-center text-sm text-[#718075]">Don&apos;t have an account? <button type="button" onClick={onCreateAccount} className="font-bold text-[#346739] hover:underline">Create account</button></p></div></section>
    </div>
  </div>;
}
