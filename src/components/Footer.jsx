import { FaInstagram, FaFacebook, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
function Footer() {
    
  return (
    <footer className="footer" id="contact">
      <div className="footer-col">
        <img src="/images/logo.png" alt="Classic Barbershop" />
        <p>Professionele kapsels, baardverzorging en premium service.</p>
      </div>

      <div className="footer-col">
        <h3>Contact</h3>
      <p>
  Haacht: <FaPhoneAlt />{" "}
  <a href="tel:+32470513916">0470 51 39 16</a>
</p>

<p>
  Wilsele: <FaPhoneAlt />{" "}
  <a href="tel:+32492860437">0492 86 04 37</a>
</p>
</div>
      <div className="footer-col">
        <h3>Vestigingen</h3>
        <p>
  <FaMapMarkerAlt /> Vekestraat 1, 3150 Haacht
</p>

<p>
  <FaMapMarkerAlt /> Aarschotsesteenweg 664, 3012 Wilsele
</p>
      </div>

      <div className="footer-col">
  <h3>Social Media</h3>

  <a
    href="https://www.instagram.com/classic_barbershop_by_ali"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram /> Instagram Haacht
  </a>

  <br />

  <a
    href="https://www.instagram.com/classic.barbershop.wilsele"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram /> Instagram Wilsele
  </a>

  <br />

  <a
    href="https://www.facebook.com/share/181LqiH1g5/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaFacebook /> Facebook Wilsele
  </a>
</div>
   </footer>
    );
}

export default Footer;