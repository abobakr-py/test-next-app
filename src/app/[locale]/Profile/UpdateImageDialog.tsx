import React, { useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { getCookie } from "cookies-next";
import "react-phone-number-input/style.css";
import profilePicture from "../../../assets/profilePicture.svg";
import Image from "next/image";
import closeIcon from "../../../assets/closeIcon.svg";
import ResponseError from "@/Components/ResponseError/ResponseError";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import { imageBaseUrl } from "@/config/axiosInstance";
import cameraImage from "../../../assets/camera.svg";

interface UpdateImageDialogProps {
  isOpen: boolean;
  isLoadingProfileData: boolean;
  profileData: any;
  mutateProfileData: any;
  refetchProfileSettings: () => void;
  onClose: () => void;
}
type FormDataType = {
  profile_photo: null | File;
};

const UpdateImageDialog: React.FC<UpdateImageDialogProps> = ({
  isOpen,
  isLoadingProfileData,
  onClose,
  profileData,
  refetchProfileSettings,
  mutateProfileData,
}) => {
  const [errors, setErrors] = useState({
    profile_photo: null,
  });

  const [formData, setFormData] = useState<FormDataType>({
    profile_photo: null,
  });
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      profile_photo: null,
    };

    setErrors(newErrors);
    return valid;
  };
  const [currentImage, setCurrentImage] = useState(
    profileData?.profile_photo || ""
  );

  const lang = getCookie("NEXT_LOCALE");
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to hold the image URL
  const [isHovered, setIsHovered] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const domain = imageBaseUrl;

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };
  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setCurrentImage(e.target.result);
  //         setImagePreview(e.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //       setFormData((prevPayload) => ({
  //         ...prevPayload,
  //         photo: file,
  //       }));
  //     }
  //   };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);

      // Create a URL for the selected image to display it as a preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData((prevPayload) => ({
        ...prevPayload,
        profile_photo: file,
      }));
    }
  };

  const handleClose = () => {
    onClose();
    // Reset formData when closing the dialog
    setFormData({
      profile_photo: null,
    });
    setErrors({
      profile_photo: null,
    });
    setData({ message: "", severity: "error" });
  };
  const { setData } = useErrorMessage();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyEdit = {
      data: JSON.stringify({}),
      profile_photo: formData.profile_photo,
    };
    if (validateForm()) {
      console.log("formData ", bodyEdit);
      mutateProfileData(bodyEdit, {
        onSuccess: () => {
          // On success, close the dialog and refetch profile settings
          handleClose();
          refetchProfileSettings();
        },
        onError: (error: any) => {
          setData({ message: error.message, severity: "error" });
          console.error("Error updating profile data: ", error);
        },
      });
    }
  };

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
          تعديل الصورة الشخصية
        </div>
        <div style={{ width: "100%" }}>
          <div className="mt-6 items-center flex justify-center">
            {/* Profile Image with Overlay */}
            <div className="relative">
              <Image
                src={
                  imagePreview ||
                  (profileData?.profile_photo
                    ? `${domain}/${profileData?.profile_photo}`
                    : profilePicture)
                }
                alt="profilePicture"
                className="w-44 h-44 rounded-full"
                width={96}
                height={96}
                loading="eager"
                crossOrigin="anonymous"
              />
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {/* Camera Overlay */}
              {isHovered && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full"
                  //   onClick={handleImageClick} // Opens file input on click
                >
                  <Image
                    src={cameraImage}
                    alt="camera overlay"
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row w-full flex-wrap mt-4">
            {imagePreview ? (
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
            ) : (
              <button
                onClick={handleImageClick}
                className=" bg-[#121212] py-3 px-16 rounded-xl cursor-pointer mt-4 mx-auto items-center flex lg:w-[58%] w-full justify-center"
              >
                {isLoadingProfileData ? (
                  <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full"></div>
                ) : (
                  <p className="text-[#FFF] text-lg font-notoKufi-400 r">
                    رفع صورة جديدة
                  </p>
                )}
              </button>
            )}

            <button
              onClick={handleClose}
              className=" bg-[#FFF] py-2 px-16 rounded-xl cursor-pointer mt-4 mx-auto items-center flex  lg:w-[38%] w-full border-2 border-[#121212] justify-center"
            >
              <p className="text-[#121212] text-lg font-notoKufi-400">إلغاء</p>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateImageDialog;
