"use client";
import { create } from "zustand";

export const useGlobal = create((set, get) => ({
  hideBalance: true,
  setHideBalance: () => set({ hideBalance: !get().hideBalance }),
  openDrawer: false,
  setOpenDrawer: () => set({ openDrawer: !get().openDrawer }),
  openModal: false,
  setOpenModal: () => set({ openModal: !get().openModal }),
  openPinModal: false,
  setPinOpenModal: () => set({ openPinModal: !get().openPinModal }),
}));
