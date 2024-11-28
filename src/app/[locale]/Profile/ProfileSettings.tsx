import Skeleton from "@mui/material/Skeleton";
import { getCookie } from "cookies-next";
import { format } from "date-fns";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";
import { useEditProfileMutation } from "@/Apis/Profile/mutation";
import { useChangePasswordMutation } from "@/Apis/ChangePassword/mutation";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { useRouter } from "next/navigation";

interface ProfileDataProps {
  profileData?: any;
  profileDataLoading?: boolean;
  refetchProfileSettings?: any;
  setActiveTab?: any;
}

const ProfileSettings: React.FC<ProfileDataProps> = ({
  profileData,
  profileDataLoading,
  refetchProfileSettings,
  setActiveTab,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const arabicMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  const { mutate: mutateProfileData, isPending: isLoadingProfileData } =
    useEditProfileMutation();
  const { mutate: mutateChangePassword, isPending: isLoadingChangePassword } =
    useChangePasswordMutation();

  const formatModifiedDate = (dateString: string) => {
    const date = new Date(dateString);
    const lang = getCookie("NEXT_LOCALE");

    if (lang === "ar") {
      const day = format(date, "dd");
      const year = format(date, "yyyy");
      const month = arabicMonths[date.getMonth()];
      return `${day} ${month} ${year}`;
    } else {
      return format(date, "d MMMM yyyy");
    }
  };
  const router = useRouter();

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const handleChangePasswordDialogOpen = () =>
    setIsChangePasswordDialogOpen(true);
  const handleChangePasswordDialogClose = () =>
    setIsChangePasswordDialogOpen(false);

  return (
    <div className="w-full h-full">
      <p className="hidden lg:flex font-notoKufi-600 text-[#121212] text-2xl mb-6">
        الإعدادات
      </p>
      <div className="w-full lg:w-[95%] mx-auto mt-8 lg:mt-12 ">
        <p className="text-[#B3B3B3] text-sm font-notoKufi-400">
          إعدادات الحساب
        </p>
        <div className="flex justify-end mt-4">
          <p
            className="text-[#28A745] text-base font-notoKufi-400 cursor-pointer lg:flex hidden"
            onClick={handleDialogOpen}
          >
            تعديل بياناتى
          </p>
          <p
            className="text-[#28A745] text-base font-notoKufi-400 cursor-pointer flex lg:hidden"
            onClick={() => {
              router.push(`/MobileEditProfile `);
            }}
          >
            تعديل بياناتى
          </p>
        </div>

        {/* Username Field */}
        <div className="mt-8 lg:mt-10 flex flex-row flex-wrap justify-between">
          <p className="text-[#595959] text-lg font-notoKufi-400">
            الاسم بالكامل
          </p>
          {profileDataLoading ? (
            <Skeleton variant="text" width={120} height={28} />
          ) : (
            <p className="text-[#595959] text-lg font-notoKufi-400">
              {profileData?.username}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mt-8 lg:mt-10 flex flex-row flex-wrap justify-between">
          <p className="text-[#595959] text-lg font-notoKufi-400">
            البريد الإلكترونى
          </p>
          {profileDataLoading ? (
            <Skeleton variant="text" width={200} height={28} />
          ) : (
            <p className="text-[#595959] text-lg font-notoKufi-400">
              {profileData?.email}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="mt-8 lg:mt-10 flex flex-row flex-wrap justify-between">
          <p className="text-[#595959] text-lg font-notoKufi-400">رقم الهاتف</p>
          {profileDataLoading ? (
            <Skeleton variant="text" width={150} height={28} />
          ) : (
            <p className="text-[#595959] text-lg font-notoKufi-400" dir="ltr">
              {profileData?.countryCode} {profileData?.phone}
            </p>
          )}
        </div>

        <div className="h-px bg-[#E6E6E6] w-full my-8 lg:my-12"></div>

        <p className="text-[#B3B3B3] text-sm font-notoKufi-400">
          الأمان و الخصوصية
        </p>
        <div className="flex justify-end mt-4">
          <p
            onClick={handleChangePasswordDialogOpen}
            className="text-[#28A745] text-base font-notoKufi-400 cursor-pointer lg:flex hidden"
          >
            تغيير كلمة المرور
          </p>
          <p
            className="text-[#28A745] text-base font-notoKufi-400 cursor-pointer flex lg:hidden"
            onClick={() => {
              router.push(`/MobileChangePasswordProfile`);
            }}
          >
            تغيير كلمة المرور
          </p>
        </div>

        {/* Last Password Update Field */}
        <div className="mt-8 lg:mt-10 flex flex-row flex-wrap justify-between">
          <p className="text-[#595959] text-lg font-notoKufi-400">
            كلمة المرور
          </p>
          {profileDataLoading ? (
            <Skeleton variant="text" width={160} height={28} />
          ) : (
            <p className="text-[#595959] text-lg font-notoKufi-400">
              اخر تحديث {formatModifiedDate(profileData?.modified)}
            </p>
          )}
        </div>
      </div>

      {/* Dialogs for Edit Profile and Change Password */}
      <EditProfileDialog
        refetchProfileSettings={refetchProfileSettings}
        isLoadingProfileData={isLoadingProfileData}
        mutateProfileData={mutateProfileData}
        profileData={profileData}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
      <ChangePasswordDialog
        refetchProfileSettings={refetchProfileSettings}
        isLoadingChangePassword={isLoadingChangePassword}
        mutateChangePassword={mutateChangePassword}
        isOpen={isChangePasswordDialogOpen}
        onClose={handleChangePasswordDialogClose}
      />
    </div>
  );
};

export default ProfileSettings;
