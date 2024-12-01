"use client";
import React, { useEffect, useState } from "react";
import SwiperPage from "../SwiperPage/SwiperPage";
import backButton from "../../assets/signup/back-button.png";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountdownTimer from "./CountdownTimer";
import OTPField from "./OTPField ";
import { useVerifyLogin, useVerifyPhone } from "@/apis/OTP/mutations";
import { usePhoneNumberOrEmail } from "@/zustand/usePhoneNumberOrEmail";
import { Bounce, toast } from "react-toastify";
import { token } from "@/config/config";
import ReactGA from "react-ga4";
import useLanguage from "@/context/useLanguage";

const VerifyOTP = () => {
  const { language, translations } = useLanguage();
  const otpTranslation = translations[language].otp;
  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactGA.send(
        "pageview",
        window.location.pathname + window.location.search
      );
    }
  }, []);
  const emailOrPhone = localStorage.getItem("phoneOrEmail");
  const mutation = useVerifyLogin();
  const router = useRouter();
  useEffect(() => {
    if (token?.length > 0) {
      router.replace("/home"); // Use `replace` to prevent history stack update.
    }
  }, [token]); // Only run when token changes.
  const { phone, wrongOTP, setWrongOTP } = usePhoneNumberOrEmail(
    (state) => state
  );
  const [OTPFull, setOTPFull] = useState(false);
  const [submittedAutomatically, setSubmittedAutomatically] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isSubmit, setIsSubmit] = useState(false);
  const allFieldsFilled = (array) => {
    return array.every((value) => value.trim() !== "");
  };
  const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio);
  const [resetTimer, setResetTimer] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setZoomLevel(window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    // Initial value
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (OTPFull && !submittedAutomatically) {
      handleSubmit();
      setSubmittedAutomatically(true);
    }
  }, [OTPFull]);
  const handleSubmit = async (e) => {
    ReactGA.event({
      category: "User Interaction",
      action: "Clicked Verify Button",
      label: "Verify Button",
    });
    if (e) e.preventDefault(); // Check if `e` exists before preventing default behavior
    setIsSubmit(true);
    let sentData;
    if (emailOrPhone.includes("@")) {
      sentData = {
        credentials_type: "email",
        email: emailOrPhone,
        otp: otp.join(""),
      };
    } else {
      sentData = {
        credentials_type: "phone",
        countryCode: "20",
        phone: emailOrPhone.startsWith("0")
          ? emailOrPhone.substring(1)
          : emailOrPhone,
        otp: otp.join(""),
      };
    }
    await mutation
      .mutateAsync(sentData)
      .then(() => {
        toast("Account Successfully verified", {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
        router.push("/dashboard");
      })

      .catch((error) => {
        if (allFieldsFilled(otp)) {
          setWrongOTP(true);
        } else {
          setWrongOTP(false);
        }
      });
  };

  return (
    <div
      className="flex flex-row    font-ibm "
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div
        className={`w-1/2 p-16  flex-1 flex flex-col ${
          zoomLevel < 1.562 ? "h-screen" : ""
        }`}
      >
        <Link href={"/login"} className="w-fit mt-[15.    %]">
          <Image src={backButton} alt="backButton" />
        </Link>
        <h1 className="text-[#4c4c4] mt-6 mb-4 text-2xl">
          {otpTranslation.verify}
        </h1>
        <h2 className="text-subGrey text-base">{otpTranslation.enter}</h2>
        <div className="pt-12 flex-1">
          <form
            onSubmit={handleSubmit}
            className="mx-16 flex flex-col relative h-full"
          >
            <OTPField
              OTPFull={OTPFull}
              setOTPFull={setOTPFull}
              otp={otp}
              setOtp={setOtp}
              wrongOTP={wrongOTP}
              setWrongOTP={setWrongOTP}
              isSubmit={isSubmit}
              language={language}
              otpTranslation={otpTranslation}
            />
            <button
              type="submit"
              className="bg-mainYellow text-base text-white p-4 rounded-2xl mt-16 disabled:bg-[#999999]"
            >
              {otpTranslation.verifyButton}
            </button>
            <CountdownTimer
              resetTimer={resetTimer}
              setResetTimer={setResetTimer}
              otpTranslation={otpTranslation}
            />
          </form>
        </div>
      </div>
      <SwiperPage />
    </div>
  );
};

export default VerifyOTP;
