import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/services";
import Booking from "./components/Booking";
import Branches from "./components/Branches";
import WhyUs from "./components/whyUs";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import "./App.css";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyUs />
      <Services />
      <Reviews />
      <Booking />
      <Branches />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;