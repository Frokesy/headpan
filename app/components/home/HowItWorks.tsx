import React from "react";
import {
  AvatarIcon,
  CalendarIcon,
  CircledCheck,
  Dashes,
  SearchIcon,
} from "../icons";

const HowItWorks = () => {
  return (
    <div className="my-[15vh]">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2 className="lg:text-[36px] text-[20px] font-semibold text-[#346739]">
          How It Works
        </h2>
        <p className="text-center lg:text-[20px] text-[14px] lg:w-[50%] w-[70%] font-semibold">
          Getting the right artisan has never been easier. Follow these simple
          steps and get the job done
        </p>
      </div>

      <div className="mt-10 flex lg:flex-row flex-col justify-between items-center w-[90%] mx-auto">
        <div className="flex flex-col space-y-10 items-center text-center">
          <div className="bg-[#ffffff] lg:flex hidden items-center justify-center shadow-lg w-[80px] h-[80px] rounded-full">
            <SearchIcon width={38} height={38} />
          </div>
          <div className="bg-[#ffffff] lg:hidden flex items-center justify-center shadow-lg w-[50px] h-[50px] rounded-full">
            <SearchIcon width={24} height={24} />
          </div>
          <div className="flex flex-col space-y-3">
            <h2 className="text-[20px] font-semibold">Find a Service</h2>
            <p className="text-[18px] text-[#4F6552]">
              Browse nearby artisans or search for the service you need.
            </p>
          </div>
        </div>
        <div className="lg:block hidden">
          <Dashes />
        </div>
        <div className="rotate-90 block lg:hidden my-6">
          <Dashes />
        </div>
        <div className="flex flex-col space-y-10 items-center text-center">
          <div className="bg-[#ffffff] text-[#346739] lg:flex hidden items-center justify-center shadow-lg w-[80px] h-[80px] rounded-full">
            <AvatarIcon />
          </div>
          <div className="bg-[#ffffff] text-[#346739] lg:hidden flex items-center justify-center shadow-lg w-[50px] h-[50px] rounded-full">
            <AvatarIcon width={24} height={24} />
          </div>
          <div className="flex flex-col space-y-3">
            <h2 className="text-[20px] font-semibold">Choose an Artisan</h2>
            <p className="text-[18px] text-[#4F6552]">
              Explore artisan profiles and choose the right professional for
              your project.
            </p>
          </div>
        </div>
        <div className="rotate-180 lg:block hidden">
          <Dashes />
        </div>
        <div className="rotate-270 block lg:hidden my-6">
          <Dashes />
        </div>
        <div className="flex flex-col space-y-10 items-center text-center">
          <div className="bg-[#ffffff] lg:flex hidden items-center justify-center shadow-lg w-[80px] h-[80px] rounded-full">
            <CalendarIcon />
          </div>
          <div className="bg-[#ffffff] lg:hidden flex items-center justify-center shadow-lg w-[50px] h-[50px] rounded-full">
            <CalendarIcon width={24} height={24} />
          </div>
          <div className="flex flex-col space-y-3">
            <h2 className="text-[20px] font-semibold">Connect & Schedule</h2>
            <p className="text-[18px] text-[#4F6552]">
              Message the artisan, discuss your project and agree on a
              convenient delivery time.
            </p>
          </div>
        </div>
        <div className="lg:block hidden">
          <Dashes />
        </div>
        <div className="rotate-90 block lg:hidden my-6">
          <Dashes />
        </div>
        <div className="flex flex-col space-y-10 items-center text-center">
          <div className="bg-[#ffffff] lg:flex hidden items-center justify-center shadow-lg w-[80px] h-[80px] rounded-full">
            <CircledCheck />
          </div>
          <div className="bg-[#ffffff] lg:hidden flex items-center justify-center shadow-lg w-[50px] h-[50px] rounded-full">
            <CircledCheck width={24} height={24} />
          </div>
          <div className="flex flex-col space-y-3">
            <h2 className="text-[20px] font-semibold">Get it Done</h2>
            <p className="text-[18px] text-[#4F6552]">
              The artisan completes the job and delivers professionally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
