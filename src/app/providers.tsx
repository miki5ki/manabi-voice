"use client";

import { CssBaseline } from "@mui/material";
import { brown } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    background: {
      default: brown[50],
      paper: "#ffffff",
    },
    primary: {
      main: brown[900],
    },
    secondary: {
      main: brown[600],
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>{children} </CssBaseline>
    </ThemeProvider>
  );
};
