"use client";
import Footer from "@/components/LandingPage/Footer/Footer";
import FooterMobile from "@/components/LandingPage/Footer/FooterMobile";
import Navbar from "@/components/LandingPage/Navbar/Navbar";
import NavbarMobile from "@/components/LandingPage/Navbar/NavbarMobile";
import Page1 from "@/components/LandingPage/Page1/Page1";
import Page1Mobile from "@/components/LandingPage/Page1/Page1Mobile";
import Page2 from "@/components/LandingPage/Page2/Page2";
import Page2Mobile from "@/components/LandingPage/Page2/Page2Mobile";
import Page3 from "@/components/LandingPage/Page3/Page3";
import Page3Mobile from "@/components/LandingPage/Page3/Page3Mobile";
import Page4 from "@/components/LandingPage/Page4/Page4";
import Page4Mobile from "@/components/LandingPage/Page4/Page4Mobile";
import Page5 from "@/components/LandingPage/Page5/Page5";
import Page5Mobile from "@/components/LandingPage/Page5/Page5Mobile";
import useWindowSize from "@/helper/useWindowSize";
import Image from "next/image";
import { useEffect, useState } from "react";
import ToTopImage from "../assets/backtotop.svg";
import { useRouter } from "next/navigation";
import { useGetGoldPriceForLandingPage } from "@/apis/landingPage/queries";
import { useGlobalSocket } from "@/helper/useGlobalSocket";
import { usePublicSocket } from "@/helper/usePublicSocket";
import PageBetween1And2 from "@/components/LandingPage/PageBetween1And2/PageBetween1And2";
import PageBetween1And2Mobile from "@/components/LandingPage/PageBetween1And2/PageBetween1And2Mobile";
import ReactGA from "react-ga4";

export default function Home() {
  const { data, isLoading, refetch } = useGetGoldPriceForLandingPage();
  const router = useRouter();
  const { width } = useWindowSize();
  const [token, setToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Fetch token from localStorage on the client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactGA.send(
        "pageview",
        window.location.pathname + window.location.search
      );
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  // Redirect if token exists
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY || document.documentElement.scrollTop;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { addEventListener, removeEventListener } = usePublicSocket();
  useEffect(() => {
    addEventListener("public-gold-price", ({ data }) => {
      refetch();
    });

    return () => {
      removeEventListener("public-gold-price", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addEventListener]);
  // Display loading animation while redirecting
  if (token) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#e9c237]"></div>
        <p className="ml-4 text-xl font-semibold text-[#333]">Redirecting...</p>
      </div>
    );
  }

  // Main content
  return (
    <main className="overflow-hidden">
      {width <= 640 ? (
        <div className="relative sm:hidden">
          <div
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className={`fixed right-0 bottom-0 animate-bounce cursor-pointer ${
              scrollPosition < 905 ? "hidden" : "block"
            }`}
          >
            <Image src={ToTopImage} alt="ToTopImage" width={75} />
          </div>
          <NavbarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          {!isOpen ? (
            <>
              <Page1Mobile
                data={data}
                isLoading={isLoading}
                refetch={refetch}
              />
              <PageBetween1And2Mobile data={data} />
              <Page2Mobile />
              <Page3Mobile />
              <Page4Mobile />
              <Page5Mobile />
              <FooterMobile />
            </>
          ) : (
            <div className="h-screen bg-white"></div>
          )}
        </div>
      ) : (
        <div className="relative hidden sm:block">
          <div
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className={`fixed right-0 bottom-0 animate-bounce cursor-pointer ${
              scrollPosition < 740 ? "hidden" : "block"
            }`}
          >
            <Image src={ToTopImage} alt="ToTopImage" />
          </div>

          <Navbar />
          <Page1 data={data} isLoading={isLoading} refetch={refetch} />
          <PageBetween1And2 data={data} />
          <Page2 />
          <Page3 />
          <Page4 />
          <Page5 />
          <Footer />
        </div>
      )}
    </main>
  );
}
