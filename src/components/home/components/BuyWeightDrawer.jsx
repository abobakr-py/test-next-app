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
import { useBuyGold, useCheckVoucher } from "@/apis/dsahboard/mutations";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Skeleton } from "@mui/material";
import MainModal from "@/components/common/MainModal";
import Link from "next/link";
import LottieAnimation from "@/components/common/LottieAnimation";
import buyAnimation from "../../../assets/gold-add.json";
import dayjs from "dayjs";
const BuyWeightDrawer = () => {
  const { mutateAsync, isSuccess } = useCheckVoucher();
  const { mutateAsync: buyGold } = useBuyGold();
  const { purchaseInfo, pinCode, setPurchaseInfo, setPinCode } = usePurchase();
  const { language, translations } = useLanguage();
  const wallet = translations[language]?.wallet;
  const purchase = translations[language]?.purchase;
  const [voucher, setVoucher] = useState({ voucher: "", apply: false });
  const [voucherSuccess, setVoucherSuccess] = useState(null);
  const { setOpenDrawer, setOpenModal } = useGlobal();
  const [discountAndAmount, setDiscountAndAmount] = useState({
    discount: 0,
    amount: 0,
  });

  const {
    type,
    title,
    goldTitle,
    goldPrice,
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
  useEffect(() => {
    async function fetchData() {
      if (pinCode) {
        await mutateAsync({
          pin_code: pinCode,
          weight: weight,
          voucher_code: null,
        }).then((data) => {
          setPurchaseInfo({
            ...purchaseInfo,
            manufacturingFees: data?.data?.manufacturingFees,
            taxes: data?.data?.taxes,
            transactionFees: data?.data?.transactionFees,
            storageFee: data?.data?.storageFees,
            convertedValue: data?.data?.total,
          });
        });
      }
    }
    fetchData();
  }, [weight]);
  return (
    <div
      className={`
        flex flex-col justify-center items-center p-16
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
        <p className="mb-2 text-sm text-[#595959]">{goldTitle}</p>
        <p
          className={` font-medium  ${
            percentage > 0 ? "text-[#28a745] " : "text-[#DC3545]"
          }`}
        >
          {FormatMoney(goldPrice)} {wallet?.egp}
        </p>
        <div>
          {percentage > 0 ? (
            <p className=" text-xs text-[#28a745]">
              +{percentage}%
              <span className="text-[#595959]">
                ({diff}
                {wallet.egp})
              </span>
            </p>
          ) : (
            <p className=" text-xs text-[#DC3545]">
              {percentage}%
              <span className="text-[#595959]">
                ({diff} {wallet.egp})
              </span>
            </p>
          )}{" "}
        </div>
      </div>
      <div className="flex items-center justify-evenly py-8  w-full whitespace-nowrap">
        {isSuccess ? (
          <>
            <p className="text-[#33333] font-medium text-[1.5rem]">
              {weight} {wallet.grams}
            </p>
            <Image src={swap} alt="swap" />
            <p className="text-[#33333] font-medium text-[1.5rem]">
              {convertedValue} {wallet.egp}
            </p>
          </>
        ) : (
          <Skeleton width={"240px"} />
        )}
      </div>

      <div className="relative  bg-[#faf0e2] rounded-2xl p-6">
        {/* Small circle */}
        <div
          className={`
            absolute w-1 h-1 bg-[#917244] rounded-full top-[2.1rem] 
            ${language === "en" ? "left-3" : "right-3"}
            `}
        ></div>
        <p className="text-[#917244] font-medium text-[0.8rem]">
          {purchase.secureGold}
        </p>
      </div>
      <p
        className={`${
          language === "en" ? "text-left" : "text-right"
        } text-sm text-[#595959] w-full mt-6`}
      >
        {purchase?.voucher}
      </p>
      <div
        className="p-4 w-full    items-center rounded-xl mt-3"
        style={{
          boxShadow:
            "0px 1px 3px 0px rgba(0, 0, 0, 0.02) , 0px 1px 6px 0px rgba(0, 0, 0, 0.07)",
        }}
      >
        {voucher.apply ? (
          <div className="flex items-center   gap-1 ">
            <Image src={ticketDiscount} alt="discount" />{" "}
            {voucher.voucher.toUpperCase()}{" "}
            <Image
              alt="discount"
              src={closeCircle}
              onClick={() => {
                setVoucher({ voucher: "", apply: false });
                setVoucherSuccess(null);
              }}
              className={`
               cursor-pointer
                ${language === "en" ? "ml-auto" : "mr-auto"}
                `}
            />
          </div>
        ) : (
          <div className="flex items-center  gap-1">
            <Image src={ticketDiscount} alt="discount" />{" "}
            <input
              type="text"
              className="w-4/5 border p"
              value={voucher.voucher}
              onChange={(e) => {
                setVoucher({ ...voucher, voucher: e.target.value });
              }}
            />
            <button
              onClick={async () => {
                setVoucher({ ...voucher, apply: true });
                await mutateAsync({
                  pin_code: pinCode,
                  weight: weight,
                  voucher_code: voucher.voucher,
                }).then((data) => {
                  console.log("data", data);
                  setVoucherSuccess(data.data.is_voucher_valid);
                  setDiscountAndAmount({
                    discount: data.data.discount,
                    amount: data.data.total,
                  });
                  setPurchaseInfo({
                    ...purchaseInfo,
                    manufacturingFees: data?.data?.manufacturingFees,
                    taxes: data?.data?.taxes,
                    transactionFees: data?.data?.transactionFees,
                    storageFee: data?.data?.storageFees,
                    convertedValue: data?.data?.total,
                    subTotal: data?.data?.subTotal,
                  });
                });
              }}
              className="ml-auto bg-[#E9C237] text-white py-1 px-4 rounded-2xl"
            >
              {purchase?.apply}
            </button>
          </div>
        )}
      </div>
      {voucher.apply && voucher.voucher ? (
        <div className="w-full my-4">
          {voucherSuccess === true ? (
            <p className="text-[#28A745] text-sm"> {purchase.successVoucher}</p>
          ) : null}
          {voucherSuccess === false ? (
            <p className="text-[#DC3545] text-sm">{purchase.failedVoucher}</p>
          ) : null}
        </div>
      ) : null}
      <div className="w-full">
        <TextFieldWithData
          title={purchase?.goldPrice}
          data={
            isSuccess ? (
              <span
                className={` font-medium  ${
                  percentage > 0 ? "text-[#28a745] " : "text-[#DC3545]"
                }`}
              >
                {FormatMoney(goldPrice)} {wallet?.egp}
              </span>
            ) : (
              <Skeleton width={"100px"} />
            )
          }
        />
        <TextFieldWithData
          title={purchase?.totalWeight}
          data={
            isSuccess ? (
              <span className={` font-medium  `}>
                {weight} {wallet?.grams}
              </span>
            ) : (
              <Skeleton width={"100px"} />
            )
          }
        />
        <TextFieldWithData
          title={purchase?.valueOfGold}
          data={
            isSuccess ? (
              <span
                className={` font-medium  ${
                  percentage > 0 ? "text-[#28a745] " : "text-[#DC3545]"
                }`}
              >
                {FormatMoney(goldPrice * weight)} {wallet?.egp}
              </span>
            ) : (
              <Skeleton width={"100px"} />
            )
          }
        />

        <TextFieldWithData
          title={purchase?.ManufacturingFee}
          data={
            isSuccess ? (
              <span className={` font-medium  `}>
                {manufacturingFees} {wallet?.egp}
              </span>
            ) : (
              <Skeleton width={"100px"} />
            )
          }
        />
        <TextFieldWithData
          title={purchase?.Taxes}
          data={
            isSuccess ? (
              <span className={` font-medium  `}>
                {taxes} {wallet?.egp}
              </span>
            ) : (
              <Skeleton width={"100px"} />
            )
          }
        />
        <TextFieldWithData
          title={purchase?.TransactionFee}
          data={
            isSuccess ? (
              <span className={` font-medium  `}>
                {transactionFees} {wallet?.egp}
              </span>
            ) : (
              <Skeleton width={"100px"} />
            )
          }
        />
        <TextFieldWithData
          title={purchase?.StorageFee}
          data={
            isSuccess ? (
              <span className={` font-medium  `}>
                {storageFee || 0} {wallet?.egp}
              </span>
            ) : (
              <Skeleton width={"100px"} />
            )
          }
        />
        <hr className="text-[#F5F5F5] border-t-[1px] my-3" />
        <TextFieldWithData
          title={purchase?.total}
          data={
            isSuccess ? (
              <span className={` font-medium  `}>
                {FormatMoney(
                  voucher.apply
                    ? subTotal
                    : convertedValue + discountAndAmount.discount
                )}{" "}
                {wallet?.egp}
              </span>
            ) : (
              <Skeleton width={"100px"} />
            )
          }
        />
        {voucherSuccess ? (
          <>
            {" "}
            <TextFieldWithData
              title={purchase?.Discount}
              data={
                isSuccess ? (
                  <span className={` font-medium text-[#DC3545] text-sm `}>
                    -{discountAndAmount.discount} {wallet?.egp}
                  </span>
                ) : (
                  <Skeleton width={"100px"} />
                )
              }
            />
            <TextFieldWithData
              title={purchase?.Amount}
              data={
                isSuccess ? (
                  <span className={` font-medium text-[#28A745] `}>
                    {discountAndAmount.amount || 0} {wallet?.egp}
                  </span>
                ) : (
                  <Skeleton width={"100px"} />
                )
              }
            />
          </>
        ) : null}
      </div>
      <button
        disabled={!isSuccess}
        style={{
          boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px 0px rgba(0, 0, 0, 0.07)`,
        }}
        className={`bg-[#E9C237] text-white font-medium text-lg   rounded-xl mt-8 w-full text-center py-3 disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={async () => {
          // setOpenModal();
          let formattedDate = dayjs(new Date()).format(
            "YYYY-MM-DDTHH:mm:ss.SSS"
          );

          // Add extra zeros for microseconds (since dayjs only supports up to milliseconds)
          formattedDate += "000";
          await buyGold({
            order_type: 3,
            pin_code: pinCode,
            timezone: formattedDate,
            orderDetails: [{ totalWeight: weight }],
          }).then((data) => {
            if (data?.status === 200) {
              setOpenModal();
            }
          });
        }}
      >
        {purchase.confirmPayment}
      </button>
      <MainModal
        onCloseFunction={() => {
          setPinCode(null);
          setOpenDrawer();
        }}
      >
        <div
          className={`
          flex flex-col items-center justify-end h-full gap-4 px-32 py-16 relative
          ${language === "en" ? "font-ibm" : "font-ibmArabic"}
          `}
        >
          <div className="absolute top-0">
            <LottieAnimation animationData={buyAnimation} />
          </div>
          <p className="text-[#595959] font-medium text-2xl whitespace-nowrap">
            {purchase?.yourPurchase}
          </p>
          {language === "en" ? (
            <p className="text-[#595959] text-center">
              {" "}
              {weight} {purchase?.gramOfGold}{" "}
            </p>
          ) : (
            <p className="text-[#595959] text-center">
              {" "}
              .{purchase?.addedGold} <span className="mx-1">{weight}</span>
              {purchase?.gramOfGold}{" "}
            </p>
          )}
          <Link
            onClick={() => {
              setPinCode(null);
              setOpenDrawer();
              setOpenModal();
            }}
            href={"/portfolio"}
            className="text-white bg-[#e9c237] rounded-xl w-full text-center py-3 cursor-pointer"
            style={{
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.02) , 0px 1px 6px 0px rgba(0, 0, 0, 0.07)",
            }}
          >
            {purchase?.portfolio}
          </Link>
        </div>
      </MainModal>
    </div>
  );
};

export default BuyWeightDrawer;
