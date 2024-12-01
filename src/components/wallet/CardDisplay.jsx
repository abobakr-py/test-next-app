import React from "react";
import ToolTipComponent from "../common/ToolTipComponent";
import { FormatArabicNumbers, FormatBalance } from "@/helper/utilFunctions";
import LoadingSpinner from "../common/LoadingSpinner";
import { Skeleton } from "@mui/material";

const CardDisplay = ({
  title,
  toolTip,
  value,
  wallet,
  language,
  hideBalance,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-3xl py-6 px-8 w-full text-center">
      <div className="flex items-center justify-between">
        <p> {title} </p>
        <ToolTipComponent title={toolTip} />
      </div>
      <div className="flex items-end">
        {hideBalance ? (
          <p className="text-[#e9c237] text-[2rem] font-semibold w-fit mx-1">
            {" "}
            **********
          </p>
        ) : (
          <>
            {isLoading ? (
              <Skeleton width={"100px"} sx={{ margin: "10px" }} />
            ) : (
              <>
                <p className="text-[#e9c237] text-[2rem] font-semibold w-fit mx-1">
                  {FormatBalance(value)}
                </p>
              </>
            )}
          </>
        )}
        <span
          className={`text-lg text-nowrap text-[#595959] font-medium leading-[2.5rem] ${
            hideBalance ? "hidden" : ""
          }`}
        >
          {wallet.egp}
        </span>
      </div>
    </div>
  );
};

export default CardDisplay;
