"use client";
import React, { useState } from "react";
import MoneyCard from "./MoneyCard";
import MoneyDrawer from "./MoneyDrawer";
import { useUserMoneyTransactions } from "@/apis/wallet/queries";
import { useFilterMoneyGold } from "@/zustand/useFilterMoneyGold";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Skeleton } from "@mui/material";
import useLanguage from "@/context/useLanguage";

export const moneyData = [
  {
    id: 1,
    date: new Date(),
    amount: 10000,
    status: "Pending",
    transaction: "Deposit",
  },
  {
    id: 2,
    date: new Date(),
    amount: 10000,
    status: "Approved",
    transaction: "WithDraw",
  },
  {
    id: 3,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 4,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 5,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 6,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 7,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 8,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 9,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 10,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 11,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 12,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 13,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 14,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
  {
    id: 15,
    date: new Date(),
    amount: 10000,
    status: "Rejected",
    transaction: "Deposit",
  },
];
const MoneyTransactionHistory = ({ wallet, language, hideBalance }) => {
  const { data: MoneyTransactionHistory, isLoading } = useUserMoneyTransactions(
    { limit: 4 }
  );
  const [seeAllDrawer, setSeeAllDrawer] = useState(false);
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
        <MoneyDrawer
          seeAllDrawer={seeAllDrawer}
          setSeeAllDrawer={setSeeAllDrawer}
          wallet={wallet}
          language={language}
        />
      )}
      <div
        className={`
          flex items-center justify-between w-full
          ${language === "en" ? "font-ibm" : "font-ibmArabic"}
          `}
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <p
          className={`
          text-[#595959] text-sm
                    ${language === "en" ? "font-ibm" : "font-ibmArabic"}

          `}
        >
          {wallet.moneyHistory}
        </p>
        <p
          className={`text-sm font-medium text-[#e9c237] underline cursor-pointer ${
            MoneyTransactionHistory?.result.length === 0 ? "hidden" : ""
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
          {MoneyTransactionHistory?.result.length === 0 ? (
            <p className="text-center mt-20 text-2xl text-[#595959]">
              {wallet.noTransactionYet}
            </p>
          ) : (
            MoneyTransactionHistory?.result?.map((data, index) => (
              <div key={data?.id}>
                <MoneyCard
                  theData={data}
                  language={language}
                  wallet={wallet}
                  NoHover={true}
                  hideBalance={hideBalance}
                />
                <hr className={`text-[#F5F5F5] border-t-[2px] ${index===3?'hidden':''}`} />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default MoneyTransactionHistory;
