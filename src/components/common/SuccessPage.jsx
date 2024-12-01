"use client";
import Image from "next/image";
import bigTick from "../../assets/big-tick.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (
      !localStorage.getItem("phoneOrEmail") ||
      !localStorage.getItem("phoneOrEmailOTP")
    ) {
      router.back();
    }
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center font-ibm h-screen">
      <Image src={bigTick} alt="bigTick" />
      <h1 className="font-semibold text-[2rem] text-mainGrey mt-12 mb-8">
        Password Reset Successful
      </h1>
      <h2 className="text-[1.125rem] text-subGrey mb-12">
        Your password has been successfully reset. You can now login with your
        new password.
      </h2>
      <Link
        onClick={() => {
          localStorage.removeItem("OTP");
          localStorage.removeItem("phoneOrEmail");
          localStorage.removeItem("phoneOrEmailOTP");
        }}
        href={"/login"}
        className="bg-mainYellow text-base text-white py-2 px-4 rounded-2xl mt-4 disabled:bg-[#999999] w-1/5 text-center"
      >
        Login
      </Link>
    </div>
  );
};

export default SuccessPage;
