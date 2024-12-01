"use client";
import { create } from "zustand";

export const usePurchase = create((set, get) => ({
  purchaseInfo: {},
  setPurchaseInfo: (data) => set({ purchaseInfo: data }),
  pinCode: "",
  setPinCode: (data) => set({ pinCode: data }),
}));
