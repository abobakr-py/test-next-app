"use client";
import Navbar from "@/Components/Navbar/Navbar";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import profilePicture from "../../../assets/profilePicture.svg";
import cameraImage from "../../../assets/camera.svg";
import arrowcircleright from "../../../assets/arrow-circle-right.svg";
import { useRouter } from "next/navigation";
import { useFetchProfileSettings } from "@/Apis/Profile/queries";
import { imageBaseUrl } from "@/config/axiosInstance";
import { Skeleton } from "@mui/material";
import ResponseError from "@/Components/ResponseError/ResponseError";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEditProfileMutation } from "@/Apis/Profile/mutation";
import InputField from "@/Components/InputField.tsx/InputField";
import { getCountryCallingCode } from "react-phone-number-input/input";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai"; // Import icons
import { EditProfileFormData } from "@/types/Profile";

const MobileEditProfile = () => {
  const lang = getCookie("NEXT_LOCALE");
  const router = useRouter();
  const {
    data: profileData,
    isLoading: profileDataLoading,
    refetch: refetchProfileSettings,
  } = useFetchProfileSettings();
  const domain = imageBaseUrl;
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to hold the image URL
  const [formData, setFormData] = useState({
    profile_photo: null,
    username: "",
    email: "",
    phone: "",
    countryCode: "+20",
  });
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };
  const { mutate: mutateProfileData, isPending: isLoadingProfileData } =
    useEditProfileMutation();

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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);

      // Create a URL for the selected image to display it as a preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData((prevPayload: any) => ({
        ...prevPayload,
        profile_photo: file,
      }));
    }
  };
  const [errors, setErrors] = useState({
    profile_photo: null,
    username: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      profile_photo: null,
      username: "",
      email: "",
      phone: "",
    };

    setErrors(newErrors);
    return valid;
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
      profile_photo: formData.profile_photo || null,
    };
    if (validateForm()) {
      console.log("formData ", bodyEdit);
      mutateProfileData(bodyEdit, {
        onSuccess: () => {
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
    if (profileData) {
      setFormData({
        username: profileData.username || "",
        email: profileData.email || "",
        countryCode: profileData.countryCode || "+20",
        phone: profileData.phone || "",
        profile_photo: formData.profile_photo,
      });
    }
  }, [profileData]);
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
            تعديل البيانات
          </p>
          <p className="text-[#595959] text-xs font-notoKufi-400 mt-3">
            يرجى تحديث بياناتك أدناه. تأكد من أن جميع المعلومات دقيقة، حيث
            ستُستخدم في المراسلات الرسمية والمعاملات.
          </p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer mt-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {profileDataLoading ? (
            <>
              <Skeleton variant="circular" width={80} height={80} />
              <Skeleton variant="text" width={80} height={24} />
            </>
          ) : (
            <>
              <div className="relative">
                <Image
                  onClick={handleImageClick}
                  src={
                    imagePreview ||
                    (profileData?.profile_photo
                      ? `${domain}/${profileData?.profile_photo}`
                      : profilePicture)
                  }
                  alt="profilePicture"
                  className="w-20 h-20 rounded-full"
                  width={80}
                  height={80}
                  loading="eager"
                  crossOrigin="anonymous"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              {/* Username */}
              <p>{profileData?.username}</p>
            </>
          )}
        </div>
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
          <button className=" bg-[#FFF] py-2 px-16 rounded-xl cursor-pointer mt-4 mx-auto items-center flex  lg:w-[40%] w-full border-2 border-[#121212] justify-center">
            <p className="text-[#121212] text-lg font-notoKufi-400">إلغاء</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MobileEditProfile;
