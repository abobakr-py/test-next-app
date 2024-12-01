"use client";
import Image from "next/image";
import { useState } from "react";
import exchange from "@/assets/dashboard/exchange.svg";
import Decimal from "decimal.js";
import {
  calculateAmountForSellFromWeight,
  calculateBuyWeight,
} from "@/helper/utilFunctions";
import { useBuyGold, useSellGold } from "@/apis/dsahboard/mutations";
import { useGlobal } from "@/zustand/useGlobal";
import { usePurchase } from "@/zustand/usePurchase";
import RightDrawer from "@/components/common/RightDrawer";
import PinCode from "@/components/common/PinCode";
import BuyWeightDrawer from "./BuyWeightDrawer";
import useLanguage from "@/context/useLanguage";
import SellWeightDrawer from "./SellWeightDrawer";
const BuySellForm = ({
  active,
  setActive,
  configuration,
  goldPrice,
  buySell,
  language,
  userGold,
}) => {
  const { purchaseInfo, setPurchaseInfo, pinCode } = usePurchase();
  const [inputValue, setInputValue] = useState(""); // Input value for user input
  const [convertedValue, setConvertedValue] = useState(""); // Holds the conversion result
  const [disabled, setDisabled] = useState({
    buyWeight: true,
    buyMoney: true,
    sellWeight: true,
    sellMoney: true,
  });
  const { openDrawer, setOpenDrawer } = useGlobal();
  const { translations } = useLanguage();
  const handleInputChange = (e) => {
    let value = e.target.value;
    // Remove unwanted characters (non-numeric except a single decimal point)
    // Limit the length to a maximum of 10 characters, including the dot
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Parse the value as Decimal for further validation
    // Handle empty input scenario
    if (value === "") {
      setInputValue(""); // Reset the input value
      setConvertedValue(""); // Reset the converted value as well
      setDisabled({ ...disabled, [active]: true });
      return; // Exit the function
    }

    if (active === "buyWeight") {
      value = value.replace(/[^0-9.]/g, "");

      // Prevent multiple decimal points
      const decimalMatches = (value.match(/\./g) || []).length;
      if (decimalMatches > 1) {
        value = value.slice(0, -1); // Trim the last character if more than one decimal point
      }
      // Ensure only up to 3 decimal places after the decimal point
      if (value.includes(".")) {
        const [integerPart, decimalPart] = value.split(".");
        value = `${integerPart}.${decimalPart.slice(0, 3)}`;
      }
      const numericValue = new Decimal(value);

      // Check if the value is a valid number and not negative
      if (numericValue.isNegative()) {
        return; // Exit if the input is invalid or negative
      }
      setInputValue(value);

      const calculatedValue = calculateBuyWeight({
        input: numericValue,
        buy_transaction_fees: configuration?.buy_transaction_fees,
        gold_manufacturing_fees: configuration?.gold_manufacturing_fees,
        taxes: configuration?.taxes,
        buyGoldPrice: goldPrice?.LocalPrice24,
      });
      setConvertedValue(calculatedValue);

      if (
        new Decimal(value).greaterThanOrEqualTo(
          new Decimal(configuration?.min_buy_fraction)
        ) &&
        new Decimal(value).lessThanOrEqualTo(
          new Decimal(configuration?.max_gold_fraction)
        )
      ) {
        setDisabled({ ...disabled, buyWeight: false });
      } else {
        setDisabled({ ...disabled, buyWeight: true });
      }
    }
    if (active === "buyMoney") {
      value = value.replace(/[^0-9]/g, ""); // Only allow numbers

      const decimalMatches = (value.match(/\./g) || []).length;
      if (decimalMatches > 0) {
        // If more than one decimal point, trim the last character
        value = value.slice(0, -1);
      }
      const numericValue = new Decimal(value);

      // Check if the value is a valid number and not negative
      if (numericValue.isNegative()) {
        return; // Exit if the input is invalid or negative
      }
      setInputValue(value);

      const total = new Decimal(numericValue)
        .div(
          new Decimal(goldPrice?.LocalPrice24)
            .plus(new Decimal(configuration?.gold_manufacturing_fees))
            .plus(new Decimal(configuration?.buy_transaction_fees))
            .plus(
              new Decimal(configuration?.gold_manufacturing_fees)
                .times(configuration?.taxes)
                .div(100)
            )
        )
        .toDecimalPlaces(3, Decimal.ROUND_DOWN);
      setConvertedValue(total.toString());
      if (
        new Decimal(value).greaterThanOrEqualTo(
          new Decimal(
            calculateBuyWeight({
              input: new Decimal(configuration?.min_buy_fraction),
              buy_transaction_fees: configuration?.buy_transaction_fees,
              gold_manufacturing_fees: configuration?.gold_manufacturing_fees,
              taxes: configuration?.taxes,
              buyGoldPrice: goldPrice?.LocalPrice24,
            })
          )
        ) &&
        new Decimal(value).lessThanOrEqualTo(
          new Decimal(
            calculateBuyWeight({
              input: new Decimal(configuration?.max_gold_fraction),
              buy_transaction_fees: configuration?.buy_transaction_fees,
              gold_manufacturing_fees: configuration?.gold_manufacturing_fees,
              taxes: configuration?.taxes,
              buyGoldPrice: goldPrice?.LocalPrice24,
            })
          )
        )
      ) {
        setDisabled({ ...disabled, buyMoney: false });
      } else {
        setDisabled({ ...disabled, buyMoney: true });
      }
    }
    if (active === "sellWeight") {
      value = value.replace(/[^0-9.]/g, "");

      // Prevent multiple decimal points
      const decimalMatches = (value.match(/\./g) || []).length;
      if (decimalMatches > 1) {
        value = value.slice(0, -1); // Trim the last character if more than one decimal point
      }

      // Ensure only up to 3 decimal places after the decimal point
      if (value.includes(".")) {
        const [integerPart, decimalPart] = value.split(".");
        value = `${integerPart}.${decimalPart.slice(0, 3)}`;
      }
      const numericValue = new Decimal(value);

      // Check if the value is a valid number and not negative
      if (numericValue.isNegative()) {
        return; // Exit if the input is invalid or negative
      }
      setInputValue(value);
      // Step 1: Calculate Raw Weight Price
      const rawWeightPrice = numericValue
        .times(goldPrice?.LocalSellPrice24) // weight(input) * LocalSellPrice24
        .toDecimalPlaces(2, Decimal.ROUND_DOWN);
      // Step 2: Calculate Sell Transaction Fees
      const sellTransactionFees = numericValue
        .times(configuration?.sell_transaction_fees) // RawWeightPrice * sell_transaction_fees
        .toDecimalPlaces(2, Decimal.ROUND_DOWN);

      // Step 3: Calculate Total Amount
      const totalAmount = rawWeightPrice
        .minus(sellTransactionFees) // totalAmount = RawWeightPrice - SellTransFees
        .toDecimalPlaces(2, Decimal.ROUND_DOWN);

      // Step 4: Set the converted value to the calculated total amount
      setConvertedValue(totalAmount.toString());

      if (
        new Decimal(value).greaterThanOrEqualTo(
          new Decimal(configuration?.min_sell_fractions)
        )
      ) {
        setDisabled({ ...disabled, sellWeight: false });
      } else {
        setDisabled({ ...disabled, sellWeight: true });
      }
    }
    if (active === "sellMoney") {
      value = value.replace(/[^0-9]/g, ""); // Only allow numbers

      const decimalMatches = (value.match(/\./g) || []).length;
      if (decimalMatches > 0) {
        // If more than one decimal point, trim the last character
        value = value.slice(0, -1);
      }
      const numericValue = new Decimal(value);

      // Check if the value is a valid number and not negative
      if (numericValue.isNegative()) {
        return; // Exit if the input is invalid or negative
      }
      setInputValue(value);
      const totalAmount = new Decimal(
        numericValue /
          (goldPrice?.LocalSellPrice24 - configuration?.sell_transaction_fees)
      ).toDecimalPlaces(3, Decimal.ROUND_DOWN);
      // Step 4: Set the converted value to the calculated total amount
      setConvertedValue(totalAmount.toString());
      if (
        new Decimal(value).greaterThanOrEqualTo(
          new Decimal(
            calculateAmountForSellFromWeight({
              input: new Decimal(configuration?.min_sell_fractions),
              sellGoldPrice: goldPrice?.LocalSellPrice24,
              sell_transaction_fees: configuration?.sell_transaction_fees,
            })
          )
        )
      ) {
        setDisabled({ ...disabled, sellMoney: false });
      } else {
        setDisabled({ ...disabled, sellMoney: true });
      }
    }
  };

  const handleTabSwitch = (tab) => {
    setActive(tab); // Switch the active tab
    setInputValue(""); // Clear input value
    setConvertedValue(""); // Clear converted value
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setOpenDrawer();
    if (active === "buyWeight") {
      setPurchaseInfo({
        ...purchaseInfo,
        type: "buyWeight",
        weight: inputValue,
        // convertedValue,
        title: translations[language].purchase.confirmBuy,
        // manufacturingFees: new Decimal(inputValue)
        //   .times(configuration?.gold_manufacturing_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
        // taxes: new Decimal(inputValue)
        //   .times(configuration?.gold_manufacturing_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
        // transactionFees: new Decimal(inputValue)
        //   .times(configuration?.buy_transaction_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .times(configuration?.taxes)
        //   .dividedBy(100)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
        // goldPrice: goldPrice?.LocalPrice24,
        // storageFee: configuration?.storage_fee || 0,
      });
    }

    if (active === "buyMoney") {
      console.log("Weight", convertedValue);
      console.log("Money", inputValue);
      setPurchaseInfo({
        ...purchaseInfo,
        type: "buyMoney",
        weight: Number(convertedValue),
        // convertedValue: inputValue,
        title: translations[language].purchase.confirmBuy,

        // goldPrice: goldPrice?.LocalPrice24,
        // storageFee: configuration?.storage_fee || 0,
        // title: translations[language].purchase.confirmBuy,
        // manufacturingFees: new Decimal(convertedValue)
        //   .times(configuration?.gold_manufacturing_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
        // taxes: new Decimal(convertedValue)
        //   .times(configuration?.gold_manufacturing_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
        // transactionFees: new Decimal(convertedValue)
        //   .times(configuration?.buy_transaction_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .times(configuration?.taxes)
        //   .dividedBy(100)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
      });
    }

    if (active === "sellWeight") {
      setPurchaseInfo({
        ...purchaseInfo,
        type: "sellWeight",
        weight: inputValue,
        convertedValue: Number(convertedValue),
        title: translations[language].purchase.confirmSell,
        transactionFees: new Decimal(inputValue)
          .times(configuration?.sell_transaction_fees)
          .toDecimalPlaces(2, Decimal.ROUND_DOWN)
          .toString(),
        // goldPrice: goldPrice?.LocalPrice24,
        // storageFee: configuration?.storage_fee || 0,
        // title: translations[language].purchase.confirmBuy,
        // manufacturingFees: new Decimal(convertedValue)
        //   .times(configuration?.gold_manufacturing_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
        // taxes: new Decimal(convertedValue)
        //   .times(configuration?.gold_manufacturing_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
      });
    }

    if (active === "sellMoney") {
      setPurchaseInfo({
        ...purchaseInfo,
        type: "sellMoney",
        weight: Number(convertedValue),
        convertedValue: inputValue,
        title: translations[language].purchase.confirmSell,
        transactionFees: new Decimal(convertedValue)
          .times(configuration?.sell_transaction_fees)
          .toDecimalPlaces(2, Decimal.ROUND_DOWN)
          .toString(),
        // goldPrice: goldPrice?.LocalPrice24,
        // storageFee: configuration?.storage_fee || 0,
        // title: translations[language].purchase.confirmBuy,
        // manufacturingFees: new Decimal(convertedValue)
        //   .times(configuration?.gold_manufacturing_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
        // taxes: new Decimal(convertedValue)
        //   .times(configuration?.gold_manufacturing_fees)
        //   .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        //   .toString(),
      });
      // await sellGold({ orderDetails: convertedValue });
    }
  };
  return (
    <div className="w-full my-12 ml-12">
      <p className="text-base text-[#666666]">
        {buySell?.goldFractionCalculator}
      </p>
      <div className="flex flex-col items-center mt-6">
        {/* Toggle Buttons for Buy and Sell */}
        <div className="flex items-center w-full mb-8 gap-6 bg-[#F5F5F5] p-2 rounded-2xl">
          <button
            onClick={() => handleTabSwitch("buyWeight")}
            className={`${
              active === "buyWeight" || active === "buyMoney"
                ? "bg-[#e9c237] text-white rounded-xl"
                : "text-[#b3b3b3]"
            } py-[0.625rem] text-lg w-full`}
          >
            {buySell?.buy}
          </button>
          <button
            onClick={() => handleTabSwitch("sellWeight")}
            className={`${
              active === "sellWeight" || active === "sellMoney"
                ? "bg-[#e9c237] text-white rounded-xl"
                : "text-[#b3b3b3]"
            } py-[0.625rem] text-lg w-full`}
          >
            {buySell?.sell}
          </button>
        </div>

        {/* Form for Buy and Sell */}
        <form className="w-[80%]">
          <div className="flex flex-col gap-3 relative">
            <div className="relative border-2 p-2 rounded-xl border-[#e9c237]">
              <input
                placeholder={
                  active === "buyWeight" || active === "sellWeight"
                    ? buySell?.weightPlaceholder
                    : buySell?.moneyPlaceholder
                }
                type="number"
                className="w-full outline-none px-2 pr-8 mb-2 pt-1"
                value={inputValue}
                onChange={handleInputChange}
                // onBlur={handleBlur}
              />
              <span
                className={`
                text-[#595959] font-medium absolute ${
                  language === "en" ? "right-2" : "left-3"
                } top-0 bottom-0 flex items-center pr-2
                `}
              >
                {active === "buyWeight" || active === "sellWeight"
                  ? buySell?.grams
                  : buySell?.egp}
              </span>
            </div>

            <Image
              onClick={() => {
                setDisabled({
                  buyWeight: true,
                  buyMoney: true,
                  sellWeight: true,
                  sellMoney: true,
                });
                if (active === "buyWeight") {
                  setActive("buyMoney");
                } else if (active === "buyMoney") {
                  setActive("buyWeight");
                } else if (active === "sellWeight") {
                  setActive("sellMoney");
                } else {
                  setActive("sellWeight");
                }
                setInputValue(""); // Clear input value
                setConvertedValue(""); // Clear converted value
              }}
              src={exchange}
              alt="arrow"
              className="size-12 absolute z-10 top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 cursor-pointer"
            />

            <div className="relative border p-2 rounded-xl bg-[#f0f0f0]">
              <input
                placeholder={
                  active === "buyWeight" || active === "sellWeight"
                    ? buySell?.money
                    : buySell?.weight
                }
                className="w-full outline-none pt-1 px-2 pr-8 mb-2 bg-[#f0f0f0]"
                value={convertedValue}
                disabled
              />
              <span
                className={`
                text-[#595959] font-medium absolute ${
                  language === "en" ? "right-2" : "left-2"
                } top-0 bottom-0 flex items-center pr-2
                `}
              >
                {active === "buyWeight" || active === "sellWeight"
                  ? buySell?.egp
                  : buySell?.grams}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#595959] text-sm w-full">
              {active === "buyWeight" && (
                <div className="flex items-center justify-between w-full">
                  <p>
                    {buySell?.min}: {configuration?.min_buy_fraction}{" "}
                    {buySell?.grams}
                  </p>
                  <p>
                    {buySell?.max}: {configuration?.max_gold_fraction}{" "}
                    {buySell?.grams}
                  </p>
                </div>
              )}
              {active === "buyMoney" && (
                <div className="flex items-center justify-between w-full">
                  <p>
                    {buySell?.min}:
                    {calculateBuyWeight({
                      input: new Decimal(configuration?.min_buy_fraction),
                      buy_transaction_fees: configuration?.buy_transaction_fees,
                      gold_manufacturing_fees:
                        configuration?.gold_manufacturing_fees,
                      taxes: configuration?.taxes,
                      buyGoldPrice: goldPrice?.LocalPrice24,
                    })}
                    <span className="ml-1">{buySell?.egp}</span>
                  </p>
                  <p>
                    {buySell?.max}:{" "}
                    {calculateBuyWeight({
                      input: new Decimal(configuration?.max_gold_fraction),
                      buy_transaction_fees: configuration?.buy_transaction_fees,
                      gold_manufacturing_fees:
                        configuration?.gold_manufacturing_fees,
                      taxes: configuration?.taxes,
                      buyGoldPrice: goldPrice?.LocalPrice24,
                    })}
                    {buySell?.egp}
                  </p>
                </div>
              )}
              {active === "sellWeight" && (
                <div className="flex items-center justify-between w-full">
                  <p>
                    {buySell?.min}:       {configuration?.min_sell_fractions}{" "}
                    {buySell?.grams}
                  </p>
                </div>
              )}
              {active === "sellMoney" && (
                <div>
                  {buySell?.minSell}{" "}
                  {calculateAmountForSellFromWeight({
                    input: new Decimal(configuration?.min_sell_fractions),
                    sellGoldPrice: goldPrice?.LocalSellPrice24,
                    sell_transaction_fees: configuration?.sell_transaction_fees,
                  })}{" "}
                  {buySell?.egp}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              disabled={
                active === "buyWeight"
                  ? disabled.buyWeight
                  : active === "buyMoney"
                  ? disabled.buyMoney
                  : active === "sellWeight"
                  ? disabled.sellWeight
                  : disabled.sellMoney
              }
              onClick={onSubmit}
              className={`
                bg-[#E9C237] text-white font-500 text-lg py-3 w-full mt-8 rounded-xl
                disabled:bg-gray-200 disabled:text-gray-400
                `}
            >
              {active === "buyWeight" || active === "buyMoney"
                ? buySell?.buy
                : buySell?.sell}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenDrawer();
                setPurchaseInfo({
                  ...purchaseInfo,
                  type: "sellWeight",
                  weight: userGold?.golds?.totalWeight,
                  convertedValue: new Decimal(userGold?.golds?.totalWeight)
                    .times(goldPrice?.LocalSellPrice24)
                    .toDecimalPlaces(2, Decimal.ROUND_DOWN)
                    .minus(
                      new Decimal(userGold?.golds?.totalWeight)
                        .times(configuration?.sell_transaction_fees)
                        .toDecimalPlaces(2, Decimal.ROUND_DOWN)
                    )
                    .toDecimalPlaces(2, Decimal.ROUND_DOWN),
                  title: translations[language].purchase.confirmSell,
                  transactionFees: new Decimal(userGold?.golds?.totalWeight)
                    .times(configuration?.sell_transaction_fees)
                    .toDecimalPlaces(2, Decimal.ROUND_DOWN)
                    .toString(),
                });
              }}
              className={`bg-white text-[#e9c237] border-[#e9c237] border font-500 text-lg py-3 w-full mt-8 rounded-xl
              ${active === "buyWeight" || active === "buyMoney" ? "hidden" : ""}
              `}
            >
              {buySell?.sellAll}
            </button>
          </div>
        </form>
      </div>
      <RightDrawer>
        {active === "buyWeight" || active === "buyMoney" ? (
          <>
            {pinCode ? (
              <BuyWeightDrawer />
            ) : (
              <PinCode title={"confirmPayment"} />
            )}
          </>
        ) : (
          <>
            {pinCode ? (
              <SellWeightDrawer />
            ) : (
              <PinCode title={"confirmPayment"} />
            )}
          </>
        )}
      </RightDrawer>
    </div>
  );
};

export default BuySellForm;
