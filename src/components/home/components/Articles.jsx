import React from "react";
import gold from "@/assets/HomePage/articles/gold.png";
import send from "@/assets/HomePage/articles/send.png";
import Image from "next/image";
import Link from "next/link";
const Articles = () => {
  return (
    <div>
      <p className="text-[#808080] text-sm mb-6">Articles</p>
      <div className="flex items-center justify-between gap-8">
        <div className="w-fit">
          <Image src={gold} alt="gold" />
          <div className="flex items-center justify-between my-6">
            <p className="text-[#4c4c4c]">Why Gold is the Ultimate Safe Haven Asset</p>
            <Link href={""}>
              <Image src={send} alt="arrow" />
            </Link>
          </div>
        </div>
        <div className="w-fit">
          <Image src={gold} alt="gold" />
          <div className="flex items-center justify-between my-6">
            <p className="text-[#4c4c4c]">Why Gold is the Ultimate Safe Haven Asset</p>
            <Link href={""}>
              <Image src={send} alt="arrow" />
            </Link>
          </div>
        </div>
        <div className="w-fit">
          <Image src={gold} alt="gold" />
          <div className="flex items-center justify-between my-6">
            <p className="text-[#4c4c4c]">Why Gold is the Ultimate Safe Haven Asset</p>
            <Link href={""}>
              <Image src={send} alt="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
