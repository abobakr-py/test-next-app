"use client";
import Navbar from "@/Components/Navbar/Navbar";
import { useAuth } from "@/Zustand/useAuth";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRef, useState } from "react";
import profilePicture from "../../../assets/profilePicture.svg";
import cameraImage from "../../../assets/camera.svg";
import archivebook from "../../../assets/archive-book.svg";
import setting from "../../../assets/setting-2.svg";
import { useFetchSavedArticles } from "@/Apis/Articles/queries";
import SavedArticles from "./SavedArticles";
import { useTranslations } from "next-intl";
import ProfileSettings from "./ProfileSettings";
import { useFetchProfileSettings } from "@/Apis/Profile/queries";
import { imageBaseUrl } from "@/config/axiosInstance";
import { Skeleton } from "@mui/material";
import UpdateImageDialog from "./UpdateImageDialog";
import { useEditProfileMutation } from "@/Apis/Profile/mutation";

const Profile = () => {
  const lang = getCookie("NEXT_LOCALE");
  const {
    data: articles,
    fetchNextPage,
    hasNextPage,
    isLoading,
    refetch,
  } = useFetchSavedArticles();
  const [activeTab, setActiveTab] = useState("savedArticles");
  const t = useTranslations("profile");
  const {
    data: profileData,
    isLoading: profileDataLoading,
    refetch: refetchProfileSettings,
  } = useFetchProfileSettings();
  const domain = imageBaseUrl;
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const { mutate: mutateProfileData, isPending: isLoadingProfileData } =
    useEditProfileMutation();

  // Function to open dialog
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  // Function to close dialog
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full mx-auto flex flex-col py-4  h-screen ">
      <div className="lg:w-[1344px] w-[95%] mx-auto pt-6 z-10">
        <Navbar lang={lang} />
      </div>
      {/* Tabs */}
      <div className="flex lg:hidden flex-col items-center w-full ">
        <div className="flex flex-col items-center cursor-pointer">
          {profileDataLoading ? (
            <>
              <Skeleton variant="circular" width={96} height={96} />
              <Skeleton variant="text" width={80} height={24} />
            </>
          ) : (
            <>
              <Image
                src={
                  profileData?.profile_photo
                    ? `${domain}/${profileData?.profile_photo}`
                    : profilePicture
                }
                alt={"profilePicture"}
                className="w-24 h-24 rounded-full"
                width={96}
                height={96}
                loading="eager"
                crossOrigin="anonymous"
              />
              <p>{profileData?.username}</p>
            </>
          )}
        </div>
      </div>
      <div className="lg:hidden mt-8 flex justify-center w-[95%] mx-auto border-b-2 border-[#E6E6E6]">
        <button
          onClick={() => setActiveTab("savedArticles")}
          className={`px-6 py-2 w-full font-notoKufi-400 text-sm text-[#121212] ${
            activeTab === "savedArticles"
              ? "border-b-2 border-[#121212]"
              : "text-[#B3B3B3]"
          }`}
        >
          المقالات المفضلة
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-6 py-2 w-full font-notoKufi-400 text-sm text-[#121212] ${
            activeTab === "settings"
              ? "border-b-2 border-[#121212]"
              : "text-[#B3B3B3]"
          }`}
        >
          الإعدادات
        </button>
      </div>
      {activeTab === "savedArticles" ? (
        <div className="bg-[#FFF] py-3 px-4 lg:hidden">
          <SavedArticles
            articles={articles}
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            refetch={refetch}
          />
        </div>
      ) : (
        <div className="bg-[#FFF] py-3 px-4 lg:hidden">
          <ProfileSettings
            refetchProfileSettings={refetchProfileSettings}
            profileData={profileData}
            profileDataLoading={profileDataLoading}
          />
        </div>
      )}
      <div className="bg-[#FFF] pt-12 lg:w-[1344px]  mx-auto h-full  ">
        <div className="lg:flex hidden  flex-row justify-between h-full ">
          {/* Profile Section */}
          <div className="w-[22.36%] flex flex-col items-center h-4/5 justify-between pb-12 mx-auto mt-12 ">
            <div className="flex flex-col items-center w-full">
              <div
                className="flex flex-col items-center cursor-pointer relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {profileDataLoading ? (
                  <>
                    <Skeleton variant="circular" width={96} height={96} />
                    <Skeleton variant="text" width={80} height={24} />
                  </>
                ) : (
                  <>
                    {/* Profile Image with Overlay */}
                    <div className="relative">
                      <Image
                        src={
                          profileData?.profile_photo
                            ? `${domain}/${profileData?.profile_photo}`
                            : profilePicture
                        }
                        alt="profilePicture"
                        className="w-24 h-24 rounded-full"
                        width={96}
                        height={96}
                        loading="eager"
                        crossOrigin="anonymous"
                      />

                      {/* Camera Overlay */}
                      {isHovered && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full"
                          onClick={handleDialogOpen} // Opens file input on click
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

                    {/* Username */}
                    <p>{profileData?.username}</p>
                  </>
                )}
              </div>
              <div className="h-px bg-[#E6E6E6] mx-8 w-full my-6"></div>
              <div
                onClick={() => setActiveTab("savedArticles")}
                className={`flex flex-row items-center cursor-pointer
                   ${activeTab === "savedArticles" ? "bg-[#1212120D]" : ""} 
                    py-3 px-4 rounded-lg w-full`}
              >
                <Image src={archivebook} alt="archivebook" loading="eager" />
                <p
                  className={`font-notoKufi-500  ${
                    activeTab === "savedArticles"
                      ? "text-[#121212] "
                      : "text-[#595959] "
                  } text-[#121212] text-base mr-2 ml-2`}
                >
                  المقالات المفضلة
                </p>
              </div>
            </div>

            <div className="flex items-center w-full flex-col ">
              <div className="h-px bg-[#E6E6E6] w-full my-4"></div>
              <div
                onClick={() => setActiveTab("settings")}
                className={`flex flex-row items-center cursor-pointer   ${
                  activeTab === "settings" ? "bg-[#1212120D]" : ""
                }  py-3 px-4 rounded-lg w-full`}
              >
                <Image src={setting} alt="setting" loading="eager" />
                <p
                  className={`font-notoKufi-500  ${
                    activeTab === "settings"
                      ? "text-[#121212] "
                      : "text-[#595959] "
                  } text-base mr-2 ml-2`}
                >
                  الإعدادات
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-px bg-[#E6E6E6] mx-8 h-full "></div>

          {/* Content Section */}
          <div className="w-[77.64%]  flex items-center justify-center mt-12 h-full ">
            {activeTab === "savedArticles" ? (
              <SavedArticles
                articles={articles}
                isLoading={isLoading}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                refetch={refetch}
              />
            ) : (
              <ProfileSettings
                setActiveTab={setActiveTab}
                refetchProfileSettings={refetchProfileSettings}
                profileData={profileData}
                profileDataLoading={profileDataLoading}
              />
            )}
          </div>
          <UpdateImageDialog
            refetchProfileSettings={refetchProfileSettings}
            isLoadingProfileData={isLoadingProfileData}
            mutateProfileData={mutateProfileData}
            profileData={profileData}
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
