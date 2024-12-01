import Image from "next/image";
import Page1Image from "../../../assets/page1/bg1Web.png";
import useLanguage from "@/context/useLanguage";
import { Skeleton } from "@mui/material";
import {
  FormatBalance,
  FormatFullDate,
  FormatFullDateArabic,
} from "@/helper/utilFunctions";

import arrowUp from "@/assets/arrowUp.svg";
import arrowDown from "@/assets/arrowDown.svg";
const Page1 = ({ data, isLoading }) => {
  const { language, translations } = useLanguage();
  const section1 = translations[language].section1;
  return (
    <>
    <div className="relative grid w-[73%] mx-auto mt-10">
        <p
          className={`
      text-xs text-[#808080] mb-4 ${
        language === "en" ? "" : "text-right"
      }        `}
        >
          {section1?.goldPriceUpdate}{" "}
          {language === "en"
            ? FormatFullDate(data?.priceTime)
            : FormatFullDateArabic(data?.priceTime)}
        </p>
        <div
          className=" xl:flex items-center justify-center gap-6"
          dir={language === "en" ? "ltr" : "rtl"}
        >
          <div
            style={{
              boxShadow: `
      0px 3px 3px -1.5px rgba(42, 51, 70, 0.02), 
      0px 1px 1px -0.5px rgba(42, 51, 69, 0.02), 
      0px 0px 24px 1px rgba(14, 63, 126, 0.05)
    `,
            }}
            className="rounded-2xl flex items-center justify-between p-4 w-full"
          >
            <p className="text-[#4c4c4c]">{section1?.buy}</p>
            <div className="text-[#FF505C] flex items-center">
              {Number(data?.buyPercentage) > 0 ? (
                <Image src={arrowUp} alt="arrowUp" />
              ) : (
                <Image src={arrowDown} alt="arrowDown" />
              )}
              <div
                className={`
                  ${
                    Number(data?.buyPercentage) > 0
                      ? "text-[#37bc56]"
                      : "text-[#FF505C]"
                  }
                ${
                  language === "en" ? "border-r pr-3" : "border-l pl-3"
                }  flex items-center gap-2
                `}
              >
                {isNaN(data?.buy) ? (
                  <Skeleton width={"25px"} />
                ) : (
                  FormatBalance(data?.buy)
                )}
                {"  "}
                {section1.egp}
              </div>
              <div
                className={`px-2 flex items-center gap-2 ${
                  Number(data?.buyPercentage) > 0
                    ? "text-[#37bc56]"
                    : "text-[#FF505C]"
                }`}
              >
                {isNaN(data?.buyPercentage) ? (
                  <Skeleton width={"25px"} />
                ) : (
                  `${FormatBalance(data?.buyPercentage)}%`
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              boxShadow: `
      0px 3px 3px -1.5px rgba(42, 51, 70, 0.02), 
      0px 1px 1px -0.5px rgba(42, 51, 69, 0.02), 
      0px 0px 24px 1px rgba(14, 63, 126, 0.05)
    `,
            }}
            className="rounded-2xl flex items-center justify-between p-4 w-full"
          >
            <p className="text-[#4c4c4c]">{section1?.sell}</p>
            <div className="text-[#FF505C] flex items-center">
              {Number(data?.sellPercentage) > 0 ? (
                <Image src={arrowUp} alt="arrowUp" />
              ) : (
                <Image src={arrowDown} alt="arrowDown" />
              )}
              <div
                className={`${
                  Number(data?.sellPercentage) > 0
                    ? "text-[#37bc56]"
                    : "text-[#FF505C]"
                }
                ${
                  language === "en" ? "border-r pr-3" : "border-l pl-3"
                }  flex items-center gap-2
                `}
              >
                {isNaN(data?.sell) ? (
                  <Skeleton width={"25px"} />
                ) : (
                  FormatBalance(data?.sell)
                )}
                {section1.egp}
              </div>
              <div
                className={`px-2 flex items-center gap-2 ${
                  Number(data?.sellPercentage) > 0
                    ? "text-[#37bc56]"
                    : "text-[#FF505C]"
                }`}
              >
                {isNaN(data?.sellPercentage) ? (
                  <Skeleton width={"25px"} />
                ) : (
                  `${FormatBalance(data?.sellPercentage)}%`
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="home"
        className="relative grid w-4/5 grid-cols-2 pt-16 pb-32 mx-auto"
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <div
          className={`${
            language === "ar"
              ? "flex flex-col mt-5"
              : language === "eg"
              ? "flex flex-col mt-5"
              : ""
          }`}
        >
          <div className="flex items-end w-full lg:w-[65%] 2xl:w-[60%]  mx-auto">
            <h1
              className={` text-[4rem] ${
                language === "en" ? "font-ibm-600" : "font-tajawal-500"
              }`}
            >
              {translations[language].section1.unlock}{" "}
            </h1>
            {language == "en" ? (
              <>
                <div className=" ml-4  flex w-full h-[1px] mb-6 bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
                <div className="   flex w-full h-[1px] mb-6 bg-gradient-to-r from-[#f5de6b] to-transparent" />
              </>
            ) : (
              <>
                <div className=" flex w-full h-[1px] mb-6 bg-gradient-to-r from-[#f5de6b] to-transparent" />
                <div className=" flex w-full h-[1px] mb-6 bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              </>
            )}
          </div>
          <div className="flex items-center w-full lg:w-[65%] 2xl:w-[60%]  mx-auto ">
            <div>
              <div className="h-[8vh] overflow-hidden w-[0.0625rem] bg-gradient-to-b from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              <div className="h-[8vh] w-[0.0625rem] mb-6 bg-gradient-to-b from-[#f5de6b] to-transparent"></div>
            </div>
            <h2
              className={` text-[2.5rem] ${
                language === "en"
                  ? "font-ibm-400 ml-auto"
                  : "font-tajawal-400 mr-auto"
              }`}
            >
              {translations[language].section1.potential} <br />
              <p
                className={`leading-none text-center text-[6rem] text-[#E9C237] ${
                  language === "en" ? "font-ibm-600" : "font-tajawal-700"
                }`}
              >
                {translations[language].section1.gold}
              </p>
            </h2>
          </div>
          <p
            className={`w-full lg:w-[60%]   mt-4 mx-auto text-xl ${
              language === "en" ? "font-ibm-400" : "font-tajawal-400"
            }`}
          >
            {translations[language].section1.text}
          </p>
          <div className="relative mt-4">
            <button
              className={`
              whitespace-nowrap
              ${
                language === "en"
                  ? "font-ibm-600 absolute -left-64 mt-12  bg-[#E9C237] text-white p-4 rounded-r-xl pl-[33rem] pr-[12%]"
                  : `font-tajawal-500   absolute -right-64 mt-12  bg-[#E9C237] text-white p-[1.1875rem] rounded-l-xl pr-[29rem] pl-[12%]`
              }`}
            >
              {translations[language].section1.download}
            </button>
          </div>
        </div>
        <div
          className={`flex items-center justify-center ${
            language === "en" ? "ml-auto" : "mr-auto"
          }`}
        >
          <Image src={Page1Image} alt="Page1Image" priority={true} />
        </div>
      </div>
    </>
  );
};

export default Page1;
