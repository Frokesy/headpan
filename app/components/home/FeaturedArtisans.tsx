"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  BarbingIcon,
  CarpentryIcon,
  ElectricalServicesIcon,
  HairStylingIcon,
  HeartIcon,
  PaintingIcon,
  ServiceIcon,
  StarIcon,
  TailoringIcon,
  RightArrow,
} from "../icons";
import { VerifiedTag } from "../tags";
import { LocationIcon } from "../icons";

const FeaturedArtisans = () => {
  const [active, setActive] = useState<string>("All Services");
  const [moreOpen, setMoreOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = useMemo(
    () => [
      {
        id: 1,
        icon: <ServiceIcon width={14} height={14} />,
        name: "All Services",
      },
      {
        id: 2,
        icon: <TailoringIcon />,
        name: "Fashion & Tailoring",
      },
      {
        id: 3,
        icon: <BarbingIcon />,
        name: "Barbing",
      },
      {
        id: 4,
        icon: <HairStylingIcon />,
        name: "Hair Styling",
      },
      {
        id: 5,
        icon: <CarpentryIcon />,
        name: "Carpentry",
      },
      {
        id: 6,
        icon: <PaintingIcon />,
        name: "Painting",
      },
      {
        id: 7,
        icon: <ElectricalServicesIcon />,
        name: "Electrical Services",
      },
    ],
    []
  );

  const artisans = [
    {
      id: 1,
      name: "Segun Adewale",
      role: "Master Barber",
      location: "Lagos, Nigeria",
      description: "Specializes in modern cuts and grooming with 8+ years of experience.",
      rating: 4.9,
      bgImage: "/artisans/barber.jpg",
      avatar: "/artisans/avatars/barber-segun.png",
    },
    {
      id: 2,
      name: "Mercy Okafor",
      role: "Professional Baker",
      location: "Abuja, Nigeria",
      description: "Artisan baker creating custom cakes and pastries for every occasion.",
      rating: 4.8,
      bgImage: "/artisans/cake.jpg",
      avatar: "/artisans/avatars/cake-mercy.png",
    },
    {
      id: 3,
      name: "Omotunde James",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      description: "Crafting bespoke clothing with premium fabrics and attention to detail.",
      rating: 4.9,
      bgImage: "/artisans/designer.jpg",
      avatar: "/artisans/avatars/designer-omotunde.png",
    },
    {
      id: 4,
      name: "Chioma Nwosu",
      role: "Hair Stylist",
      location: "Port Harcourt, Nigeria",
      description: "Expert in natural hair care, braiding, and protective styling.",
      rating: 4.7,
      bgImage: "/artisans/hairstylist.jpg",
      avatar: "/artisans/avatars/hairstylist-chioma.png",
    },
    {
      id: 5,
      name: "Ayomide Bello",
      role: "Professional Painter",
      location: "Ibadan, Nigeria",
      description: "Residential and commercial painting services with quality finishes.",
      rating: 4.6,
      bgImage: "/artisans/painter.jpg",
      avatar: "/artisans/avatars/painter-ayomide.png",
    },
  ];

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current) return;

      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        setVisibleCount(services.length);
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;

      const widths = itemRefs.current.map((ref) => ref?.offsetWidth || 0);

      const moreButtonWidth = 100;

      let usedWidth = 0;
      let visible = 0;

      for (let i = 0; i < services.length; i++) {
        if (usedWidth + widths[i] + moreButtonWidth <= containerWidth) {
          usedWidth += widths[i];
          visible = i + 1;
        } else {
          break;
        }
      }

      if (visible >= services.length) {
        setVisibleCount(services.length);
      } else {
        setVisibleCount(visible);
      }
    };

    calculateVisible();

    const resizeObserver = new ResizeObserver(() => {
      calculateVisible();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", calculateVisible);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateVisible);
    };
  }, [services]);

  const visibleServices = services.slice(0, visibleCount);
  const hiddenServices = services.slice(visibleCount);
  const showMoreButton = hiddenServices.length > 0;

  const serviceButtonClasses =
    "flex items-center space-x-3 p-3 shadow-md rounded-full cursor-pointer";

  return (
    <div className="mt-10 lg:py-20 py-10 bg-[#F0FFF6]">
      <div className="text-center flex flex-col items-center justify-center">
        <h2 className="lg:text-[36px] text-[20px] font-semibold text-[#346739]">
          Featured Artisans
        </h2>
        <p className="text-center lg:text-[20px] text-[14px] lg:w-[50%] w-[70%] font-semibold">
          Handpicked skilled professionals with proven expertise and verified
          profiles, ready to deliver exceptional services.
        </p>
      </div>

      <div className="absolute opacity-0 pointer-events-none -z-10">
        {services.map((service, index) => (
          <div
            key={`measure-${service.id}`}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
            className={serviceButtonClasses}
          >
            <div>{service.icon}</div>
            <p className="font-semibold">{service.name}</p>
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        className={`w-[90%] mx-auto flex items-center mt-10 lg:text-[16px] text-[12px] ${
          showMoreButton ? "justify-start space-x-6" : "justify-between"
        }`}
      >
        {visibleServices.map((service) => (
          <div
            key={service.id}
            onClick={() => setActive(service.name)}
            className={`${serviceButtonClasses} ${
              active === service.name
                ? "bg-[#346739] text-white"
                : "text-[#346739] bg-white"
            }`}
          >
            <div>{service.icon}</div>
            <p className="font-semibold">{service.name}</p>
          </div>
        ))}

        {showMoreButton && (
          <div className="relative">
            <div
              onClick={() => setMoreOpen(!moreOpen)}
              className={`${serviceButtonClasses} text-[#346739] bg-white`}
            >
              <div>
                <ServiceIcon width={14} height={14} />
              </div>
              <p className="font-semibold">More</p>
              <div className="ml-1">
                <RightArrow />
              </div>
            </div>

            {moreOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-xl z-20 min-w-[200px]">
                {hiddenServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setActive(service.name);
                      setMoreOpen(false);
                    }}
                    className={`flex items-center space-x-3 p-3 cursor-pointer ${
                      active === service.name
                        ? "bg-[#346739] text-white"
                        : "text-[#346739] hover:bg-[#F0FFF6]"
                    }`}
                  >
                    <div>{service.icon}</div>
                    <p className="font-semibold">{service.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto mt-10 px-[5%]">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="flex-none w-[calc((100%-4rem)/5)] min-w-[200px] bg-white rounded-[20px] shadow-md"
          >
              <div
                className="relative bg-cover bg-center w-full h-[180px] rounded-t-[20px]"
                style={{ backgroundImage: `url('${artisan.bgImage}')` }}
              >
                <div className="pt-6 px-6 flex justify-between items-center">
                  <VerifiedTag />
                  <HeartIcon />
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 w-full px-1">
                  <div className="relative flex justify-between w-full items-center">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="w-[80px] h-[80px] rounded-full border-4 border-white object-cover"
                    />
                    <div className="bg-white rounded-full px-2 py-1 shadow-md flex items-center space-x-1">
                      <StarIcon />
                      <span className="text-xs font-semibold">
                        {artisan.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 px-3 pb-3 flex flex-col space-y-2">
                <div className="">
                  <h3 className="font-semibold text-[16px] text-[#346739]">
                    {artisan.name}
                  </h3>
                  <p className="text-[14px] text-gray-600 mt-1">
                    {artisan.role}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <LocationIcon width={10} height={12} />
                    <span className="text-[12px] text-gray-500">
                      {artisan.location}
                    </span>
                  </div>
                </div>
                <p className="text-[12px] text-gray-500 mt-2">
                  {artisan.description}
                </p>
                <button className="mt-4 w-full border border-[#346739] text-[#345739] py-2 rounded-xl font-semibold text-[14px]">
                  View Profile
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedArtisans;
