function Branches() {
  return (
   <section className="branches" id="branches">
      <h2>Onze Vestigingen</h2>
      <div className="branches-grid">

      <div className="branch-card">
        <h3>Classic Barbershop - Haacht</h3>
        <p>Vekestraat 1, 3150 Haacht</p>
        <p>Tel: 0470 51 39 16</p>
        <p>Dinsdag - vrijdag: 09:00 - 19:00</p>
        <p>Zaterdag - maandag: 09:00 - 18:00</p>

        <a href="https://maps.app.goo.gl/KP83XtzVL5pKkiDQA" target="_blank">
          Bekijk op Google Maps
        </a>
      </div>

      <div className="branch-card">
        <h3>Classic Barbershop - Wilsele</h3>
        <p>Aarschotsesteenweg 664, 3012 Wilsele</p>
        <p>Tel: 0492 86 04 37</p>
        <p>Maandag - vrijdag: 10:00 - 19:00</p>
        <p>Zaterdag - zondag: 10:00 - 18:00</p>

        <a href="https://maps.app.goo.gl/obsEbNireDGvQCBF6" target="_blank">
          Bekijk op Google Maps
        </a>
       </div>
      </div>
    </section>
  );
}

export default Branches;