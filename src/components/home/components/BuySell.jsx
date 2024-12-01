"use client";
import React, { useState } from "react";
import BuySellForm from "./BuySellForm";
import SellCard from "./SellCard";
import BuyCard from "./BuyCard";
import useLanguage from "@/context/useLanguage";
import { useUserCurrentBalance } from "@/apis/wallet/queries";
import { useGetUserGold } from "@/apis/user/queries";

const BuySell = ({ configuration, goldPrice }) => {
  const { data: userBalance } = useUserCurrentBalance();
  const { data: userGold } = useGetUserGold();

  const [active, setActive] = useState("buyWeight"); // Tracks the active tab (buy/sell)
  const { language, translations } = useLanguage();
  const buySell = translations[language]?.buySell;
  return (
    <div
      className="mt-16 mb-12 flex justify-center bg-white gap-20 "
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <BuySellForm
        userGold={userGold}
        active={active}
        setActive={setActive}
        configuration={configuration}
        goldPrice={goldPrice}
        buySell={buySell}
        language={language}
      />

      {/* Border Div with Background */}
      <div className=" my-10 w-1 bg-gray-300" />

      {active === "buyWeight" || active === "buyMoney" ? (
        <BuyCard buySell={buySell} userBalance={userBalance} />
      ) : (
        <SellCard buySell={buySell} userGold={userGold} />
      )}
    </div>
  );
};

export default BuySell;
