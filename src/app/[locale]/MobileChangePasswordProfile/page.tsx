"use client";
import Navbar from "@/Components/Navbar/Navbar";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useState } from "react";
import arrowcircleright from "../../../assets/arrow-circle-right.svg";
import { useRouter } from "next/navigation";
import ResponseError from "@/Components/ResponseError/ResponseError";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import InputField from "@/Components/InputField.tsx/InputField";
import { AiOutlineLock } from "react-icons/ai"; // Import icons
import { useChangePasswordMutation } from "@/Apis/ChangePassword/mutation";
import ValidationItem from "@/Components/ValidationItem/ValidationItem";

const MobileChangePasswordProfile = () => {
  const lang = getCookie("NEXT_LOCALE");
  const router = useRouter();
  const { mutate: mutateChangePassword, isPending: isLoadingChangePassword } =
    useChangePasswordMutation();
  const [errors, setErrors] = useState({
    oldPassword: "",
    password: "",
    repeatPassword: "",
  });
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    repeatPassword: "",
  });
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      oldPassword: "",
      password: "",
      repeatPassword: "",
    };
    // Password validation (must not be empty)
    if (!formData.oldPassword || formData.oldPassword.trim() === "") {
      newErrors.oldPassword = "كلمة المرور يجب ان لا تكون فارغه";
      valid = false;
    }
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
  const { setData } = useErrorMessage();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutateChangePassword(formData, {
        onSuccess: (data) => {
          router.push(`/Profile`);
        },
      });
    }
  };
  return (
    <div className="w-[100%] mx-auto h-full flex lg:hidden flex-col py-4  overflow-hidden">
      <div className="lg:w-[1344px] w-[95%] mx-auto pt-6 ">
        <Navbar lang={lang} />
      </div>
      <div className="bg-[#FFF] w-[95%] mx-auto px-4 mt-8">
        <Image
          onClick={() => {
            router.push(`/Profile`);
          }}
          src={arrowcircleright}
          alt={"arrowcircleright"}
          className="w-6 h-6 rounded-full"
          width={24}
          height={24}
          loading="eager"
        />
        <div className="mt-3">
          <p className="text-[#121212] text-xl font-notoKufi-500">
            تغيير كلمة المرور
          </p>
          <p className="text-[#595959] text-xs font-notoKufi-400 mt-3">
            أدخل كلمة مرور جديدة وأكدها.
          </p>
        </div>
        <div className="mt-6">
          <InputField
            lang={lang}
            type="password"
            placeholder="كلمة المرور الحالية"
            icon={AiOutlineLock}
            value={formData.oldPassword}
            name={"oldPassword"}
            onChange={handleInputChange}
            error={errors.oldPassword}
          />
          <InputField
            lang={lang}
            type="password"
            placeholder="كلمة المرور الجديدة"
            icon={AiOutlineLock}
            value={formData.password}
            name={"password"}
            onChange={handleInputChange}
            error={errors.password}
          />
          <InputField
            lang={lang}
            type="password"
            placeholder="تأكيد كلمة المرور الجديدة"
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
        </div>
        <div className="flex flex-row w-full flex-wrap mt-4">
          <button
            disabled={isLoadingChangePassword}
            onClick={handleSave}
            className=" bg-[#121212] py-3 px-16 rounded-xl cursor-pointer mt-4 mx-auto items-center flex lg:w-[40%] w-full justify-center"
          >
            {isLoadingChangePassword ? (
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full"></div>
            ) : (
              <p className="text-[#FFF] text-lg font-notoKufi-400 r">حفظ</p>
            )}
          </button>
          <button className=" bg-[#FFF] py-2 px-16 rounded-xl cursor-pointer mt-4 mx-auto items-center flex  lg:w-[40%] w-full border-2 border-[#121212] justify-center">
            <p className="text-[#121212] text-lg font-notoKufi-400">إلغاء</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MobileChangePasswordProfile;
