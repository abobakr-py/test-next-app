"use client";
import Image from "next/image";
import bgImage3 from "../../../assets/page3/bg3Web.png";
import useLanguage from "@/context/useLanguage";
const Page3 = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="py-32 ">
      <div className="w-4/5 mx-auto ">
        {/* Header */}
        {language === "en" ? (
          <div className="flex items-center mb-16 ">
            <div className="flex items-end justify-end w-[70%] mt-3">
              <div className="flex w-full  h-[1px]   bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              <div className=" flex w-full h-[1px]   bg-gradient-to-r from-[#f5de6b] to-transparent" />
            </div>
            <h1 className="font-ibm-500 text-[4rem] w-full text-start">
              {translations[language].section3.what}
              <span className="text-[#E9C237] font-ibm-600">
                {" "}
                {translations[language].section3.offer}
              </span>
            </h1>
          </div>
        ) : language === "ar" ? (
          <div className="flex items-center mb-10 ">
            <h1 className="font-tajawal-500 text-[4rem] w-full text-end">
              {translations[language].section3.what}
              <span className="text-[#E9C237] font-tajawal-700">
                {" "}
                {translations[language].section3.we}{" "}
              </span>
              {translations[language].section3.offer}
            </h1>
            <div className="flex items-end justify-end w-[70%] mt-3">
              <div className="flex w-full  h-[1px]   bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              <div className=" flex w-full h-[1px]   bg-gradient-to-r from-[#f5de6b] to-transparent" />
            </div>
          </div>
        ) : (
          <div className="flex items-center mb-10 ">
            <h1 className="font-tajawal-500 text-[4rem] w-full text-end">
              <span className="text-[#E9C237] font-tajawal-700">
                {translations[language].section3.what}{" "}
              </span>
              {translations[language].section3.we}
            </h1>
            <div className="flex items-end justify-end w-[70%] mt-3">
              <div className="flex w-full  h-[1px]   bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              <div className=" flex w-full h-[1px]   bg-gradient-to-r from-[#f5de6b] to-transparent" />
            </div>
          </div>
        )}
        {/* Content */}
        <div
          className="grid grid-cols-2 "
          dir={language === "en" ? "ltr" : "rtl"}
        >
          {language === "en" ? (
            <div className="flex flex-col items-start gap-32 mt-8 text-4xl ">
              <div>
                <div className="relative">
                  <p className="relative z-10 text-[#4c4c4c]">
                    <span className="font-ibm-700 text-[#e9c237] mr-3">
                      {translations[language].section3.lowest}
                    </span>
                    {translations[language].section3.market}
                  </p>
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-25 font-ibm-400">
                    01
                  </p>
                </div>
                <p className="w-[70%] mt-4 text-base text-[#4c4c4c] font-ibm">
                  {translations[language].section3.effort}
                </p>
              </div>
              <div>
                <div className="relative">
                  <p className="relative z-10 font-ibm text-[#4c4c4c] text-5xl">
                    <span className="font-ibm-600 text-[#e9c237] mr-3">
                      {translations[language].section3.user}
                    </span>
                    {translations[language].section3.app}
                  </p>
                  <p className="absolute -top-[1.9rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-25 font-ibm-400">
                    02
                  </p>
                </div>
                <p className="w-[70%] mt-3 text-base text-[#4c4c4c] font-ibm">
                  <span className="text-[#e9c237] font-ibm-600">
                    {" "}
                    {translations[language].section3.sabika}
                  </span>{" "}
                  {translations[language].section3.makes}
                </p>
              </div>
            </div>
          ) : language === "ar" ? (
            <div className="flex flex-col items-start gap-32 mt-24 text-4xl ">
              <div>
                <div className="relative">
                  <p className="relative z-10 mr-3 font-tajawal-500 text-[#4c4c4c]">
                    {translations[language].section3.invest}{" "}
                    <span className="font-tajawal-700 text-[#e9c237] ">
                      {translations[language].section3.lowest}{" "}
                    </span>
                  </p>
                  <p className="absolute -top-[2.5rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-25 font-ibm-400">
                    01
                  </p>
                </div>
                <p className=" mt-6 font-tajawal-500  text-base text-[#4c4c4c]">
                  {translations[language].section3.buy}
                  <span className="text-[#e9c237] font-tajawal-700">
                    {" "}
                    {translations[language].section3.prices}{" "}
                  </span>
                  {translations[language].section3.with}{" "}
                </p>
              </div>
              <div>
                <div className="relative">
                  <p className="relative z-10 font-tajawal-500">
                    {translations[language].section3.enjoy}{" "}
                    <span className="font-tajawal-700 text-[#e9c237] ">
                      {translations[language].section3.user}{" "}
                    </span>
                    {translations[language].section3.app}
                  </p>
                  <p className="absolute -top-[2.5rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-25 font-ibm-400">
                    02
                  </p>
                </div>
                <p className="w-3/5 mt-6 text-base text-[#4c4c4c] font-tajawal-500">
                  {translations[language].section3.withsabika}
                  <span className="text-[#e9c237] font-tajawal-700">
                    {" "}
                    {translations[language].section3.sabika}
                  </span>{" "}
                  {translations[language].section3.makes}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-32 mt-24 text-4xl ">
              <div>
                <div className="relative">
                  <p className="relative z-10 mr-3 font-tajawal-500 ">
                    {translations[language].section3.invest}{" "}
                    <span className="font-tajawal-700 text-[#e9c237] ">
                      {translations[language].section3.lowest}
                    </span>
                  </p>
                  <p className="absolute -top-[2.5rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-25 font-ibm-400">
                    01
                  </p>
                </div>
                <p className=" mt-6 font-tajawal-500 text-base text-[#4c4c4c]">
                  {translations[language].section3.buy}{" "}
                  <span className="text-[#e9c237] font-tajawal-700">
                    {translations[language].section3.lowest2}{" "}
                  </span>
                  {translations[language].section3.with}
                </p>
              </div>
              <div>
                <div className="relative">
                  <p className="relative z-10 font-tajawal-500">
                    <span className="font-tajawal-700 text-[#e9c237] mr-3">
                      {translations[language].section3.enjoy}{" "}
                    </span>
                    {translations[language].section3.app}.
                  </p>
                  <p className="absolute -top-[2.5rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-25 font-ibm-400">
                    02
                  </p>
                </div>
                <p className=" mt-6 text-base text-[#4c4c4c] font-tajawal-500">
                  {translations[language].section3.withsabika}
                  <span className="text-[#e9c237] font-tajawal-700">
                    {" "}
                    {translations[language].section3.sabika}
                  </span>{" "}
                  {translations[language].section3.makes}
                </p>
              </div>
            </div>
          )}
          {/* Image */}
          <div>
            <Image src={bgImage3} alt="bgImage2" loading="eager" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
