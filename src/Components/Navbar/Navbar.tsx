"use client";
import Image from "next/image";
import Link from "next/link";
import global from "../../assets/global.svg";
import profile from "../../assets/profile-circle.svg";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/Zustand/useAuth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons for burger
import { useLogoutMutation } from "@/Apis/Logout/mutation";

interface NavbarProps {
  lang: any;
}

const Navbar: React.FC<NavbarProps> = ({ lang: initialLang }) => {
  const t = useTranslations("navBar");
  const router = useRouter();
  const [lang, setLang] = useState<string | undefined>(undefined); // Initialize lang as undefined

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const { clearToken, isAuthenticated, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { mutate: logout, isPending } = useLogoutMutation();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout(undefined, {
      onSuccess: () => {
        clearToken();
        setIsProfileDropdownOpen(false);
        router.push("/signUp");
      },
    });
  };
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname; // Get the path without the hostname
      setCurrentPath(path);
    }
  }, []);
  const handleHomeNavigation = () => {
    router.push(`/`);
  };
  const handleLanguageSwitch = (lang: string) => {
    const segments = currentPath.split("/").filter(Boolean); // Split path into segments
    segments[0] = lang; // Set the language segment

    const newPath = `/${segments.join("/")}`;
    const searchParams = new URLSearchParams(window.location.search); // Retain the query parameters

    return `${newPath}?${searchParams.toString()}`;
  };

  useEffect(() => {
    setLang(initialLang); // Set the language once on client mount
  }, [initialLang]);
  if (lang === undefined) return null;
  return (
    <div
      dir={lang === "ar" ? "ltr" : "rtl"}
      className="flex justify-between items-center px-4"
    >
      {/* Burger icon for mobile */}
      <div className="lg:hidden">
        <button
          className="text-3xl "
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? null : <AiOutlineMenu />}
        </button>
      </div>
      <div className="hidden lg:flex items-center ">
        {/* Language Switcher with Dropdown */}
        <div className="relative" ref={languageDropdownRef}>
          <div
            className={`bg-[#F5F5F5] p-2 ${
              lang === "ar" ? "mr-8" : "ml-8"
            } rounded-lg cursor-pointer flex flex-row items-center`}
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          >
            <p className="text-[#121212] text-base font-notoKufi-500">
              {lang === "ar" ? "عربي" : "English"}
            </p>
            <Image
              src={global}
              alt={"global"}
              className="mx-2"
              loading="eager"
            />
          </div>

          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-lg z-10 flex flex-col ">
              <a
                href={handleLanguageSwitch("en")}
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm text-gray-700 font-notoKufi-400 hover:bg-gray-100 cursor-pointer text-right rounded-lg"
              >
                English
              </a>
              <a
                href={handleLanguageSwitch("ar")}
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm text-gray-700 font-notoKufi-400 hover:bg-gray-100 cursor-pointer text-right rounded-lg"
              >
                عربي
              </a>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        {isAuthenticated ? (
          <div className="relative" ref={profileDropdownRef}>
            <div
              className="flex flex-row items-center cursor-pointer"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <p>{user?.username}</p>
              <Image
                src={profile}
                alt={"profile"}
                className="mx-2"
                loading="eager"
              />
            </div>

            {isProfileDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 items-end flex flex-col">
                <Link href="/Profile">
                  <div className="px-4 py-2 text-sm text-gray-700 font-notoKufi-400 hover:bg-gray-100 cursor-pointer  rounded-lg">
                    {t("profile")}
                  </div>
                </Link>
                <Link href={"/signUp"} onClick={handleLogout}>
                  <div
                    aria-disabled={isPending}
                    className="px-4 py-2 text-sm text-gray-700 font-notoKufi-400 hover:bg-gray-100 cursor-pointer  rounded-lg"
                  >
                    {t("logout")}
                  </div>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            className={`bg-[#121212] text-base items-center flex text-white py-2 px-7 ${
              lang === "ar" ? "ml-8" : "mr-8"
            } rounded-xl font-notoKufi-500`}
            href="/signUp"
          >
            {t("login")}
          </Link>
        )}

        {/* Navigation Links */}
        <div className="hidden lg:flex  py-3  justify-between">
          <Link
            href="/AboutUs"
            className={`relative  ${
              currentPath === `/${lang}/AboutUs`
                ? "font-notoKufi-600"
                : "font-notoKufi-400"
            } text-[#121212] text-base ${
              lang === "ar" ? "ml-20" : "mr-20"
            } py-3 ${
              currentPath === `/${lang}/AboutUs`
                ? "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[2px] after:bg-[#121212]"
                : ""
            }`}
          >
            {t("AboutUs")}
          </Link>
          <Link
            href="/AllArticles"
            className={`relative  ${
              currentPath === `/${lang}/AllArticles`
                ? "font-notoKufi-600"
                : "font-notoKufi-400"
            } text-[#121212] text-base ${
              lang === "ar" ? "ml-20" : "mr-20"
            } py-3 ${
              currentPath === `/${lang}/AllArticles`
                ? "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[2px] after:bg-[#121212]"
                : ""
            }`}
          >
            {t("Articles")}
          </Link>
          <Link
            href="/"
            className={`relative  ${
              currentPath === `/${lang}`
                ? "font-notoKufi-600"
                : "font-notoKufi-400"
            } text-[#121212] text-base ${
              lang === "ar" ? "ml-20" : "mr-20"
            } py-3 ${
              currentPath === `/${lang}`
                ? "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[2px] after:bg-[#121212]"
                : ""
            }`}
          >
            {t("Home")}
          </Link>
        </div>
      </div>

      <span
        className="font-notoKufi-600 text-[#121212] cursor-pointer "
        onClick={() => {
          handleHomeNavigation();
        }}
      >
        CryptoLab
      </span>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 ${
          lang === "ar" ? "right-0" : "left-0"
        } h-full w-[90%] bg-white shadow-lg z-50 transform ${
          isMobileMenuOpen
            ? "translate-x-0"
            : lang === "ar"
            ? "translate-x-full"
            : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="px-6 pt-12"
        >
          <AiOutlineClose />
        </button>
        <div className="flex flex-col items-end  space-y-8">
          <span
            onClick={() => {
              handleHomeNavigation();
            }}
            className="font-notoKufi-600 text-[#121212] text-base pr-4 pl-4 pt-16"
          >
            CryptoLab
          </span>
          <div className="flex flex-col items-end space-y-8 pr-6 pl-6">
            <Link
              href="/"
              className="font-notoKufi-600 text-base text-[#121212]"
            >
              الصفحة الرئيسية
            </Link>
            <Link href="/AllArticles" className="font-notoKufi-400">
              المقالات
            </Link>
            <Link href="/AboutUs" className="font-notoKufi-400">
              من نحن
            </Link>
          </div>
          <div className="pr-6 pl-6">
            <p className="font-notoKufi-400 text-[#B3B3B3] mt-8 text-xs">
              اللغة
            </p>
          </div>
          <div className="flex flex-col items-end pr-6 pl-6">
            <a
              href={handleLanguageSwitch("ar")}
              onClick={() => window.location.reload()}
              className={`${
                lang === "ar"
                  ? "text-[#121212] font-notoKufi-600"
                  : "text-[#595959] font-notoKufi-400"
              }`}
            >
              عربي
            </a>
            <a
              href={handleLanguageSwitch("en")}
              onClick={() => window.location.reload()}
              className={`${
                lang === "en"
                  ? "text-[#121212] font-notoKufi-600 mt-4"
                  : "text-[#595959] font-notoKufi-400 mt-4"
              }`}
            >
              English
            </a>
          </div>

          {/* Profile and Auth actions */}
          {isAuthenticated ? (
            <>
              <div
                onClick={handleLogout}
                className="font-notoKufi-400 cursor-pointer pr-6 pl-6"
              >
                تسجيل الخروج
              </div>
              <div
                onClick={() => {
                  router.push("/Profile");
                }}
                className="font-notoKufi-400 cursor-pointer pr-6 pl-6"
              >
                الصفحة الشخصية
              </div>
            </>
          ) : (
            <Link
              href="/signUp"
              className="bg-[#121212] text-white py-4 rounded-xl items-center justify-center flex w-[85%] mx-auto font-notoKufi-500 absolute bottom-16 left-0 right-0"
            >
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
