"use client";
import Image from "next/image";
import downloadImage from "../../../assets/page4/download.svg";
import bagTick from "../../../assets/page4/bag-tick.svg";
import profile from "../../../assets/page4/profile.svg";
import wallet from "../../../assets/page4/wallet-add.svg";
import downloadImageHover from "../../../assets/page4/downloadHover.svg";
import bagTickHover from "../../../assets/page4/bag-tickHover.svg";
import profileHover from "../../../assets/page4/profileHover.svg";
import walletHover from "../../../assets/page4/wallet-addHover.svg";
import { useState } from "react";
import useLanguage from "@/context/useLanguage";
const Page4 = () => {
  const { language, translations } = useLanguage();
  const [isHovering, setIsHovering] = useState([false, false, false, false]);
  return (
    <div className="bg-[#FCFCFC] py-32 " id="how">
      <div className="w-4/5 mx-auto ">
        {/* Header */}
        {language === "en" ? (
          <div className="flex items-center mb-16 ml-[34%]">
            <h1 className="font-ibm-500 text-[4rem] w-full text-end whitespace-nowrap">
              {translations[language].section4.how}
              <span className="text-[#E9C237] font-ibm-600">
                {" "}
                {translations[language].section4.start}
              </span>
            </h1>
            <div className="flex items-end justify-end w-full mt-3">
              <div className="flex w-full  h-[1px]   bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              <div className=" flex w-full h-[1px]   bg-gradient-to-r from-[#f5de6b] to-transparent" />
            </div>
          </div>
        ) : language === "ar" ? (
          <div className="flex items-center mb-10 ">
            <div className="flex items-end justify-end w-full mt-3">
              <div className="flex w-full  h-[1px]   bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              <div className=" flex w-full h-[1px]   bg-gradient-to-r from-[#f5de6b] to-transparent" />
            </div>
            <h1 className="font-tajawal-500 text-[4rem] w-full text-start whitespace-nowrap">
              {translations[language].section4.how}
              <span className="text-[#E9C237]">
                {" "}
                {translations[language].section4.start}
              </span>
            </h1>
          </div>
        ) : (
          <div className="flex items-center mb-10 ">
            <div className="flex items-end justify-end w-full mt-3">
              <div className="flex w-full  h-[1px]   bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              <div className=" flex w-full h-[1px]   bg-gradient-to-r from-[#f5de6b] to-transparent" />
            </div>
            <h1 className="font-tajawal-500 text-[4rem] w-full text-start whitespace-nowrap">
              <span className="text-[#E9C237]">
                {translations[language].section4.how}
              </span>{" "}
              {translations[language].section4.start}
            </h1>
          </div>
        )}
        {/* Content */}
        <div
          className="flex items-center justify-center gap-10 "
          dir={language === "en" ? "ltr" : "rtl"}
        >
          {/* Download  Deposit */}
          <div className="flex flex-col justify-center gap-10 ">
            {/* Download */}
            <div
              onMouseEnter={() => {
                setIsHovering([true, false, false, false]);
              }}
              onMouseLeave={() => {
                setIsHovering([false, false, false, false]);
              }}
              style={{ boxShadow: "1px 1px 16px 0px rgba(51, 51, 51, 0.04)" }}
              className={` w-[28.875rem]      cursor-pointer flex items-center gap-4 px-4 py-6   bg-[#FCFCFC] hover:bg-[#E9C237] hover:text-white rounded-xl ${
                language === "en" ? "" : "  text-right"
              }`}
            >
              <Image
                src={isHovering[0] ? downloadImageHover : downloadImage}
                alt="downloadImage"
              />
              <div className="flex flex-col gap-2">
                <p
                  className={`text-2xl ${
                    language === "en" ? "font-ibm-500" : "font-tajawal-500"
                  }`}
                >
                  {translations[language].section4.download}
                </p>
                <p
                  className={`text-base ${
                    language === "en" ? "font-ibm-400" : "font-tajawal-400"
                  }`}
                >
                  {translations[language].section4.downloadText}
                </p>
              </div>
            </div>
            {/* Deposit */}
            <div
              onMouseEnter={() => {
                setIsHovering([false, true, false, false]);
              }}
              onMouseLeave={() => {
                setIsHovering([false, false, false, false]);
              }}
              style={{ boxShadow: "1px 1px 16px 0px rgba(51, 51, 51, 0.04)" }}
              className={`w-[28.875rem]    cursor-pointer flex items-center gap-4 px-4 py-6   bg-[#FCFCFC] hover:bg-[#E9C237] hover:text-white rounded-xl ${
                language === "en" ? "" : "  text-right"
              }`}
            >
              <Image
                src={isHovering[1] ? walletHover : wallet}
                alt="downloadImage"
              />
              <div className="flex flex-col gap-2">
                <p
                  className={`text-2xl ${
                    language === "en" ? "font-ibm-500" : "font-tajawal-500"
                  }`}
                >
                  {translations[language].section4.deposit}
                </p>
                <p
                  className={`text-base ${
                    language === "en" ? "font-ibm-400" : "font-tajawal-400"
                  }`}
                >
                  {translations[language].section4.depositText}
                </p>
              </div>
            </div>
          </div>
          {/* SignUp TradeGold */}
          <div className="flex flex-col justify-center gap-10">
            {/* SignUp */}
            <div
              onMouseEnter={() => {
                setIsHovering([false, false, false, true]);
              }}
              onMouseLeave={() => {
                setIsHovering([false, false, false, false]);
              }}
              style={{ boxShadow: "1px 1px 16px 0px rgba(51, 51, 51, 0.04)" }}
              className={`w-[28.875rem]  cursor-pointer flex items-center gap-4 px-4 py-6   bg-[#FCFCFC] hover:bg-[#E9C237] hover:text-white rounded-xl ${
                language === "en" ? "" : "  text-right"
              }`}
            >
              <Image
                src={isHovering[3] ? profileHover : profile}
                alt="downloadImage"
              />
              <div className="flex flex-col gap-2">
                <p
                  className={`text-2xl ${
                    language === "en" ? "font-ibm-500" : "font-tajawal-500"
                  }`}
                >
                  {translations[language].section4.signup}
                </p>
                <p
                  className={`text-base ${
                    language === "en" ? "font-ibm-400" : "font-tajawal-400"
                  }`}
                >
                  {translations[language].section4.signupText}
                </p>
              </div>
            </div>
            {/* Trade Gold */}
            <div
              onMouseEnter={() => {
                setIsHovering([false, false, true, false]);
              }}
              onMouseLeave={() => {
                setIsHovering([false, false, false, false]);
              }}
              style={{ boxShadow: "1px 1px 16px 0px rgba(51, 51, 51, 0.04)" }}
              className={`w-[28.875rem]    cursor-pointer flex items-center gap-4 px-4 py-6   bg-[#FCFCFC] hover:bg-[#E9C237] hover:text-white rounded-xl ${
                language === "en" ? "" : "  text-right"
              }`}
            >
              <Image
                src={isHovering[2] ? bagTickHover : bagTick}
                alt="downloadImage"
              />
              <div className="flex flex-col gap-2">
                <p
                  className={`text-2xl ${
                    language === "en" ? "font-ibm-500" : "font-tajawal-500"
                  }`}
                >
                  {translations[language].section4.trade}
                </p>
                <p
                  className={`text-base ${
                    language === "en" ? "font-ibm-400" : "font-tajawal-400"
                  }`}
                >
                  {translations[language].section4.tradeText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4;
