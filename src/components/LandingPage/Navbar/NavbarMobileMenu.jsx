"use client";
import Image from "next/image";
import circleIcon from "../../../assets/page1/close-circle.svg";
import logoMobile from "../../../assets/page1/logoMobileMenu.svg";
import Link from "next/link";
import { useState } from "react";
import useLanguage from "@/context/useLanguage";

const NavbarMobileMenu = ({ isOpen, setIsOpen, setInNavbar }) => {
  const { language, setLanguage, translations } = useLanguage();
  const navData = [
    {
      onClick: () => {},
      id: 1,
      name: translations[language].navbar.home,
      url: "#home",
    },
    {
      onClick: () => {},
      id: 2,
      name: translations[language].navbar.features,
      url: "#features",
    },
    {
      onClick: () => {},
      id: 3,
      name: translations[language].navbar.howitworks,
      url: "#how",
    },
    {
      onClick: () => {},
      id: 4,
      name: translations[language].navbar.download,
      url: "#download",
    },
    // {
    //   onClick: () => {},
    //   id: 5,
    //   name: translations[language].navbar.signup,
    //   url: "/sign-up",
    // },
    {
      id: 6,
      name: translations[language].navbar.lang,
      url: "/",
      onClick: () => {
        if (language === "en") {
          setLanguage("ar");
        } else if (language === "ar") {
          setLanguage("en");
        }
      },
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    setIsOpen(false); // Close the menu when an item is clicked
    setInNavbar(false);
  };

  return (
    <div
      className={`absolute w-full h-screen bg-white ${isOpen ? "" : "hidden"}`}
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className={`mt-2 p-14`}>
        <Image
          loading="eager"
          src={circleIcon}
          alt="close"
          className={`${language == "en" ? "ml-auto" : "mr-auto"}`}
          onClick={() => {
            setIsOpen(false);
            setInNavbar(false);
          }}
        />

        <Image
          loading="eager"
          src={logoMobile}
          alt="logo"
          className={`flex ${language === "en" ? "mr-auto" : " ml-auto"}`}
        />

        <div className={`flex flex-col gap-6 mt-10 ${isOpen ? "" : "hidden"}`}>
          {navData?.map((item, index) => (
            <Link
              key={item.id}
              href={item.url}
              onClick={() => {
                handleItemClick(index);
                item.onClick();
              }}
              className={`whitespace-nowrap p-5 rounded-xl w-full ${
                selectedIndex === index
                  ? "bg-[#E9C237] text-white"
                  : "bg-white text-black"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
