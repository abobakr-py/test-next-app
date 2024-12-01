"use client";
import AnchorTemporaryDrawer from "@/components/common/AnchorTemporaryDrawer";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Calender from "@/assets/wallet/calendar.svg";
import GoldCard from "./GoldCard";
import {
  useGetAllUserSerials,
  useUserGoldTransactions,
} from "@/apis/wallet/queries";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFilterMoneyGold } from "@/zustand/useFilterMoneyGold";
import dayjs from "dayjs";
import GoldDetails from "./GoldDetails";
import { Skeleton } from "@mui/material";
const GoldDrawer = ({
  seeAllDrawer,
  setSeeAllDrawer,
  wallet,
  language,
  hideBalance,
}) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { goldFilter, setGoldFilter, selectedId } = useFilterMoneyGold();
  const { data: GoldTransactionHistory, isLoading } =
    useUserGoldTransactions(goldFilter);
  const { data: userSerials } = useGetAllUserSerials();
  const [openFilter, setOpenFilter] = useState(false);
  const initialTypes = [
    { id: 1, name: wallet.purchase, active: goldFilter?.type?.includes(1) },
    { id: 2, name: wallet.sell, active: goldFilter?.type?.includes(2) },
  ];
  const [transactionsTypes, setTransactionsTypes] = useState(initialTypes);
  const [transactionsDate, setTransactionsDate] = useState({
    from: goldFilter.date_from ? dayjs(goldFilter.date_from) : null,
    to: goldFilter.date_to ? dayjs(goldFilter.date_to) : null,
  });
  useEffect(() => {
    if (openFilter) {
      setTransactionsTypes(initialTypes);
      setTransactionsDate({
        from: goldFilter.date_from
          ? dayjs(goldFilter.date_from)
          : transactionsDate?.from,
        to: goldFilter.date_to
          ? dayjs(goldFilter.date_to)
          : transactionsDate?.to,
      });
    }
  }, [openFilter, goldFilter]);
  const handleFilterUpdate = () => {
    const selectedTypes = transactionsTypes
      .filter((type) => type.active)
      .map((type) => type.id);
    setGoldFilter({
      type: selectedTypes,
      date_from: transactionsDate.from
        ? transactionsDate.from.toISOString()
        : "",
      date_to: transactionsDate.to ? transactionsDate.to.toISOString() : "",
    });
    setOpenFilter(false);
  };
  const handleResetFilters = () => {
    setTransactionsTypes(
      transactionsTypes.map((type) => ({ ...type, active: false }))
    );
    setTransactionsDate({ from: null, to: null });
    setGoldFilter({ type: [], status: [], date_from: "", date_to: "" });
  };
  return (
    <div dir={language === "en" ? "ltr" : "rtl"}>
      <AnchorTemporaryDrawer
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        seeAllDrawer={seeAllDrawer}
        setSeeAllDrawer={setSeeAllDrawer}
        displayedData={
          <div
            dir={language === "en" ? "ltr" : "rtl"}
            onClick={(event) => {
              // Stop drawer from closing on internal clicks
              event.stopPropagation();
            }}
          >
            {selectedId && selectedTransaction ? (
              <GoldDetails
                wallet={wallet}
                selectedTransaction={selectedTransaction}
                userSerials={userSerials}
                language={language}
              />
            ) : (
              <>
                {openFilter ? (
                  <>
                    <p className="text-sm text-[#595959] mb-4 w-fit">
                      {wallet.transactionType}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {transactionsTypes.map(({ id, name, active }) => (
                        <button
                          key={id}
                          className={`${
                            active
                              ? "bg-[#E9C237] text-white"
                              : "border border-[#E6E6E6] text-[#B3B3B3]"
                          } px-10 py-3 rounded-xl w-fit`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setTransactionsTypes((prev) =>
                              prev.map((item) =>
                                item.id === id
                                  ? { ...item, active: !item.active }
                                  : item
                              )
                            );
                          }}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-[#595959] mb-4 mt-12 w-fit">
                      {wallet.transactionDate}
                    </p>
                    <div className="flex flex-col gap-3 mb-4">
                      <p className="text-xs text-[#595959] mb-3">
                        {" "}
                        {wallet.startDate}
                      </p>
                      <DatePicker
                        components={{ OpenPickerIcon: Calender }}
                        value={transactionsDate.from || null}
                        onChange={(value) => {
                          setTransactionsDate((prev) => ({
                            ...prev,
                            from: value,
                          }));
                        }}
                        sx={{ borderRadius: "12px" }}
                      />

                      <p className="text-xs text-[#595959] mb-3 mt-6">
                        {wallet.endDate}{" "}
                      </p>
                      <DatePicker
                        disabled={!transactionsDate.from}
                        value={transactionsDate.to || null}
                        onChange={(value) => {
                          setTransactionsDate((prev) => ({
                            ...prev,
                            to: value,
                          }));
                        }}
                        components={{ OpenPickerIcon: Calender }}
                      />
                    </div>

                    <div className="flex items-center gap-4 justify-center mt-36">
                      <button
                        className="text-white bg-[#E9c237] px-20 py-3 text-lg font-medium rounded-xl"
                        onClick={handleFilterUpdate}
                      >
                        {wallet.filter}
                      </button>
                      <button
                        className="text-[#b3b3b3] text-lg font-medium px-20 py-3 rounded-xl border border-[#ced3da]"
                        onClick={handleResetFilters}
                      >
                        {wallet.reset}
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <p
                      className={`
                      text-sm text-[#595959] mb-2 mt-8 ml-4
                                ${
                                  language === "en"
                                    ? "font-ibm"
                                    : "font-ibmArabic text-right"
                                }

                      `}
                    >
                      {wallet.goldHistory}
                    </p>
                    {isLoading ? (
                      <div className="text-center mt-10">
                        <Skeleton width={"200px"} />
                      </div>
                    ) : (
                      <>
                        {GoldTransactionHistory?.result.length === 0 ? (
                          <p className="text-center mt-20 text-2xl text-[#595959]">
                            {wallet.noGoldTransactionsYet}
                          </p>
                        ) : (
                          GoldTransactionHistory?.result?.map((data) => (
                            <div
                              key={data?.id}
                              onClick={() => {
                                setSelectedTransaction(data);
                              }}
                            >
                              <GoldCard
                                theData={data}
                                language={language}
                                wallet={wallet}
                                hideBalance={hideBalance}
                              />
                            </div>
                          ))
                        )}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        }
      />
    </div>
  );
};

export default GoldDrawer;
