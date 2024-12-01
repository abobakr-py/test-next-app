"use client";
import React, { useEffect, useState } from "react";
import Header from "../home/components/Header";
import TotalBalance from "./TotalBalance";
import useLanguage from "@/context/useLanguage";
import MoneyTransactionHistory from "./Money/MoneyTransactionHistory";
import GoldTransactionHistory from "./Gold/GoldTransactionHistory";
import { useGetUser } from "@/apis/user/queries";
import { useGlobal } from "@/zustand/useGlobal";
import ReactGA from "react-ga4";
import PinCode from "../common/PinCode";
import PinCodeModal from "../common/PinCodeModal";

const Wallet = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactGA.send(
        "pageview",
        window.location.pathname + window.location.search
      );
    }
  }, []);
  const { language, translations } = useLanguage();
  const [openProfile, setOpenProfile] = useState(false);
  const { data: user } = useGetUser();
  const { hideBalance, setHideBalance, setPinOpenModal } = useGlobal();
  const wallet = translations[language].wallet;
  return (
    <div
      className={`${language === "en" ? "font-ibm" : "font-ibmArabic"} `}
      onClick={() => {
        if (openProfile) setOpenProfile(false);
      }}
    >
      <p
        className={`
        absolute text-[#333333] text-opacity-[3%] font-medium text-[17.5rem] leading-[17rem] top-0 -z-10
        ${language === "en" ? "left-0" : "right-0 tracking-[0.6crem] top-2"}
        `}
      >
        {translations[language].header.wallet}
      </p>
      <div className="w-4/5 mx-auto font-ibm max-w-[1600px]  pb-36 z-10 relative">
        <Header
          language={language}
          user={user}
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
        <TotalBalance
          setPinOpenModal={setPinOpenModal}
          wallet={wallet}
          language={language}
          hideBalance={hideBalance}
          setHideBalance={setHideBalance}
        />
        <div className="flex  justify-center gap-6 mt-6">
          <MoneyTransactionHistory
            wallet={wallet}
            language={language}
            hideBalance={hideBalance}
          />
          <GoldTransactionHistory
            wallet={wallet}
            language={language}
            hideBalance={hideBalance}
          />
        </div>
      </div>
      <PinCodeModal>
        <PinCode
          confirmFunction={() => {
            setHideBalance();
          }}
        />
      </PinCodeModal>{" "}
    </div>
  );
};

export default Wallet;
