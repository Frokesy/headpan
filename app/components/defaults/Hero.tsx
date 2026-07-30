import React from "react";
import {
  LocationIcon,
  ArrowDown,
  SearchIcon,
  RightArrow,
  CustomersIcon,
  VerifyIcon,
  ServiceIcon,
  StarIcon,
} from "../icons";

const Hero = () => {
  const stats = [
    {
      id: 1,
      icon: <CustomersIcon />,
      text: "Happy Customers",
      metric: "400+",
    },
    {
      id: 2,
      icon: <VerifyIcon />,
      text: "Verify Artisans",
      metric: "200+",
    },
    {
      id: 3,
      icon: <ServiceIcon />,
      text: "Service Categories",
      metric: "50+",
    },
    {
      id: 4,
      icon: <StarIcon />,
      text: "Average Rating",
      metric: "4.9/5",
    },
  ];

  return (
    <section className="relative flex min-h-screen lg:items-center lg:justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero_vid.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col w-[90%] mx-auto text-white pt-24 lg:pt-0">
        <div className="flex">
          <div className="bg-[#346739] text-white text-[10px] lg:text-[12px] px-3 py-2 rounded-full">
            <span>#1 Trusted African Marketplace</span>
          </div>
        </div>

        <h2 className="lg:text-[64px] text-[42px] leading-tight font-semibold text-white mt-4">
          Hire Trusted <br />
          <span className="text-[#346739]">Artisans</span> Near You
        </h2>

        <p className="lg:text-[22px] text-[16px] text-white max-w-full lg:max-w-[50%] mt-6 leading-relaxed">
          Connect with verified and skilled artisans for every job you need.
          Quality work, safety and reliability guaranteed.
        </p>

        <div className="bg-white text-[#333333] mt-10 p-4 lg:p-6 rounded-2xl flex lg:flex-row flex-col gap-4 items-center justify-between">
          <div className="flex items-center space-x-3 w-full lg:w-[25%]">
            <div className="bg-[#BDD7B699] min-w-[40px] w-[40px] h-[40px] flex items-center justify-center rounded-full">
              <LocationIcon />
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <h2 className="font-semibold text-[16px] lg:text-[18px]">
                  Your Location
                </h2>
                <p className="font-semibold text-sm lg:text-base">
                  Ibadan, Nigeria
                </p>
              </div>

              <ArrowDown />
            </div>
          </div>

          <div className="bg-white w-full lg:w-[60%] flex items-center space-x-3 rounded-full p-4 lg:p-6 shadow-md">
            <div className="bg-[#BDD7B699] min-w-[40px] w-[40px] h-[40px] flex items-center justify-center rounded-full">
              <SearchIcon />
            </div>

            <input
              className="bg-transparent border-none focus:outline-none w-full text-sm lg:text-base"
              placeholder="What service do you need?"
            />
          </div>

          <button className="bg-[#346739] text-[14px] lg:text-[15px] w-full lg:w-[15%] text-white p-4 lg:p-6 text-center rounded-full font-semibold">
            Search Artisans
          </button>
        </div>

        <div className="mt-10 flex lg:flex-row flex-col gap-4 lg:gap-10">
          <button className="bg-[#346739] lg:text-[15px] text-[14px] text-white py-4 px-10 rounded-xl font-semibold flex items-center justify-center space-x-3 w-full lg:w-fit">
            <span>Find Artisans</span>
            <RightArrow />
          </button>

          <button className="bg-white lg:text-[15px] text-[14px] text-[#333333] py-4 px-10 rounded-xl font-semibold flex items-center justify-center space-x-3 w-full lg:w-fit">
            <span>Become an Artisan</span>
            <RightArrow />
          </button>
        </div>

          <div className="absolute shadow-md -bottom-46 w-full bg-white p-5 lg:p-6 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {stats.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="bg-[#BDD7B699] min-w-[40px] w-[40px] h-[40px] text-[#346739] flex items-center justify-center rounded-full">
                  {item.icon}
                </div>

                <div className="flex flex-col">
                  <h2 className="text-[18px] lg:text-[22px] text-black font-semibold">
                    {item.metric}
                  </h2>

                  <p className="text-[#346739] text-[13px] lg:text-[16px] leading-tight">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Hero;
