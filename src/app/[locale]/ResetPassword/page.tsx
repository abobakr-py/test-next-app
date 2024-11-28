"use client";
import ResponseError from "@/Components/ResponseError/ResponseError";
import ValidationItem from "@/Components/ValidationItem/ValidationItem";
import LeftSide from "@/Pages/SignUp/LeftSide";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/Apis/ResetPassword/mutation";
import InputField from "@/Components/InputField.tsx/InputField";
import { AiOutlineLock } from "react-icons/ai";
import Button from "@/Components/Button/Button";

const ResetPassword: React.FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams(); // Get the search parameters
  const emailOrPhone = searchParams ? searchParams.get("emailOrPhone") : null;
  const otp = searchParams ? searchParams.get("otp") : null;
  const { mutate: mutateResetPassword, isPending: isLoadingResetPassword } =
    useResetPasswordMutation();
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    repeatPassword: "",
  });
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      password: "",
      repeatPassword: "",
    };

    // Password validation
    const password = formData.password;
    const passwordRequirements = [
      { regex: /.{8,}/, message: "يجب أن تكون كلمة المرور 8 أحرف على الأقل" }, // At least 8 characters
      {
        regex: /[A-Z]/,
        message: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل",
      }, // At least one uppercase letter
      {
        regex: /[a-z]/,
        message: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل",
      }, // At least one lowercase letter
      {
        regex: /\d/,
        message: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل",
      }, // At least one digit
      {
        regex: /[!@#$%^&*(),.?":{}|<>]/,
        message: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل",
      }, // At least one special character
    ];

    for (const requirement of passwordRequirements) {
      if (!requirement.regex.test(password)) {
        newErrors.password = requirement.message;
        valid = false;
        break; // Stop checking further if one requirement fails
      }
    }

    // Confirm password validation
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "كلمتا المرور غير متطابقتين";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (emailOrPhone && otp) {
        const payload = {
          emailOrPhone: emailOrPhone,
          otp: otp,
          password: formData.password,
          repeatPassword: formData.repeatPassword,
        };
        mutateResetPassword(payload);
      } else {
        console.log("error in reset password");
      }
    } else {
      console.log("Form has errors");
    }
  };
  return (
    <div className="flex w-full min-h-screen">
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
            type="password"
            placeholder="كلمة المرور"
            icon={AiOutlineLock}
            value={formData.password}
            name={"password"}
            onChange={handleInputChange}
            error={errors.password}
          />
          <InputField
            type="password"
            placeholder="تأكيد كلمة المرور"
            icon={AiOutlineLock}
            value={formData.repeatPassword}
            name={"repeatPassword"}
            onChange={handleInputChange}
            error={errors.repeatPassword}
          />
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-col space-y-2 flex-nowrap">
              <ValidationItem
                isValid={formData?.password.trim().length >= 8}
                label="8 أحرف على الأقل."
              />
              <ValidationItem
                isValid={formData?.password.match(/[A-Z]/)}
                label="يجب أن تحتوي كلمة المرور على حرف كبير (A-Z)."
              />
              <div className="pb-2">
                <ValidationItem
                  isValid={formData?.password.match(/\d/)}
                  label="رقم واحد على الأقل (0-9)."
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 flex-nowrap">
              <ValidationItem
                isValid={formData?.password.match(/[\W_]/)}
                label="رمز خاص واحد على الأقل (مثل @، #، $، %)."
              />
              <ValidationItem
                isValid={formData?.password.match(/[a-z]/)}
                label="يجب أن تحتوي كلمة المرور على حرف صغير (a-z)."
              />
              <ValidationItem
                isValid={
                  formData?.password !== "" &&
                  formData?.repeatPassword !== "" &&
                  formData?.password === formData?.repeatPassword
                }
                label="يجب أن تتطابق كلمة المرور مع التأكيد."
              />
            </div>
          </div>
          <ResponseError />
          <div className="mt-10">
            <Button
              isLoading={isLoadingResetPassword}
              icon={FaArrowLeftLong}
              onClick={handleSubmit}
              label="إعادة تعيين كلمة المرور"
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

export default ResetPassword;
