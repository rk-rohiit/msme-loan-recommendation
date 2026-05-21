import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CheckLoan from "./pages/CheckLoan";
import Footer from "./components/Footer";
import About from "./components/About";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/check-loan" element={<CheckLoan />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;