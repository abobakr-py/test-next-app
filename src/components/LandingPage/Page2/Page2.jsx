import Image from "next/image";
import bgImage2 from "../../../assets/page2/bg2Web.png";
import useLanguage from "@/context/useLanguage";
const Page2 = () => {
  const { language, translations } = useLanguage();
  return (
    <div className="bg-[#FCFCFC] py-32" id="features">
      <div className="w-4/5 mx-auto ">
        {/* Header */}
        <div
          className={`flex items-center mb-20 whitespace-nowrap ${
            language == "en" ? "ml-40" : ""
          }`}
        >
          <div
            className={`${
              language === "ar" || language === "eg"
                ? "flex items-end justify-end w-full mt-3"
                : "hidden"
            }`}
          >
            <div className=" flex w-full  h-[1px]   bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
            <div className="  flex w-full h-[1px]   bg-gradient-to-r from-[#f5de6b] to-transparent" />
          </div>
          <h1
            className={`${
              language === "en"
                ? "font-ibm-500 text-end"
                : "font-tajawal-400 mr-32"
            } text-[4rem] w-full `}
          >
            {translations[language].section2.why}
            <span
              className={`${
                language === "en" ? "font-ibm-600" : "font-tajawal-500"
              } text-[#E9C237] `}
            >
              {" "}
              {translations[language].section2.sabika}
            </span>
          </h1>
          <div
            className={`${
              language === "en"
                ? "flex items-end justify-end w-full mt-3"
                : "hidden"
            }`}
          >
            <div className=" flex w-full  h-[1px]   bg-gradient-to-r from-[#f9e471] via-[#e5bb32] to-[#f3d859]" />
            <div className="  flex w-full h-[1px]   bg-gradient-to-r from-[#f5de6b] to-transparent" />
          </div>
        </div>
        {/* Content */}
        <div
          className="grid grid-cols-2 "
          dir={language === "en" ? "ltr" : "rtl"}
        >
          {/* Text */}
          {language === "en" ? (
            <>
              <div className="flex flex-col items-start gap-[4.13rem]   text-4xl font-ibm-400 text-[#4C4C4C] mt-8">
                <div className="relative">
                  <p className="relative z-10 ">
                    {translations[language].section2.buy}{" "}
                    <span className="font-ibm-600 text-[#e9c237]">
                      {" "}
                      {translations[language].section2.fraction}.
                    </span>
                  </p>
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%]">
                    01
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    <span className="font-ibm-600 text-[#e9c237]">
                      {" "}
                      {translations[language].section2.track}
                    </span>{" "}
                    {translations[language].section2.your}{" "}
                    <span className="font-ibm-600 text-[#e9c237]">
                      {translations[language].section2.portfolio}
                    </span>
                  </p>
                  <p className="absolute -top-[2.4rem]  z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%] ">
                    02
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    <span className="font-ibm-600 text-[#e9c237]">
                      {" "}
                      {translations[language].section2.secure}
                    </span>{" "}
                    {translations[language].section2.transaction}{" "}
                    <span className="font-ibm-600 text-[#e9c237]">
                      {translations[language].section2.management}{" "}
                    </span>
                  </p>{" "}
                  <p className="absolute -top-[2.4rem] 0 z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%] ">
                    03
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    {translations[language].section2.enjoy}{" "}
                    <span className="font-ibm-600 text-[#e9c237]">
                      {translations[language].section2.seamless}
                    </span>
                  </p>
                  <p className="absolute -top-[2.4rem] 0 z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%]">
                    04
                  </p>
                </div>
              </div>
            </>
          ) : language === "ar" ? (
            <>
              {" "}
              <div className="flex flex-col items-start gap-[4.4rem] mt-10 text-4xl font-tajawal-500 ">
                <div className="relative">
                  <p className="relative z-10 ">
                    {translations[language].section2.buy}{" "}
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {" "}
                      {translations[language].section2.fraction}
                    </span>
                  </p>
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%]">
                    01
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {" "}
                      {translations[language].section2.track}
                    </span>{" "}
                    {translations[language].section2.your}{" "}
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {translations[language].section2.portfolio}{" "}
                    </span>
                    {translations[language].section2.special}
                  </p>
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%] ">
                    02
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    {translations[language].section2.enjoy}
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {" "}
                      {translations[language].section2.safe}
                    </span>{" "}
                    {translations[language].section2.easy}{" "}
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {translations[language].section2.management}{" "}
                    </span>
                  </p>{" "}
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%] ">
                    03
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    {translations[language].section2.enjoyA}{" "}
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {translations[language].section2.seamless}
                    </span>
                  </p>
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%]">
                    04
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="flex flex-col items-start gap-[4.4rem] mt-8 text-4xl font-tajawal-500 ">
                <div className="relative">
                  <p className="relative z-10 ">
                    {translations[language].section2.buy}{" "}
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {" "}
                      {translations[language].section2.fraction}
                    </span>
                  </p>
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%]">
                    01
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    {translations[language].section2.track}{" "}
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {translations[language].section2.your}{" "}
                    </span>{" "}
                    <span className="  text-[#e9c237] font-tajawal-700">
                      {translations[language].section2.portfolio}{" "}
                    </span>
                    {translations[language].section2.special}
                  </p>
                  <p className="absolute -top-[2.1rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%] ">
                    02
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    {translations[language].section2.buyWith}
                    <span className="  text-[#e9c237] font-tajawal-700 ">
                      {" "}
                      {translations[language].section2.safe}
                    </span>{" "}
                    {translations[language].section2.easy}{" "}
                    <span className="  text-[#e9c237] font-tajawal-700 ">
                      {translations[language].section2.management}{" "}
                    </span>
                  </p>{" "}
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%] ">
                    03
                  </p>
                </div>
                <div className="relative">
                  <p className="relative z-10">
                    {" "}
                    {translations[language].section2.enjoyA}{" "}
                    <span className="  text-[#e9c237] font-tajawal-700 ">
                      {" "}
                      {translations[language].section2.witheasy}{" "}
                    </span>{" "}
                    {translations[language].section2.seamless}{" "}
                  </p>
                  <p className="absolute -top-[2.4rem] z-0 text-[5.5rem] leading-[0.9] text-[#333]   text-opacity-[4%]">
                    04
                  </p>
                </div>
              </div>
            </>
          )}
          {/* Image */}
          <div
            className={`flex items-center justify-center ${
              language === "en" ? "ml-auto" : "mr-auto"
            }`}
          >
            <Image src={bgImage2} alt="bgImage2" loading="eager" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
