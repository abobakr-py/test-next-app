import React, { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";

const OTPField = ({
  OTPFull,
  setOTPFull,
  otp,
  setOtp,
  wrongOTP,
  isSubmit,
  setWrongOTP,
  language,
  otpTranslation,
}) => {
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[activeOTPIndex]?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    if (otp.every((digit) => digit.trim() !== "")) {
      setOTPFull(true);
      // Track OTP field complete event
      ReactGA.event({
        category: "User Interaction",
        action: "OTP Completed",
        label: "User entered a full OTP",
      });
    } else {
      setOTPFull(false);
      setWrongOTP(false);
    }
  }, [otp, setOTPFull, setWrongOTP]);

  const handleOnChange = (event, index) => {
    setWrongOTP(false);
    const { value } = event.target;
    const newOTP = [...otp];
    newOTP[index] = value.slice(-1);

    setOtp(newOTP);

    if (value) {
      setActiveOTPIndex((prev) => Math.min(prev + 1, otp.length - 1));
    }
    // Track OTP field change event
    ReactGA.event({
      category: "User Interaction",
      action: "OTP Field Changed",
      label: `User entered digit ${value.slice(-1)} in field ${index + 1}`,
    });
  };

  const handleOnKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const newOTP = [...otp];
      newOTP[index] = "";
      setOtp(newOTP);
      if (event.target.value === "")
        setActiveOTPIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "ArrowRight") {
      setActiveOTPIndex((prev) => Math.min(prev + 1, otp.length - 1));
    } else if (event.key === "ArrowLeft") {
      setActiveOTPIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleOnPaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("Text").slice(0, otp.length);
    const newOTP = [...otp];

    pastedData.split("").forEach((char, i) => {
      newOTP[i] = char;
    });

    setOtp(newOTP);
    setOTPFull(true);

    // Set focus to the next empty input after the pasted data
    const nextIndex =
      pastedData.length < otp.length ? pastedData.length : otp.length - 1;
    setActiveOTPIndex(nextIndex);
    // Track OTP paste event
    ReactGA.event({
      category: "User Interaction",
      action: "OTP Pasted",
      label: `User pasted OTP: ${pastedData}`,
    });
  };
  useEffect(() => {
    if (wrongOTP === true) {
      // Track wrong OTP event
      ReactGA.event({
        category: "User Interaction",
        action: "Wrong OTP Entered",
        label: "User entered wrong OTP",
      });
    }
  }, [wrongOTP]);
  return (
    <div dir={language === "en" ? "ltr" : "rtl"}>
      <div className="flex justify-center items-center space-x-2">
        {otp.map((_, index) => (
          <input
            key={index}
            type="number"
            ref={(el) => (inputRefs.current[index] = el)}
            className={`
            ${
              wrongOTP === true
                ? "ring-2 text-[#FF505C] ring-[#FF505C]"
                : wrongOTP === "success"
                ? "ring-2 text-[#0DD877] ring-[#0DD877]"
                : "focus:ring-2 focus:text-mainYellow focus:ring-mainYellow"
            }
            shadow-newCustom w-20 h-20 border rounded-lg bg-transparent outline-none text-center font-semibold text-5xl spin-button-none transition
            `}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            onPaste={handleOnPaste}
            value={otp[index]}
          />
        ))}
      </div>
      <p
        className={`text-center text-[#FF505C] mt-10 ${
          wrongOTP === true ? "block" : "hidden"
        }`}
      >
        {otpTranslation.wrong}
      </p>
      <p
        className={`text-center text-[#FF505C] mt-10 ${
          isSubmit && OTPFull === false ? "block" : "hidden"
        }`}
      >
        {otpTranslation.fill}
      </p>
    </div>
  );
};

export default OTPField;
