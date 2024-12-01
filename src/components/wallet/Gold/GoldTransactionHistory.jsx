"use client";
import React, { useState } from "react";
import GoldCard from "./GoldCard";
import GoldDrawer from "./GoldDrawer";
import { useUserGoldTransactions } from "@/apis/wallet/queries";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Skeleton } from "@mui/material";

export const goldData = [
  {
    id: 1,
    date: new Date(),
    amount: 10000,
    weight: 20,
    transaction: "Purchase",
  },
  {
    id: 2,
    date: new Date(),
    amount: 10000,
    weight: 32,
    transaction: "Sell",
  },
  {
    id: 3,
    date: new Date(),
    amount: 10000,
    weight: 31,
    transaction: "Sell",
  },
  {
    id: 4,
    date: new Date(),
    amount: 10000,
    weight: 31,
    transaction: "Sell",
  },
  {
    id: 5,
    date: new Date(),
    amount: 10000,
    weight: 31,
    transaction: "Sell",
  },
];
const GoldTransactionHistory = ({ wallet, language, hideBalance }) => {
  const [seeAllDrawer, setSeeAllDrawer] = useState(false);
  const { data: GoldTransactionHistory, isLoading } = useUserGoldTransactions({
    page: 0,
    limit: 4,
  });
  return (
    <div
      className={`
        w-full bg-white rounded-[2.5rem] p-12
                  ${language === "en" ? "font-ibm" : "font-ibmArabic"}

        `}
      style={{
        boxShadow: `
        0px 1px 3px 0px rgba(0, 0, 0, 0.02),
        0px 1px 6px 0px rgba(0, 0, 0, 0.07)        `,
      }}
    >
      {seeAllDrawer && (
        <GoldDrawer
          seeAllDrawer={seeAllDrawer}
          setSeeAllDrawer={setSeeAllDrawer}
          wallet={wallet}
          language={language}
          hideBalance={hideBalance}
        />
      )}
      <div
        className="flex items-center justify-between w-full"
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <p className="text-[#595959] text-sm">{wallet.goldHistory}</p>
        <p
          className={`text-sm font-medium text-[#e9c237] underline cursor-pointer ${
            GoldTransactionHistory?.result.length === 0 ? "hidden" : ""
          }`}
          onClick={() => {
            setSeeAllDrawer(!seeAllDrawer);
          }}
        >
          {wallet.seeAll}
        </p>
      </div>

      {isLoading ? (
        <div className="text-center mt-10">
          <Skeleton width={"200px"} />
        </div>
      ) : (
        <>
          {GoldTransactionHistory?.result.length === 0 ? (
            <p className="text-center mt-20 text-2xl text-[#595959]">
              No Gold Transactions yet
            </p>
          ) : (
            GoldTransactionHistory?.result?.map((data,index) => (
              <div key={data?.id}>
                <GoldCard
                  NoHover={true}
                  theData={data}
                  language={language}
                  wallet={wallet}
                  hideBalance={hideBalance}
                />
                <hr
                  className={`text-[#F5F5F5] border-t-[2px] ${
                    index === 3 ? "hidden" : ""
                  }`}
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default GoldTransactionHistory;
