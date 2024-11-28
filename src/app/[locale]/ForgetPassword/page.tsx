"use client";
import { useForgetPasswordMutation } from "@/Apis/ForgetPassword/mutation";
import Button from "@/Components/Button/Button";
import InputField from "@/Components/InputField.tsx/InputField";
import ResponseError from "@/Components/ResponseError/ResponseError";
import { AiOutlineMail } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import LeftSide from "@/Pages/SignUp/LeftSide";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgetPassword = () => {
  const router = useRouter();

  const { mutate: mutateForgetPassword, isPending: isLoadingForgetPassword } =
    useForgetPasswordMutation();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
  });
  const [errors, setErrors] = useState({
    emailOrPhone: "",
  });
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      emailOrPhone: "",
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailOrPhone)) {
      newErrors.emailOrPhone = "البريد الإلكتروني غير صحيح ";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutateForgetPassword(formData);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="flex w-full min-h-screen ">
      <div className="w-full mx-auto md:w-1/2 h-full flex flex-col pb-20 mt-24">
        <div className="w-10/12 mx-auto">
          <p
            onClick={() => {
              router.push("/");
            }}
            className="text-[#121212] w-fit  text-base font-notoKufi-600 cursor-pointer"
          >
            CryptoLab
          </p>
          <h1 className="text-4xl font-notoKufi-500 mb-4 mt-8 text-[#121212] ">
            هل نسيت كلمة المرور؟
          </h1>
          <p className="text-sm mb-8 font-notoKufi-400 text-[#666666]">
            تم إرسال رمز التحقق إلى بريدك الإلكتروني. إذا لم تتلقَ الرمز في غضون
            دقائق، تحقق من مجلد الرسائل غير المرغوب فيها أو أعد إرسال الرمز
          </p>
          <InputField
            type="email"
            placeholder="البريد الإلكترونى"
            icon={AiOutlineMail}
            value={formData.emailOrPhone}
            name={"emailOrPhone"}
            onChange={handleInputChange}
            error={errors.emailOrPhone}
          />
          <ResponseError />
          <div className="mt-10">
            <Button
              isLoading={isLoadingForgetPassword}
              icon={FaArrowLeftLong}
              onClick={(e) => {
                handleSendMail(e);
              }}
              label="إرسال رمز التحقق"
            />
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 h-full flex-shrink-0 flex-1">
        <LeftSide />
      </div>
    </div>
  );
};

export default ForgetPassword;
