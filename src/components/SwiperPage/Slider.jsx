import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../../assets/swiper/image1.png";
import image2 from "../../assets/swiper/image2.png";
import image3 from "../../assets/swiper/image3.png";
import image4 from "../../assets/swiper/image4.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import "./swiper-custom.css";
import { Pagination, EffectFade } from "swiper/modules";
import useLanguage from "@/context/useLanguage";
import useWindowSize from "@/helper/useWindowSize";

const Slider = ({ currentIndex, setCurrentIndex }) => {
  const { width, height } = useWindowSize();
  const { language, translations } = useLanguage();
  const login = translations[language].login;
  const [swiperInstance, setSwiperInstance] = useState(null);
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(currentIndex);
    }
  }, [currentIndex, swiperInstance]);
  return (
    <Swiper
      loop={true}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      onSwiper={(swiper) => setSwiperInstance(swiper)}
      modules={[Pagination, EffectFade]}
      pagination={{
        clickable: true,
      }}
    >
      <SwiperSlide>
        <div className="text-white text-center flex flex-col  mt-32 ">
          <Image
            src={image1}
            alt="image1"
            className="flex mx-auto"
            width={500}
          />
          <p className="text-xl mb-14">
            {login.buySell}{" "}
            <span className="p-3 text-mainYellow font-bold bg-white rounded-xl mb-6 ml-1">
              {login.fraction}{" "}
            </span>
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="text-white text-center flex flex-col mb-12 ">
          <Image
            src={image2}
            alt="image1"
            className="flex mx-auto"
            width={500}
          />
          <p className="text-xl">
            <span className="p-3 text-mainYellow font-bold bg-white rounded-xl mb-6 mr-1">
              {login.track}{" "}
            </span>
            {login.Your}{" "}
            <span className="p-3 text-mainYellow font-bold bg-white rounded-xl mb-6 ml-1">
              {login.portfolio}{" "}
            </span>
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="text-white text-center flex flex-col  gap-2 mb-12">
          <Image
            src={image3}
            alt="image1"
            className="flex mx-auto"
            width={500}
          />
          <p className="text-xl">
            <span className="p-3 text-mainYellow font-bold bg-white rounded-xl mb-6 mr-1">
              {login.secure}{" "}
            </span>
            {login.Transactions}{" "}
            <span className="p-3 text-mainYellow font-bold bg-white rounded-xl mb-6 ml-1">
              {login.Management}{" "}
            </span>
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="text-white text-center flex flex-col mb-7  gap-2 ">
          <Image
            src={image4}
            alt="image1"
            className="flex mx-auto"
            width={500}
          />
          <p className="text-xl leading-loose">
            {login.join}{" "}
            <span className="p-3 text-mainYellow font-bold bg-white rounded-xl mb-6 mx-1">
              {login.sabika}{" "}
            </span>
            {login.for}{" "}
            <span className="p-3 text-mainYellow font-bold bg-white rounded-xl mb-6 mx-1">
              {login.seamless}{" "}
            </span>
            {login.Journey}{" "}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
