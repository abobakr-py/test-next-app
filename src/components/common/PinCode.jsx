"use client";
import React, { useState, useRef } from "react";
import scanBarcode from "@/assets/scan-barcode.svg";
import Image from "next/image";
import useLanguage from "@/context/useLanguage";
import leftArrow from "@/assets/arrow-circle-left.svg";
import { useGlobal } from "@/zustand/useGlobal";
import { usePurchase } from "@/zustand/usePurchase";
import { useCheckPinCode } from "@/apis/dsahboard/mutations";
const PinCode = ({ title, postApi, sentData, confirmFunction }) => {
  const { language, translations } = useLanguage();
  const pinCodeTranslation = translations[language].pinCode;
  const [pinCode, setThePinCode] = useState(Array(6).fill(""));
  const [wrongPin, setWrongPin] = useState(false);
  const { mutateAsync } = useCheckPinCode();
  const { setOpenDrawer, setPinOpenModal, openPinModal } = useGlobal();
  const { setPinCode } = usePurchase();
  const inputRefs = useRef([]);
  // Focus helper function
  const focusInput = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  // Handle input change
  const handleInputChange = (e, index) => {
    setWrongPin(false);
    const value = e.target.value;
    if (value.length === 1 && /^[0-9]$/.test(value)) {
      // Only allow numeric input and move forward
      const newPinCode = [...pinCode];
      newPinCode[index] = value;
      setThePinCode(newPinCode);

      if (index < 5) {
        focusInput(index + 1);
      }
    }
  };

  // Handle keydown for deletion and navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newPinCode = [...pinCode];

      if (pinCode[index]) {
        // Clear current input and keep focus on it
        newPinCode[index] = "";
        setThePinCode(newPinCode);
      } else if (index > 0) {
        // Move backward if current input is empty
        focusInput(index - 1);
      }
    }
    if (/^[0-9]$/.test(e.key) && pinCode[index] !== "") {
      // Move forward if input is already filled
      focusInput(index + 1);
    }
  };

  const onSubmit = async () => {
    await mutateAsync({ pin_code: pinCode.join("") }).then((res) => {
      if (res.data.isValid) {
        if (openPinModal) {
          confirmFunction();
          setPinOpenModal();
          setPinCode(null);
        } else {
          setPinCode(pinCode.join(""));
          // setOpenDrawer();
        }
      } else {
        setWrongPin(true);
      }
    });
  };
  return (
    <div
      className={`
        flex flex-col justify-center items-center p-16
        ${language === "en" ? "font-ibm" : "font-ibmArabic"}
        `}
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="flex items-center justify-start gap-2 w-full mb-12">
        <Image
          src={leftArrow}
          alt="arrow"
          className={`${openPinModal ? "hidden" : ""} cursor-pointer ${language==='en'?'':'rotate-180'}`}
          onClick={() => {
            setOpenDrawer();
          }}
        />
        <p className="text-[#33333] text-xl font-medium">
          {pinCodeTranslation?.[title]}
        </p>
      </div>
      <Image src={scanBarcode} alt="lock" />
      <p className="mt-6 mb-8">{pinCodeTranslation?.title}</p>
      <div className="flex items-center justify-around w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="password"
            maxLength="1"
            className={`
              ${
                wrongPin
                  ? "text-[#dc3545] outline-[#dc3545] bg-[#dc3545] bg-opacity-5 border-[#dc3545] border "
                  : pinCode[index]
                  ? "border border-[#e9c237] outline-[#e9c237] text-[#e9c237] caret-[#e9c237]"
                  : "border outline-[#e6e6e6] border-[#e6e6e6] caret-[#e6e6e6]"
              }
                w-[3.5rem] h-[5.8125rem]  rounded-lg text-center  text-4xl  focus:outline-none 
               
                `}
            value={pinCode[index]}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => {
              handleKeyDown(e, index);
            }}
          />
        ))}
      </div>
      {wrongPin ? (
        <p className="text-[#dc3545] text-xs font-medium mt-6">
          {pinCodeTranslation?.wrongPin}
        </p>
      ) : null}
      <div className="mt-10 flex items-center justify-center gap-4 w-full">
        {/* <button
          onClick={() => {
            if (openPinModal) {
              setPinOpenModal();
            } else {
              setOpenDrawer();
            }
          }}
          className="text-lg text-[#e9c237] border-[#e9c237] bg-white  font-medium rounded-xl border px-[40%] py-3"
        >
          {pinCodeTranslation?.cancel}
        </button> */}
        <button
          onClick={onSubmit}
          className="w-full text-lg text-white bg-[#e9c237] font-medium rounded-xl px-[40%] py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pinCode.includes("")}
        >
          {pinCodeTranslation?.confirm}
        </button>
      </div>
    </div>
  );
};

export default PinCode;
