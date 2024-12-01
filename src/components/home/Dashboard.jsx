"use client";
import Header from "./components/Header";
import CurrentGoldPriceWithChart from "./components/CurrentGoldPriceWithChart";
import { useGetUser, useGetUserGold } from "@/apis/user/queries";
import { useGetConfiguration, useGetGoldPrice } from "@/apis/dsahboard/queries";
import { useEffect, useState } from "react";
import useLanguage from "@/context/useLanguage";
import { useGlobalSocket } from "@/helper/useGlobalSocket";
import { useRouter } from "next/navigation";
import ReactGA from "react-ga4";
import RightDrawer from "../common/RightDrawer";
import PinCode from "../common/PinCode";
import { usePurchase } from "@/zustand/usePurchase";
import { FormatFullDate, FormatFullDateArabic } from "@/helper/utilFunctions";
import PinCodeModal from "../common/PinCodeModal";
import { useGlobal } from "@/zustand/useGlobal";

const Home = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactGA.send(
        "pageview",
        window.location.pathname + window.location.search
      );
    }
  }, []);
  const { data: user } = useGetUser();
  const {
    data: goldPrice,
    refetch: refetchGoldPrice,
    isFetching,
  } = useGetGoldPrice();
  const { setHideBalance,openModal } = useGlobal();
  const { data: userGold, refetch } = useGetUserGold();
  const { data: configuration } = useGetConfiguration();
  const [openProfile, setOpenProfile] = useState(false);
  const { language, translations } = useLanguage();
  const token = localStorage.getItem("token");
  const dashboard = translations[language].dashboard;
  const { addEventListener, removeEventListener } = useGlobalSocket();
  const router = useRouter();
  const { purchaseInfo, setPurchaseInfo } = usePurchase();
  useEffect(() => {
    addEventListener("goldPrice-update-sell", (data) => {
      refetchGoldPrice();
    });
    addEventListener("goldPrice-update-buy", (data) => {
      refetchGoldPrice();
    });
    return () => {
      removeEventListener("goldPrice-update-sell", () => {});
      removeEventListener("goldPrice-update-buy", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addEventListener]);
  useEffect(() => {
    refetch();
  }, [openModal]);
  useEffect(() => {
    if (goldPrice) {
      setPurchaseInfo({
        ...purchaseInfo,
        goldTitle: dashboard?.gold24KBuy       ,
        goldPrice: goldPrice?.LocalPrice24,
        percentage: goldPrice?.buyPercentage,
        diff: goldPrice?.buyDiff,
        sellGoldTitle: dashboard?.gold24KSell,
        sellGoldPrice: goldPrice?.LocalSellPrice24,
        sellPercentage: goldPrice?.sellPercentage,
        sellDiff: goldPrice?.sellDiff,
        date: `${dashboard?.updated} ${
          language === "en"
            ? FormatFullDate(goldPrice?.DateOfRecord)
            : FormatFullDateArabic(goldPrice?.DateOfRecord)
        }`,
      });
    }
  }, [goldPrice, language, isFetching]);
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#e9c237]"></div>
        <p className="ml-4 text-xl font-semibold text-[#333]">Redirecting...</p>
      </div>
    );
  }
  return (
    <div
      className={`${
        language === "en" ? "font-ibm" : "font-ibmArabic"
      } bg-[#fcfcfc] h-screen`}
      onClick={() => {
        if (openProfile) {
          setOpenProfile(false);
        }
      }}
    >
      <p
        className={`
        absolute ${
          language === "en" ? "left-7 font-ibm" : "right-7 font-ibmArabic"
        }  -top-12 text-[12.5rem] text-[#333333] text-opacity-[3%] z-0
        `}
      >
        {dashboard.title}
      </p>
      <div className="w-4/5 mx-auto font-ibm max-w-[1600px]  pb-36 z-10 relative">
        {/* background Image */}
        {/* <Image
          src={background}
          alt="background"
          className="absolute right-0  "
        /> */}
        <Header
          user={user}
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
        <CurrentGoldPriceWithChart
          user={user}
          goldPrice={goldPrice}
          userGold={userGold}
          configuration={configuration}
        />

        {/* <DevAnalytics /> */}
        {/* <LeaderBoard /> */}
        {/* <Articles /> */}
      </div>
      <PinCodeModal>
        <PinCode
          confirmFunction={() => {
            setHideBalance();
          }}
        />
      </PinCodeModal>{" "}
    </div>
  );
};

export default Home;
