import Link from "next/link";
import {
  BigVerificationIcon,
  BigVerificationIcon2,
  BusCertIcon,
  DocumentsIcon,
  GovtIdIcon,
  GreenTick,
  SelfieCertIcon,
  SmallDot,
  UploadIcon2,
  VerificationIcon,
} from "../../components/dashboardIcons";

const documents = [
  {
    title: "Government ID",
    description: "National ID card",
    uploaded: "May 10, 2026",
    icon: <GovtIdIcon />,
    iconAccent: "#CDFFE0",
    verified: true,
    cta: "View Document",
  },
  {
    title: "Business certificate",
    description: "CAC certificate",
    uploaded: "May 10, 2026",
    icon: <BusCertIcon />,
    verified: true,
    iconAccent: "#EAF6FF",
    cta: "View Document",
  },
  {
    title: "Selfie verification",
    description: "Live selfie",
    uploaded: "May 10, 2026",
    icon: <SelfieCertIcon />,
    verified: true,
    iconAccent: "#F1EAFF",
    cta: "View Selfie",
  },
];

export default function VerificationCentreScreen() {
  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-5 sm:space-y-7">
      <h2 className="text-[15px] leading-6 text-[#4F6552] sm:text-[18px]">
        Manage your verification status and documents
      </h2>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6">
          <h2 className="text-[14px] font-semibold">Verification Status</h2>
          <div className="my-6 flex items-center justify-center gap-4 sm:gap-8 lg:gap-10">
            <div className="shrink-0 [&_svg]:h-[76px] [&_svg]:w-[76px] min-[390px]:[&_svg]:h-[88px] min-[390px]:[&_svg]:w-[88px] sm:[&_svg]:h-[140px] sm:[&_svg]:w-[140px]">
              <BigVerificationIcon />
            </div>
            <div className="flex min-w-0 flex-1 flex-col space-y-2 text-left sm:max-w-[280px] sm:space-y-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h2 className="text-[20px] font-semibold text-[#346739] min-[390px]:text-[22px] sm:text-[28px]">
                  Verified
                </h2>
                <VerificationIcon />
              </div>
              <p className="text-xs font-semibold leading-5 text-[#4F6552] min-[390px]:text-sm sm:text-base sm:leading-6">
                Your account has been successfully verified.
              </p>
              <button className="w-fit rounded-lg bg-[#CDFFE0] px-3 py-2 text-left text-[10px] font-semibold text-[#346739] min-[390px]:text-[11px] sm:px-4 sm:text-[12px]">
                Verified on May 12, 2026
              </button>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-3 overflow-hidden rounded-2xl bg-[#F5FFF9] p-4 shadow-lg sm:gap-4 sm:rounded-3xl sm:p-6">
          <div className="relative z-10 min-w-0 space-y-6">
            <h2 className="text-[16px] font-semibold text-[#4F6552] sm:text-[18px]">
              Benefits of being verified
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <GreenTick />
                <p className="text-sm font-semibold leading-5 text-[#4F6552] sm:text-base">
                  Builds trust with clients
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <GreenTick />
                <p className="text-sm font-semibold leading-5 text-[#4F6552] sm:text-base">
                  Increase visibility in search
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <GreenTick />
                <p className="text-sm font-semibold leading-5 text-[#4F6552] sm:text-base">
                  Higher chances of getting hired
                </p>
              </div>
            </div>
          </div>

          <div className="block shrink-0 opacity-80 [&_svg]:h-[58px] [&_svg]:w-[58px] min-[390px]:[&_svg]:h-[70px] min-[390px]:[&_svg]:w-[70px] sm:[&_svg]:h-[95px] sm:[&_svg]:w-[95px] lg:[&_svg]:h-[113px] lg:[&_svg]:w-[113px]">
            <BigVerificationIcon2 />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {documents.map((document, index) => (
          <div
            key={index}
            className="flex min-w-0 flex-col space-y-5 rounded-xl border border-[#f1f1f1] bg-white p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: document.iconAccent }}
              >
                {document.icon}
              </div>
              <div className="">
                {document.verified ? (
                  <p className="text-[#346739] font-semibold text-[12px] bg-[#CDFFE0] py-1 px-3 rounded-full">
                    Verified
                  </p>
                ) : (
                  <p className="text-[#FF0000] font-semibold text-[12px] bg-[#FFE0E0] py-1 px-3 rounded-full">
                    Not Verified
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-[#4F6552] font-semibold text-[14px]">
                {document.title}
              </h2>
              <p className="text-[#4F6552] text-[12px]">
                {document.description}
              </p>
              <p className="text-[#4F6552] text-[12px]">
                Uploaded on {document.uploaded}
              </p>
            </div>

            <Link href="#" className="mt-auto inline-flex text-[12px] font-semibold text-[#346739]">
              {document.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:mt-10 xl:grid-cols-2">
        <div className="min-w-0 rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <div className="space-y-6">
            <h2 className="text-[#333333] font-semibold text-[18px]">
              Verification History
            </h2>
            <div className="space-y-3">
              <div className="flex flex-col gap-2 border-b border-[#EDF1EE] pb-3 text-[13px] last:border-0 last:pb-0 sm:text-[14px] md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-start gap-3 sm:items-center">
                  <GreenTick />
                  <p className="text-[#2B392D] font-semibold">
                    Identity verification approved
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 pl-[26px] md:pl-0">
                  <p className="text-[#2B392D] font-semibold">May 10, 2026</p>
                  <SmallDot />
                  <p className="text-[#2B392D] font-semibold">10:30 AM</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b border-[#EDF1EE] pb-3 text-[13px] last:border-0 last:pb-0 sm:text-[14px] md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-start gap-3 sm:items-center">
                  <GreenTick />
                  <p className="text-[#2B392D] font-semibold">
                    Identity verification approved
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 pl-[26px] md:pl-0">
                  <p className="text-[#2B392D] font-semibold">May 10, 2026</p>
                  <SmallDot />
                  <p className="text-[#2B392D] font-semibold">10:30 AM</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[13px] sm:text-[14px] md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-start gap-3 sm:items-center">
                  <GreenTick />
                  <p className="text-[#2B392D] font-semibold">
                    Identity verification approved
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 pl-[26px] md:pl-0">
                  <p className="text-[#2B392D] font-semibold">May 10, 2026</p>
                  <SmallDot />
                  <p className="text-[#2B392D] font-semibold">10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-5 rounded-xl bg-white p-4 text-center shadow-sm sm:flex-row sm:p-6 sm:text-left">
          <div className="shrink-0 [&_svg]:h-[100px] [&_svg]:w-[120px] sm:[&_svg]:h-[120px] sm:[&_svg]:w-[144px]"><DocumentsIcon /></div>
          <div className="min-w-0 flex-1 space-y-3">
            <h2 className="text-[#333333] font-semibold text-[18px]">
              Need to update your documents?
            </h2>
            <p className="text-[#4F6552] text-[14px]">
              If any of your information changes, make sure to update your
              documents to keep your account verified.{" "}
            </p>
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#346739] px-4 py-2 text-[14px] font-semibold text-[#346739] sm:w-auto">
              <UploadIcon2 />
              <span>Update Documents</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
