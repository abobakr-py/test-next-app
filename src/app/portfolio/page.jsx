import dynamic from "next/dynamic";
import React from "react";
const DynamicPortfolio = dynamic(() => import("@/components/portfolio/Portfolio"), {
  ssr: false,
});
const page = () => {
  return <DynamicPortfolio />;
};

export default page;
