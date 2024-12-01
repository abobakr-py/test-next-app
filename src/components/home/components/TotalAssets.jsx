"use client";

import { useUserCurrentBalance } from "@/apis/wallet/queries";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ToolTipComponent from "@/components/common/ToolTipComponent";
import CardDisplay from "@/components/wallet/CardDisplay";
import WalletButton from "@/components/wallet/WalletButton";
import { useState } from "react";
import yellowEye from "@/assets/wallet/yellowEye.svg";
import yellowAdd from "@/assets/wallet/yellowAdd.svg";
import yellowWallet from "@/assets/wallet/yellowWallet.svg";
import { FormatArabicNumbers, FormatBalance } from "@/helper/utilFunctions";
import { Skeleton } from "@mui/material";
import { useGlobal } from "@/zustand/useGlobal";
const TotalAssets = ({ wallet, dashboard, language, goldPriceTotal }) => {
  const { data: userBalance, isLoading } = useUserCurrentBalance();
  // const [hideBalance, setHideBalance] = useState(true);
  const { hideBalance, setHideBalance, setPinOpenModal } = useGlobal();
  const displayedData = [
    {
      id: 1,
      title: dashboard.available,
      value: userBalance?.balance.availBalance,
      toolTip: dashboard.availableToolTip,
    },
    {
      id: 2,
      title: dashboard.goldAssets,
      value: isNaN(goldPriceTotal) ? 0 : goldPriceTotal,
      toolTip: dashboard.goldAssetsToolTip,
    },
    {
      id: 3,
      title: dashboard.processing,
      value: Math.abs(userBalance?.balance?.pending),
      toolTip: dashboard.processingToolTip,
    },
  ];

  return (
    <div
      className="p-12 rounded-[3rem] bg-[#fbf5de] mt-16 "
      dir={language === "en" ? "ltr" : "rtl"}
    >
      {/* Total Balance */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium text-[#595959] w-fit">
            {dashboard.totalAssets}
          </h1>
          <ToolTipComponent title={dashboard.totalAssetsToolTip} />
        </div>
        {hideBalance ? (
          <div className="flex items-end">
            <p className="text-[#e9c237] text-[4rem] font-semibold w-fit mr-1">
              **********
            </p>
          </div>
        ) : (
          <div className="flex items-end">
            {isLoading ||
            isNaN(
              userBalance?.balance.availBalance +
                goldPriceTotal +
                Math.abs(userBalance?.balance?.pending)
            ) ? (
              <Skeleton width={"200px"} />
            ) : (
              <>
                <p className="text-[#e9c237] text-[4rem] font-semibold w-fit mx-1">
                  {FormatBalance(
                    userBalance?.balance.availBalance +
                      goldPriceTotal +
                      Math.abs(userBalance?.balance?.pending)
                  )}
                </p>
                <span className="text-lg text-[#595959] font-medium leading-[4rem]">
                  {wallet.egp}
                </span>
              </>
            )}
          </div>
        )}
      </div>
      {/* Displaying Cards */}
      <div className="grid  grid-cols-1  2xl:grid-cols-3 gap-3  mb-12 mt-8">
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
      {/* Add Hide Withdraw */}
      <div className="flex w-fit justify-start  gap-4 text-start ml-2 ">
        <WalletButton
          imageUrl={yellowEye}
          title={hideBalance ? wallet.show : wallet.hide}
          onClick={() => {
            if (hideBalance) {
              setPinOpenModal();
            } else {
              setHideBalance();
            }
          }}
        />
      </div>
    </div>
  );
};

export default TotalAssets;
