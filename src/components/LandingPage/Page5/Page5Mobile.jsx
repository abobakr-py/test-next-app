import React from "react";
import googlePlayMobile from "../../../assets/page5/googlePlayMobile.svg";
import appStoreMobile from "../../../assets/page5/appStoreMobile.svg";
import qrCodeMobile from "../../../assets/page5/qrCodeMobile.svg";
import Image from "next/image";
import Link from "next/link";
import useLanguage from "@/context/useLanguage";
const Page5Mobile = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="mt-16 mx-6" id="download">
      {language === "en" ? (
        <>
          {" "}
          <p className="px-4 text-4xl leading-normal text-[#4C4C4C] font-ibm-400">
            {translations[language].section5.take}{" "}
            <span className="font-ibm-600 ">
              {" "}
              {translations[language].section5.control}
            </span>{" "}
            {translations[language].section5.of}{" "}
            <span className="font-ibm-600 ">
              {" "}
              {translations[language].section5.financial}
            </span>{" "}
            {translations[language].section5.with} <br />
            <span className="font-ibm-600 text-[#E9C237]">
              {" "}
              {translations[language].section5.sabika}
            </span>
          </p>
        </>
      ) : (
        <>
          <p className="px-4 text-3xl leading-normal text-[#4C4C4C] text-right font-tajawal-500">
            {translations[language].section5.invest}{" "}
            <span className="font-tajawal-700 text-[#e9c237] ">
              {" "}
              {translations[language].section5.sabika}
            </span>{" "}
            {translations[language].section5.give}{" "}
            <span className="font-tajawal-700 text-[#E9C237]">
              {translations[language].section5.future}{" "}
            </span>
            {translations[language].section5.financial}
          </p>
        </>
      )}
      <div className="flex items-center my-10 justify-evenly">
        <Link href={"https://play.google.com/"}>
          <Image src={googlePlayMobile} alt="google play" loading="eager" />
        </Link>
        <Link href={"https://www.apple.com/eg/app-store/"}>
          <Image src={appStoreMobile} alt="app store" loading="eager" />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Image src={qrCodeMobile} alt="qrCodeMobile" loading="eager" />
      </div>
    </div>
  );
};

export default Page5Mobile;
