import Link from "next/link";
import { ArrowDown, DummyAvatar, Logo, NotificationIcon } from "../icons";

function HelpIcon() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.3 2.3 0 1 1 3.3 2.1c-.7.4-1.1.9-1.1 1.9" /><path d="M12 17h.01" /></svg>;
}

function ChatBubbleIcon() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.2V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v8Z" /><path d="M8 9h8M8 13h5" /></svg>;
}

export default function OnboardingTopNav() {
  return <header className="sticky top-0 z-40 border-b border-[#E7ECE8] bg-white">
    <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
      <Link href="/" aria-label="Headpan home"><Logo /></Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <button type="button" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#445247] transition hover:bg-[#F6F6F6] sm:flex"><HelpIcon /><span>Need help?</span></button>
        <button type="button" aria-label="Open messages" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F3F2] transition hover:bg-[#E8ECE9]"><ChatBubbleIcon /></button>
        <button type="button" aria-label="Open notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F3F2] transition hover:bg-[#E8ECE9]"><NotificationIcon /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-white bg-[#E35D4F]" /></button>
        <button type="button" className="ml-1 flex items-center gap-2 sm:ml-2 sm:gap-3"><span className="hidden text-sm font-semibold text-[#293A2D] md:inline">Segun Adewale</span><span className="[&>svg]:h-10 [&>svg]:w-10"><DummyAvatar /></span><ArrowDown /></button>
      </div>
    </div>
  </header>;
}
