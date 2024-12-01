"use client";

import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Function to update the size
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Update the size for the first time
    updateSize();

    // Add event listener
    window.addEventListener("resize", updateSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateSize);
  }, []); // Empty dependency array ensures this runs only once

  return size;
};

export default useWindowSize;
