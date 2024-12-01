"use client";
import Footer from "@/components/LandingPage/Footer/Footer";
import FooterMobile from "@/components/LandingPage/Footer/FooterMobile";
import Navbar from "@/components/LandingPage/Navbar/Navbar";
import NavbarMobile from "@/components/LandingPage/Navbar/NavbarMobile";
import useWindowSize from "@/helper/useWindowSize";
import Image from "next/image";
import { useEffect, useState } from "react";
import ToTopImage from "../../assets/backtotop.svg";
import dynamic from "next/dynamic";
const DynamicPrivacyAndPolicy = dynamic(
  () => import("@/components/TermsAndConditionsAndPolicy/PrivacyAndPolicy"),
  { ssr: false }
);

export default function Home() {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY || document.documentElement.scrollTop;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="overflow-hidden">
      {width <= 640 ? (
        <div className="relative sm:hidden">
          <div
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className={`fixed right-0 bottom-0 animate-bounce cursor-pointer ${
              scrollPosition < 905 ? "hidden" : "block"
            }`}
          >
            <Image src={ToTopImage} alt="ToTopImage" width={75} />
          </div>
          <NavbarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen === false ? (
            <>
              <DynamicPrivacyAndPolicy />
              <FooterMobile />
            </>
          ) : (
            <div className="h-screen bg-white"></div>
          )}
        </div>
      ) : (
        <div className="relative hidden sm:flex sm:flex-col sm:min-h-screen">
          <div
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className={`fixed right-0 bottom-0 animate-bounce cursor-pointer ${
              scrollPosition < 740 ? "hidden" : "block"
            }`}
          >
            <Image src={ToTopImage} alt="ToTopImage" />
          </div>

          <div className="flex-none">
            <Navbar />
          </div>
          <DynamicPrivacyAndPolicy />
          <div className="flex-none">
            <Footer />
          </div>
        </div>
      )}
    </main>
  );
}
