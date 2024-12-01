"use client";
import { useEffect } from "react";

const GoogleAnalyticsDev = () => {
  useEffect(() => {
    // Load the Google Tag Manager script
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-YKN6CKCNDG";
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", "G-YKN6CKCNDG");

    return () => {
      // Clean up the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything
};

export default GoogleAnalyticsDev;
