"use client";
import React, { useState } from "react";

interface OTPInputProps {
  inputRefs: Array<React.RefObject<HTMLInputElement>>;
  otpError: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ inputRefs, otpError }) => {
  const [otp, setOtp] = useState<string[]>(Array(inputRefs.length).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    // Allow only digits
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if the value is a digit
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Handle backspace to go to the previous input
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 4); // Take only the first 4 characters

    // Check if the pasted data is numeric
    if (/^\d+$/.test(pasteData)) {
      e.preventDefault(); // Prevent default paste behavior

      // Distribute each digit into the respective input field
      const newOtp = [...otp];
      pasteData.split("").forEach((digit, idx) => {
        if (idx < inputRefs.length) {
          newOtp[idx] = digit;
          inputRefs[idx].current!.value = digit;
        }
      });
      setOtp(newOtp);

      // Move focus to the appropriate next input
      const nextIndex =
        pasteData.length < inputRefs.length
          ? pasteData.length
          : inputRefs.length - 1;
      inputRefs[nextIndex]?.current?.focus();
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          type="text"
          ref={ref}
          value={otp[index]}
          maxLength={1}
          className={` w-[3.313rem]  py-4 text-center rounded-xl  focus:border-[#121212] focus:placeholder-[#121212] ${
            otpError
              ? "border bg-[#DC3545] bg-opacity-5 border-[#DC3545] text-[#DC3545]"
              : "border-[#F5F5F5] bg-[#F5F5F5]  focus:border-[#121212] focus:placeholder-[#121212]"
          } bg-[#F5F5F5] font-notoKufi-400 text-[#121212] text-4xl`}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined} // Only attach onPaste to the first input
        />
      ))}
    </div>
  );
};

export default OTPInput;
