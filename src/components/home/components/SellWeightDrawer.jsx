"use client";
import { usePurchase } from "@/zustand/usePurchase";
import React, { use, useEffect, useState } from "react";
import leftArrow from "@/assets/arrow-circle-left.svg";
import swap from "@/assets/arrow-swap-horizontal.svg";
import ticketDiscount from "@/assets/ticket-discount.svg";
import closeCircle from "@/assets/close-circle.svg";
import Image from "next/image";
import useLanguage from "@/context/useLanguage";
import { useGlobal } from "@/zustand/useGlobal";
import { FormatMoney } from "@/helper/utilFunctions";
import TextFieldWithData from "../../../components/common/TextFieldWithData";
import { useCheckVoucher, useSellGold } from "@/apis/dsahboard/mutations";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Skeleton } from "@mui/material";
import Decimal from "decimal.js";
import MainModal from "@/components/common/MainModal";
import Link from "next/link";
import LottieAnimation from "@/components/common/LottieAnimation";
import sellAnimation from "../../../assets/Money-Add.json";

const SellWeightDrawer = () => {
  const { mutateAsync } = useSellGold();
  const { purchaseInfo, pinCode, setPurchaseInfo, setPinCode } = usePurchase();
  const { language, translations } = useLanguage();
  const wallet = translations[language]?.wallet;
  const purchase = translations[language]?.purchase;
  const { setOpenDrawer, setOpenModal } = useGlobal();
  const {
    type,
    title,
    goldTitle,
    goldPrice,
    sellGoldTitle,
    sellGoldPrice,
    sellDiff,
    sellPercentage,
    percentage,
    diff,
    weight,
    convertedValue,
    storageFee,
    transactionFees,
    manufacturingFees,
    taxes,
    subTotal,
  } = purchaseInfo;

  return (
    <div
      className={`flex flex-col justify-center items-center p-16
                  ${language === "en" ? "font-ibm" : "font-ibmArabic"}

        `}
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="flex items-center justify-start gap-2 w-full mb-8">
        <Image
          onClick={() => {
            setOpenDrawer();
          }}
          src={leftArrow}
          alt="arrow"
          className={`cursor-pointer ${language === "ar" ? "rotate-180" : ""}`}
        />
        <p className="text-[#33333] text-xl font-medium">{title}</p>
      </div>
      <p className="text-sm text-[#595959] w-full"> {purchaseInfo?.date}</p>
      <div
        className="bg-white rounded-2xl p-4 mt-3 w-full"
        style={{
          boxShadow:
            "0px 1px 3px 0px rgba(0, 0, 0, 0.02) , 0px 1px 6px 0px rgba(0, 0, 0, 0.07)",
        }}
      >
        <p className="mb-2 text-sm text-[#595959]">{sellGoldTitle}</p>
        <p
          className={` font-medium  ${
            sellPercentage > 0 ? "text-[#28a745] " : "text-[#DC3545]"
          }`}
        >
          {FormatMoney(sellGoldPrice)} {wallet?.egp}
        </p>
        <div>
          {sellPercentage > 0 ? (
            <p className=" text-xs text-[#28a745]">
              +{sellPercentage}%
              <span className="text-[#595959]">
                ({sellPercentage}
                {wallet.egp})
              </span>
            </p>
          ) : (
            <p className=" text-xs text-[#DC3545]">
              {sellPercentage}%
              <span className="text-[#595959]">
                ({sellPercentage} {wallet.egp})
              </span>
            </p>
          )}{" "}
        </div>
      </div>
      <div className="flex items-center justify-evenly py-8  w-full whitespace-nowrap">
        <p className="text-[#33333] font-medium text-[1.5rem]">
          {weight} {wallet.grams}
        </p>
        <Image src={swap} alt="swap" />
        <p className="text-[#33333] font-medium text-[1.5rem]">
          {FormatMoney(
            new Decimal(sellGoldPrice * weight)
              .toDecimalPlaces(2, Decimal.ROUND_DOWN)
              .sub(transactionFees)
          )}{" "}
          {wallet.egp}
        </p>
      </div>

      <div className="relative  bg-[#faf0e2] rounded-2xl p-6">
        {/* Small circle */}
        <div
          className={`
            absolute w-2 h-2 bg-[#917244] rounded-full top-[1.78rem] 
            ${language === "en" ? "left-3" : "right-3"}
            `}
        ></div>
        <p className="text-[#917244] font-medium text-[0.8rem]">
          {purchase.sellTalk}
        </p>
      </div>

      <div className="w-full mt-4">
        <TextFieldWithData
          title={purchase?.current}
          data={
            <span
              className={` font-medium  ${
                sellPercentage > 0 ? "text-[#28a745] " : "text-[#DC3545]"
              }`}
            >
              {FormatMoney(sellGoldPrice)} {wallet?.egp}
            </span>
          }
        />
        <TextFieldWithData
          title={purchase?.totalWeightToSell}
          data={
            <span className={` font-medium  `}>
              {weight} {wallet?.grams}
            </span>
          }
        />
        <TextFieldWithData
          title={purchase?.valueOfGold}
          data={
            <span
              className={` font-medium  ${
                sellPercentage > 0 ? "text-[#28a745] " : "text-[#DC3545]"
              }`}
            >
              {FormatMoney(
                new Decimal(sellGoldPrice * weight)
                  .toDecimalPlaces(2, Decimal.ROUND_DOWN)
                  .toString()
              )}{" "}
              {wallet?.egp}
            </span>
          }
        />

        <TextFieldWithData
          title={purchase?.TransactionFee}
          data={
            <span className={` font-medium  `}>
              {transactionFees} {wallet?.egp}
            </span>
          }
        />
        <hr className="text-[#F5F5F5] border-t-[1px] my-3 whitespace-nowrap" />

        <TextFieldWithData
          title={purchase?.amountWeReceive}
          data={
            <span className={` font-medium  whitespace-nowrap`}>
              {FormatMoney(
                new Decimal(sellGoldPrice * weight)
                  .toDecimalPlaces(2, Decimal.ROUND_DOWN)
                  .sub(transactionFees)
              )}{" "}
              {wallet?.egp}
            </span>
          }
        />
      </div>
      <button
        style={{
          boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px 0px rgba(0, 0, 0, 0.07)`,
        }}
        className={`bg-[#E9C237] text-white font-medium text-lg   rounded-xl mt-8 w-full text-center py-3 disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={async () => {
          await mutateAsync({ orderDetails: weight, pin_code: pinCode }).then(
            (data) => {
              if (data?.status === 200) {
                setOpenModal();
              }
            }
          );
        }}
      >
        {purchase.confirmSell}
      </button>
      <MainModal
        onCloseFunction={() => {
          setPinCode(null);
          setOpenDrawer();
        }}
      >
        <div className={`
          flex flex-col items-center justify-end h-full gap-4 px-32 py-10 relative
                    ${language === "en" ? "font-ibm" : "font-ibmArabic"}

          `}>
          <div className="absolute -top-10">
            <LottieAnimation animationData={sellAnimation} />
          </div>
          <p className="text-[#595959] font-medium text-2xl whitespace-nowrap">
            {purchase?.yourGold}
          </p>
          <p className="text-[#595959] text-center">
            {" "}
            {purchase?.yourGoldSale}{" "}
          </p>
          <Link
            onClick={() => {
              setPinCode(null);
              setOpenDrawer();
              setOpenModal();
            }}
            href={"/wallet"}
            className="text-white bg-[#e9c237] rounded-xl w-full text-center py-3 cursor-pointer"
            style={{
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.02) , 0px 1px 6px 0px rgba(0, 0, 0, 0.07)",
            }}
          >
            {purchase?.wallet}
          </Link>
          <Link
            onClick={() => {
              setPinCode(null);
              setOpenDrawer();
              setOpenModal();
            }}
            href={"/wallet"}
            className="text-[#e9c237] bg -white rounded-xl w-full text-center py-3 cursor-pointer border border-[#e9c237]"
            style={{
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.02) , 0px 1px 6px 0px rgba(0, 0, 0, 0.07)",
            }}
          >
            {purchase?.viewTransaction}
          </Link>
        </div>
      </MainModal>
    </div>
  );
};

export default SellWeightDrawer;
