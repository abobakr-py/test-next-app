"use client";
import React, { useEffect, useState } from "react";
import SwiperPage from "../SwiperPage/SwiperPage";
import backButton from "../../assets/signup/back-button.png";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountdownTimer from "../VerifyOTP/CountdownTimer";
import OTPField from "../VerifyOTP/OTPField ";
import { useVerifyEmail, useVerifyPhone } from "@/apis/OTP/mutations";
import { usePhoneNumberOrEmail } from "@/zustand/usePhoneNumberOrEmail";
import { Bounce, toast } from "react-toastify";
import { token } from "@/config/config";

const VerifyPassReset = () => {
  const mutationPhone = useVerifyPhone();
  const mutationEmail = useVerifyEmail();
  const router = useRouter();
  // useEffect(() => {
  //   if (token?.length > 0) {
  //     router.push("/home");
  //   }
  // }, [router]);
  const { wrongOTP, setWrongOTP } = usePhoneNumberOrEmail((state) => state);
  const [OTPFull, setOTPFull] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    let sentData;
    let phoneOrEmailType = localStorage.getItem("phoneOrEmailOTP");
    let phoneOrEmail = localStorage.getItem("phoneOrEmail");
    if (phoneOrEmailType === "Phone") {
      sentData = {
        countryCode: "20",
        phone: phoneOrEmail,
        otp: otp.join(""),
      };
    } else {
      sentData = {
        email: phoneOrEmail,
        otp: otp.join(""),
      };
    }
    const mutation =
      phoneOrEmailType === "Email" ? mutationEmail : mutationPhone;
    mutation
      .mutateAsync(sentData)
      .then(() => {
        localStorage.setItem("OTP", otp.join(""));
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
        router.push("/create-password");
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
    <div className="flex flex-row    font-ibm ">
      <div
        className={`w-1/2 p-16 my-auto h-fit flex-1 flex flex-col ${
          zoomLevel < 1.562 ? "h-screen" : ""
        }`}
      >
        <div
          onClick={() => {
            router.back();
          }}
          className="w-fit cursor-pointer"
        >
          <Image src={backButton} alt="backButton" />
        </div>
        {/* Header */}
        <h1 className="text-[#4c4c4] mt-6 mb-4 text-2xl">
          Verify Your Identity
        </h1>
        <h2 className="text-subGrey text-base">
          Enter the code we sent to your{" "}
          {localStorage.getItem("phoneOrEmailOTP") === "Phone"
            ? "phone"
            : "email"}{" "}
          and create a new password.
        </h2>
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
            />
            <button
              type="submit"
              className="bg-mainYellow text-base text-white p-4 rounded-2xl mt-16 disabled:bg-[#999999]"
            >
              Verify
            </button>
            <CountdownTimer
              resetTimer={resetTimer}
              setResetTimer={setResetTimer}
            />
          </form>
        </div>
      </div>
      <SwiperPage />
    </div>
  );
};

export default VerifyPassReset;
