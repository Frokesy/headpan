import { ServiceIcon, TrustIcon, ArtisanIcon, RightArrow } from "../icons";

const PopularServices = () => {
  const stats = [
    {
      id: 1,
      icon: <ServiceIcon />,
      mobileIcon: <ServiceIcon width={10} height={12} />,
      text: "Service Categories",
      metric: "50+",
    },
    {
      id: 2,
      icon: <ArtisanIcon />,
      mobileIcon: <ArtisanIcon width={10} height={12} />,
      text: "Local Artisans",
      metric: "Skilled",
    },
    {
      id: 3,
      icon: <TrustIcon />,
      mobileIcon: <TrustIcon width={10} height={12} />,
      text: "Verify Artisans",
      metric: "Trusted",
    },
  ];

  const services = [
    {
      id: 1,
      name: "Fashion & Tailoring",
      description: "Custom outfits, alterations, designs and more.",
      artisans: 50,
      image: "/service_imgs/tailoring.png",
      slug: "/fashion-and-tailoring",
    },
    {
      id: 2,
      name: "Hair Styling",
      description: "All kinds of hair styling, braids, ghana weaving and more.",
      artisans: 50,
      image: "/service_imgs/hairstyling.png",
      slug: "/hair-styling",
    },
    {
      id: 3,
      name: "Carpentry",
      description: "Custom furniture, repairs, woodwork, doors and more.",
      artisans: 50,
      image: "/service_imgs/carpentry.png",
      slug: "/carpentry",
    },
    {
      id: 4,
      name: "Electrical Services",
      description: "Wiring, installations, repairs, maintenance and more.",
      artisans: 50,
      image: "/service_imgs/electrical.png",
      slug: "/electrical-services",
    },
    {
      id: 5,
      name: "POP Installation",
      description: "Ceiling designs, molding and installations.",
      artisans: 50,
      image: "/service_imgs/pop.png",
      slug: "/pop-installation",
    },
    {
      id: 6,
      name: "Painting",
      description: "Interior and exterior painting, wall murals, and more.",
      artisans: 50,
      image: "/service_imgs/painting.png",
      slug: "/painting",
    },
    {
      id: 7,
      name: "Barbing",
      description: "All kinds of haircuts, fades, dreadlocks, and more.",
      artisans: 77,
      image: "/service_imgs/barbing.png",
      slug: "/barbing",
    },
    {
      id: 8,
      name: "Car Repair",
      description: "Repairs, maintenance, servicing and more.",
      artisans: 45,
      image: "/service_imgs/car-repair.png",
      slug: "/car-repair",
    },
  ];

  return (
    <div className="mt-[20vh]">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2 className="lg:text-[36px] text-[20px] font-semibold text-[#346739]">
          Popular Services
        </h2>
        <p className="text-center lg:text-[20px] text-[14px] lg:w-[50%] w-[70%] font-semibold">
          Discover skilled and verified artisans across wide range of services.
          Find exactly what you need, near you.
        </p>
      </div>
      <div className="flex lg:items-center justify-between px-6 lg:justify-center space-x-4 lg:space-x-30 lg:mt-20 mt-10">
        {stats.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="bg-[#BDD7B699] min-w-[40px] w-[40px] h-[40px] lg:flex hidden items-center justify-center rounded-full">
              {item.icon}
            </div>
            <div className="bg-[#BDD7B699] w-[18px] h-[18px] lg:hidden flex items-center justify-center rounded-full">
              {item.mobileIcon}
            </div>

            <div className="flex flex-col">
              <h2 className="text-[10px] lg:text-[22px] text-black font-semibold">
                {item.metric}
              </h2>

              <p className="text-[#346739] text-[8px] lg:text-[16px] leading-tight">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-10 my-10 w-[90vw] mx-auto">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col shadow-lg">
            <img
              src={service.image}
              alt={service.slug}
              className="rounded-t-2xl"
            />
            <div className="bg-[#ffffff] p-6 rounded-b-2xl">
              <h2 className="text-[#333333] font-semibold lg:text-[20px] text-[16px]">
                {service.name}
              </h2>
              <p className="text-[#333333] mb-10 font-semibold lg:text-[16px] text-[14px]">
                {service.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img src="/service_imgs/group.png" alt="avatars" />
                  <p className="lg:text-[16px] text-[10px]">{service.artisans}+ Artisans</p>
                </div>
                <div className="bg-[#BDD7B699] min-w-[40px] w-[40px] h-[40px] flex items-center justify-center rounded-full">
                  <RightArrow />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;
