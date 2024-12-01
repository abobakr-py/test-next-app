"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import facebook from "@/assets/footer/facebook.svg";
import instagram from "@/assets/footer/instagram.svg";
import tiktok from "@/assets/footer/tiktok.svg";
import youtube from "@/assets/footer/youtube.svg";
import twitter from "@/assets/footer/twitter.svg";
import useLanguage from "@/context/useLanguage";
const Footer = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="bg-[#121212] py-6 ">
      <div
        className={`flex  items-center justify-between w-4/5 mx-auto`}
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <div
          className={`flex items-center justify-start w-full gap-10 text-white`}
        >
          <Link
            href={"/privacyandpolicy"}
            className={`text-base ${
              language === "en" ? "font-ibm-400" : "font-tajawal-400"
            }`}
          >
            {" "}
            {translations[language].footer.privacy}
          </Link>
          <Link
            href={"/termsandconditions"}
            className={`text-base ${
              language === "en" ? "font-ibm-400" : "font-tajawal-400"
            }`}
          >
            {translations[language].footer.terms}
          </Link>
        </div>
        <div className="flex items-center justify-center w-full gap-10">
          <Image src={facebook} alt="" loading="eager" />
          <Image src={twitter} alt="" loading="eager" />
          <Image src={instagram} alt="" loading="eager" />
          <Image src={tiktok} alt="" loading="eager" />
          <Image src={youtube} alt="" loading="eager" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
