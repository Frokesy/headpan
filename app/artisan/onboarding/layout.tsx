import type { ReactNode } from "react";
import OnboardingSteps from "../../components/onboarding/OnboardingSteps";
import OnboardingTopNav from "../../components/onboarding/OnboardingTopNav";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return <div className="h-screen overflow-hidden bg-white">
    <OnboardingTopNav />
    <div className="mx-auto flex h-[calc(100vh-76px)] max-w-[1600px] flex-col overflow-hidden lg:flex-row">
      <OnboardingSteps />
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</main>
    </div>
  </div>;
}
