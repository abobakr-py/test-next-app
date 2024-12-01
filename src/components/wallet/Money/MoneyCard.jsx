import {
  FormatMoney,
  FormatMoneyArabic,
  FormatMoneyDate,
  FormatMoneyDateArabic,
} from "@/helper/utilFunctions";
import { useFilterMoneyGold } from "@/zustand/useFilterMoneyGold";
const getStatus = (status_id) => {
  if (status_id === 1) {
    return { status: "Pending", color: "#ffc107" };
  }
  if (status_id === 2) {
    return { status: "Approved", color: "#28a745" };
  }
  if (status_id === 3) {
    return { status: "Rejected", color: "#dc3545" };
  }
};
const MoneyCard = (props) => {
  const { setSelectedId } = useFilterMoneyGold();
  const { theData, language, wallet, NoHover, hideBalance } = props;
  const { amount, created, status_id, type } = theData;
  const { status, color } = getStatus(status_id);
  return (
    <div
      onClick={() => {
        setSelectedId(theData?.id);
      }}
      className={`px-8 py-6   rounded-xl ${
        NoHover ? "" : "hover:bg-[#f4f4f4] cursor-pointer"
      }`}
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className={`flex   items-center justify-between`}>
        <p className="text-[#404040] text-lg font-medium ">
          {type === 1
            ? wallet.deposit
            : type === 2
            ? wallet.withdraw
            : type === 3
            ? wallet.buy
            : type === 4
            ? wallet.sell
            : type === 5
            ? wallet.refund
            : type === 6
            ? wallet.cancelationFees
            : wallet.storeFees}
        </p>
        {hideBalance ? (
          <p className="text-[#404040]  font-semibold w-fit mx-1">
            ******
          </p>
        ) : (
          <p className="text-[#404040] text-lg font-medium ">
            {FormatMoney(amount)}
            <span className="mx-[0.2rem]">{wallet.egp}</span>
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className={`  text-xs `} style={{ color: color }}>
          {status === "Pending"
            ? wallet.pending
            : status === "Approved"
            ? wallet.approved
            : wallet.rejected}
        </p>
        <p className="text-[#595959] text-xs">
          {language === "en"
            ? FormatMoneyDate(created)
            : FormatMoneyDateArabic(created)}
        </p>
      </div>
    </div>
  );
};

export default MoneyCard;
