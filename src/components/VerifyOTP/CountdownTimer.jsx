"use client";
import {
  useResendEmail,
  useResendLoginOTP,
  useResendPhone,
} from "@/apis/OTP/mutations";
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";

function CountdownTimer({ resetTimer, setResetTimer, otpTranslation }) {
  const timeLeft = localStorage.getItem("timeLeft") ?? 60;
  const phoneOrEmail = localStorage.getItem("phoneOrEmail");
  const phoneOrEmailType = localStorage.getItem("phoneOrEmailOTP");

  const mutatePhoneResend = useResendPhone();
  const mutateEmailOrPhone = useResendLoginOTP();
  const [attempts, setAttempts] = useState(0); // Track resend attempts
  const [secondsLeft, setSecondsLeft] = useState(
    timeLeft !== "undefined" ? timeLeft : 60
  ); // Initial timer is 60s for first attempt
  const getTimeoutDuration = () => {
    // Different timeout durations based on attempts
    switch (attempts) {
      case 1:
        return 300; // 1 minute for first attempt
      case 2:
        return 600; // 5 minutes for second attempt
      case 3:
        return 3600; // 10 minutes for third attempt
      default:
        return 60;
    }
  };
  const resendCode = async () => {
    ReactGA.event({
      category: "User Interaction",
      action: "Resend OTP",
      label: "Resend OTP",
    });
    let sentData = {};
    if (phoneOrEmailType === "phone") {
      sentData = {
        countryCode: "20",
        phone: phoneOrEmail,
        credentials_type: "phone",
      };
    } else {
      sentData = {
        email: phoneOrEmail,
        credentials_type: "email",
      };
    }
    await mutateEmailOrPhone.mutateAsync(sentData).then((response) => {
      setSecondsLeft(response?.data?.time);
      if (!response?.data?.time) {
        setSecondsLeft(getTimeoutDuration());
      }
      localStorage.setItem("timeLeft", response?.data?.time);
    });

    setAttempts(attempts + 1); // Increment the attempt count
  };

  useEffect(() => {
    if (resetTimer) {
      setResetTimer(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTimer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        clearInterval(intervalId);
        // Optionally handle countdown end
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  return (
    <div
      className={`text-center mt-6 text-mainYellow
    ${attempts < 4 ? "block" : "hidden"}
    `}
    >
      {secondsLeft ? (
        `${Number(secondsLeft)?.toFixed(2)} s`
      ) : (
        <p className="text-md text-[#808080]">
          {otpTranslation.receive}
          <span
            className="text-mainYellow cursor-pointer mx-1"
            onClick={() => {
              resendCode();
            }}
          >
            {otpTranslation.resend}
          </span>
        </p>
      )}
    </div>
  );
}

export default CountdownTimer;
