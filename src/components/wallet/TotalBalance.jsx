"use client";
import React, { useState } from "react";
import { FormatArabicNumbers, FormatBalance } from "@/helper/utilFunctions";
import ToolTipComponent from "../common/ToolTipComponent";
import CardDisplay from "./CardDisplay";
import yellowEye from "@/assets/wallet/yellowEye.svg";
import yellowAdd from "@/assets/wallet/yellowAdd.svg";
import yellowWallet from "@/assets/wallet/yellowWallet.svg";
import WalletButton from "./WalletButton";
import { useUserCurrentBalance } from "@/apis/wallet/queries";
import LoadingSpinner from "../common/LoadingSpinner";
import { Skeleton } from "@mui/material";
const TotalBalance = ({ wallet, language, hideBalance, setHideBalance ,setPinOpenModal}) => {
  const { data: userBalance, isLoading } = useUserCurrentBalance();

  const displayedData = [
    {
      id: 1,
      title: wallet.available,
      value: userBalance?.balance.availBalance,
      toolTip: wallet.availableToolTip,
    },
    {
      id: 2,
      title: wallet.availableWithDraw,
      value: userBalance?.balance.availWithdraw,
      toolTip: wallet.availableWithDrawToolTip,
    },
    {
      id: 3,
      title: wallet.processing,
      value: Math.abs(userBalance?.balance?.pending),
      toolTip: wallet.processingToolTip,
    },
    {
      id: 4,
      title: wallet.totalStorageFees,
      value: 0,
      toolTip: wallet.totalStorageFeesToolTip,
    },
  ];
  const buttonsData = [
    {
      id: 1,
      imageUrl: yellowEye,
      title: hideBalance ? wallet.show : wallet.hide,
      onClick: () => {
        if (hideBalance) {
          setPinOpenModal();
        } else {
          setHideBalance();
        }
      },
    },
    // {
    //   id: 2,
    //   imageUrl: yellowAdd,
    //   title: wallet.add,
    //   onClick: () => console.log("Add Balance"),
    // },
    // {
    //   id: 3,
    //   imageUrl: yellowWallet,
    //   title: wallet.withdraw,
    //   onClick: () => console.log("Withdraw"),
    // },
  ];
  return (
    <div
      className={`
        p-12 rounded-[3rem] bg-[#fbf5de] mt-16 
        ${language === "en" ? "font-ibm" : "font-ibmArabic"}
        `}
      dir={language === "en" ? "ltr" : "rtl"}
    >
       <div>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium text-[#595959] w-fit">
            {wallet.total}
          </h1>
          <ToolTipComponent title={wallet.totalToolTip} />
        </div>
        {hideBalance ? (
          <div className="flex items-end">
            <p className="text-[#e9c237] text-[4rem] font-semibold w-fit mr-1">
              **********
            </p>
          </div>
        ) : (
          <div className="flex items-end">
            {isLoading ? (
              <Skeleton width={"200px"} />
            ) : (
              <>
                <p className="text-[#e9c237] text-[4rem] font-semibold w-fit mx-1">
                  {FormatBalance(userBalance?.balance?.current)}
                </p>
                <span className="text-lg text-[#595959] font-medium leading-[4rem]">
                  {wallet.egp}
                </span>
              </>
            )}
          </div>
        )}
      </div>
       <div className="grid  grid-cols-2  2xl:grid-cols-4 gap-3  mb-12 mt-8">
        {displayedData.map(({ id, title, toolTip, value }) => (
          <CardDisplay
            isLoading={isLoading}
            hideBalance={hideBalance}
            wallet={wallet}
            key={id}
            title={title}
            toolTip={toolTip}
            value={value}
            language={language}
          />
        ))}
      </div>
         {buttonsData?.map(({ id, imageUrl, onClick, title }) => (
          <WalletButton
            key={id}
            imageUrl={imageUrl}
            title={title}
            onClick={onClick}
          />
        ))}
      <div className="flex items-center justify-around gap-4 ">
      </div>
    </div>
  );
};

export default TotalBalance;
