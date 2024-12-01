import useLanguage from "@/context/useLanguage";
import { useState } from "react";

const HoverText = () => {
  const [hover, setHover] = useState(false);
  const { language, setLanguage } = useLanguage();
  const list = [
    { name: "English", value: "en" },
    { name: "عربي", value: "ar" },
    // { name: "مصري", value: "eg" },
  ];
  const filteredList = list.filter((item) => {
    return item.value !== language;
  });
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`text-base cursor-pointer  text-[#E9C237] ${
          language === "en" ? "font-ibm-400" : "font-tajawal-400"
        }`}
      >
        {language === "en" ? "English" : "عربي"}
      </div>
      {hover && (
        <div className="absolute z-10 pt-2 mt-2 top-4 -left-1">
          {filteredList.map((item, index) => (
            <div
              key={index}
              className={`text-lg  text-gray-700 p-2 cursor-pointer  hover:text-[#E9C237] `}
              onClick={() => setLanguage(item.value)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoverText;
