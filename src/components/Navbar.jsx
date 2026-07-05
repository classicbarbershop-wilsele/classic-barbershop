function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Classic Barbershop" />
      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Onze Diensten</a></li>
        <li><a href="#branches">Vestigingen</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

     <a href="#booking" className="book-btn">
  Maak een afspraak
</a>
    </nav>
  );
}

export default Navbar;