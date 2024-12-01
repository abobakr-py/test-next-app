"use client";
import logo from "@/assets/HomePage/header/logo.png";
import Image from "next/image";
import Link from "next/link";
import moon from "@/assets/HomePage/header/moon.png";
import bell from "@/assets/HomePage/header/bell.png";
import profilePic from "@/assets/HomePage/header/profilePic.png";
import { usePathname } from "next/navigation";
import useLanguage from "@/context/useLanguage";
import { useState } from "react";

const Header = ({
  removeIcons,
  toTheRight,
  user,
  openProfile,
  setOpenProfile,
}) => {
  const path = usePathname();
  const { language, translations, setLanguage } = useLanguage();
  const header = translations[language].header;
  return (
    <div
      className={`
        flex items-center py-12  
        ${language === "en" ? "font-ibm" : "font-ibmArabic"}
        `}
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <Image src={logo} alt="logo" className="" />
      <div
        className={`flex items-center gap-16 text-[#b3b3b3]  
        ${toTheRight ? "" : "mr-24"}
        ${language === "en" ? "ml-auto font-ibm" : "mr-auto font-ibmArabic"}
        `}
      >
        <Link
          href="/dashboard"
          className={` ${
            path === "/dashboard/"
              ? "bg-[#e9c237] py-3 px-12 text-white rounded-xl"
              : ""
          }`}
        >
          {header.dashboard}
        </Link>
        <Link
          href="/wallet"
          className={` ${
            path === "/wallet/"
              ? "bg-[#e9c237] py-3 px-12 text-white rounded-xl"
              : ""
          }`}
        >
          {header.wallet}
        </Link>
        <Link
          href="/"
          className={` ${
            path === "/portfolio/"
              ? "bg-[#e9c237] py-3 px-12 text-white rounded-xl"
              : ""
          }`}
        >
          {header.portfolio}
        </Link>
      </div>
      {!removeIcons && (
        <div
          className={`flex items-center gap-8 relative
        ${language === "ar" ? "mr-10" : ""}
        `}
        >
          {openProfile && (
            <div
              className="absolute -bottom-[11.5rem] rounded-xl px-4 py-6  bg-white"
              style={{
                boxShadow:
                  " 0px 1px 3px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px 0px rgba(0, 0, 0, 0.07)",
              }}
            >
              <p className="text-[#b3b3b3] text-[0.625rem]">{header.account}</p>
              <hr className="text-[#F5F5F5] border-t-[1px] my-3" />
              <p className="mt-3 mb-4 px-1 py-3 text-sm text-[#b3b3b3]">
                {user?.email}
              </p>

              <Link
                href={"/login"}
                className="cursor-pointer text-sm text-[#dc3545] px-2 py-3 mt-3 "
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                {header.logout}
              </Link>
            </div>
          )}
          <div
            style={{
              userSelect: "none",
            }}
            className="flex items-center  "
          >
            <Image
              src={profilePic}
              alt="Profile"
              className="cursor-pointer"
              onClick={() => {
                setOpenProfile(!openProfile);
              }}
            />
            <p
              className="text-[#e9c237] px-[0.625rem] cursor-pointer"
              onClick={() => {
                setOpenProfile(!openProfile);
              }}
            >
              {user?.full_name || "User"}
            </p>
            <p
              className={`
                mx-8 text-[#808080] cursor-pointer
                ${language === "en" ? " font-ibmArabic" : "font-ibm"}
                `}
              onClick={() => {
                setLanguage(language === "en" ? "ar" : "en");
              }}
            >
              {language === "en" ? "عربي" : "English"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
