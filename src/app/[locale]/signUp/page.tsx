"use client";
import Button from "@/Components/Button/Button";
import InputField from "@/Components/InputField.tsx/InputField";
import ResponseError from "@/Components/ResponseError/ResponseError";
import ValidationItem from "@/Components/ValidationItem/ValidationItem";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getCountryCallingCode } from "react-phone-number-input/input";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useSignUpMutation } from "@/Apis/SignUp/mutation";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/Apis/Login/mutation";
import { getCookie } from "cookies-next";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Import icons
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import LeftSide from "@/Pages/SignUp/LeftSide";
import { FcGoogle } from "react-icons/fc";

const SignUp: React.FC = () => {
  const t = useTranslations("signup");
  const { mutate: mutateSignUp, isPending: isLoadingSignUp } =
    useSignUpMutation();
  const { mutate: mutateLogin, isPending: isLoadingLogin } = useLoginMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    countryCode: "+20",
    phone: "",
    password: "",
    repeatPassword: "",
  });
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });
  const [errorsLogin, setErrorsLogin] = useState({
    email: "",
    password: "",
  });
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      username: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
    };

    // Name validation
    const nameParts = formData.username.trim().split(" ");
    if (nameParts.length < 2) {
      newErrors.username =
        "يجب أن يتكون الاسم من جزئين (الاسم الأول والاسم الأخير)";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "صيغة البريد الإلكتروني التي أدخلتها غير صحيحة. حاول مرة أخرى (مثال: example@email.com).";
      valid = false;
    }

    // // Phone validation
    // const phoneRegex = /^(010|011|012|015)\d{8}$/;

    // if (!formData.phone || formData.phone.length < 11) {
    //   // Check if the field is empty
    //   newErrors.phone = "رقم الهاتف غير صالح";
    //   valid = false;
    // } else if (!phoneRegex.test(formData.phone)) {
    //   // Check if it doesn't match the required pattern
    //   newErrors.phone = "يجب أن يبدأ رقم الهاتف ب 010 أو 011 أو 012 أو 015";
    //   valid = false;
    // }

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
  const validateLoginForm = () => {
    let valid = true;
    let newErrors = {
      email: "",
      password: "",
    };
    // Email validation (simple regex for basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formDataLogin.email || !emailRegex.test(formDataLogin.email)) {
      newErrors.email =
        "صيغة البريد الإلكتروني التي أدخلتها غير صحيحة. حاول مرة أخرى";
      valid = false;
    }

    // Password validation (must not be empty)
    if (!formDataLogin.password || formDataLogin.password.trim() === "") {
      newErrors.password = "كلمة المرور يجب ان لا تكون فارغه";
      valid = false;
    }
    setErrorsLogin(newErrors);
    return valid;
  };
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginForm()) {
      mutateLogin(formDataLogin);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("formData ", formData);
      mutateSignUp(formData);
    }
  };
  const handlePhoneChange = (value: any) => {
    if (value) {
      const phoneNumber = parsePhoneNumber(value);
      if (phoneNumber) {
        setFormData({
          ...formData,
          countryCode: `+${phoneNumber.countryCallingCode}`, // Set country code
          phone: phoneNumber.nationalNumber, // Only the local number without country code
        });
      }
    } else {
      setFormData({ ...formData, phone: "", countryCode: "" });
    }
  };

  const handleCountryChange = (country: any) => {
    const countryCode = country ? `+${getCountryCallingCode(country)}` : "";
    setFormData({ ...formData, countryCode: countryCode, phone: "" }); // Reset phone when country changes
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataLogin({ ...formDataLogin, [name]: value });
  };
  const [activeTab, setActiveTab] = useState("signUp");
  const lang = getCookie("NEXT_LOCALE");

  return (
    <div className="flex w-full min-h-screen ">
      {/* Hide the left side on screens smaller than 700px (md) */}

      <div className="w-full mx-auto md:w-1/2 h-full flex flex-col pb-20 mt-24">
        <div className="w-10/12 mx-auto ">
          <p
            onClick={() => {
              router.push("/");
            }}
            className="text-[#121212] text-base w-fit font-notoKufi-600 cursor-pointer "
          >
            CryptoLab
          </p>
          <h1 className="text-4xl font-notoKufi-500 mb-4 mt-8 text-[#121212]  ">
            {t("welcome")}
          </h1>
          <p className="text-sm mb-8 font-notoKufi-400 text-[#666666] ">
            {t("loginorsignup")}
          </p>

          {/* Tabs */}
          <div className="flex justify-center bg-[#F5F5F5] w-full rounded-2xl p-2 h-[3.5rem]">
            <button
              onClick={() => setActiveTab("signIn")}
              className={`px-6 py-2 rounded-lg ml-2 w-full font-notoKufi-400 text-sm ${
                activeTab === "signIn"
                  ? "bg-[#121212] text-white"
                  : "bg-[#F5F5F5] text-[#B3B3B3]"
              }`}
            >
              {t("login")}
            </button>
            <button
              onClick={() => setActiveTab("signUp")}
              className={`px-6 py-2 rounded-lg font-notoKufi-400 w-full text-sm ${
                activeTab === "signUp"
                  ? "bg-[#121212] text-white"
                  : "bg-[#F5F5F5] text-[#B3B3B3]"
              }`}
            >
              {t("signup")}
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "signUp" ? (
            <div className={`mt-10`}>
              <InputField
                lang={lang}
                type={"text"}
                placeholder="Alaa Ali"
                icon={AiOutlineUser}
                value={formData.username}
                name={"username"}
                onChange={handleInputChange}
                error={errors.username}
              />
              <InputField
                lang={lang}
                type="email"
                placeholder="example@gmail.com"
                icon={AiOutlineMail}
                value={formData.email}
                name={"email"}
                onChange={handleInputChange}
                error={errors.email}
              />
              <div className="flex flex-col mb-4 text-[#B3B3B3]">
                <div
                  className={`relative flex items-center mb-2 focus-within:text-[#121212] ${
                    errors.phone ? "text-[#DC3545]" : ""
                  }`}
                >
                  {/* Phone Input */}
                  <PhoneInput
                    // dir={lang === "en" ? "ltr" : "rtl"}
                    defaultCountry="EG"
                    value={`${formData.countryCode}${formData.phone}`}
                    onChange={handlePhoneChange}
                    onCountryChange={handleCountryChange}
                    numberInputProps={{
                      className: `rounded-xl  pr-2 pl-2 py-3 focus:outline-none ${
                        lang === "en" ? "text-start" : "text-end"
                      }`, // my Tailwind classes
                    }}
                    limitMaxLength
                    name="phone"
                    placeholder="رقم الهاتف"
                    international
                    countryCallingCodeEditable={false}
                    className={`w-full pr-1 pl-3 border-2 text-start  rounded-xl focus:outline-none  focus:border-[#121212] focus:placeholder-[#121212] font-notoKufi-400 ${
                      errors.phone ? "border-[#DC3545]" : "border-[#E6E6E6]"
                    }`}
                    error={
                      formData.phone
                        ? isValidPhoneNumber(formData.phone)
                          ? undefined
                          : "Invalid phone number"
                        : "Phone number required"
                    }
                  />
                </div>
              </div>
              <InputField
                lang={lang}
                type="password"
                placeholder="كلمة المرور"
                icon={AiOutlineLock}
                value={formData.password}
                name={"password"}
                onChange={handleInputChange}
                error={errors.password}
              />
              <InputField
                lang={lang}
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
              <div className="text-[#B3B3B3] text-xs font-notoKufi-400 mt-14">
                عن طريق المتابعة أنت تقرّ بأنك قد قرأت وتوافق على{" "}
                <span className="text-[#121212] text-xs font-notoKufi-400 cursor-pointer underline">
                  الشروط والأحكام
                </span>{" "}
                الخاصة بنا.
              </div>
              <ResponseError />
              <div className="mt-16">
                <Button
                  isLoading={isLoadingSignUp}
                  icon={lang === "ar" ? FaArrowLeftLong : FaArrowRightLong}
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  label={t("register")}
                />
              </div>
              <div className="flex items-center justify-center my-10">
                <div className="border-t border-[#E6E6E6] flex-grow ml-3"></div>
                <span className="text-[#E6E6E6] text-sm font-notoKufi-400">
                  أو
                </span>
                <div className="border-t border-[#E6E6E6] flex-grow mr-3"></div>
              </div>
              <Button
                icon={FcGoogle}
                onClick={() => {}}
                label="سجل باستخدام جوجل"
                variant="google"
              />
            </div>
          ) : (
            <div className={`mt-10`}>
              <InputField
                lang={lang}
                type="email"
                placeholder="example@gmail.com"
                icon={AiOutlineMail}
                value={formDataLogin.email}
                name={"email"}
                onChange={handleInputChangeLogin}
                error={errorsLogin.email}
              />
              <InputField
                lang={lang}
                type="password"
                placeholder="كلمة المرور"
                icon={AiOutlineLock}
                value={formDataLogin.password}
                name={"password"}
                onChange={handleInputChangeLogin}
                error={errorsLogin.password}
              />
              <div className="flex justify-end -mt-3">
                <p
                  className="text-xs font-notoKufi-400 text-[#121212] flex  cursor-pointer"
                  onClick={() => {
                    router.push("/ForgetPassword");
                  }}
                >
                  {t("forgetPassword")}
                </p>
              </div>
              <ResponseError />
              <div className="mt-14">
                <Button
                  isLoading={isLoadingLogin}
                  icon={FaArrowLeftLong}
                  onClick={(e) => {
                    handleLoginSubmit(e);
                  }}
                  label="سجل الآن"
                />
              </div>
              <div className="flex items-center justify-center my-10">
                <div className="border-t border-[#E6E6E6] flex-grow ml-3"></div>
                <span className="text-[#E6E6E6] text-sm font-notoKufi-400">
                  أو
                </span>
                <div className="border-t border-[#E6E6E6] flex-grow mr-3"></div>
              </div>

              <Button
                icon={FcGoogle}
                onClick={() => {}}
                label="سجل باستخدام جوجل"
                variant="google"
              />
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 h-full flex-shrink-0 flex-1">
        <LeftSide />
      </div>
    </div>
  );
};

export default SignUp;
