import {
  FormatFullDate,
  FormatMoney,
  FormatMoneyDate,
} from "@/helper/utilFunctions";
import Image from "next/image";
import exchange from "@/assets/wallet/arrow-swap-horizontal.svg";
import { useGetTransactionDetails } from "@/apis/wallet/queries";
import { Skeleton } from "@mui/material";
const MoneyDetails = ({ wallet, selectedTransaction, language }) => {
  const { data, isLoading } = useGetTransactionDetails({
    id: selectedTransaction?.id,
  });

  // Formatting date and time
  const transactionDate = data?.created
    ? FormatMoneyDate(data?.created, language === "en" ? "en-US" : "ar-EG")
    : "-";
  const transactionTime = data?.created
    ? new Date(data.created).toLocaleTimeString(language === "en" ? "en-US" : "ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "-";

  return (
    <div className={`${language === "en" ? "font-ibm" : "font-ibmArabic"}`}>
      <div className={`
        flex items-center justify-center gap-4
        ${language === "en" ? "" : "flex-row-reverse"}
        `}>
        {isLoading ? (
          <Skeleton width={"100px"} />
        ) : (
          <p className="text-3xl text-[#33333] font-medium my-16">
            {FormatMoney(data?.amount)} <span>{wallet.egp}</span>
          </p>
        )}
        <Image src={exchange} alt="exchange" />
        {isLoading ? (
          <Skeleton width={"100px"} />
        ) : (
          <p className="text-3xl text-[#33333] font-medium">
            {FormatMoney(data?.weight)} <span>{wallet.gram}</span>
          </p>
        )}
      </div>

      {data?.id && (
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-[#595959]">
            {wallet.transactionId} :
          </p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">#{data?.id}</p>
          )}{" "}
        </div>
      )}
      {data?.type && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium text-[#595959]">
            {wallet.transactionType} :
          </p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">
              {data?.type === 1
                ? wallet.deposit
                : data?.type === 2
                ? wallet.withdraw
                : data?.type === 3
                ? wallet.buy
                : data?.type === 4
                ? wallet.sell
                : data?.type === 5
                ? wallet.refund
                : data?.type === 6
                ? wallet.cancelationFees
                : wallet.storeFees}
            </p>
          )}
        </div>
      )}
      {data?.created && (
        <>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-medium text-[#595959]">
              {wallet.transactionDate} :
            </p>
            {isLoading ? (
              <Skeleton width={"100px"} />
            ) : (
              <p className="text-lg font-medium text-[#595959]">
                {transactionDate}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-medium text-[#595959]">
              {wallet.transactionTime} :
            </p>
            {isLoading ? (
              <Skeleton width={"100px"} />
            ) : (
              <p className="text-lg font-medium text-[#595959]">
                {transactionTime}
              </p>
            )}
          </div>
        </>
      )}
      {data?.price && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium text-[#595959]">
            {" "}
            {wallet.goldPrice} :
          </p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">{`${
              (data?.price).toFixed(2) || 0
            } ${wallet.egp}`}</p>
          )}
        </div>
      )}
      {data?.weight && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium text-[#595959]">
            {" "}
            {wallet.totalWeight} :
          </p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">{`${data?.weight} ${wallet.gram}`}</p>
          )}
        </div>
      )}
      {data?.gold_price && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium text-[#595959]">{wallet.price} :</p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">{`${data?.gold_price} ${wallet.egp}`}</p>
          )}
        </div>
      )}
      {data?.manufacturingFees && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium text-[#595959]">
            {wallet.manufacturingFees}:
          </p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">{`${data?.manufacturingFees} ${wallet.egp}`}</p>
          )}
        </div>
      )}
      {data?.taxes && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium text-[#595959]">{wallet.taxes} :</p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">{`${data?.taxes} ${wallet.egp}`}</p>
          )}
        </div>
      )}
      {data?.transaction_fees && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium text-[#595959]">
            {wallet.transactionFee} :
          </p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">{`${data?.transaction_fees} ${wallet.egp}`}</p>
          )}
        </div>
      )}
      {data?.storedFees ? (
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium text-[#595959]">
            {wallet.storageFee} :
          </p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-medium text-[#595959]">{`${data.storedFees} ${wallet.egp}`}</p>
          )}
        </div>
      ) : null}
      {data?.amount ? (
        <div className="flex items-center justify-between mt-4 border-t pt-2">
          <p className="text-lg font-bold text-[#595959]">{wallet.total} :</p>
          {isLoading ? (
            <Skeleton width={"100px"} />
          ) : (
            <p className="text-lg font-bold text-[#595959]">{`${data?.amount} ${wallet.egp}`}</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MoneyDetails;
