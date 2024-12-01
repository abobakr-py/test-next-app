import Image from "next/image";
import bg2Mobile from "../../../assets/page2/bg2Web.png";
import useLanguage from "@/context/useLanguage";
const Page2Mobile = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="mx-6 mt-32" id="features">
      <div className="flex items-end justify-center ">
        <span
          className={` flex w-full h-[1px]  bg-gradient-custom ${
            language === "en" ? "hidden" : "mb-[15px] "
          }`}
        />
        <p
          className={`${
            language == "en"
              ? " ml-5 font-ibm-500 "
              : language === "ar"
              ? " mr-5 font-tajawal-400"
              : " mr-5 font-tajawal-500"
          } text-4xl whitespace-nowrap`}
        >
          {translations[language].section2.why}
          <span
            className={`text-[#E9C237] ${
              language === "en"
                ? "font-ibm-600"
                : language === "ar"
                ? "font-tajawal-700"
                : "font-tajawal-700"
            }`}
          >
            {" "}
            {translations[language].section2.sabika}
          </span>
        </p>
        <span
          className={` flex w-full h-[1px]  bg-gradient-custom ${
            language === "en" ? "mb-[9px]" : "hidden"
          }`}
        />
      </div>

      <div
        className={`flex flex-col ${
          language === "en" ? "items-start" : "items-end"
        } mt-24 text-xl gap-28 font-ibm-400 `}
      >
        {language == "en" ? (
          <>
            <div className="relative">
              <p className="relative z-10 px-2">
                {translations[language].section2.buy}{" "}
                <span className="font-ibm-600 text-[#e9c237]">
                  {translations[language].section2.fraction}
                </span>
              </p>
              <p className="absolute -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                01
              </p>
            </div>
            <div className="relative">
              <p className="relative z-10 px-2">
                <span className="font-ibm-600 text-[#e9c237]">
                  {translations[language].section2.track}
                </span>{" "}
                {translations[language].section2.your}{" "}
                <span className="font-ibm-600 text-[#e9c237]">
                  {translations[language].section2.portfolio}
                </span>
              </p>
              <p className="absolute -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-15 ">
                02
              </p>
            </div>
            <div className="relative">
              <p className="relative z-10 px-2">
                <span className="font-ibm-600 text-[#e9c237]">
                  {translations[language].section2.secure}
                </span>{" "}
                {translations[language].section2.transaction}{" "}
                <span className="font-ibm-600 text-[#e9c237]">
                  {translations[language].section2.management}{" "}
                </span>
              </p>{" "}
              <p className="absolute -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-15 ">
                03
              </p>
            </div>
            <div className="relative">
              <p className="relative z-10 px-2">
                {translations[language].section2.enjoy}{" "}
                <span className="font-ibm-600 text-[#e9c237]">
                  {translations[language].section2.seamless}
                </span>
              </p>
              <p className="absolute -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                04
              </p>
            </div>
          </>
        ) : language == "ar" ? (
          <>
            <div className="relative">
              <p className="relative z-10 px-2">
                <span className="font-tajawal-500 text-[#e9c237]">.</span>
                {translations[language].section2.buy}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.fraction}
                </span>
              </p>
              <p className="absolute right-0 -top-[3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                01
              </p>
            </div>
            <div className="relative text-right">
              <p className="relative z-10 px-2 font-tajawal-500">
                .
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.track}
                </span>{" "}
                {translations[language].section2.your}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.portfolio}{" "}
                </span>
                {translations[language].section2.special}
              </p>
              <p className="absolute right-0 -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-15 ">
                02
              </p>
            </div>
            <div className="relative text-right">
              <p className="relative z-10 px-2 font-tajawal-500">
                <span className="font-tajawal-700 text-[#e9c237]">.</span>
                {translations[language].section2.enjoy}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.safe}{" "}
                </span>
                {translations[language].section2.easy}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.management}{" "}
                </span>
              </p>{" "}
              <p className="absolute -top-[3.3rem] right-0 z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-15 ">
                03
              </p>
            </div>
            <div className="relative">
              <p className="relative z-10 px-2 text-right font-tajawal-500">
                <span className="font-tajawal-700 text-[#e9c237] ">.</span>
                {translations[language].section2.enjoyA}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.seamless}
                </span>
              </p>
              <p className="absolute -top-[3.3rem] right-0 z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                04
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <p className="relative z-10 px-2 font-tajawal-500">
                <span className="font-tajawal-700 text-[#e9c237]">.</span>
                {translations[language].section2.buy}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.fraction}
                </span>
              </p>
              <p className="absolute right-0 -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                01
              </p>
            </div>
            <div className="relative text-right">
              <p className="relative z-10 px-2 font-tajawal-500">
                <span className="font-tajawal-700 text-[#e9c237]">.</span>
                {translations[language].section2.track}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.your}{" "}
                </span>{" "}
              </p>
              <p className="absolute right-0 -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-15 ">
                02
              </p>
            </div>
            <div className="relative text-right">
              <p className="relative z-10 px-2 font-tajawal-500">
                <span className="font-tajawal-700 text-[#e9c237]">.</span>
                {translations[language].section2.buyWith}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.safe}{" "}
                </span>
                {translations[language].section2.easy}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.management}{" "}
                </span>
              </p>{" "}
              <p className="absolute -top-[3.3rem] right-0 z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]  opacity-15 ">
                03
              </p>
            </div>
            <div className="relative">
              <p className="relative z-10 px-2 text-right font-tajawal-500">
                . {translations[language].section2.enjoyA}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section2.witheasy}{" "}
                </span>
                {translations[language].section2.seamless}
              </p>
              <p className="absolute -top-[3.3rem] right-0 z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                04
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center mt-12">
        <Image src={bg2Mobile} alt="bg2mobile" className="" loading="eager" />
      </div>
    </div>
  );
};

export default Page2Mobile;
