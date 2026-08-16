"use client";

import Link from "next/link";
import { AccountVerifiedCard, Confetti, GreenCheck, WelcomeTag } from "../icons";

type Props = { titleId: string; onContinue: () => void };

export default function VerificationSuccessStep({
  titleId,
  onContinue,
}: Props) {
  return (
    <>
      <section className="hidden min-h-[680px] bg-[#F0FFF6] px-8 py-10 md:flex">
        <div className="flex w-full flex-col items-center justify-center text-center">
          <div className="flex h-28 w-28 items-center justify-center [&>svg]:h-28 [&>svg]:w-28">
            <GreenCheck />
          </div>
          <h2
            id={titleId}
            className="mt-10 max-w-[280px] text-3xl font-bold leading-tight text-[#294F2E]"
          >
            Verification successful!
          </h2>
          <div className="relative flex h-[250px] w-full max-w-[330px] flex-col mt-10 space-y-4">
            <div className="relative z-10 self-start">
              <AccountVerifiedCard />
            </div>
            <div className="relative z-10 self-end">
              <WelcomeTag />
            </div>
          </div>
        </div>
      </section>
      <section className="flex min-h-[520px] items-center px-6 py-14 sm:px-10 md:min-h-[680px] md:px-14">
        <div className="mx-auto flex w-full max-w-[500px] flex-col items-center text-center">
          <div className="flex h-28 w-28 items-center justify-center [&>svg]:h-28 [&>svg]:w-28">
            <Confetti />
          </div>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-[#346739]">
            Welcome to Headpan.ng
          </p>
          <h3 className="mt-3 text-3xl font-bold text-[#293A2D]">
            You are all set!
          </h3>
          <p className="mt-4 max-w-[450px] text-sm leading-7 text-[#718075]">
            Your account has been successfully created and verified.
            <br />
            Complete your profile to start showcasing your skills, attract
            clients, and grow your business.
          </p>
          <div className="mt-10 w-full text-left">
            <div className="flex items-center justify-between text-sm font-semibold text-[#293A2D]">
              <span>Profile completion</span>
              <span className="text-[#346739]">0%</span>
            </div>
          </div>
          <Link
            href="/artisan/onboarding"
            onClick={onContinue}
            className="mt-7 block w-full rounded-xl bg-[#346739] py-3.5 text-sm font-bold text-white transition hover:bg-[#294F2E]"
          >
            Complete your profile
          </Link>
        </div>
      </section>
    </>
  );
}
