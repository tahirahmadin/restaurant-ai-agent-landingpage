import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { LandingPage } from "./components/LandingPage";
import MediaPage from "./components/MediaPage";
import PartnersPage from "./components/PartnersPage";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import { Routes, Route } from "react-router-dom";

export const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/media" element={<MediaPage />} />
        </Routes>
      </ThemeProvider>
      <Footer />
    </Router>
  );
};
