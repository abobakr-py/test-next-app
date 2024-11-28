import React from "react";
import authImage from "../../assets/authImage.png";
import Image from "next/image";

const LeftSide: React.FC = () => {
  return (
    <div className="w-1/2 h-screen fixed top-0 ">
      <Image
        src={authImage}
        alt="leftSideImage"
        className="w-full h-full object-fill"
        priority
      />
    </div>
  );
};

export default LeftSide;
