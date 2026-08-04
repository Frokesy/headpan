"use client";

import React, { useState } from "react";
import {
  AppleIcon,
  EmailIcon,
  EnvelopeIcon,
  FacebookIcon,
  GooglePlayIcon,
  InstagramIcon,
  LinkedInIcon,
  LocationIcon,
  PhoneIcon,
  WhiteLogo,
} from "../footerIcons";

const footerSections = [
  {
    title: "Categories",
    items: [
      "Fashion & Tailoring",
      "Barbing",
      "Hair Styling",
      "Painting",
      "Carpentry",
      "Electrical Services",
      "POP Installation",
      "Car Repairs",
    ],
  },
  {
    title: "For Clients",
    items: [
      "Find Artisans",
      "Browse Services",
      "How it works",
      "Help Center",
    ],
  },
  {
    title: "For Artisans",
    items: [
      "Join as an Artisan",
      "How it works",
      "Community Hub",
      "Help Center",
    ],
  },
  {
    title: "Company",
    items: ["About Us", "Our Mission", "Contact Us", "Help Center"],
  },
];

const Footer = () => {
  const [openSection, setOpenSection] = useState<string>("Categories");

  const toggleSection = (section: string) => {
    setOpenSection((current) => (current === section ? "" : section));
  };

  return (
    <div className="text-white bg-[#346739] overflow-hidden lg:py-20 py-10">
      <div className="hidden md:grid md:grid-cols-7 gap-10 w-[90%] mx-auto">
        <div className="">
          <WhiteLogo />
          <p className="text-[12px] my-10">
            Connecting skilled artisans with clients who valued quality work.
            Building trust. Growing together.
          </p>
          <div className="space-y-3 my-10">
            <div className="flex items-center space-x-3">
              <LocationIcon />
              <p className="text-[10px]">Ibadan, Nigeria</p>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon />
              <p className="text-[10px]">+234 801 234 5678</p>
            </div>
            <div className="flex items-center space-x-3">
              <EmailIcon />
              <p className="text-[10px]">headpan.ng@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <InstagramIcon />
            <LinkedInIcon />
            <FacebookIcon />
          </div>
        </div>

        {footerSections.map((section) => (
          <div key={section.title} className="space-y-10">
            <h2 className="text-[14px] text-[#CDFFE0]">{section.title}</h2>
            <ul className="space-y-3 text-[10px]">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2 space-y-10">
          <h2 className="text-[14px] text-[#CDFFE0] mb-10">Stay Updated</h2>
          <p className="text-[10px] my-3">
            Subscribe to our newsletter for tips, updates and new features.
          </p>

          <div className="border border-white w-full rounded-2xl flex items-center justify-between mt-10">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-transparent w-full px-5 py-3 text-[10px] focus:outline-none"
            />
            <button className="bg-white text-[#346739] px-5 py-3 rounded-r-2xl text-[10px]">
              <EnvelopeIcon />
            </button>
          </div>

          <h2 className="text-[14px] text-[#CDFFE0] mt-6 mb-6">
            Download the App
          </h2>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-3 w-[50%] border border-white p-2 rounded-lg">
              <GooglePlayIcon />
              <p className="text-[10px]">Google Play</p>
            </button>
            <button className="flex items-center space-x-3 w-[50%] border border-white p-2 rounded-lg">
              <AppleIcon />
              <p className="text-[10px]">App Store</p>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden w-[90%] mx-auto space-y-3">
        <div className="mb-4">
          <WhiteLogo />
          <p className="text-[12px] my-5">
            Connecting skilled artisans with clients who valued quality work.
            Building trust. Growing together.
          </p>

          <div className="space-y-2 my-5">
            <div className="flex items-center space-x-3">
              <LocationIcon />
              <p className="text-[10px]">Ibadan, Nigeria</p>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon />
              <p className="text-[10px]">+234 801 234 5678</p>
            </div>
            <div className="flex items-center space-x-3">
              <EmailIcon />
              <p className="text-[10px]">headpan.ng@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <InstagramIcon />
            <LinkedInIcon />
            <FacebookIcon />
          </div>
        </div>

        {footerSections.map((section) => {
          const isOpen = openSection === section.title;

          return (
            <div
              key={section.title}
              className="border-b border-white/20 pb-2 last:border-none"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between text-left py-1"
              >
                <h2 className="text-[14px] text-[#CDFFE0]">{section.title}</h2>
                <span
                  className={`text-lg leading-none transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 mt-3"
                    : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-2 text-[10px]">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pt-2">
          <h2 className="text-[14px] text-[#CDFFE0] mb-3">Stay Updated</h2>
          <p className="text-[10px] mb-3">
            Subscribe to our newsletter for tips, updates and new features.
          </p>

          <div className="border border-white rounded-2xl flex items-center justify-between">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-transparent w-full px-5 py-3 text-[10px] focus:outline-none"
            />
            <button className="bg-white text-[#346739] px-5 py-3 rounded-r-2xl text-[10px]">
              <EnvelopeIcon />
            </button>
          </div>

          <h2 className="text-[14px] text-[#CDFFE0] mt-5 mb-3">
            Download the App
          </h2>
          <div className="space-y-2">
            <button className="flex items-center space-x-3 w-full border border-white p-2 rounded-lg">
              <GooglePlayIcon />
              <p className="text-[10px]">Google Play</p>
            </button>
            <button className="flex items-center space-x-3 w-full border border-white p-2 rounded-lg">
              <AppleIcon />
              <p className="text-[10px]">App Store</p>
            </button>
          </div>
        </div>
      </div>

      <div className="w-[90%] mt-10 mx-auto border-t border-[#CDFFE0] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] text-white py-10">
        <p>© 2024 Headpan. All rights reserved.</p>
        <div className="flex flex-col md:flex-row gap-2 md:space-x-3">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
        <p>Secure.Trusted.Verified</p>
      </div>
    </div>
  );
};

export default Footer;
