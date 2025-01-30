"use client";

import React, { createContext, useState, useContext } from "react";
import {
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Create the Snackbar Context
const SnackbarContext = createContext();

// Custom hook to use the Snackbar context
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

// Snackbar Provider component
export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    variant: "info",
    options: {},
    style: {},
  });

  // Function to show snackbar
  const showSnackbar = (
    message,
    variant = "info",
    backgroundColor,
    color,
    options = {}
  ) => {
    setSnackbarState({
      open: true,
      message,
      variant,
      options,
      style: {
        color,
        backgroundColor,
      },
    });
  };

  // Function to close snackbar
  const closeSnackbar = () => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        {...snackbarState.options}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarState.variant}
          sx={{
            width: "100%",
            color: snackbarState.style.color || "#2f2d47", // Default color
            backgroundColor: snackbarState.style.backgroundColor || "#f0f0f0", // Default background
          }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
