import Decimal from "decimal.js";

export const FormatBalance = (number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const FormatMoney = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};
export const FormatMoneyArabic = (number) => {
  return new Intl.NumberFormat("ar-EG").format(number);
};

export const FormatMoneyDate = (date, language = "en-US") => {
  const newDate = new Date(date);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const parts = newDate.toLocaleDateString(language, options).split(" ");
  if (language === "ar-EG") {
    return `${parts[0]} ${parts[1]}  ${parts[2]}`;
  } else {
    return `${parts[0]} ${parts[1]} ${parts[2]}`;
  }
};

export const FormatMoneyDateArabic = (date) => {
  const newDate = new Date(date);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const parts = newDate.toLocaleDateString("ar-EG", options).split(" ");
  return ` ${parts[0]} ${parts[1]} ${parts[2]} `;
};

export const FormatArabicNumbers = (number) => {
  let formattedNumber = new Intl.NumberFormat("ar-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  // Replace the Arabic decimal separator with a dot
  formattedNumber = formattedNumber.replace("٫", ".");
  return formattedNumber;
};
export const FormatFullDate = (date) => {
  const newDate = new Date(date);

  // Format date part
  const dateOptions = { year: "numeric", month: "short", day: "2-digit" };
  const dateParts = newDate.toLocaleDateString("en-US", dateOptions).split(" ");

  // Format time part
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const time = newDate.toLocaleTimeString("en-US", timeOptions);

  return `${dateParts[1]} ${dateParts[0]} ${dateParts[2]} ${time}`;
};
export const FormatFullDateArabic = (date) => {
  const newDate = new Date(date);

  // Format date part in Arabic
  const dateOptions = { year: "numeric", month: "short", day: "2-digit" };
  const dateParts = newDate.toLocaleDateString("ar-EG", dateOptions).split(" ");

  // Format time part in Arabic
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const time = newDate.toLocaleTimeString("ar-EG", timeOptions);

  // Return the formatted date and time in Arabic
  return `${dateParts[0]} ${dateParts[1]} ${dateParts[2]} | ${time}`;
};

export const calculateBuyWeight = ({
  input,
  buyGoldPrice,
  gold_manufacturing_fees,
  buy_transaction_fees,
  taxes,
}) => {
  const formattedAmount = input
    .times(buyGoldPrice)
    .toDecimalPlaces(2, Decimal.ROUND_DOWN);
  const formattedManufacturing = input
    .times(gold_manufacturing_fees)
    .toDecimalPlaces(2, Decimal.ROUND_DOWN);
  const formattedTransaction = input
    .times(buy_transaction_fees)
    .toDecimalPlaces(2, Decimal.ROUND_DOWN);
  const formattedTaxes = formattedManufacturing
    .times(taxes)
    .dividedBy(100)
    .toDecimalPlaces(2, Decimal.ROUND_DOWN);

  const formattedTotalAmount = formattedAmount
    .plus(formattedManufacturing)
    .plus(formattedTransaction)
    .plus(formattedTaxes)
    .toDecimalPlaces(2, Decimal.ROUND_DOWN);
  return formattedTotalAmount.toString();
};
export const calculateAmountForSellFromWeight = ({
  input,
  sellGoldPrice,
  sell_transaction_fees,
}) => {
  const rawWeightPrice = input
    .times(sellGoldPrice)
    .toDecimalPlaces(2, Decimal.ROUND_DOWN);
  const sellTransactionFees = input
    .times(sell_transaction_fees)
    .toDecimalPlaces(2, Decimal.ROUND_DOWN);

  const totalAmount = rawWeightPrice
    .minus(sellTransactionFees)
    .toDecimalPlaces(2, Decimal.ROUND_DOWN);
  return totalAmount.toString();
};
