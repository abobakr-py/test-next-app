"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import email from "../../../assets/email.svg";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const t = useTranslations("homePage");

  return (
    <div className=" py-10 px-10 mt-24 bg-black">
      <p className="text-[#FFF] text-5xl font-notoKufi-600">CryptoLab</p>
      <div className="flex flex-col md:flex-row mt-8">
        <div className="w-[50%]">
          <div className="space-y-4 text-[#FFF] flex flex-col">
            <Link href="/" className="font-notoKufi-400 text-base">
              {t("Home")}
            </Link>
            <Link href="/articles" className="font-notoKufi-400 text-base">
              {t("Articles")}
            </Link>
            <Link href="/about" className="font-notoKufi-400 text-base">
              {t("AboutUs")}
            </Link>
            <Link href="/about" className="font-notoKufi-400 text-base">
              {t("Termsandconditions")}
            </Link>
          </div>
        </div>
        <ul className="lg:space-y-6  mt-12 text-[#FFF]">
          <li className="font-notoKufi-400 text-xl">
            {t("ContactInformation")}
          </li>
          <li className="font-notoKufi-400 text-xs flex flex-row items-center lg:mt-0 mt-8">
            <div className="w-4 h-4 mx-2">
              <Image
                src={email}
                alt={"email"}
                className="w-full h-full object-contain cursor-pointer"
              />
            </div>
            {t("email")} : support@cryptolab.com
          </li>
        </ul>
      </div>
      <p className="font-notoKufi-400 text-xs items-center text-[#FFF] justify-center flex mt-12">
        © Copyright Bydotpy 2024
      </p>
    </div>
  );
};

export default Footer;
