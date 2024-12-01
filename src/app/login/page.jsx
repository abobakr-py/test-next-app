 import dynamic from "next/dynamic";
import React from "react";
const DynamicLogin = dynamic(() => import("@/components/Login/Login"), {
  ssr: false,
});
const page = () => {
  return <DynamicLogin />;
};

export default page;
