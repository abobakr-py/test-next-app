import {
  FormatMoney,
  FormatMoneyArabic,
  FormatMoneyDate,
  FormatMoneyDateArabic,
} from "@/helper/utilFunctions";
import { useFilterMoneyGold } from "@/zustand/useFilterMoneyGold";
const GoldCard = (props) => {
  const { setSelectedId } = useFilterMoneyGold();
  const { wallet, language, theData, NoHover, hideBalance } = props;
  return (
    <div
      onClick={() => {
        setSelectedId(theData?.id);
      }}
      className={`px-8 py-5   rounded-xl ${
        NoHover ? "" : "hover:bg-[#f4f4f4] cursor-pointer"
      }`}
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className={`flex   items-center justify-between`}>
        <p className="text-[#404040] text-lg font-medium ">
          {theData?.goldTransactionType === 1 ? wallet.purchase : wallet.sell}
        </p>
        {hideBalance ? (
          <p className="text-[#404040]  font-semibold w-fit mx-1">******</p>
        ) : (
          <p className="text-[#404040] text-lg font-medium ">
            {Math.abs(theData?.total_weight)}{" "}
            <span className="mx-[0.2rem]">{wallet.gram}</span>
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className={`  text-xs `}>
          {language === "en"
            ? FormatMoneyDate(theData?.created)
            : FormatMoneyDateArabic(theData?.created)}
        </p>
        {hideBalance ? (
          <p className="text-[#404040]  font-semibold w-fit mx-1">******</p>
        ) : (
          <p className="text-[#595959] text-xs">
            {FormatMoney(Math.abs  (theData?.total))}
            <span className="mx-[0.2rem]">{wallet.egp}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default GoldCard;
