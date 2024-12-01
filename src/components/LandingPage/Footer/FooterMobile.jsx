import Image from "next/image";
import facebook from "@/assets/footer/facebook.svg";
import instagram from "@/assets/footer/instagram.svg";
import tiktok from "@/assets/footer/tiktok.svg";
import youtube from "@/assets/footer/youtube.svg";
import twitter from "@/assets/footer/twitter.svg";
import useLanguage from "@/context/useLanguage";
const FooterMobile = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="bg-[#121212] text-white py-12   mt-[7.375rem] ">
      <div
        className={`${
          language == "en" ? "font-ibm-400" : "text-right font-tajawal-400 mr-3"
        } flex flex-col gap-5 text-base px-6`}
      >
        <p>{translations[language].footer.privacy}</p>
        <p>{translations[language].footer.terms}</p>
      </div>
      <div
        className={`flex justify-around mt-16 w-[75%] mx-6 ${
          language === "en" ? "" : "flex-row-reverse  ml-auto"
        }`}
      >
        <Image src={facebook} alt="" loading="eager" />
        <Image src={twitter} alt="" loading="eager" />
        <Image src={instagram} alt="" loading="eager" />
        <Image src={tiktok} alt="" loading="eager" />
        <Image src={youtube} alt="" loading="eager" />
      </div>
    </div>
  );
};

export default FooterMobile;
