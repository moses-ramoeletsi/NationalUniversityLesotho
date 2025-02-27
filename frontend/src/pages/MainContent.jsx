import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Mission from "../components/Mission";
import Activities from "../components/Activities";
import Footer from "../components/Footer";

const MainContent = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Mission />
        <Activities />
      </main>
      <Footer />
    </div>
  );
};

export default MainContent;
