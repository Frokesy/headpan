"use client";

import React, { useState } from "react";
import {
  ArrowDown,
  AvatarIcon,
  ChatIcon,
  CustomerSupportIcon,
  FAQIcon,
  JobsIcon,
} from "../icons";

const FAQs = () => {
  const [activeTab, setActiveTab] = useState<string>("clients");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I hire an artisan?",
      answer:
        "Browse services, choose an artisan, send a message, discuss your project and agree on convenient deliverable time.",
    },
    {
      id: 2,
      question: "How can I choose the right artisan?",
      answer:
        "Check their ratings, reviews, portfolio, and verified status to ensure you pick the best fit for your project.",
    },
    {
      id: 3,
      question: "Are artisans here verified?",
      answer:
        "Yes, all artisans go through a thorough verification process including identity and skill validation.",
    },
    {
      id: 4,
      question: "Can I trust the artisans listed?",
      answer:
        "Absolutely. We verify all artisans and provide secure payment protection for your peace of mind.",
    },
    {
      id: 5,
      question: "Can I hire artisans near me?",
      answer:
        "Yes, you can filter artisans by location to find professionals near you for faster service.",
    },
    {
      id: 6,
      question: "Is messaging with artisans free?",
      answer:
        "Yes, messaging with artisans on our platform is completely free. You only pay for the service.",
    },
    {
      id: 7,
      question: "How do I contact an artisan?",
      answer:
        "You can contact an artisan directly through our in-app messaging system or by calling them.",
    },
  ];

  return (
    <div className="my-[15vh]">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2 className="lg:text-[36px] text-[20px] font-semibold text-[#346739]">
          Frequently Asked Questions
        </h2>
        <p className="text-center lg:text-[20px] text-[14px] lg:w-[50%] w-[70%] font-semibold">
          Find quick answers to common question from our clients and artisans.
        </p>
        <div className="lg:w-[35%] w-[80%] bg-[#ffffff] rounded-full p-2 shadow-lg flex mt-6">
          <button
            onClick={() => setActiveTab("clients")}
            className={`lg:py-2 py-1 w-[50%] rounded-full justify-center flex items-center space-x-3 transition-all duration-300 ${
              activeTab === "clients"
                ? "bg-[#346739] text-[#ffffff]"
                : "text-[#346739] bg-[#ffffff] hover:bg-[#F0FFF6]"
            }`}
          >
            <div className="flex lg:hidden">
              <AvatarIcon width={16} height={16} />
            </div>
            <div className="lg:flex hidden">
              <AvatarIcon />
            </div>
            <p className="lg:text-[18px] font-semibold">For Clients</p>
          </button>
          <button
            onClick={() => setActiveTab("artisans")}
            className={`lg:py-2 py-1 w-[50%] rounded-full flex justify-center items-center space-x-3 transition-all duration-300 ${
              activeTab === "artisans"
                ? "bg-[#346739] text-[#ffffff]"
                : "text-[#346739] bg-[#ffffff] hover:bg-[#F0FFF6]"
            }`}
          >
            <div className="flex lg:hidden">
              <JobsIcon width={16} height={16} />
            </div>
            <div className="lg:flex hidden">
              <JobsIcon />
            </div>
            <p className="lg:text-[18px] font-semibold">For Artisans</p>
          </button>
        </div>
      </div>

      <div className="w-[90%] mx-auto mt-10 flex lg:flex-row flex-col lg:space-x-10">
        <div className="bg-[#ffffff] shadow-md p-4 rounded-2xl flex flex-col space-y-4 lg:w-[65%]">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <div
                className="flex justify-between border-b-2 border-[#0000001A] pb-4 items-center cursor-pointer"
                onClick={() =>
                  setOpenQuestion(openQuestion === faq.id ? null : faq.id)
                }
              >
                <div className="flex items-center space-x-3">
                  <FAQIcon />
                  <div className="">
                    <h2 className="font-semibold text-[16px]">
                      {faq.question}
                    </h2>

                    {openQuestion === faq.id && (
                      <p className="text-[14px] text-[#4F6552] mt-2 transition-all duration-300">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`transition-transform duration-300 ${
                    openQuestion === faq.id ? "rotate-180" : ""
                  }`}
                >
                  <ArrowDown />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#F0FFF6] lg:w-[35%] space-y-4 p-4 rounded-2xl shadow-md lg:flex flex-col hidden">
          <div className="w-[80px] h-[80px] bg-[#346739] hidden lg:flex items-center justify-center rounded-full flex flex-col">
            <CustomerSupportIcon />
          </div>
          <h2 className="text-[30px] font-semibold">
            Still Have <br /> <span className="text-[#346739]">Questions?</span>
          </h2>
          <p className="text-[#4F6552] lg:text-[16px]">
            Our support team is always ready to help you any step on the way.
          </p>
          <button className="flex items-center bg-[#346739] space-x-3 py-2 px-6 rounded-xl">
            <ChatIcon />
            <p className="font-semibold text-[#ffffff]">Contact Support</p>
          </button>
          <div className="flex items-end justify-end">
            <img src="/faq-image.png" alt="img" />
          </div>
        </div>

        <div className="bg-[#F0FFF6] mt-10 space-x-4 p-2 rounded-2xl shadow-md flex justify-between space-x-3 lg:hidden">
          <div className="w-[60px] h-[40px] bg-[#346739] flex items-center justify-center rounded-full flex">
            <CustomerSupportIcon width={15} height={15} />
          </div>
          <div className="flex space-x-3">
            <div className="">
              <h2 className="lg:text-[30px] text-[14px] font-semibold">
                Still Have <br />{" "}
                <span className="text-[#346739]">Questions?</span>
              </h2>
              <p className="text-[#4F6552] lg:text-[16px] text-[10px]">
                Our support team is always ready to help you any step on the
                way.
              </p>
              <button className="flex items-center bg-[#346739] space-x-3 py-2 px-3 mt-6 rounded-xl">
                <ChatIcon />
                <p className="font-semibold text-[#ffffff] lg:text-[16px] text-[10px]">Contact Support</p>
              </button>
            </div>
            <div className="flex items-end justify-end">
              <img src="/faq-image.png" alt="img" className="w-[150px] h-[140px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
