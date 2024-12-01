"use client";
import Image from "next/image";
import backgroundImage from "../../assets/swiper/backkground.png";
import logo from "../../assets/swiper/logo.png";
import Slider from "./Slider";
import { useState } from "react";
import useWindowSize from "@/helper/useWindowSize";
import useLanguage from "src/context/useLanguage";
const SwiperPage = ({}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width, height } = useWindowSize();
  const { language } = useLanguage();
  return (
    <div
      className="w-[45%] bg-cover bg-center rounded-xl m-4 flex flex-col justify-end  relative "
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <Image
        src={logo}
        alt="logo"
        className={` ml-auto mx-8 absolute top-4 ${
          language === "en" ? "right-4" : ""
        } `}
      />
      <div
        className={`
        absolute  ${height < 736 ? "-top-1" : ""} left-0 right-0
        `}
      >
        <Slider currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </div>
      <div className="flex items-end justify-between p-4 text-white">
        <button
          onClick={() => {
            if (currentIndex === 0) {
              setCurrentIndex(3);
            } else {
              setCurrentIndex(currentIndex - 1);
            }
          }}
          className="bg-transparent border rounded-2xl py-[0.625rem] px-[3rem] bg-[#f7f7f7] bg-opacity-25"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (currentIndex === 3) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex + 1);
            }
          }}
          className="bg-transparent border rounded-2xl py-[0.625rem] px-[3rem] bg-[#f7f7f7] bg-opacity-25"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SwiperPage;
