"use client";
import { Snackbar, Alert } from "@mui/material";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import { useCloseSnack } from "./CloseSnackbar";

export const ReusableSnackBar = ({ autoHideDuration = 2000 }) => {
  const { handleSnackbarClose, handleCloseSnack } = useCloseSnack();
  const { message, severity, variant, openSnack } = useErrorMessage();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={openSnack}
      autoHideDuration={autoHideDuration}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleCloseSnack} // Keep the original handleCloseSnack for Alert
        severity={severity}
        variant={variant}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
