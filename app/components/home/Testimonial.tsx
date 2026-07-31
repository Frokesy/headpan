import React from "react";
import { DoubleQuotes } from "../icons";

const Testimonial = () => {
  return (
    <div className="mt-10 lg:py-20 py-10 bg-[#F0FFF6]">
      <div className="text-center flex flex-col items-center justify-center">
        <h2 className="lg:text-[36px] text-[20px] font-semibold text-[#346739]">
          What Our User Say
        </h2>
        <p className="text-center lg:text-[20px] text-[14px] lg:w-[50%] w-[70%] font-semibold">
          Thousands of clients and artisans trust Headpan.ng to make work
          easier, faster and more reliable.
        </p>
      </div>

      <div className="flex justify-between overflow-x-auto space-x-4 w-[90%] mx-auto mt-10">
        <div className="bg-[#ffffff] p-10 rounded-2xl w-[30%] text-center min-w-[300px] shadow-lg flex flex-col items-center space-y-6">
          <div className="text-[#4F655266]">
            <DoubleQuotes />
          </div>
          <p className="text-[18px] text-[#4F6552]">
            The tailor I hired did an amazing job on my outfit. The
            communication was smooth, the delivery was on time and the quality
            exceed by expectations
          </p>
          <div className="flex flex-col items-center justify-center">
            <img src="/artisans/avatars/barber-segun.png" alt="avatar" />
            <h2 className="text-[14px] font-semibold">Sandra John</h2>
            <p className="text-[14px] text-[#4F6552]">Client</p>
          </div>
        </div>

        <div className="bg-[#ffffff] p-10 rounded-2xl text-center w-[40%] min-w-[400px] items-center shadow-lg border-4 border-[#CDFFE0] flex flex-col space-y-6">
          <div className="text-[#67CD71]">
            <DoubleQuotes />
          </div>
          <p className="text-[18px] text-[#4F6552]">
            The tailor I hired did an amazing job on my outfit. The
            communication was smooth, the delivery was on time and the quality
            exceed by expectations
          </p>
          <div className="flex flex-col items-center justify-center">
            <img src="/artisans/avatars/barber-segun.png" alt="avatar" />
            <h2 className="text-[14px] font-semibold">Sandra John</h2>
            <p className="text-[14px] text-[#4F6552]">Client</p>
          </div>
        </div>

        <div className="bg-[#ffffff] p-10 rounded-2xl w-[30%] min-w-[300px] shadow-lg flex flex-col items-center space-y-6">
          <div className="text-[#4F655266]">
            <DoubleQuotes />
          </div>
          <p className="text-[18px] text-[#4F6552]">
            The tailor I hired did an amazing job on my outfit. The
            communication was smooth, the delivery was on time and the quality
            exceed by expectations
          </p>
          <div className="flex flex-col items-center justify-center">
            <img src="/artisans/avatars/barber-segun.png" alt="avatar" />
            <h2 className="text-[14px] font-semibold">Sandra John</h2>
            <p className="text-[14px] text-[#4F6552]">Client</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
