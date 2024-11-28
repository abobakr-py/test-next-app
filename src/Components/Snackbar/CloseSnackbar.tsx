"use client";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import { SyntheticEvent } from "react";

// Custom hook to provide the handleCloseSnack function
export const useCloseSnack = () => {
  const { setData } = useErrorMessage();

  // Original function accepting both parameters
  const handleCloseSnack = (
    event: SyntheticEvent<Element, Event> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setData({ openSnack: false });
  };

  // Create a version for Snackbar that only takes the event
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSnackbarClose = (event: Event | SyntheticEvent<any, Event>) => {
    handleCloseSnack(event); // Call the original handler
  };

  return { handleCloseSnack, handleSnackbarClose };
};
