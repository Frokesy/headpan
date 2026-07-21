import React from "react";
import { ArrowDown, Hamburger, Logo } from "../icons";

const TopNav = () => {
  return (
    <div className="flex items-center justify-between py-6 bg-[#ffffff] lg:px-20 px-4">
      <div className="flex items-center space-x-3">
        <div className="block lg:hidden"><Hamburger /></div>
        <div className=""><Logo /></div>
      </div>
      <div className="lg:flex hidden items-center space-x-10">
        <div className="flex items-center space-x-3">
          <p className="text-[#2B392D] text-[15px]">Find Artisans</p>
          <ArrowDown />
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-[#2B392D] text-[15px]">Categories</p>
          <ArrowDown />
        </div>
        <p className="text-[#2B392D] text-[15px]">How it works</p>
        <p className="text-[#2B392D] text-[15px]">About Us</p>
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
