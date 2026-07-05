function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <span className="hero-small-title">Welkom bij</span>

        <h1>
          Classic <br />
          Barbershop
        </h1>

        <p>
          Professionele kapsels, baardverzorging en premium service in Haacht
          en Wilsele.
        </p>

        <div className="hero-buttons">
          <a href="#booking" className="hero-btn">Maak een afspraak</a>
         <a href="#branches" className="hero-btn-outline">
  Onze vestigingen
</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;