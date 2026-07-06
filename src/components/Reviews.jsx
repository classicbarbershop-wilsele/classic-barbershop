import { useTranslation } from "react-i18next";

function Reviews() {
  const { t } = useTranslation();

  const reviews = [
    {
      name: "Kobe",
      date: "Google Review",
      text: "Vriendelijke service en perfect geknipt. Zeker een aanrader!",
    },
    {
      name: "Thomas",
      date: "Google Review",
      text: "Professionele barbiers, mooie fade en zeer tevreden met het resultaat.",
    },
    {
      name: "Michael",
      date: "Google Review",
      text: "Topkwaliteit, gezellige sfeer en uitstekende service. Ik kom zeker terug.",
    },
  ];

  return (
    <section className="reviews" id="reviews">
      <h2>{t("reviews.title")}</h2>

      <p className="reviews-subtitle">
        {t("reviews.subtitle")}
      </p>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <div className="review-card" key={review.name}>
            <div className="stars">★★★★★</div>

            <p>"{review.text}"</p>

            <h4>{review.name}</h4>

            <small>{review.date}</small>
          </div>
        ))}
      </div>

      <div className="reviews-footer">
        <a
          href="https://www.google.com/search?q=Classic+Barbershop+Haacht"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn"
        >
          ⭐ {t("reviews.button", "Bekijk alle Google Reviews")}
        </a>
      </div>
    </section>
  );
}

export default Reviews;