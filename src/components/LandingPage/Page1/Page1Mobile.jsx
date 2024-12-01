import Image from "next/image";
import bg1Mobile from "../../../assets/page1/bg1Web.png";

import useLanguage from "@/context/useLanguage";
import { Skeleton } from "@mui/material";
import { FormatBalance } from "@/helper/utilFunctions";

import arrowUp from "@/assets/arrowUp.svg";
import arrowDown from "@/assets/arrowDown.svg";
const Page1Mobile = ({ data }) => {
  const { language, translations } = useLanguage();
  const section1 = translations[language].section1;

  return (
    <>
      <div className="relative grid  w-4/5 mx-auto mt-10">
        <p
          className={`
      text-xs text-[#808080] mb-4 ${
        language === "en" ? "" : "text-right"
      }        `}
        >
          {section1?.goldPriceUpdate} {data?.priceTime}
        </p>
        <div
          className="  items-center justify-center gap-6"
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
            className="rounded-2xl grid items-center justify-between p-4 "
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
                border-r pr-3 flex items-center gap-2
                ${
                  Number(data?.buyPercentage) > 0
                    ? "text-[#37bc56]"
                    : "text-[#FF505C]"
                }
                `}
              >
                {isNaN(data?.buy) ? (
                  <Skeleton width={"25px"} />
                ) : (
                  FormatBalance(data?.buy)
                )}
                {section1.egp}
              </div>
              <div
                className={`
                pl-3 flex items-center gap-2
                ${
                  Number(data?.buyPercentage) > 0
                    ? "text-[#37bc56]"
                    : "text-[#FF505C]"
                }
                `}
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
            className="rounded-2xl grid items-center justify-between p-4 w-full mt-1"
          >
            <p className="text-[#4c4c4c]">{section1?.sell}</p>
            <div className="text-[#FF505C] flex items-center">
              {Number(data?.sellPercentage) > 0 ? (
                <Image src={arrowUp} alt="arrowUp" />
              ) : (
                <Image src={arrowDown} alt="arrowDown" />
              )}
              <div
                className={`
                border-r pr-3 flex items-center gap-2
                 ${
                   Number(data?.sellPercentage) > 0
                     ? "text-[#37bc56]"
                     : "text-[#FF505C]"
                 }
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
                className={`
                pl-3 flex items-center gap-2
                 ${
                   Number(data?.sellPercentage) > 0
                     ? "text-[#37bc56]"
                     : "text-[#FF505C]"
                 }
                `}
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
      <div className="mt-10" dir={language == "en" ? "ltr" : "rtl"} id="home">
        <div className="flex items-end justify-start px-5 mx-6 ">
          <p
            className={`text-4xl ${
              language === "en" ? "font-ibm-600" : "font-tajawal-500"
            }`}
          >
            {translations[language].section1.unlock}
            <span className="inline-block w-32 h-[1px] ml-2 bg-gradient-custom"></span>
          </p>
        </div>
        <div className="flex items-center justify-between p-5 mx-6 ">
          <div className="w-[1px] h-[11vh] bg-[#E5BB32] ml-1 " />
          <p
            className={`text-2xl ${
              language == "en" ? "pr-20 font-ibm-600" : "pl-20 font-tajawal-400"
            }`}
          >
            {translations[language].section1.potential}
            <br />
            <span
              className={`text-5xl  text-[#E5BB32] mt-3 ${
                language == "en" ? "pl-8 font-ibm-600" : "pr-8 font-tajawal-700"
              }`}
            >
              {translations[language].section1.gold}
            </span>
          </p>
        </div>
        <p
          className={`px-4 text-base mx-6  ${
            language == "en" ? "  font-ibm-600" : "  font-tajawal-400"
          } `}
        >
          {translations[language].section1.text}
        </p>
        <button
          className={`bg-[#E9C237] text-white p-4  mt-10 ${
            language == "en"
              ? "pl-[6rem] pr-14 rounded-r-xl font-ibm-500 "
              : "pr-[6rem] pl-14 rounded-l-xl font-tajawal-500 "
          }`}
        >
          {translations[language].section1.download}
        </button>
        <Image
          src={bg1Mobile}
          alt="bg1Mobile"
          className="mx-6 mt-6"
          loading="eager"
        />
      </div>
    </>
  );
};

export default Page1Mobile;
