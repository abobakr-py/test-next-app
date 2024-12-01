"use client";
import { useState } from "react";
import card from "@/assets/HomePage/goldPart/card.png";
import Image from "next/image";
import info from "@/assets/HomePage/goldPart/info.png";
import add from "@/assets/HomePage/goldPart/add.png";
import hide from "@/assets/HomePage/goldPart/hide.png";
import logo from "@/assets/HomePage/goldPart/cardLogo.png";
import weightCardBg from "@/assets/dashboard/weightCardBg.png";
import { useGlobal } from "@/zustand/useGlobal";
const SellCard = ({ buySell, userGold }) => {
  // const [showTooltip, setShowTooltip] = useState(false);
  const { hideBalance } = useGlobal();

  return (
    <div className="w-full flex flex-col justify-center">
      <div
        className="relative bg-cover bg-center w-4/5  h-[15S.063rem] text-white rounded-[1.75rem]"
        style={{ backgroundImage: `url(${weightCardBg.src})` }}
      >
        <div className="px-8 py-11 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p> {buySell?.totalWeight} </p>{" "}
              {/* <div
                className="relative mt-[0.1rem]"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Image
                  src={info}
                  alt="info"
                  width={18}
                  className="cursor-pointer"
                />
                {showTooltip && (
                  <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg -left-[3.7rem]">
                    This is your tooltip text
                    <div className="absolute h-2 w-2 bg-gray-800 rotate-45 left-[4rem]"></div>
                  </div>
                )}
              </div> */}
            </div>
            <Image src={logo} alt="cardlogo" />
          </div>
          <p className={` pb-10 mt-4 text-4xl font-medium  `}>
            {hideBalance ? (
              <p className="">**************</p>
            ) : (
              `${userGold?.golds?.totalWeight} ${buySell?.grams}`
            )}
          </p>
          {/* <div className="flex items-center justify-around mt-14">
            <button
              className="w-full flex items-center justify-start gap-2 pr-2  "
              onClick={() => setShowBalance(!showBalance)}
            >
              <Image src={hide} alt="hide" />{" "}
              {showBalance ? buySell?.hideBalance : buySell?.showBalance}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SellCard;
