"use client";
import { useResendVerifyMailMutation } from "@/Apis/ResendVerifyMail/mutation";
import { useVerifyMailMutation } from "@/Apis/VerifyMail/mutation";
import Button from "@/Components/Button/Button";
import ResponseError from "@/Components/ResponseError/ResponseError";
import LeftSide from "@/Pages/SignUp/LeftSide";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import OTPInput from "../OTPInput/page";

const Verify: React.FC = () => {
  const searchParams = useSearchParams(); // Get the search parameters
  const { mutate: mutateVerifyMail, isPending: isLoadingVerifyMail } =
    useVerifyMailMutation();
  const mutationResend = useResendVerifyMailMutation();
  const email = searchParams ? searchParams.get("email") : null;
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [otpError, setOtpError] = useState(false);
  // Refs to OTP inputs
  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isTimerActive && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerActive(false); // Timer has ended
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [secondsLeft, isTimerActive]);

  // Function to handle resend
  const handleResend = () => {
    if (email) {
      const payload = {
        email: email,
      };
      mutationResend.mutate(payload);
      setSecondsLeft(60);
      setIsTimerActive(true);
    } else {
      console.error("Email is null. Cannot proceed with OTP verification.");
    }
  };

  // Function to handle OTP validation on button click
  const handleOTPValidation = () => {
    let otpValues = inputRefs.map((ref) => ref.current?.value).join("");

    let isError = otpValues.length < 4;

    if (isError) {
      setOtpError(true);
    } else {
      setOtpError(false);
      if (email) {
        const payload = {
          email: email,
          otp: otpValues,
        };
        mutateVerifyMail(payload);
      } else {
        // Handle the case where email is null
        console.error("Email is null. Cannot proceed with OTP verification.");
      }
    }
  };
  const router = useRouter();

  return (
    <div className="flex w-full min-h-screen ">
      <div className="w-full mx-auto md:w-1/2 h-full flex flex-col pb-20 mt-24">
        <div className="w-10/12 mx-auto">
          <div>
            <p
              onClick={() => {
                router.push("/");
              }}
              className="text-[#121212] w-fit text-base font-notoKufi-600 cursor-pointer"
            >
              CryptoLab
            </p>
            <h1 className="text-4xl font-notoKufi-500 mb-4 mt-8 text-[#121212] ">
              التحقق من بريدك الإلكتروني
            </h1>
            <p className="text-sm mb-8 font-notoKufi-400 text-[#666666]">
              تم إرسال رمز التحقق إلى بريدك الإلكتروني. يرجى إدخال الرمز للتحقق
              من حسابك. إذا لم تتلقَ الرمز في غضون دقائق، تحقق من مجلد الرسائل
              غير المرغوب فيها أو أعد إرسال الرمز.
            </p>
          </div>
          <div dir={"ltr"} className="flex justify-center">
            {/* Pass error state and refs to OTPInput */}
            <OTPInput inputRefs={inputRefs} otpError={otpError} />
          </div>
          {otpError && (
            <p className="text-[#DC3545] text-xs font-notoKufi-400 mt-6 flex justify-center">
              الرمز الذي أدخلته غير صحيح. يرجى التحقق والمحاولة مرة أخرى.
            </p>
          )}
          <ResponseError />
          <div className="mt-16">
            <Button
              isLoading={isLoadingVerifyMail}
              icon={FaArrowLeftLong}
              onClick={handleOTPValidation} // Validate OTP on button click
              label="تحقق الآن"
            />
            <div className="text-center mt-8">
              {isTimerActive ? (
                <p className="text-[#B3B3B3] text-xs font-notoKufi-400">
                  يمكنك طلب إعادة إرسال الرمز بعد{" "}
                  <span className="text-[#121212]">
                    {`[00:${
                      secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
                    }]`}{" "}
                  </span>
                  .
                </p>
              ) : (
                <p
                  className="text-[#B3B3B3] text-xs font-notoKufi-400 "
                  onClick={handleResend}
                >
                  لم يصلك الرمز؟{" "}
                  <span className="cursor-pointer underline text-[#121212]">
                    أعد إرسال الرمز
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 h-full flex-shrink-0 flex-1">
        <LeftSide />
      </div>
    </div>
  );
};

export default Verify;
