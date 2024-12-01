"use client";
import React, { useEffect, useState } from "react";
import SwiperPage from "../SwiperPage/SwiperPage";
import backButton from "../../assets/signup/back-button.png";
import eye from "../../assets/signup/eye.png";
import tick from "../../assets/signup/tick-circle.png";
import yellowTick from "../../assets/signup/yellow-tick-circle.png";
import eyeSlash from "../../assets/signup/eye-slash.png";

import Image from "next/image";
import Link from "next/link";
import { useSetNewPassword } from "@/apis/OTP/mutations";

const CreatePassword = () => {
  const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio);
  const mutation = useSetNewPassword();
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
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let sentData;
    const phoneOrEmailType = localStorage.getItem("phoneOrEmailOTP");
    const phoneOrEmail = localStorage.getItem("phoneOrEmail");
    const OTP = localStorage.getItem("OTP");
    if (phoneOrEmailType === "Phone") {
      sentData = {
        countryCode: "20",
        phone: phoneOrEmail,
        otp: OTP,
        password: formData?.password,
        repeatPassword: formData?.confirmPassword,
      };
    } else {
      sentData = {
        email: phoneOrEmail,
        otp: OTP,
        password: formData?.password,
        repeatPassword: formData?.confirmPassword,
      };
    }
    mutation.mutate(sentData);
  };

  return (
    <div className="flex flex-row font-ibm ">
      <div
        className={`w-1/2 p-16  flex-1 flex flex-col ${
          zoomLevel < 1.562 ? "h-screen" : ""
        }`}
      >
        <Link href={"/"} className="w-fit">
          <Image src={backButton} alt="backButton" />
        </Link>
        {/* Header */}
        <h1 className="mt-6 mb-4 text-2xl text-mainGrey">
          Create a New Password{" "}
        </h1>
        <h2 className="mb-8 text-base text-subGrey">
          Create a new password for your account.
        </h2>

        <div className="flex-1 pt-12">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col h-full mx-16 "
          >
            <div className="relative">
              <label className="text-xs text-subGrey">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 pr-10 mt-2 mb-4 ml-2 bg-white shadow-sm focus:border-mainYellow focus:border"
                placeholder="Enter a new Password"
              />
              <span
                className="absolute right-0 flex items-center pr-3 cursor-pointer bottom-6"
                onClick={togglePasswordVisibility}
              >
                <Image
                  src={showPassword ? eyeSlash : eye}
                  alt="eye"
                  width={20}
                  height={20}
                />
              </span>
            </div>
            <div className="relative">
              <label className="text-xs text-subGrey">
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 pr-10 mt-2 mb-4 ml-2 bg-white shadow-sm focus:border-mainYellow focus:border"
                placeholder="Re-enter your new password"
              />
              <span
                className="absolute right-0 flex items-center pr-3 cursor-pointer bottom-6"
                onClick={toggleConfirmPasswordVisibility}
              >
                <Image
                  src={showConfirmPassword ? eyeSlash : eye}
                  alt="eye"
                  width={20}
                  height={20}
                />
              </span>
            </div>
            <div className="grid grid-cols-2 mb-4 gap-28 text-nowrap">
              <div className="flex flex-col space-y-1">
                <p
                  className={`flex items-center gap-2 ${
                    formData?.password.trim().length >= 8
                      ? "text-mainYellow"
                      : "text-[#999999]"
                  }`}
                >
                  <Image
                    src={
                      formData?.password.trim().length >= 8 ? yellowTick : tick
                    }
                    alt="tick"
                    width={16}
                    height={16}
                  />
                  At least 8 Characters.
                </p>
                <p
                  className={`flex items-center gap-2 ${
                    formData?.password.match(/\d/)
                      ? "text-mainYellow"
                      : "text-[#999999]"
                  }`}
                >
                  <Image
                    src={formData?.password.match(/\d/) ? yellowTick : tick}
                    alt="tick"
                    width={16}
                    height={16}
                  />
                  One number.
                </p>
                <p
                  className={`flex items-center gap-2 ${
                    formData?.password.match(/[A-Z]/)
                      ? "text-mainYellow"
                      : "text-[#999999]"
                  }`}
                >
                  <Image
                    src={formData?.password.match(/[A-Z]/) ? yellowTick : tick}
                    alt="tick"
                    width={16}
                    height={16}
                  />
                  One Uppercase Letter.
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <p
                  className={`flex items-center gap-2 ${
                    formData?.password.match(/[a-z]/)
                      ? "text-mainYellow"
                      : "text-[#999999]"
                  }`}
                >
                  <Image
                    src={formData?.password.match(/[a-z]/) ? yellowTick : tick}
                    alt="tick"
                    width={16}
                    height={16}
                  />
                  One Lowercase letter.
                </p>
                <p
                  className={`flex items-center gap-2 ${
                    formData?.password.match(/[\W_]/)
                      ? "text-mainYellow"
                      : "text-[#999999]"
                  }`}
                >
                  <Image
                    src={formData?.password.match(/[\W_]/) ? yellowTick : tick}
                    alt="tick"
                    width={16}
                    height={16}
                  />
                  One Special Character.
                </p>
                <p
                  className={`flex items-center gap-2 ${
                    formData?.password !== "" &&
                    formData?.confirmPassword !== "" &&
                    formData?.password === formData?.confirmPassword
                      ? "text-mainYellow"
                      : "text-[#999999]"
                  }`}
                >
                  <Image
                    src={
                      formData?.password !== "" &&
                      formData?.confirmPassword !== "" &&
                      formData?.password === formData?.confirmPassword
                        ? yellowTick
                        : tick
                    }
                    alt="tick"
                    width={16}
                    height={16}
                  />
                  Matching.
                </p>
              </div>
            </div>

            <button
              disabled={
                !(
                  formData?.password.trim().length >= 8 &&
                  /\d/.test(formData?.password) &&
                  /[A-Z]/.test(formData?.password) &&
                  /[a-z]/.test(formData?.password) &&
                  /[\W_]/.test(formData?.password) &&
                  formData?.password === formData?.confirmPassword
                )
              }
              type="submit"
              className="bg-mainYellow text-base text-white py-2 px-4 rounded-2xl mt-4 disabled:bg-[#999999]"
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <SwiperPage />
    </div>
  );
};

export default CreatePassword;
