"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, Hamburger, Logo } from "../icons";

const TopNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 64rem)");
    const collapseMobileNav = (event: MediaQueryListEvent) => {
      if (event.matches) setIsNavOpen(false);
    };

    desktopBreakpoint.addEventListener("change", collapseMobileNav);
    return () =>
      desktopBreakpoint.removeEventListener("change", collapseMobileNav);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between lg:py-6 py-3 bg-[#ffffff] lg:px-20 px-4">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          className="block lg:hidden"
          aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="top-navigation"
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((isOpen) => !isOpen)}
        >
          <Hamburger />
        </button>
        <div className=""><Logo /></div>
      </div>
      <div
        id="top-navigation"
        className={`order-3 grid w-full transition-[grid-template-rows,opacity] duration-300 ease-out lg:order-none lg:flex lg:w-auto lg:items-center lg:opacity-100 ${
          isNavOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden lg:overflow-visible">
          <div className="flex flex-col space-y-4 pt-4 lg:flex-row lg:items-center lg:space-x-10 lg:space-y-0 lg:pt-0">
            <Link href="/artisans" className="flex items-center space-x-3">
              <p className="text-[#2B392D] text-[15px]">Find Artisans</p>
              <ArrowDown />
            </Link>
            <div className="flex items-center space-x-3">
              <p className="text-[#2B392D] text-[15px]">Categories</p>
              <ArrowDown />
            </div>
            <p className="text-[#2B392D] text-[15px]">How it works</p>
            <p className="text-[#2B392D] text-[15px]">About Us</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <p className="text-[#2B392D] lg:text-[15px] text-[13px] font-semibold">Sign in</p>
        <button className="bg-[#346739] lg:text-[15px] text-[13px] text-[#ffffff] py-2 px-6 rounded-lg font-semibold">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default TopNav;
