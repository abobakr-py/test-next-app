"use client";
import AnchorTemporaryDrawer from "@/components/common/AnchorTemporaryDrawer";
import MoneyCard from "./MoneyCard";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Calender from "@/assets/wallet/calendar.svg";
import { useUserMoneyTransactions } from "@/apis/wallet/queries";
import { useFilterMoneyGold } from "@/zustand/useFilterMoneyGold";
import dayjs from "dayjs";
import MoneyDetails from "./MoneyDetails";
import { Skeleton } from "@mui/material";

const MoneyDrawer = ({ seeAllDrawer, setSeeAllDrawer, wallet, language }) => {
  const { moneyFilter, setMoneyFilter, selectedId } = useFilterMoneyGold();
  const { data: MoneyTransactionHistory, isLoading } =
    useUserMoneyTransactions(moneyFilter);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const initialTypes = [
    { id: 1, name: wallet.add, active: moneyFilter?.type?.includes(1) },
    { id: 2, name: wallet.withdraw, active: moneyFilter?.type?.includes(2) },
    { id: 3, name: wallet.purchase, active: moneyFilter?.type?.includes(3) },
    { id: 4, name: wallet.sell, active: moneyFilter?.type?.includes(4) },
    { id: 5, name: wallet.refund, active: moneyFilter?.type?.includes(5) },
    // { id: 7, name: wallet.storeFees, active: moneyFilter?.type?.includes(7) },
  ];

  const initialStatus = [
    { id: 1, name: wallet.pending, active: moneyFilter?.status?.includes(1) },
    { id: 2, name: wallet.approved, active: moneyFilter?.status?.includes(2) },
    { id: 3, name: wallet.rejected, active: moneyFilter?.status?.includes(3) },
  ];
  const [transactionsTypes, setTransactionsTypes] = useState(initialTypes);
  const [transactionsStatus, setTransactionsStatus] = useState(initialStatus);
  const [transactionsDate, setTransactionsDate] = useState({
    from: moneyFilter?.date_from ? dayjs(moneyFilter?.date_from) : null,
    to: moneyFilter?.date_to ? dayjs(moneyFilter?.date_to) : null,
  });
  useEffect(() => {
    if (openFilter) {
      setTransactionsTypes(initialTypes);
      setTransactionsStatus(initialStatus);
      setTransactionsDate({
        from: moneyFilter.date_from
          ? dayjs(moneyFilter.date_from)
          : transactionsDate?.from,
        to: moneyFilter.date_to
          ? dayjs(moneyFilter.date_to)
          : transactionsDate?.to,
      });
    }
  }, [openFilter, moneyFilter]);
  const handleFilterUpdate = () => {
    const selectedTypes = transactionsTypes
      .filter((type) => type.active)
      .map((type) => type.id);
    const selectedStatus = transactionsStatus
      .filter((status) => status.active)
      .map((status) => status.id);

    setMoneyFilter({
      type: selectedTypes,
      status: selectedStatus,
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
    setTransactionsStatus(
      transactionsStatus.map((status) => ({ ...status, active: false }))
    );
    setTransactionsDate({ from: null, to: null });
    setMoneyFilter({ type: [], status: [], date_from: "", date_to: "" });
  };

  return (
    <div>
      <AnchorTemporaryDrawer
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        seeAllDrawer={seeAllDrawer}
        setSeeAllDrawer={setSeeAllDrawer}
        wallet={wallet}
        language={language}
        displayedData={
          <div
            dir={language === "en" ? "ltr" : "rtl"}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {selectedId && selectedTransaction ? (
              <MoneyDetails
                language={language}
                wallet={wallet}
                selectedTransaction={selectedTransaction}
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
                      {wallet.transactionStatus}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {transactionsStatus.map(({ id, name, active }) => (
                        <button
                          key={id}
                          className={`${
                            active
                              ? "bg-[#E9C237] text-white"
                              : "border border-[#E6E6E6] text-[#B3B3B3]"
                          } px-10 py-3 rounded-xl w-fit`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setTransactionsStatus((prev) =>
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
                  <>
                    <p className="text-sm text-[#595959] mb-2 mt-8 ml-4">
                      {wallet.moneyHistory}
                    </p>
                    {isLoading ? (
                      <div className="text-center mt-10">
                        <Skeleton width={"200px"} />
                      </div>
                    ) : (
                      <>
                        {MoneyTransactionHistory?.totalItems === 0 ? (
                          <p className="text-center mt-20 text-2xl text-[#595959]">
                            {wallet.noTransactions}
                          </p>
                        ) : (
                          MoneyTransactionHistory?.result?.map((data) => (
                            <div
                              key={data?.id}
                              onClick={() => {
                                setSelectedTransaction(data);
                              }}
                            >
                              <MoneyCard
                                theData={data}
                                language={language}
                                wallet={wallet}
                              />
                            </div>
                          ))
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        }
      />
    </div>
  );
};

export default MoneyDrawer;
