import {
  CommsIcon,
  CustomerSupportIcon,
  GroupAvatars,
  JobsIcon,
  LocationIcon,
  StarIcon,
  ThumbsIcon,
  TrustIcon,
  VerifiedIcon,
  WalletIcon,
} from "../icons";

const Credibility = () => {
  const metrics = [
    {
      id: 1,
      icon: <GroupAvatars />,
      stat: "200+",
      text: "Verified Artisans",
      mobileIcon: <GroupAvatars width={24} height={16} />,
    },
    {
      id: 2,
      icon: <StarIcon color="#346739" />,
      stat: "100%",
      text: "Customer Satisfaction",
      mobileIcon: <StarIcon color="#346739" width={18} height={18} />,
    },
    {
      id: 3,
      icon: <JobsIcon />,
      stat: "500+",
      text: "Jobs Completed",
      mobileIcon: <JobsIcon width={19} height={19} />,
    },
    {
      id: 4,
      icon: <VerifiedIcon />,
      stat: "100%",
      text: "Safe & Secure Payments",
      mobileIcon: <VerifiedIcon width={16} height={20} />,
    },
  ];

  const items = [
    {
      id: 1,
      bgTheme: "bg-[#CDFFE066]",
      iconBgColor: "bg-[#346739]",
      icon: <TrustIcon />,
      title: "Verified & Trusted Professionals",
      desc: "All artisans go through a verification process so you get only the best.",
    },
    {
      id: 2,
      bgTheme: "bg-[#F8F5E6]",
      iconBgColor: "bg-[#E3B836]",
      icon: <ThumbsIcon />,
      title: "Quality You Can Rely On",
      desc: "Skilled, experienced and rated by real customers like you.",
    },
    {
      id: 3,
      bgTheme: "bg-[#F2FFE9]",
      iconBgColor: "bg-[#337B01]",
      icon: <LocationIcon />,
      title: "Local Artisans, Near You",
      desc: "Find trusted professionals in your area for faster service and support",
    },
    {
      id: 4,
      bgTheme: "bg-[#F1F0F3]",
      iconBgColor: "bg-[#8F5E9B]",
      icon: <CommsIcon />,
      title: "Easy Communication & Scheduling",
      desc: "Message Artisans directly and agree on a convenient time that works for you",
    },
    {
      id: 5,
      bgTheme: "bg-[#FCF6EA]",
      iconBgColor: "bg-[#DA782B]",
      icon: <WalletIcon />,
      title: "Secure & Flexible Payments",
      desc: "Pay Safely on the platform with multiple secure payment options.",
    },
    {
      id: 6,
      bgTheme: "bg-[#EFF4F8]",
      iconBgColor: "bg-[#2B6FB6]",
      icon: <CustomerSupportIcon />,
      title: "Secure & Flexible Payments",
      desc: "Pay Safely on the platform with multiple secure payment options.",
    },
  ];

  return (
    <>
      <div className="flex w-[90%] mx-auto text-center lg:hidden flex-col items-center justify-center">
        <h2 className="text-[#346739] text-[20px] font-semibold">
          Why Choose Us
        </h2>
        <p className="text-[16px] font-semibold">
          We make it simple to find artisans and get quality work done with
          confidence
        </p>
      </div>
      <div className="flex lg:flex-row flex-col-reverse justify-between items-center lg:space-x-10 w-[90%] mx-auto">
        <div className="lg:w-[60%]">
          <div className="lg:block hidden">
            <h2 className="text-[#346739] text-[36px] font-semibold">
              Why Choose Us
            </h2>
            <p className="text-[24px] font-semibold">
              We make it simple to find artisans and get quality work done with
              confidence
            </p>
          </div>
          <div className="grid grid-cols-4 mt-6 gap-10">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="flex flex-col space-y-2 items-center justify-center"
              >
                <div className="w-[80px] h-[80px] bg-[#CDFFE066] hidden lg:flex items-center justify-center rounded-full flex flex-col">
                  {metric.icon}
                </div>
                <div className="w-[40px] h-[40px] bg-[#CDFFE066] lg:hidden flex items-center justify-center rounded-full flex flex-col">
                  {metric.mobileIcon}
                </div>
                <h2 className="lg:text-[20px] text-[12px] font-semibold">
                  {metric.stat}
                </h2>
                <p className="lg:text-[18px] text-[8px] text-[#4F6552] font-semibold text-center">
                  {metric.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center lg:mt-0 mt-10">
          <div className="absolute inset-0 bg-[#346739] blur-2xl opacity-50 -z-10"></div>
          <img
            src="/electrician.png"
            alt="img"
            className="relative z-10 h-[268px] lg:h-auto"
          />
          <img
            src="/chef.png"
            alt="img"
            className="relative z-20 lg:-ml-30 -ml-20 h-[258px] lg:h-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 mt-10 gap-4 mt-10 w-[90%] mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col p-4 rounded-lg space-y-3 items-center justify-center text-center ${item.bgTheme}`}
          >
            <div
              className={`rounded-full flex flex-col items-center justify-center ${item.iconBgColor} w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]`}
            >
              <div className={`${(item.id === 1 || item.id === 3) && 'bg-white'} rounded-full w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] flex items-center justify-center`}>
                {item.icon}
              </div>
            </div>
            <h2 className="font-semibold lg:text-[16px] text-[12px]">
              {item.title}
            </h2>
            <div className={`w-12 h-1 ${item.iconBgColor}`}></div>
            <p className="text-[#4F6552] lg:text-[14px] text-[10px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Credibility;
