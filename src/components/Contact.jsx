function Contact() {
  return (
    <section className="contact" id="contact">
      <h2>Contact & Locaties</h2>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Classic Barbershop - Haacht</h3>
          <p>📍 Vekestraat 1, 3150 Haacht</p>
          <p>📞 0470 51 39 16</p>
          <a href="https://maps.app.goo.gl/KP83XtzVL5pKkiDQA" target="_blank">
            Open in Google Maps
          </a>
        </div>

        <div className="contact-card">
          <h3>Classic Barbershop - Wilsele</h3>
          <p>📍 Aarschotsesteenweg 664, 3012 Wilsele</p>
          <p>📞 0492 86 04 37</p>
          <a href="https://maps.app.goo.gl/obsEbNireDGvQCBF6" target="_blank">
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;