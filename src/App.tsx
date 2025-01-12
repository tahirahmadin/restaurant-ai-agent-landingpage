import React from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { LandingPage } from "./components/LandingPage.jsx";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingPage />
    </ThemeProvider>
  );
};
