"use client";
import Image from "next/image";
import googlePlay from "../../../assets/page5/googlePlay.svg";
import appStore from "../../../assets/page5/appStore.svg";
import qrCode from "../../../assets/page5/QrCode.svg";
import Link from "next/link";
import useLanguage from "@/context/useLanguage";

const Page5 = () => {
  const { language, translations } = useLanguage();

  return (
    <div
      className="w-[70%]  mx-auto mt-40 text-center my-[11.25rem]"
      id="download"
    >
      {language === "en" ? (
        <p className="text-[#4c4c4c] text-6xl  text-left">
          {translations[language].section5.take}
          <span className="font-ibm-600 ">
            {" "}
            {translations[language].section5.control}
          </span>{" "}
          {translations[language].section5.of}
          <span className="font-ibm-600 ">
            {" "}
            {translations[language].section5.financial}
          </span>{" "}
          {translations[language].section5.with}
          <span className="font-ibm-600 text-[#e9c237] leading-tight">
            {" "}
            {translations[language].section5.sabika}
          </span>
        </p>
      ) : language === "ar" ? (
        <p className="text-[#4c4c4c] text-5xl font-tajawal-400  text-right mb-20">
          {translations[language].section5.invest}
          <span className="font-tajawal-700 text-[#e9c237]">
            {" "}
            {translations[language].section5.sabika}
          </span>{" "}
          {translations[language].section5.give}
          <span className="font-tajawal-700 text-[#e9c237]">
            {" "}
            {translations[language].section5.future}
          </span>{" "}
          {translations[language].section5.financial}
        </p>
      ) : (
        <p className="text-[#4c4c4c] text-5xl font-tajawal-400  text-right mb-20">
          {translations[language].section5.invest}
          <span className="font-tajawal-700 text-[#e9c237]">
            {" "}
            {translations[language].section5.sabika}
          </span>{" "}
          {translations[language].section5.give}
          <span className="font-tajawal-700 text-[#e9c237]">
            {" "}
            {translations[language].section5.future}
          </span>{" "}
          {translations[language].section5.financial}
        </p>
      )}

      <div
        className="grid grid-cols-2 "
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <div className="flex items-center justify-start gap-[2.063rem]">
          {" "}
          {/* Added justify-center */}
          <Link href={"https://play.google.com/"}>
            <Image
              src={googlePlay}
              alt="googlePlay"
              className=""
              loading="eager"
            />
          </Link>
          <Link href={"https://www.apple.com/eg/app-store/"}>
            <Image src={appStore} alt="appStore" className="" loading="eager" />
          </Link>
        </div>
        <div
          className={`flex ${
            language === "en" ? "justify-center ml-24" : "justify-end mr-10"
          }`}
        >
          {/* Centering the third image */}
          <Image src={qrCode} alt="qrCode" loading="eager" />
        </div>
      </div>
    </div>
  );
};

export default Page5;
