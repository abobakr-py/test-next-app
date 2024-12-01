"use client";
import Image from "next/image";
import Page1Image from "../../../assets/page1/bg1Web.png";
import useLanguage from "@/context/useLanguage";
import { useState } from "react";
import exchangeHome from "@/assets/pageBetween1And2/exchangeHome.svg";
import Decimal from "decimal.js";
const PageBetween1And2Mobile = ({ data }) => {
  const { language, translations } = useLanguage();
  const wallet = translations[language].wallet;
  const [active, setActive] = useState("buyWeight");
  const [inputValue, setInputValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    if (value === "") {
      setInputValue("");
      setConvertedValue("");
      return;
    }

    if (active === "buyWeight") {
      value = value.replace(/[^0-9.]/g, "");

      // Prevent multiple decimal points
      const decimalMatches = (value.match(/\./g) || []).length;
      if (decimalMatches > 1) {
        value = value.slice(0, -1); // Trim the last character if more than one decimal point
      }
      // Ensure only up to 3 decimal places after the decimal point
      if (value.includes(".")) {
        const [integerPart, decimalPart] = value.split(".");
        value = `${integerPart}.${decimalPart.slice(0, 3)}`;
      }
      const numericValue = new Decimal(value);

      // Check if the value is a valid number and not negative
      if (numericValue.isNegative()) {
        return; // Exit if the input is invalid or negative
      }
      setInputValue(value);
      setConvertedValue(
        numericValue
          .times(data?.buy)
          .toDecimalPlaces(2, Decimal.ROUND_DOWN)
          .toString()
      );
    }
    if (active === "buyMoney") {
      value = value.replace(/[^0-9]/g, ""); // Only allow numbers

      const decimalMatches = (value.match(/\./g) || []).length;
      if (decimalMatches > 0) {
        // If more than one decimal point, trim the last character
        value = value.slice(0, -1);
      }
      const numericValue = new Decimal(value);

      // Check if the value is a valid number and not negative
      if (numericValue.isNegative()) {
        return; // Exit if the input is invalid or negative
      }
      setInputValue(value);

      setConvertedValue(
        numericValue
          .div(data?.buy)
          .toDecimalPlaces(3, Decimal.ROUND_DOWN)
          .toString()
      );
    }
    if (active === "sellWeight") {
      value = value.replace(/[^0-9.]/g, "");

      // Prevent multiple decimal points
      const decimalMatches = (value.match(/\./g) || []).length;
      if (decimalMatches > 1) {
        value = value.slice(0, -1); // Trim the last character if more than one decimal point
      }

      // Ensure only up to 3 decimal places after the decimal point
      if (value.includes(".")) {
        const [integerPart, decimalPart] = value.split(".");
        value = `${integerPart}.${decimalPart.slice(0, 3)}`;
      }
      const numericValue = new Decimal(value);

      // Check if the value is a valid number and not negative
      if (numericValue.isNegative()) {
        return; // Exit if the input is invalid or negative
      }
      setInputValue(value);

      setConvertedValue(
        numericValue
          .times(data?.sell)
          .toDecimalPlaces(2, Decimal.ROUND_DOWN)
          .toString()
      );
    }
    if (active === "sellMoney") {
      value = value.replace(/[^0-9]/g, ""); // Only allow numbers

      const decimalMatches = (value.match(/\./g) || []).length;
      if (decimalMatches > 0) {
        // If more than one decimal point, trim the last character
        value = value.slice(0, -1);
      }
      const numericValue = new Decimal(value);

      // Check if the value is a valid number and not negative
      if (numericValue.isNegative()) {
        return; // Exit if the input is invalid or negative
      }
      setInputValue(value);
      setConvertedValue(
        numericValue
          .div(data?.sell)
          .toDecimalPlaces(3, Decimal.ROUND_DOWN)
          .toString()
      );
    }
  };

  return (
    <div
      className="grid grid-cols-1 items-center  gap-[7.56520rem]   w-4/5 text-center mx-auto mb-24"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div
        dir={language === "en" ? "ltr" : "rtl"}
        className={`${
          language === "ar"
            ? "flex flex-col mt-5"
            : language === "eg"
            ? "flex flex-col mt-5"
            : ""
        }`}
      >
        <div className="flex items-end w-full lg:w-[65%] 2xl:w-full  mx-auto">
          <h1
            className={`whitespace-nowrap text-[4rem] text-[#404040] font-semibold ${
              language === "en" ? "font-ibm" : "font-ibmArabic"
            }`}
          >
            {language === "en" ? (
              <>
                Explore <span className="text-[#e9c237]">value</span>
              </>
            ) : (
              <>
                اكتشف <span className="text-[#e9c237]">قيمة</span>
              </>
            )}
          </h1>
          {language == "en" ? (
            <>
              <div className=" ml-4  flex w-full h-[1px] mb-6 bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
              <div className="   flex w-full h-[1px] mb-6 bg-gradient-to-r from-[#f5de6b] to-transparent" />
            </>
          ) : (
            <>
              <div className=" flex w-full h-[1px] mb-6 bg-gradient-to-r from-[#f5de6b] to-transparent" />
              <div className=" flex w-full h-[1px] mb-6 bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
            </>
          )}
        </div>
        <div className="flex relative items-center w-full lg:w-[65%] 2xl:w-full  mx-auto ">
          <div
            className={` absolute top-0
            ${language === "en" ? " left-2" : "right-2"}
            `}
          >
            <div className="h-[5.5vh] overflow-hidden w-[0.0625rem] bg-gradient-to-b from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
            <div className="h-[5.5vh] w-[0.0625rem] mb-6 bg-gradient-to-b from-[#f5de6b] to-transparent"></div>
          </div>
          <h2
            className={`flex items-center gap-1 whitespace-nowrap text-4xl ${
              language === "en"
                ? "font-ibm mr-auto mx-5"
                : "font-ibmArabic ml-auto mx-5"
            }`}
          >
            <span
              className={`mt-auto mb-1 text-[#404040] ${
                language === "en" ? "" : "hidden"
              }`}
            >
              of your
            </span>{" "}
            <br />
            <p
              className={`leading-none font-semibold text-center text-[4rem] text-[#E9C237] ${
                language === "en" ? "font-ibm" : "font-ibmArabic"
              }`}
            >
              {language === "en" ? <>investment. </> : <>استثمارك الآن </>}{" "}
            </p>
          </h2>
        </div>
        {language === "en" ? (
          <p
            className={`w-full  text-[#404040]   mt-6 mx-auto text-lg  ${
              language === "en"
                ? "font-ibm text-left"
                : "font-ibmArabic text-right"
            }`}
          >
            Use our Fractions Calculator to explore the value of your
            investment. Whether you’re buying{" "}
            <span className="text-[#e9c237]">a gram or a fraction,</span> know
            exactly what your investment is worth{" "}
          </p>
        ) : (
          <p
            className={`w-full  text-[#404040]   mt-6 mx-auto text-lg  font-ibmArabic text-right`}
          >
            استخدم حاسبة الذهب لمعرفة قيمة استثمارك. سواء كنت تشتري
            <span className="text-[#e9c237]"> جرامًا أو جزءًا،</span> اعرف
            بالضبط قيمة استثمارك.
          </p>
        )}
      </div>
      <div className="bg-[#fafafa] rounded-[2rem] w-fit mx-auto p-4">
        <div
          className="flex items-center rounded-2xl gap-2 p-2"
          style={{
            boxShadow:
              "0px 1px 3px 0px rgba(0, 0, 0, 0.02),0px 1px 6px 0px rgba(0, 0, 0, 0.07)",
          }}
        >
          <button
            onClick={() => {
              setActive("buyWeight");
              setInputValue(""); // Clear input value
              setConvertedValue(""); // Clear converted value
            }}
            className={`rounded-lg text-lg font-medium w-full ${
              language === "en" ? "font-ibm" : "font-ibmArabic"
            }  py-2  ${
              active === "buyWeight" || active === "buyMoney"
                ? "bg-[#e9c237] text-white"
                : "text-[#808080]"
            }`}
          >
            {wallet.buy}
          </button>
          <button
            onClick={() => {
              setActive("sellWeight");
              setInputValue(""); // Clear input value
              setConvertedValue(""); // Clear converted value
            }}
            className={`rounded-lg text-lg font-medium w-full ${
              language === "en" ? "font-ibm" : "font-ibmArabic"
            }  py-2  ${
              active === "sellWeight" || active === "sellMoney"
                ? "bg-[#e9c237] text-white"
                : "text-[#808080]"
            }`}
          >
            {wallet.sell}
          </button>
        </div>
        <div
          className="mt-6 bg-white rounded-[2rem] border relative"
          style={{
            boxShadow:
              "0px 1px 3px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px 0px rgba(0, 0, 0, 0.07)",
          }}
        >
          <Image
            onClick={() => {
              if (active === "buyWeight") {
                setActive("buyMoney");
              } else if (active === "buyMoney") {
                setActive("buyWeight");
              } else if (active === "sellWeight") {
                setActive("sellMoney");
              } else {
                setActive("sellWeight");
              }
              setInputValue(""); // Clear input value
              setConvertedValue(""); // Clear converted value
            }}
            src={exchangeHome}
            alt="exchange"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer w-16"
          />
          <div className="flex items-center justify-between px-16 py-10 border-b-2">
            <input
              placeholder="0"
              autoFocus={true}
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              className=" font-medium text-[#e9c237]  font-ibm text-[2rem] w-1/2  focus:outline-[#e9c237] focus:border-[#e9c237] border-none"
            />
            <p className="font-medium text-[#e9c237] font-ibm text-2xl">
              {active === "buyWeight" || active === "sellWeight"
                ? wallet.gram
                : wallet.egp}{" "}
            </p>
          </div>
          <div className="flex items-center justify-between px-16 py-10">
            <p className="font-medium text-[#595959] text-[2rem] font-ibm">
              {convertedValue || "0"}{" "}
            </p>
            <p className="font-medium text-[#595959] font-ibm text-2xl">
              {active === "buyWeight" || active === "sellWeight"
                ? wallet.egp
                : wallet.gram}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBetween1And2Mobile;
