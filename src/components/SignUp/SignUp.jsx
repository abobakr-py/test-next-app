"use client";
import React, { useState, useEffect } from "react";
import SwiperPage from "../SwiperPage/SwiperPage";
import backButton from "../../assets/signup/back-button.png";
import eye from "../../assets/signup/eye.png";
import tick from "../../assets/signup/tick-circle.png";
import yellowTick from "../../assets/signup/yellow-tick-circle.png";
import eyeSlash from "../../assets/signup/eye-slash.png";
import backgroundImage from "../../assets/swiper/backkground.png";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "@/apis/signup/mutations";
import { Bounce, toast } from "react-toastify";
import { usePhoneNumberOrEmail } from "@/zustand/usePhoneNumberOrEmail";
import { token } from "@/config/config";

const SignUp = () => {
  const { setPhone } = usePhoneNumberOrEmail((state) => state);
  const router = useRouter();
  // useEffect(() => {
  //   if (token?.length > 0) {
  //     router.push("/home");
  //   }
  // }, [router]);
  const mutation = useRegister();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    repeatPassword: "",
    countryCode: "20",
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

    // Define the regex for validating Egyptian phone numbers
    const egyptianPhoneRegex = /^01[0125]\d{8}$/;

    // Check if the phone number is valid
    if (!egyptianPhoneRegex.test(formData.phone)) {
      // Display an error toast if the phone number is invalid
      toast.error("Please enter a valid  phone number.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
      return; // Exit the function to prevent further actions
    }
    setPhone(formData?.phone.slice(1));
    localStorage.setItem("phone", formData?.phone.slice(1));
    // Call the mutation function to handle login if validation passes
    mutation.mutate(formData);
  };

  return (
    <div className="flex flex-row    font-ibm ">
      <div className="w-[55%] p-16    flex flex-col">
        <Link href={"/"} className="w-fit">
          <Image src={backButton} alt="backButton" />
        </Link>
        {/* Header */}
        <h1 className="mb-4 mt-6 text-2xl text-mainGrey">
          Welcome to <span className="text-mainYellow">Sabika</span>
        </h1>
        <h2 className="text-subGrey text-base mb-8">
          Join our community and enjoy{" "}
          <span className="text-mainYellow">
            a seamless, Shariah-compliant experience.
          </span>
        </h2>
        {/* Create Account / Login */}
        <div className="bg-backGrey flex items-center justify-around rounded-2xl text-center p-[0.2rem]">
          <p className="text-white bg-mainYellow w-full rounded-2xl p-[0.563rem] cursor-pointer">
            Create account
          </p>
          <Link
            href={"/login"}
            className="w-full p-2 cursor-pointer text-[#CCCCCC]"
          >
            Login
          </Link>
        </div>
        <div className="pt-12 flex-1">
          <form
            onSubmit={handleSubmit}
            className="mx-16 flex flex-col relative h-full"
          >
            <label className="text-subGrey text-xs">Full name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="shadow-sm mt-2 bg-white focus:border-mainYellow focus:border ml-2 p-2 mb-4"
              placeholder="Enter Your Full Name"
            />
            <label className="text-subGrey text-xs">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow-sm mt-2 bg-white border-2 text-mainYellow placeholder-mainYellow rounded-lg border-mainYellow focus:border ml-2 p-2 mb-4"
              placeholder="01"
            />
            <label className="text-subGrey text-xs">E-mail</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm mt-2 bg-white focus:border-mainYellow focus:border ml-2 p-2 mb-4"
              placeholder="Enter Your E-mail"
            />
            <div className="relative">
              <label className="text-subGrey text-xs">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow-sm mt-2 bg-white focus:border-mainYellow focus:border ml-2 p-2 mb-4 w-full pr-10"
                placeholder="Enter Your Password"
              />
              <span
                className="absolute bottom-6 right-0 flex items-center pr-3 cursor-pointer"
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
              <label className="text-subGrey text-xs">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="shadow-sm mt-2 bg-white focus:border-mainYellow focus:border ml-2 p-2 mb-4 w-full pr-10"
                placeholder="Confirm Your Password"
              />
              <span
                className="absolute bottom-6 right-0 flex items-center pr-3 cursor-pointer"
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
            <div className="grid grid-cols-2 gap-28 text-nowrap ">
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
                    formData?.repeatPassword !== "" &&
                    formData?.password === formData?.repeatPassword
                      ? "text-mainYellow"
                      : "text-[#999999]"
                  }`}
                >
                  <Image
                    src={
                      formData?.password !== "" &&
                      formData?.repeatPassword !== "" &&
                      formData?.password === formData?.repeatPassword
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
            <p className="text-sm text-subGrey mt-6 mb-8">
              By creating account , you state that you have read and understood
              the{" "}
              <Link href={"/"} className="text-mainYellow">
                Terms and Conditions.
              </Link>
            </p>
            <button
              disabled={
                !(
                  formData?.password.trim().length >= 8 &&
                  /\d/.test(formData?.password) &&
                  /[A-Z]/.test(formData?.password) &&
                  /[a-z]/.test(formData?.password) &&
                  /[\W_]/.test(formData?.password) &&
                  formData?.password === formData?.repeatPassword
                )
              }
              type="submit"
              className="bg-mainYellow text-base text-white py-2 px-4 rounded-2xl mt-4 disabled:bg-[#999999]"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
      <SwiperPage />
    </div>
  );
};

export default SignUp;
