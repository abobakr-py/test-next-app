import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import InputField from "@/Components/InputField.tsx/InputField";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai"; // Import icons
import { getCookie } from "cookies-next";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getCountryCallingCode } from "react-phone-number-input/input";
import Image from "next/image";
import closeIcon from "../../../assets/closeIcon.svg";
import ResponseError from "@/Components/ResponseError/ResponseError";
import { useErrorMessage } from "@/Zustand/ErrorMessage";

interface EditProfileDialogProps {
  isOpen: boolean;
  isLoadingProfileData: boolean;
  profileData: any;
  mutateProfileData: any;
  refetchProfileSettings: () => void;
  onClose: () => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  isLoadingProfileData,
  onClose,
  profileData,
  refetchProfileSettings,
  mutateProfileData,
}) => {
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    countryCode: "+20",
    phone: "",
  });
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      username: "",
      email: "",
      phone: "",
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

    // Phone validation
    const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;
    if (!formData.phone || !isValidPhoneNumber(fullPhoneNumber)) {
      newErrors.phone = "رقم الهاتف غير صالح أو مطلوب";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const lang = getCookie("NEXT_LOCALE");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
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
    setFormData({ ...formData, countryCode: countryCode, phone: "" });
  };
  const handleClose = () => {
    onClose();
    // Reset formData when closing the dialog
    setFormData({
      username: "",
      email: "",
      countryCode: "+20",
      phone: "",
    });
    setErrors({
      username: "",
      email: "",
      phone: "",
    });
    setData({ message: "", severity: "error" });
  };
  const { setData } = useErrorMessage();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyEdit = {
      data: JSON.stringify({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        countryCode: formData.countryCode,
      }),
    };
    if (validateForm()) {
      console.log("formData ", bodyEdit);
      mutateProfileData(bodyEdit, {
        onSuccess: () => {
          // On success, close the dialog and refetch profile settings
          onClose();
          refetchProfileSettings();
        },
        onError: (error: any) => {
          setData({ message: error.message, severity: "error" });
          console.error("Error updating profile data: ", error);
        },
      });
    }
  };
  useEffect(() => {
    if (profileData && isOpen) {
      setFormData({
        username: profileData.username || "",
        email: profileData.email || "",
        countryCode: profileData.countryCode || "+20",
        phone: profileData.phone || "",
      });
    }
  }, [profileData, isOpen]);
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "100%",
        },
      }}
    >
      <div className="lg:p-16 p-5">
        <div className="flex justify-end w-full ">
          <Image
            onClick={handleClose}
            src={closeIcon}
            alt={"closeIcon"}
            className="w-6 h-6 cursor-pointer"
            loading="eager"
          />
        </div>
        <div className="text-[#121212] items-start font-notoKufi-500 text-2xl">
          تعديل البيانات
        </div>
        <div style={{ width: "100%" }}>
          <p className="text-[#595959] items-start  font-notoKufi-400  font-notoKufi-400 text-sm">
            يرجى تحديث بياناتك أدناه. تأكد من أن جميع المعلومات دقيقة، حيث
            ستُستخدم في المراسلات الرسمية والمعاملات.
          </p>
          <div className="mt-6">
            <InputField
              lang={lang}
              type={"text"}
              placeholder="الأسم"
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
                  defaultCountry="EG"
                  value={`${formData.countryCode}${formData.phone}`}
                  onChange={handlePhoneChange}
                  onCountryChange={handleCountryChange}
                  numberInputProps={{
                    className: `rounded-xl  pr-2 pl-2 py-3 focus:outline-none ${
                      lang === "en" ? "text-start" : "text-end"
                    }`,
                  }}
                  limitMaxLength
                  name="phone"
                  placeholder="رقم الهاتف"
                  international
                  countryCallingCodeEditable={false}
                  className={`w-full pr-1 pl-3 border-2 text-start  rounded-xl focus:outline-none  focus:border-[#121212] focus:placeholder-[#121212] font-notoKufi-400 ${
                    errors.phone ? "border-[#DC3545]" : "border-[#E6E6E6]"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[#DC3545] text-xs font-notoKufi-400">
                  {errors.phone}
                </p>
              )}
            </div>
            <ResponseError />
          </div>
          <div className="flex flex-row w-full flex-wrap mt-4">
            <button
              disabled={isLoadingProfileData}
              onClick={handleSave}
              className=" bg-[#121212] py-3 px-16 rounded-xl cursor-pointer mt-4 mx-auto items-center flex lg:w-[40%] w-full justify-center"
            >
              {isLoadingProfileData ? (
                <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full"></div>
              ) : (
                <p className="text-[#FFF] text-lg font-notoKufi-400 r">حفظ</p>
              )}
            </button>
            <button
              onClick={handleClose}
              className=" bg-[#FFF] py-2 px-16 rounded-xl cursor-pointer mt-4 mx-auto items-center flex  lg:w-[40%] w-full border-2 border-[#121212] justify-center"
            >
              <p className="text-[#121212] text-lg font-notoKufi-400">إلغاء</p>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfileDialog;
