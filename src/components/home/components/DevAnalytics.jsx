"use client";
import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const DevAnalytics = () => {
  const router = useRouter();

  // Track pageview when the component is mounted or route changes
  useEffect(() => {
    // Track the initial pageview when the component is mounted
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: document.title, // Customize the title as needed
    });

    // Track pageviews on route changes
    const handleRouteChange = (url) => {
      ReactGA.send({
        hitType: "pageview",
        page: url,
        title: document.title, // Customize this as needed
      });
    };
  }, [router]);

  const handleClick = () => {
    // Track button click event
    ReactGA.event({
      category: "User Interaction",
      action: "Clicked Button",
      label: "Button Label", // Optional
    });
  };

  const handleLinkClick = () => {
    // Track link click event
    ReactGA.event({
      category: "User Interaction",
      action: "Clicked Link",
      label: "Link Label", // Optional
    });
    // Additional logic for link navigation...
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <a href="#" onClick={handleLinkClick}>
        Click Me
      </a>
    </div>
  );
};

export default DevAnalytics;
