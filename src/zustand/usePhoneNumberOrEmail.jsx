'use client'
import { create } from "zustand";

export const usePhoneNumberOrEmail = create((set) => ({
  phone: localStorage.getItem("phone") ? localStorage.getItem("phone") : "",
  email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
  wrongOTP: false,
  setEmail: (newEmail) => set({ email: newEmail }),
  setPhone: (newPhone) => set({ phone: newPhone }),
  setWrongOTP: (newWrongOTP) => set({ wrongOTP: newWrongOTP }),
}));
