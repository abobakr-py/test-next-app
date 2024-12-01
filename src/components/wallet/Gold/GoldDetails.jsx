import {
  FormatFullDate,
  FormatMoney,
  FormatMoneyDate,
} from "@/helper/utilFunctions";
import Image from "next/image";
import receipt from "@/assets/wallet/receipt.svg";
import ViewSerials from "./ViewSerials";
import { useFilterMoneyGold } from "@/zustand/useFilterMoneyGold";
import Decimal from "decimal.js";
import exchange from "@/assets/wallet/arrow-swap-horizontal.svg";

const GoldDetails = ({
  wallet,
  selectedTransaction,
  userSerials,
  language,
}) => {
  const { selectedSerial, setSelectedSerial } = useFilterMoneyGold();
  // Assuming 'data' contains the transaction details
  const {
    id: transactionId,
    amount,
    created,
    goldBarName,
    goldTransactionType,
    goldType,
    manufacturing_fees,
    order_id,
    price,
    serials,
    sold_serials,
    total,
    total_weight,
    transfer_fees,
    taxes,
    transfer_from,
    transfer_to,
    storeFees,
  } = selectedTransaction || {};
  console.log("selectedTransaction", selectedTransaction);
  // Formatting date and time
  // Formatting date and time
  const transactionDate = created
    ? FormatMoneyDate(created, language === "en" ? "en-US" : "ar-EG")
    : "-";
  const transactionTime = created
    ? new Date(created).toLocaleTimeString(
        language === "en" ? "en-US" : "ar-EG",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }
      )
    : "-";

  return (
    <div
      className={`${language === "en" ? "font-ibm" : "font-ibmArabic"}`}
      dir={language === "en" ? "ltr" : "rtl"}
    >
      {selectedSerial ? (
        <ViewSerials
          wallet={wallet}
          userSerials={userSerials}
          serials={serials}
          total_weight={total_weight}
        />
      ) : (
        <>
          <div className="flex items-center justify-center gap-4">
            {/* <p className="text-3xl text-[#33333] font-medium my-16">
              {FormatMoney(Math.abs(total_weight) || 0)}{" "}
              <span>{wallet.gram}</span>
            </p> */}
            <div
              className={`
        flex items-center justify-center gap-4
        ${language === "en" ? "" : "flex-row-reverse"}
        `}
            >
              <p className="text-3xl text-[#33333] font-medium my-16">
                {FormatMoney(Math.abs(total))} <span>{wallet.egp}</span>
              </p>

              <Image src={exchange} alt="exchange" />

              <p className="text-3xl text-[#33333] font-medium">
                {FormatMoney(Math.abs(total_weight))} <span>{wallet.gram}</span>
              </p>
            </div>
          </div>
          {transactionId && (
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-[#595959]">
                {wallet.transactionId} :
              </p>
              <p className="text-lg font-medium text-[#595959]">
                #{transactionId}
              </p>
            </div>
          )}
          {goldTransactionType && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-medium text-[#595959]">
                {wallet.transactionType} :
              </p>
              <p className="text-lg font-medium text-[#595959]">
                {goldTransactionType === 1 ? wallet.purchase : wallet.sell}
              </p>
            </div>
          )}
          {created && (
            <>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-medium text-[#595959]">
                  {wallet.transactionDate}:
                </p>
                <p className="text-lg font-medium text-[#595959]">
                  {transactionDate}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-medium text-[#595959]">
                  {wallet.transactionTime}:
                </p>
                <p className="text-lg font-medium text-[#595959]">
                  {transactionTime}
                </p>
              </div>
            </>
          )}
          {price && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-medium text-[#595959]">
                {" "}
                {wallet.goldPrice} :
              </p>
              <p className="text-lg font-medium text-[#595959]">{`${Math.abs(
                price
              )} ${wallet.egp}`}</p>
            </div>
          )}
          {total_weight && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-medium text-[#595959]">
                {wallet.totalWeight} :
              </p>
              <p className="text-lg font-medium text-[#595959]">{`${Math.abs(
                total_weight
              )} ${wallet.grams}`}</p>
            </div>
          )}
          {total_weight && price && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-medium text-[#595959]">
                {wallet.price} :
              </p>
              <p className="text-lg font-medium text-[#595959]">{`${FormatMoney(
                new Decimal(Math.abs(total_weight * price)).toDecimalPlaces(
                  2,
                  Decimal.ROUND_DOWN
                )
              )} ${wallet.egp}`}</p>
            </div>
          )}
          {manufacturing_fees ? (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-medium text-[#595959]">
                {wallet.manufacturingFee} :
              </p>
              <p className="text-lg font-medium text-[#595959]">{`${manufacturing_fees} ${wallet.egp}`}</p>
            </div>
          ) : null}
          {taxes && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-medium text-[#595959]">
                {wallet.taxes} :
              </p>
              <p className="text-lg font-medium text-[#595959]">{`${taxes} ${wallet.egp}`}</p>
            </div>
          )}
          {transfer_fees && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-medium text-[#595959]">
                {wallet.transactionFees} :
              </p>
              <p className="text-lg font-medium text-[#595959]">{`${transfer_fees} ${wallet.egp}`}</p>
            </div>
          )}
          {storeFees ? (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-medium text-[#595959]">
                {wallet.storageFee} :
              </p>
              <p className="text-lg font-medium text-[#595959]">{`${0} ${
                wallet.egp
              }`}</p>
            </div>
          ) : null}
          {total && (
            <div className="flex items-center justify-between mt-4 border-t pt-2">
              <p className="text-lg font-bold text-[#595959]">
                {wallet.total} :
              </p>
              <p className="text-lg font-bold text-[#595959]">{`${FormatMoney(
                Math.abs(total)
              )} ${wallet.egp}`}</p>
            </div>
          )}

          <button
            onClick={() => setSelectedSerial(true)}
            className="flex mx-auto mt-8 gap-2  bg-[#e9c237] rounded-xl py-3 px-12 text-center "
            style={{
              boxShadow: `
      0px 3px 3px -1.5px rgba(42, 51, 70, 0.02),
      0px 1px 1px -0.5px rgba(42, 51, 69, 0.02),
      0px 0px 24px 1px rgba(14, 63, 126, 0.02)
    `,
            }}
          >
            <Image src={receipt} alt="receipt" />
            <p className="text-lg font-medium text-white ">
              {wallet.viewSerials}
            </p>
          </button>
        </>
      )}
    </div>
  );
};

export default GoldDetails;
