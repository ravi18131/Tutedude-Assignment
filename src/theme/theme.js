"use client";

import { createTheme } from "@mui/material/styles";

// Creating a custom theme for mui components
const theme = createTheme({
  // changing mui breakpoints same as bootstrap breakpoints
  breakpoints: {
    values: {
      xs: 0, // xs for Bootstrap starts at 0px
      sm: 576, // sm for Bootstrap starts at 576px
      md: 768, // md for Bootstrap starts at 768px
      lg: 992, // lg for Bootstrap starts at 992px
      xl: 1200, // xl for Bootstrap starts at 1200px
    },
  },

  // Changing mui color palette
  palette: {
    primary: {
      main: "#d0ae1f", // Primary color
    },
    secondary: {
      main: "#ffd301", // Secondary color
    },
    background: {
      default: "#fafcff", // Background color
    },
    text: {
      primary: "#2f2d47", // Text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#d0ae1f", // Primary button background
          color: "#ffffff",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "#9d8317", // Primary button hover background
          },
        },
        containedSecondary: {
          backgroundColor: "#ffd301", // Secondary button background
          "&:hover": {
            backgroundColor: "#cca800", // Secondary button hover background
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffd301",
        },
      },
    },
  },
});

export default theme;
