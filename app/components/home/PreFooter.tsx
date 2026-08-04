import React from "react";
import { GreenCheck, HeadpanGlobe, HeadpanGlobeMobile, RightArrow } from "../icons";

const PreFooter = () => {
  return (
    <div className="mt-10 lg:py-20 py-10 bg-[#F0FFF6]">
      <div className="w-[90%] mx-auto flex lg:flex-row flex-col justify-between lg:space-x-10 items-center">
        <div className="lg:w-[50%] lg:text-start text-center">
          <h2 className="lg:text-[42px] text-[22px] font-semibold text-[#346739]">
            Be One of Our Artisans
          </h2>
          <p className="lg:text-[26px] font-semibold text-[18px]">
            Create your profile, showcase your skill, connect with clients, and
            grow your business with Headpan.ng.
          </p>
          <div className="my-10 lg:flex hidden gap-10">
            <button className="bg-[#346739] lg:text-[15px] text-[14px] text-white w-[45%] py-2 px-10 rounded-xl font-semibold flex items-center justify-center space-x-3 w-full lg:w-fit">
              <span>Join as an Artisan</span>
              <RightArrow />
            </button>

            <button className="bg-white lg:text-[15px] text-[14px] text-[#333333] w-[45%] py-2 px-10 rounded-xl font-semibold flex items-center justify-center space-x-3 w-full lg:w-fit">
              <span>I&apos;m looking to hire</span>
              <RightArrow />
            </button>
          </div>
          <div className="lg:flex hidden flex-shrink items-center space-x-3 mt-20">
            <div className="flex items-center space-x-3">
              <GreenCheck />
              <p className="text-[16px] text-[#4F6552]">100% free to join</p>
            </div>
            <div className="flex items-center space-x-3">
              <GreenCheck />
              <p className="text-[16px] text-[#4F6552]">Grow your business</p>
            </div>
            <div className="flex items-center space-x-3">
              <GreenCheck />
              <p className="text-[16px] text-[#4F6552]">Connect with clients</p>
            </div>
          </div>
        </div>

        <div className="lg:w-[45%] lg:block hidden">
          <HeadpanGlobe />
        </div>
        <div className="block lg:hidden mt-10">
          <HeadpanGlobeMobile />
        </div>
        <div className="my-10 flex lg:hidden flex-col w-full gap-4 text-center">
          <button className="bg-[#346739] lg:text-[15px] text-[14px] text-white w-[45%] py-2 px-10 rounded-xl font-semibold flex items-center justify-center space-x-3 w-full lg:w-fit">
            <span>Join as an Artisan</span>
            <RightArrow />
          </button>

          <button className="bg-white lg:text-[15px] text-[14px] text-[#333333] w-[45%] py-2 px-10 rounded-xl font-semibold flex items-center justify-center space-x-3 w-full lg:w-fit">
            <span>I&apos;m looking to hire</span>
            <RightArrow />
          </button>
        </div>

        <div className="flex lg:hidden flex-shrink items-center space-x-3 mt-10">
          <div className="flex items-center space-x-3">
            <GreenCheck width={11} height={11} />
            <p className="text-[10px] text-[#4F6552]">100% free to join</p>
          </div>
          <div className="flex items-center space-x-3">
            <GreenCheck width={11} height={11} />
            <p className="text-[10px] text-[#4F6552]">Grow your business</p>
          </div>
          <div className="flex items-center space-x-3">
            <GreenCheck width={11} height={11} />
            <p className="text-[10px] text-[#4F6552]">Connect with clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
