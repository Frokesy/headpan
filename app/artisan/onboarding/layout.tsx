import type { ReactNode } from "react";
import OnboardingSteps from "../../components/onboarding/OnboardingSteps";
import OnboardingTopNav from "../../components/onboarding/OnboardingTopNav";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white">
    <OnboardingTopNav />
    <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
      <OnboardingSteps />
      <main className="min-h-[calc(100vh-76px)] min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</main>
    </div>
  </div>;
}
