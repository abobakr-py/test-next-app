"use client";
import { create } from "zustand";
export const useFilterMoneyGold = create((set) => ({
  transactionsTypes: localStorage.getItem("transactionsTypes")
    ? localStorage.getItem("transactionsTypes")
    : {},
  transactionStatus: localStorage.getItem("transactionStatus")
    ? localStorage.getItem("transactionStatus")
    : {},
  transactionsDate: localStorage.getItem("transactionsDate")
    ? localStorage.getItem("transactionsDate")
    : {},
  moneyFilter: JSON.parse(localStorage.getItem("moneyFilter"))
    ? JSON.parse(localStorage.getItem("moneyFilter"))
    : {},
  goldFilter: JSON.parse(localStorage.getItem("goldFilter"))
    ? JSON.parse(localStorage.getItem("goldFilter"))
    : {},
  selectedId: "",
  selectedSerial: false,
  setMoneyFilter: (newFilter) => {
    localStorage.setItem("moneyFilter", JSON.stringify(newFilter));
    set({ moneyFilter: newFilter });
  },
  setGoldFilter: (newFilter) => {
    localStorage.setItem("goldFilter", JSON.stringify(newFilter));
    set({ goldFilter: newFilter });
  },
  setTransactionsTypes: (newTypes) => set({ transactionsTypes: newTypes }),
  setTransactionStatus: (newStatus) => set({ transactionStatus: newStatus }),
  setTransactionsDate: (newDate) => set({ transactionsDate: newDate }),
  setSelectedId: (id) => set({ selectedId: id }),
  setSelectedSerial: (data) => set({ selectedSerial: data }),
}));
