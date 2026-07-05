import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Classic Barbershop" />
      </div>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li><a onClick={closeMenu} href="#home">Home</a></li>
        <li><a onClick={closeMenu} href="#services">Onze Prijslijst</a></li>
        <li><a onClick={closeMenu} href="#branches">Vestigingen</a></li>
        <li><a onClick={closeMenu} href="#reviews">Reviews</a></li>
        <li><a onClick={closeMenu} href="#contact">Contact</a></li>
      </ul>

      <a href="#booking" className="book-btn" onClick={closeMenu}>
        Maak een afspraak
      </a>
    </nav>
  );
}

export default Navbar;