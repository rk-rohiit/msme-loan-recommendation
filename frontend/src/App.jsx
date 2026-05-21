import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CheckLoan from "./pages/CheckLoan";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-loan" element={<CheckLoan />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;