import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import services from "./components/services";
import Booking from "./components/Booking";
import Branches from "./components/Branches";
import whyUs from "./components/whyUs";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import "./App.css";
function App() {
  return (
    <>
  <Navbar />
<Hero />
<whyUs />
<services />
<Reviews />
<Booking />
<Branches /> 
<Footer />
</>
);
}

export default App;