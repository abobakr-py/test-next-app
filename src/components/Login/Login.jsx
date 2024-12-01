"use client";
import ReactGA from "react-ga4";

import React, { useEffect, useState } from "react";
import SwiperPage from "../SwiperPage/SwiperPage";
// import backButton from "../../assets/signup/back-button.png";
// import eye from "../../assets/signup/eye.png";
// import eyeSlash from "../../assets/signup/eye-slash.png";

// import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/apis/login/mutations";
import { Bounce, toast } from "react-toastify";
import { token } from "@/config/config";
import { useSendEmailOrPhoneOTP } from "@/apis/OTP/mutations";
import useLanguage from "@/context/useLanguage";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const egyptPhoneRegex = /^(?:\+20|0)?1[0125]\d{8}$/;
const Login = () => {
  const { language, translations } = useLanguage();

  const loginTranslation = translations[language].login;
  const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio);
  const [invalidInput, setInvalidInput] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactGA.send(
        "pageview",
        window.location.pathname + window.location.search
      );
    }
  }, []);
  const { mutateAsync } = useSendEmailOrPhoneOTP();
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

  const checkIfEmailOrPhone = (phoneOrEmail) => {
    const isEmail = emailRegex.test(phoneOrEmail?.target?.value);
    const isPhone = egyptPhoneRegex.test(phoneOrEmail?.target?.value);
    if (!isEmail && !isPhone) {
      setInvalidInput(true);
      ReactGA.event({
        category: "User",
        action: "Invalid Input",
        label: `Invalid input for phone or email: ${phoneOrEmail?.target?.value}`,
      });
    } else {
      setInvalidInput(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "phoneOrEmail") {
      setInvalidInput(false); // Reset error on input change
      ReactGA.event({
        category: "User",
        action: "Input Change",
        label: `Entered ${name}: ${value}`,
      });
    }
  };
  const handleSubmit = async (e) => {
    localStorage.setItem("phoneOrEmail", formData.phoneOrEmail);
    e.preventDefault();
    ReactGA.event({
      category: "User",
      action: "Login Attempt",
      label: `User attempted login with ${formData.phoneOrEmail}`,
    });
    let sentData;
    const { phoneOrEmail } = formData;
    const isEmail = emailRegex.test(phoneOrEmail);

    const isPhone = egyptPhoneRegex.test(phoneOrEmail);

    if (isEmail) {
      localStorage.setItem("phoneOrEmailOTP", "email");
      sentData = {
        credentials_type: "email",
        email: phoneOrEmail,
      };
    } else if (isPhone) {
      localStorage.setItem("phoneOrEmailOTP", "phone");
      sentData = {
        credentials_type: "phone",
        phone: phoneOrEmail.startsWith("0")
          ? phoneOrEmail.substring(1)
          : phoneOrEmail,
        countryCode: "20",
      };
    }
    if (!invalidInput) {
      await mutateAsync(sentData)
        .then(() => {})
        .catch((error) => {
          toast(error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            type: "error",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
          });
        });
    }
  };
  return (
    <div
      className="flex flex-row    font-ibm  min-h-screen"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className={`w-1/2 p-16  flex-1 flex flex-col `}>
        <div className="  my-auto">
          <form onSubmit={handleSubmit} className="">
            <div className="mb-8">
              <h1 className="mb-4  text-4xl text-mainGrey font-medium">
                {loginTranslation.welcome}{" "}
                <span className="text-mainYellow font-semibold">
                  {" "}
                  {loginTranslation.sabika}
                </span>
              </h1>
              <h2 className="text-[#595959] text-lg ">
                {loginTranslation.join}
                {language === "en" ? (
                  <span className="text-mainYellow font-medium">
                    {loginTranslation.seamless}
                  </span>
                ) : null}
              </h2>
            </div>
            <div className="mx-24 flex flex-col relative h-full">
              <label className="text-subGrey text-xs mb-3">
                {loginTranslation.phoneOrEmail}
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
                placeholder={`${loginTranslation.phoneOrEmail}`}
              />
              <span
                className={`text-xs ${
                  invalidInput ? "block text-red-500 ml-3" : "hidden"
                }`}
              >
                {loginTranslation.invalid}
              </span>
              <button
                type="submit"
                className="bg-mainYellow text-base text-white py-2 px-4 rounded-2xl mt-4 disabled:bg-[#999999]"
              >
                {loginTranslation.login}
              </button>
            </div>
          </form>
        </div>
      </div>
      <SwiperPage language={language} />
    </div>
  );
};

export default Login;
