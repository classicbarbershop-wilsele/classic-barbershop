import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/whyUs";
import Services from "./components/services";
import Reviews from "./components/Reviews";
import Booking from "./components/Booking";
import Branches from "./components/Branches";
import Footer from "./components/Footer";
import Admin from "./components/Admin";

import "./App.css";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Reviews />
        <Booking />
        <Branches />
      </main>

      <Footer />
    </>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = i18n.language.substring(0, 2);

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;