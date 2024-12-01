import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import closeIcon from "@/assets/wallet/close-circle.svg";
import sortIcon from "@/assets/wallet/sort.svg";
import Image from "next/image";
import { useFilterMoneyGold } from "@/zustand/useFilterMoneyGold";
import Wallet from "../wallet/Wallet";
import useLanguage from "@/context/useLanguage";

export default function SimpleRightDrawer({
  seeAllDrawer,
  setSeeAllDrawer,
  displayedData,
  openFilter,
  setOpenFilter,
}) {
  const { language, translations } = useLanguage();
  const wallet = translations[language].wallet;
  const { selectedId, setSelectedId, selectedSerial, setSelectedSerial } =
    useFilterMoneyGold();
  const toggleDrawer = (openState) => (event) => {
    if (
      (event.type === "keydown" && event.key === "Tab") ||
      event.key === "Shift"
    ) {
      return;
    }
    if (openState === false) {
      setSelectedId(null);
      setSelectedSerial(false);
    }
    setSeeAllDrawer(openState);
  };

  const list = () => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {displayedData}
    </Box>
  );
  return (
    <Drawer anchor="right" open={seeAllDrawer} onClose={toggleDrawer(false)}>
      <div
        className={`p-16 ${language === "en" ? "font-ibm" : "font-ibmArabic"}`}
      >
        <div
          className={`
          flex items-center gap-2 mb-16    
          ${language === "en" ? "" : "flex-row-reverse"}
          `}
        >
          <Image
            src={closeIcon}
            alt="close"
            className="cursor-pointer"
            onClick={() => {
              if (selectedSerial) {
                return setSelectedSerial(false);
              }
              if (selectedId) {
                return setSelectedId(null);
              }
              if (!openFilter) {
                return setSeeAllDrawer(false);
              }
              return setOpenFilter(false);
            }}
          />
          <p
            className={`text-xl text-[#333333] ${
              selectedId && !selectedSerial ? "" : "hidden"
            }`}
          >
            {wallet?.transactionDetails}
          </p>
          <p
            className={`text-xl text-[#333333] ${openFilter ? " " : "hidden"}`}
          >
            {wallet?.filter}
          </p>

          <p
            className={`text-xl text-[#333333] ${
              selectedSerial ? "" : "hidden"
            }`}
          >
            {wallet?.serialNumbers}
          </p>
        </div>
        {selectedId ? (
          ""
        ) : (
          <div className={`relative ${openFilter ? "hidden" : "block"}`}>
            <input
              disabled
              className="w-full p-4 rounded-xl"
              placeholder={wallet?.filter}
              style={{
                boxShadow: `
      0px 3px 3px -1.5px rgba(42, 51, 70, 0.02), 
      0px 1px 1px -0.5px rgba(42, 51, 69, 0.02), 
      0px 0px 24px 1px rgba(14, 63, 126, 0.02)
    `,
              }}
            />
            <Image
              src={sortIcon}
              alt="sort"
              className="absolute  top-4 right-4 cursor-pointer"
              onClick={() => {
                setOpenFilter(true);
              }}
            />
          </div>
        )}
        {list()}
      </div>
    </Drawer>
  );
}
