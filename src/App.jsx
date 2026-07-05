import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import services from "./components/Services";
import Booking from "./components/Booking";
import Branches from "./components/Branches";
import WhyUs from "./components/whyUs";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import "./App.css";
function App() {
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

export default App;