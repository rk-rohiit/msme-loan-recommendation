import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import LoanSection from "../components/LoanSection";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <LoanSection />
      <FAQ />
      
      <Contact />
    </>
  );
};

export default Home;