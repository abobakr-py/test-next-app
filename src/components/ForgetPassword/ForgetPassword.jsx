"use client";
import React, { useEffect, useState } from "react";
import SwiperPage from "../SwiperPage/SwiperPage";
import backButton from "../../assets/signup/back-button.png";
import rightArrow from "../../assets/forgetPassword/arrow-right.png";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgetPassword } from "@/apis/OTP/mutations";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const egyptPhoneRegex = /^(?:\+20|0)?1[0125]\d{8}$/;
const ForgetPassword = () => {
  const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio);
  const [invalidInput, setInvalidInput] = useState(false);
  const mutation = useForgetPassword();
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
  const [formData, setFormData] = useState({
    phoneOrEmail: "",
  });
  const router = useRouter();
  const checkIfEmailOrPhone = (phoneOrEmail) => {
    const isEmail = emailRegex.test(phoneOrEmail?.target?.value);
    const isPhone = egyptPhoneRegex.test(phoneOrEmail?.target?.value);
    if (!isEmail && !isPhone) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "phoneOrEmail") {
      setInvalidInput(false); // Reset error on input change
    }
  };

  const handleSubmit = (e) => {
    let sentData;

    e.preventDefault();
    // Check if the input is an email
    const isEmail = emailRegex.test(formData?.phoneOrEmail);

    // Check if the input is a valid phone number (digits only, with optional + at the start)
    const isPhone = egyptPhoneRegex.test(formData?.phoneOrEmail);

    if (isEmail) {
      // Set up sentData for email case
      sentData = {
        credentials_type: "email",
        email: formData?.phoneOrEmail,
      };
    } else if (isPhone) {
      // Set up sentData for phone case (country code handling can be added if needed)
      sentData = {
        credentials_type: "phone",
        phone: formData?.phoneOrEmail.slice(1),
        countryCode: "20",
      };
    }
    mutation.mutate(sentData);
  };

  return (
    <div className="flex flex-row    font-ibm ">
      <div
        className={`w-1/2 p-16  flex-1 my-auto h-fit flex flex-col ${
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
          Reset Your Password
        </h1>
        <h2 className="text-subGrey text-base">
          Forgot your password? No worries! Enter your phone number below and
          we&apos;ll send you a code to reset it.
        </h2>
        <div className="pt-12 flex-1">
          <form
            onSubmit={handleSubmit}
            className="mx-16 flex flex-col relative h-full"
          >
            <label className="text-subGrey text-xs mb-3">
              Phone Number or E-mail
            </label>
            <input
              type="text"
              name="phoneOrEmail"
              value={formData.phoneOrEmail}
              onBlur={checkIfEmailOrPhone}
              onChange={handleChange}
              className={`
                  ${
                    invalidInput
                      ? "border-red-500 text-red-500 placeholder-red-500"
                      : ""
                  }
                  shadow-sm  bg-white border-2 text-mainYellow placeholder-mainYellow rounded-2xl border-mainYellow focus:border ml-2 p-4 mb-2
                  `}
              placeholder="Enter Your Phone Or Email"
            />
            <span
              className={`text-xs ${
                invalidInput ? "block text-red-500 ml-3" : "hidden"
              }`}
            >
              Invalid Phone Number or E-mail
            </span>
            <button
              disabled={formData?.phoneOrEmail.length === 0 || invalidInput}
              type="submit"
              className={`bg-mainYellow text-base text-white p-4 rounded-2xl  disabled:bg-[#999999]
                ${invalidInput ? "mt-10" : "mt-14"}
                `}
            >
              Send Code
            </button>
            <p className="text-subGrey text-center flex items-center justify-center gap-1 mt-8">
              Remember Password ?
              <Link
                href={"/login"}
                className="text-mainYellow flex items-center justify-center gap-1"
              >
                Login <Image src={rightArrow} alt="arrow" />
              </Link>
            </p>
          </form>
        </div>
      </div>
      <SwiperPage />
    </div>
  );
};

export default ForgetPassword;
