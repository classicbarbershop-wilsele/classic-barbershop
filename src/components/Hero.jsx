import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <span className="hero-small-title">
          {t("hero.welcome")}
        </span>

        <h1>{t("hero.title")}</h1>

        <p>{t("hero.text")}</p>

        <div className="hero-buttons">
          <a href="#booking" className="hero-btn">
            {t("hero.appointment")}
          </a>

          <a href="#services" className="hero-btn-outline">
            {t("hero.prices")}
          </a>
        </div>

        <div className="hero-features">
          <div>{t("hero.google")}</div>
          <div>{t("hero.barbers")}</div>
          <div>{t("hero.locations")}</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;