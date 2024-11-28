"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname; // Get the path without the hostname
      setCurrentPath(path);
    }
  }, []);

  // Function to switch language while preserving the rest of the URL path
  const switchLanguage = (lang: string) => {
    if (!currentPath) return "/"; // Handle case where currentPath is not set yet (during SSR)

    const segments = currentPath.split("/").filter(Boolean); // Split path into segments
    segments[0] = lang; // Replace the first segment with the selected language
    return `/${segments.join("/")}`; // Join the segments back into a path
  };

  return (
    <div className="flex items-center w-fit gap-5">
      {/* Render links statically during SSR */}
      <Link href={switchLanguage("en")} passHref>
        English
      </Link>
      <Link href={switchLanguage("ar")} passHref>
        العربية
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
