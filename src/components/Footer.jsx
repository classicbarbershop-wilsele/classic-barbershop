import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaFacebook,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer-col">
        <img src="/images/logo.png" alt="Classic Barbershop" />

        <p>{t("footer.description")}</p>
      </div>

      <div className="footer-col">
        <h3>{t("footer.contact")}</h3>

        <a href="tel:+32470513916">
          <FaPhoneAlt /> Haacht: 0470 51 39 16
        </a>

        <a href="tel:+32492860437">
          <FaPhoneAlt /> Wilsele: 0492 86 04 37
        </a>
      </div>

      <div className="footer-col">
        <h3>{t("footer.locations")}</h3>

        <a
          href="https://maps.app.goo.gl/KP83XtzVL5pKkiDQA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMapMarkerAlt /> Vekestraat 1, 3150 Haacht
        </a>

        <a
          href="https://maps.app.goo.gl/obsEbNireDGvQCBF6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMapMarkerAlt /> Aarschotsesteenweg 664, 3012 Wilsele
        </a>

        <p>
          <FaClock /> Haacht: di-vr 09:00-19:00, za-ma 09:00-18:00
        </p>

        <p>
          <FaClock /> Wilsele: ma-vr 10:00-19:00, za-zo 10:00-18:00
        </p>
      </div>

      <div className="footer-col">
        <h3>{t("footer.social")}</h3>

        <a
          href="https://www.instagram.com/classic_barbershop_by_ali"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram /> Instagram Haacht
        </a>

        <a
          href="https://www.instagram.com/classic.barbershop.wilsele"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram /> Instagram Wilsele
        </a>

        <a
          href="https://www.facebook.com/share/181LqiH1g5/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook /> Facebook Wilsele
        </a>
      </div>

      <div className="footer-bottom">
        <p>© {year} Classic Barbershop. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;