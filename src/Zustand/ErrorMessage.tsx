import { create } from "zustand";

interface ErrorMessageState {
  message: string;
  responseStatus: number;
  setResponseStatus: (status: number) => void;
  setMessage: (message: string | null) => void; // Add setMessage function type
  severity: "error" | "warning" | "info" | "success";
  variant: "filled" | "outlined";
  openSnack: boolean;
  setData: (
    data: Partial<Omit<ErrorMessageState, "setData" | "setMessage">>
  ) => void;
}

export const useErrorMessage = create<ErrorMessageState>((set) => ({
  message: "",
  severity: "error",
  variant: "filled",
  openSnack: false,
  responseStatus: 0,
  setResponseStatus: (status) => {
    set({ responseStatus: status });
  },
  setMessage: (message) => {
    set({ message: message || "" });
  },
  setData: ({ message, severity, variant, openSnack }) => {
    console.log("setData called with:", {
      message,
      severity,
      variant,
      openSnack,
    }); // Add this line

    set((state) => ({
      message: message !== undefined ? message : state.message,
      severity: severity !== undefined ? severity : state.severity,
      variant: variant !== undefined ? variant : state.variant || "filled",
      openSnack: openSnack !== undefined ? openSnack : state.openSnack,
    }));
  },
}));
