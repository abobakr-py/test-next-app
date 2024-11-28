"use client";
import Navbar from "@/Components/Navbar/Navbar";
import { getCookie } from "cookies-next";
import Image from "next/image";
import portfolio from "../../../assets/portfolio.svg";
import { FaYoutube, FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Portfolio = () => {
  const lang = getCookie("NEXT_LOCALE");

  return (
    <div className="w-[100%] lg:w-[1344px] mx-auto h-full flex flex-col py-4">
      <div className="lg:w-[100%] w-[95%] mx-auto pt-6">
        <Navbar lang={lang} />
      </div>
      <div className="bg-[#FFF] mt-12 lg:mt-0 lg:px-6 px-4 lg:w-[1344px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Image Section */}
          {/* <div className="w-full lg:w-1/3 flex bg-red-300 lg:h-[65vh] mb-6 lg:mb-0 relative"> */}
          <div className="lg:hidden flex flex-row  justify-between w-full">
            <Image
              src={portfolio}
              alt="portfolio"
              loading="eager"
              className="lg:w-1/3 w-4/5 h-full object-contain"
            />
            <div className="flex lg:hidden flex-col  ">
              <FaFacebook size={24} className="mt-6" />
              <FaXTwitter size={24} className="mt-6" />
              <FaInstagram size={24} className="mt-6" />
              <FaTiktok size={24} className="mt-6" />
              <FaYoutube size={24} className="mt-6" />
            </div>
          </div>
          <div className="w-full justify-end flex lg:hidden">
            <div
              className="border flex ml-0 -mt-24 w-11/12 py-6 px-6 bg-white  items-start justify-start"
              dir="ltr"
            >
              <p
                className="text-[#333333] text-lg lg:text-4xl font-notoKufi-700 leading-relaxed"
                // style={{
                //   textAlign: "justify",
                // }}
              >
                Innovation in tech fuels the evolution of crypto, unlocking new
                possibilities for the world.
              </p>
            </div>
          </div>

          <Image
            src={portfolio}
            alt="portfolio"
            loading="eager"
            className="lg:w-1/3 w-4/5 h-full object-contain lg:flex hidden"
          />
          {/* </div> */}

          {/* Text Content Section */}
          <div className="bg-[#FFF] w-full lg:w-2/3 py-6 lg:py-12 px-4 lg:px-8 ">
            <div>
              <p className="text-[#121212] font-notoKufi-700 text-4xl lg:text-7xl">
                محمد درويش
              </p>
              <p className="text-[#404040] font-notoKufi-600 text-sm lg:text-base mt-4">
                المؤسس والمدير التقني{" "}
                <span className="underline cursor-pointer">Bydotpy</span>
              </p>
              <p className="text-[#404040] font-notoKufi-600 text-sm lg:text-base mt-3">
                المؤسس المشارك ورئيس قسم التكنولوجيا{" "}
                <span className="underline cursor-pointer">سبيكة - Sabika</span>
              </p>
              <div className="lg:flex lg:flex-row flex-col mt-2 hidden">
                <FaYoutube size={24} className="ml-8 mt-6" />
                <FaTiktok size={24} className="ml-8 mt-6" />
                <FaInstagram size={24} className="ml-8 mt-6" />
                <FaXTwitter size={24} className="ml-8 mt-6" />
                <FaFacebook size={24} className="ml-8 mt-6" />
              </div>
            </div>
            <div
              className="border hidden -mr-20 py-6 lg:py-12 px-6 lg:px-16 mt-6 lg:mt-12 bg-white  h-auto lg:h-[200px] lg:flex items-center"
              dir="ltr"
            >
              <p className="text-[#333333] text-lg lg:text-4xl font-notoKufi-700">
                Innovation in tech fuels the evolution of crypto, unlocking new
                possibilities for the world.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p
            className="text-[#595959] font-notoKufi-400 text-xl leading-relaxed"
            style={{
              textAlign: "justify",
            }}
          >
            بصفتي متحمسًا لتكنولوجيا البلوكشين والعملات المشفرة والذكاء
            الاصطناعي، أستكشف بحماس الإمكانيات اللامحدودة للتكنولوجيا
            اللامركزية. أنا شغوف بتقدم التكنولوجيا لتشكيل المستقبل. مع أكثر من 8
            سنوات من الخبرة كمدير تقني ومؤسس، أختص في دفع الابتكار من خلال
            البلوكشين والعملات المشفرة والذكاء الاصطناعي. حاليًا، أقود شركة
            Bydotpy، حيث نركز على إحداث ثورة في مشهد التكنولوجيا اللامركزية،
            وتعزيز الاستقلالية والأمان والشفافية في التكنولوجيا المالية. شاركت
            في تأسيس وقيادة المبادرات التقنية في BE Blockchain SRL وD-event، مما
            ساهم في نموهما ونجاحهما. كمهندس أمن سيبراني في Daneel.io، أدرت
            مبادرات الأمن السيبراني وساهمت كمطور بايثون. في Telecom Egypt، لعبت
            دورًا محوريًا في دعم الأنظمة وتطوير بايثون واختبار الاختراق، مما
            ساهم في تحقيق تقدم كبير في التكنولوجيا. مع درجة بكاليوس من جامعة عين
            شمس، ألتزم باستغلال خبرتي لإنشاء حلول مؤثرة في العصر الرقمي. "دعونا
            نتواصل ونستكشف الفرص للابتكار معًا." مهمتنا هي تحسين عملك من خلال
            دمج التقنيات. لأننا نؤمن أن المستقبل يتعلق بمزيد من الاستقلالية
            والأمان والشفافية، أصبحت البلوكشين والذكاء الاصطناعي تخصصنا.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
