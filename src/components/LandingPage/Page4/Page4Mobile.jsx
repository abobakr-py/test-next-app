import Image from "next/image";
import React from "react";
import downloadMobile from "../../../assets/page4/downloadMobile.svg";
import walletMobile from "../../../assets/page4/walletMobile.svg";
import bagtickMobile from "../../../assets/page4/bagtickMobile.svg";
import profileMobile from "../../../assets/page4/profileMobile.svg";
import useLanguage from "@/context/useLanguage";
const Page4Mobile = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="mt-32 mx-6" id="how">
      <div className="flex items-end justify-center ">
        {" "}
        <span
          className={`flex w-full   h-[1px]  bg-gradient-custom mb-3 ${
            language === "en" ? "hidden" : ""
          }`}
        ></span>
        <p
          className={`${
            language === "en" ? "ml-10" : "mr-16"
          } text-4xl font-ibm-600 whitespace-nowrap`}
        >
          {translations[language].section4.how}{" "}
          <span className="text-[#E9C237]">
            {translations[language].section4.start}{" "}
          </span>
        </p>
        <span
          className={`flex w-full   h-[1px]  bg-gradient-custom mb-3 ${
            language === "en" ? "" : "hidden"
          }`}
        ></span>
      </div>
      <div className="flex flex-col gap-5 mt-16">
        <div
          className={`flex ${
            language === "en" ? "" : "flex-row-reverse text-right"
          } items-center gap-4  bg-[#fcfcfc] rounded-3xl p-4 shadow-custom`}
        >
          <Image src={downloadMobile} alt={`Image`} loading="eager" />
          <div>
            <p
              className={`text-xl ${
                language === "en" ? "font-ibm-500" : "font-tajawal-500"
              }`}
            >
              {translations[language].section4.download}
            </p>
            <p
              className={`text-[#4C4C4C] mt-2 ${
                language === "en" ? "font-ibm-500" : "font-tajawal-500"
              }`}
            >
              {" "}
              {translations[language].section4.downloadText}
            </p>
          </div>
        </div>
        <div
          className={`flex ${
            language === "en" ? "" : "flex-row-reverse text-right"
          } items-center gap-4  bg-[#fcfcfc] rounded-3xl p-4 shadow-custom`}
        >
          <Image src={profileMobile} alt={`Image`} loading="eager" />
          <div>
            <p
              className={`text-xl ${
                language === "en" ? "font-ibm-500" : "font-tajawal-500"
              }`}
            >
              {translations[language].section4.signup}
            </p>
            <p
              className={`text-[#4C4C4C] mt-2 ${
                language === "en" ? "font-ibm-400" : "font-tajawal-400"
              }`}
            >
              {" "}
              {translations[language].section4.signupText}
            </p>
          </div>
        </div>
        <div
          className={`flex ${
            language === "en" ? "" : "flex-row-reverse text-right"
          } items-center gap-4  bg-[#fcfcfc] rounded-3xl p-4 shadow-custom`}
        >
          <Image src={walletMobile} alt={`Image`} loading="eager" />
          <div>
            <p
              className={`text-xl ${
                language === "en" ? "font-ibm-500" : "font-tajawal-500"
              }`}
            >
              {translations[language].section4.deposit}
            </p>
            <p
              className={`text-[#4C4C4C] mt-2 ${
                language === "en" ? "font-ibm-400" : "font-tajawal-400"
              }`}
            >
              {" "}
              {translations[language].section4.depositText}
            </p>
          </div>
        </div>
        <div
          className={`flex ${
            language === "en" ? "" : "flex-row-reverse text-right"
          } items-center gap-4  bg-[#fcfcfc] rounded-3xl p-4 shadow-custom`}
        >
          <Image src={bagtickMobile} alt={`Image`} loading="eager" />
          <div>
            <p
              className={`text-xl ${
                language === "en" ? "font-ibm-500" : "font-tajawal-500"
              }`}
            >
              {translations[language].section4.trade}
            </p>
            <p
              className={`text-[#4C4C4C] mt-2 ${
                language === "en" ? "font-ibm-400" : "font-tajawal-400"
              }`}
            >
              {" "}
              {translations[language].section4.tradeText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4Mobile;
