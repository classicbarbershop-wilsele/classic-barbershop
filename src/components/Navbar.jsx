import { useState } from "react";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { t, i18n } = useTranslation();

  function closeMenu() {
    setOpen(false);
  }

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <nav className="navbar">
      <a href="#home" className="logo" onClick={closeMenu}>
        <img src="/images/logo.png" alt="Classic Barbershop Logo" />
      </a>

      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        ☰
      </button>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li>
          <a href="#home" onClick={closeMenu}>
            {t("navbar.home")}
          </a>
        </li>

        <li>
          <a href="#services" onClick={closeMenu}>
            {t("navbar.prices")}
          </a>
        </li>

        <li>
          <a href="#booking" onClick={closeMenu}>
            {t("navbar.booking")}
          </a>
        </li>

        <li>
          <a href="#branches" onClick={closeMenu}>
            {t("navbar.branches")}
          </a>
        </li>

        <li>
          <a href="#reviews" onClick={closeMenu}>
            {t("navbar.reviews")}
          </a>
        </li>

        <li>
          <a href="#contact" onClick={closeMenu}>
            {t("navbar.contact")}
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        <select
          className="language-select"
          value={i18n.language.substring(0, 2)}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="nl">🇳🇱 NL</option>
          <option value="en">🇬🇧 EN</option>
          <option value="fr">🇫🇷 FR</option>
          <option value="de">🇩🇪 DE</option>
          <option value="ar">🇸🇦 AR</option>
        </select>

        <a href="#booking" className="book-btn" onClick={closeMenu}>
          {t("navbar.bookNow")}
        </a>
      </div>
    </nav>
  );
}

export default Navbar;