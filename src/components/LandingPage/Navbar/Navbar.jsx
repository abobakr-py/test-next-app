"use client";
import Image from "next/image";
import logo from "../../../assets/SabikaLogo.svg";
import HoverText from "./HoverText";
import useLanguage from "@/context/useLanguage";
import { token } from "@/config/config";
const Navbar = () => {
  const { language, translations } = useLanguage();
  const navData = [
    {
      onClick: () => {},
      id: 1,
      name: translations[language].navbar.home,
      url: token ? "/dashboard/" : "#home",
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
    {
      onClick: () => {},
      id: 5,
      name: translations[language].navbar.login,
      url: "/login",
    },
  ];

  return (
    <div
      className={`flex ${
        language === "en" ? "" : "flex-row-reverse"
      } items-center justify-around w-full pt-7 mx-auto lg:w-[90%] lg:px-[8.75rem]`}
    >
      <div
        className={`${
          language === "en" ? "" : "justify-end"
        } w-full flex items-center    `}
      >
        <Image src={logo} alt="logo" className="" loading="eager" />
      </div>

      <div
        className={`flex ${
          language === "en"
            ? "font-ibm-400"
            : "flex-row-reverse font-tajawal-400 text-base text-[#121212]"
        } items-center w-full gap-16 `}
      >
        {navData?.map((item) =>
          item.id === 5 ? (
            <a
              onClick={item.onClick}
              key={item.id}
              href={item.url}
              className={`
                ${token?.length > 0 ? "hidden" : "block"}
                     
              
                border whitespace-nowrap text-white bg-[#E9C237] px-10 py-3 rounded-xl hover:text-[#E9C237]   hover:border-[#E9C237] hover:bg-white `}
            >
              {item.name}
            </a>
          ) : (
            <a
              onClick={item.onClick}
              key={item.id}
              href={item.url}
              className={` whitespace-nowrap  `}
            >
              {item.name}
            </a>
          )
        )}

        <HoverText />
      </div>
    </div>
  );
};

export default Navbar;
