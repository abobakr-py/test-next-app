"use client";
 import BuySell from "./BuySell";
import Charts from "./Charts";
import useLanguage from "@/context/useLanguage";
import TotalAssets from "./TotalAssets";
import {
  FormatArabicNumbers,
  FormatBalance,
  FormatFullDate,
  FormatFullDateArabic,
} from "@/helper/utilFunctions";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Skeleton } from "@mui/material";
import CandlestickChart from "./TestChart";
import arrowUp from "@/assets/arrowUp.svg";
import arrowDown from "@/assets/arrowDown.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePurchase } from "@/zustand/usePurchase";

const CurrentGoldPriceWithChart = ({ goldPrice, userGold, configuration }) => {
  const { language, translations } = useLanguage();
  const wallet = translations[language].wallet;
  const dashboard = translations[language].dashboard;
  const goldPriceTotal = userGold?.golds?.totalWeight * userGold?.price;

  const [activeTab, setActiveTab] = useState("24H");
  const tabs = [
    {
      id: "24H",
      labelEn: "24H",
      labelAr: (
        <div className="flex items-center gap-1 justify-center">
          24 <span></span>ساعه
        </div>
      ),
    },
    {
      id: "1W",
      labelEn: "1W",
      labelAr: (
        <div className="flex items-center gap-1 justify-center">
          1 <span></span>اسبوع
        </div>
      ),
    },
    {
      id: "1M",
      labelEn: "1M",
      labelAr: (
        <div className="flex items-center gap-1 justify-center">
          1 <span></span>شهر
        </div>
      ),
    },
    {
      id: "6M",
      labelEn: "6M",
      labelAr: (
        <div className="flex items-center gap-1 justify-center">
          6 <span></span>أشهر
        </div>
      ),
    },
    {
      id: "1Y",
      labelEn: "1Y",
      labelAr: (
        <div className="flex items-center gap-1 justify-center">
          1 <span></span>سنه
        </div>
      ),
    },
    { id: "YTD", labelEn: "YTD", labelAr: "منذ  سنة" },
    { id: "ALL", labelEn: "ALL", labelAr: "الكل" },
  ];
  return (
    <div className={`${language === "en" ? "font-ibm" : "font-ibmArabic"} `}>
      {/* Gold Price */}
      <p
        className={`
        text-xs text-[#808080] mb-4 ${
          language === "en" ? "" : "text-right"
        }        `}
      >
        {dashboard?.updated}{" "}
        {language === "en"
          ? FormatFullDate(goldPrice?.DateOfRecord)
          : FormatFullDateArabic(goldPrice?.DateOfRecord)}
      </p>
      <div
        className="flex items-center justify-center gap-6"
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
          className={`rounded-2xl flex items-center justify-between p-4 w-full
            
          
            `}
        >
          <p className="text-[#4c4c4c]">{dashboard?.gold24KAskPrice}</p>
          <div className={`text-[#FF505C] flex items-center`}>
            {Number(goldPrice?.buyPercentage) > 0 ? (
              <Image src={arrowUp} alt="arrowUp" />
            ) : (
              <Image src={arrowDown} alt="arrowDown" />
            )}
            <div
              className={`
                ${language === "en" ? "border-r pr-3" : "border-l pl-3"}
                ${
                  Number(goldPrice?.buyPercentage) > 0
                    ? "text-[#37bc56]"
                    : "text-[#FF505C]"
                }
                flex items-center gap-2
                `}
            >
              {isNaN(goldPrice?.LocalPrice24) ? (
                <Skeleton width={"25px"} />
              ) : (
                FormatBalance(goldPrice?.LocalPrice24)
              )}
              {wallet.egp}
            </div>
            <div
              className={` flex items-center gap-2
                ${language === "en" ? "pl-3" : "pr-3"}
                  ${
                    Number(goldPrice?.buyPercentage) > 0
                      ? "text-[#37bc56]"
                      : "text-[#FF505C]"
                  }
                `}
            >
              {isNaN(goldPrice?.buyPercentage) ? (
                <Skeleton width={"25px"} />
              ) : (
                `${FormatBalance(goldPrice?.buyPercentage)}%`
              )}{" "}
              (
              {isNaN(goldPrice?.buyDiff) ? (
                <Skeleton width={"25px"} />
              ) : (
                // <Skeleton width={"25px"} />
                FormatBalance(goldPrice?.buyDiff)
              )}
              {wallet.egp})
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
          <p className="text-[#4c4c4c]">{dashboard?.gold24KBidPrice}</p>
          <div className="text-[#FF505C] flex items-center">
            {Number(goldPrice?.sellPercentage) > 0 ? (
              <Image src={arrowUp} alt="arrowUp" />
            ) : (
              <Image src={arrowDown} alt="arrowDown" />
            )}
            <div
              className={`
                ${
                  language === "en" ? "border-r pr-3" : "border-l pl-3"
                }  flex items-center gap-2
                ${
                  Number(goldPrice?.sellPercentage) > 0
                    ? "text-[#37bc56]"
                    : "text-[#FF505C]"
                }
                `}
            >
              {isNaN(goldPrice?.LocalSellPrice24) ? (
                <Skeleton width={"25px"} />
              ) : (
                FormatBalance(goldPrice?.LocalSellPrice24)
              )}
              {wallet.egp}
            </div>
            <div
              className={` flex items-center gap-2
                                ${language === "en" ? "pl-3" : "pr-3"}

                ${
                  Number(goldPrice?.sellPercentage) > 0
                    ? "text-[#37bc56]"
                    : "text-[#FF505C]"
                }`}
            >
              {isNaN(goldPrice?.sellPercentage) ? (
                <Skeleton width={"25px"} />
              ) : (
                `${FormatBalance(goldPrice?.sellPercentage)}%`
              )}{" "}
              (
              {isNaN(goldPrice?.sellDiff) ? (
                <Skeleton width={"25px"} />
              ) : (
                FormatBalance(goldPrice?.sellDiff)
              )}
              {wallet.egp})
            </div>
          </div>
        </div>
      </div>

      <TotalAssets
        wallet={wallet}
        dashboard={dashboard}
        language={language}
        goldPriceTotal={goldPriceTotal}
      />

      {/* Gold Price Chart */}
      <div className="">
        {/* <p className="text-sm text-[#808080] mt-12 mb-4">Gold Price Chart</p> */}
        <BuySell configuration={configuration} goldPrice={goldPrice} />
        <div className="grid">
          <p
            className={`mx-12 text-[#595959] text-xl ${
              language === "en" ? "" : "text-right"
            }`}
          >
            {dashboard?.goldPriceChart}
          </p>
          <div
            className="flex p-2 text-center items-center justify-center flex-wrap mb-8 mt-12 bg-[#fcfcfc] rounded-xl"
            dir={language === "en" ? "ltr" : "rtl"}
          >
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer flex-1 py-2 px-10 rounded-xl ${
                  activeTab === tab.id
                    ? "bg-[#fbf5de] text-[#E9C237]"
                    : "text-[#808080]"
                }`}
              >
                {language === "en" ? tab.labelEn : tab.labelAr}
              </div>
            ))}
          </div>
          <Charts />
        </div>
      </div>
    </div>
  );
};

export default CurrentGoldPriceWithChart;
