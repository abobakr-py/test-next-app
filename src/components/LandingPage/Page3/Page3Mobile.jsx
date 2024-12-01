import Image from "next/image";
import bgImage3Mobile from "../../../assets/page3/bg3Web.png";
import useLanguage from "@/context/useLanguage";
const Page3Mobile = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="mt-32 mx-6">
      {language === "en" ? (
        <>
          <div className="flex items-end justify-center ">
            <p className="mr-5 text-4xl font-ibm-600 whitespace-nowrap">
              <span className="inline-block w-[5rem] h-[1px]  bg-gradient-custom"></span>
              {translations[language].section3.what}{" "}
              <span className="text-[#E9C237]">
                {" "}
                {translations[language].section3.offer}
              </span>
            </p>
          </div>

          <div className="flex flex-col items-start mt-24 text-2xl gap-28 font-ibm-400 ">
            <div>
              <div className="relative">
                <p className="relative z-10 px-2">
                  <span className="font-ibm-600 text-[#e9c237]">
                    {" "}
                    {translations[language].section3.lowest}{" "}
                  </span>
                  {translations[language].section3.market}{" "}
                </p>

                <p className="absolute -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                  01
                </p>
              </div>
              <p className="text-[#4c4c4c] text-base px-2 mt-2">
                {translations[language].section3.effort}
              </p>
            </div>
            <div>
              <div className="relative">
                <p className="relative z-10 px-2">
                  <span className="font-ibm-600 text-[#e9c237]">
                    {translations[language].section3.user}{" "}
                  </span>
                  {translations[language].section3.app}{" "}
                </p>
                <p className="absolute -top-[3.3rem] z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                  02
                </p>
              </div>

              <p className="text-[#4c4c4c] text-base px-2 mt-2">
                <span className="text-[#E9C237]">
                  {" "}
                  {translations[language].section3.sabika}
                </span>{" "}
                {translations[language].section3.makes}{" "}
              </p>
            </div>
          </div>
        </>
      ) : language === "ar" ? (
        <>
          <div className="flex items-end justify-center font-tajawal-400">
            <p
              className={`  text-4xl font-tajawal-500 whitespace-nowrap ml-16`}
            >
              {translations[language].section3.what}{" "}
              <span className="text-[#E9C237] font-tajawal-700">
                {" "}
                {translations[language].section3.we}{" "}
              </span>
              {translations[language].section3.offer}{" "}
            </p>
            <span className="flex w-full h-[1px]  bg-gradient-custom mb-4"></span>
          </div>

          <div className="flex flex-col items-end mt-24 text-right gap-28 ">
            <div className="text-3xl">
              <div className="relative ">
                <p className="relative z-10 px-2 font-tajawal-500 ">
                  {" "}
                  {translations[language].section3.invest}{" "}
                  <span className="font-tajawal-700 text-[#e9c237]">
                    {translations[language].section3.lowest}{" "}
                  </span>
                </p>

                <p className="absolute -top-[3.1rem] right-0 z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                  01
                </p>
              </div>
              <p className="text-[#4c4c4c] text-base px-2 mt-2 font-tajawal-500">
                {translations[language].section3.buy}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section3.prices}{" "}
                </span>
                {translations[language].section3.with}{" "}
              </p>
            </div>
            <div>
              <div className="relative text-3xl">
                <p className="relative z-10 px-2 font-tajawal-500">
                  {translations[language].section3.enjoy}{" "}
                  <span className="font-tajawal-500 text-[#e9c237] font-tajawal-700">
                    {translations[language].section3.user}{" "}
                  </span>
                  {translations[language].section3.app}{" "}
                </p>
                <p className="absolute -top-[3.2rem] right-0 z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                  02
                </p>
              </div>

              <p className="text-[#4c4c4c] text-base px-2 mt-2 font-tajawal-500">
                {translations[language].section3.withsabika}
                <span className="text-[#E9C237] font-tajawal-700">
                  {" "}
                  {translations[language].section3.sabika}
                </span>{" "}
                {translations[language].section3.makes}{" "}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-end justify-center ">
            <p className={` text-4xl font-tajawal-500 whitespace-nowrap ml-16`}>
              <span className="text-[#E9C237] font-tajawal-700">
                {" "}
                {translations[language].section3.what}{" "}
              </span>
              {translations[language].section3.we}{" "}
            </p>
            <span className="flex w-full h-[1px] mb-4 bg-gradient-custom"></span>
          </div>

          <div className="flex flex-col items-end mt-24 text-2xl text-right gap-28 font-tajawal-400">
            <div>
              <div className="relative ">
                <p className="relative z-10 px-2 font-tajawal-500">
                  {" "}
                  <span className="text-[#e9c237]"> .</span>
                  {translations[language].section3.invest}{" "}
                  <span className="font-tajawal-700 text-[#e9c237]">
                    {translations[language].section3.lowest2}{" "}
                  </span>
                </p>

                <p className="absolute -top-[2rem] right-0 z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                  01
                </p>
              </div>
              <p className="text-[#4c4c4c] text-base px-2 mt-2 font-tajawal-500">
                {translations[language].section3.buy}{" "}
                <span className="font-tajawal-700 text-[#e9c237]">
                  {translations[language].section3.lowest}{" "}
                </span>
                {translations[language].section3.with}{" "}
              </p>
            </div>
            <div>
              <div className="relative">
                <p className="relative z-10 px-2 font-tajawal-500">
                  .
                  <span className="font-tajawal-700 text-[#e9c237]">
                    {translations[language].section3.enjoy}{" "}
                  </span>
                  {translations[language].section3.app}{" "}
                </p>
                <p className="absolute -top-[2rem] right-0 z-0 text-[5.5rem] leading-[0.9] text-[#c9c8c8]   opacity-15">
                  02
                </p>
              </div>

              <p className="text-[#4c4c4c] text-base px-2 mt-2 font-tajawal-500">
                {translations[language].section3.withsabika}
                <span className="text-[#E9C237] font-tajawal-700">
                  {" "}
                  {translations[language].section3.sabika}
                </span>{" "}
                {translations[language].section3.makes}{" "}
              </p>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center mt-5">
        <Image
          src={bgImage3Mobile}
          alt="bg2mobile"
          className=""
          loading="eager"
        />
      </div>
    </div>
  );
};

export default Page3Mobile;
