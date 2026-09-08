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

export default function VerificationCentrePage() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-7">
      <h2 className="text-[#4F6552] text-[18px]">
        Manage your verification status and documents
      </h2>

      <div className="flex justify-between space-x-4">
        <div className="w-[50%] shadow-lg rounded-3xl bg-[#ffffff] p-6">
          <h2 className="text-[14px] font-semibold">Verification Status</h2>
          <div className="flex items-center justify-center space-x-10 my-6">
            <div className="">
              <BigVerificationIcon />
            </div>
            <div className="flex flex-col space-y-3 w-[50%] mx-auto">
              <div className="flex items-center space-x-3">
                <h2 className="text-[#346739] font-semibold text-[28px]">
                  Verified
                </h2>
                <VerificationIcon />
              </div>
              <p className="text-[#4F6552] font-semibold">
                Your account has been successfully verified.
              </p>
              <button className="text-[#346739] font-semibold text-[12px] bg-[#CDFFE0] py-2 px-4 rounded-lg">
                Verified on May 12, 2026
              </button>
            </div>
          </div>
        </div>

        <div className="w-[50%] shadow-lg rounded-3xl bg-[#F5FFF9] p-6 flex items-center justify-between">
          <div className="space-y-6">
            <h2 className="text-[#4F6552] font-semibold text-[18px]">
              Benefits of being verified
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <GreenTick />
                <p className="text-[#4F6552] font-semibold">
                  Builds trust with clients
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <GreenTick />
                <p className="text-[#4F6552] font-semibold">
                  Increase visibility in search
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <GreenTick />
                <p className="text-[#4F6552] font-semibold">
                  Higher chances of getting hired
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <BigVerificationIcon2 />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {documents.map((document, index) => (
          <div
            key={index}
            className="rounded-xl bg-[#ffffff] p-6 flex flex-col space-y-6 border border-[#f1f1f1]"
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

            <Link href="#" className="text-[#346739] font-semibold text-[12px]">
              {document.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="flex mt-10 justify-between space-x-4">
        <div className="w-[50%] rounded-xl shadow-sm bg-[#ffffff] p-6">
          <div className="space-y-6">
            <h2 className="text-[#333333] font-semibold text-[18px]">
              Verification History
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-[14px]">
                <div className="flex items-center space-x-3">
                  <GreenTick />
                  <p className="text-[#2B392D] font-semibold">
                    Identity verification approved
                  </p>
                </div>
                <div className="flex items-center justify-between space-x-3">
                  <p className="text-[#2B392D] font-semibold">May 10, 2026</p>
                  <SmallDot />
                  <p className="text-[#2B392D] font-semibold">10:30 AM</p>
                </div>
              </div>
              <div className="flex justify-between text-[14px]">
                <div className="flex items-center space-x-3">
                  <GreenTick />
                  <p className="text-[#2B392D] font-semibold">
                    Identity verification approved
                  </p>
                </div>
                <div className="flex items-center justify-between space-x-3">
                  <p className="text-[#2B392D] font-semibold">May 10, 2026</p>
                  <SmallDot />
                  <p className="text-[#2B392D] font-semibold">10:30 AM</p>
                </div>
              </div>
              <div className="flex justify-between text-[14px]">
                <div className="flex items-center space-x-3">
                  <GreenTick />
                  <p className="text-[#2B392D] font-semibold">
                    Identity verification approved
                  </p>
                </div>
                <div className="flex items-center justify-between space-x-3">
                  <p className="text-[#2B392D] font-semibold">May 10, 2026</p>
                  <SmallDot />
                  <p className="text-[#2B392D] font-semibold">10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[50%] rounded-xl shadow-sm bg-[#ffffff] p-6 flex justify-between items-center">
          <DocumentsIcon />
          <div className="space-y-3 w-[60%]">
            <h2 className="text-[#333333] font-semibold text-[18px]">
              Need to update your documents?
            </h2>
            <p className="text-[#4F6552] text-[14px]">
              If any of your information changes, make sure to update your
              documents to keep your account verified.{" "}
            </p>
            <button className="border border-[#346739] text-[#346739] py-2 px-4 rounded-lg text-[14px] font-semibold flex items-center space-x-3">
              <UploadIcon2 />
              <span>Update Documents</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
