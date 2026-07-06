import { useTranslation } from "react-i18next";

const priceData = {
  nl: {
    heren: "✂️ Heren",
    kinderen: "👦 Kinderen onder 10 Jaar",
    dames: "👩 Dames",
    items: [
      ["Knippen", "€20,00", "30 min"],
      ["Wassen & Knippen", "€25,00", "35 min"],
      ["Baard & Haar", "€35,00", "45 min"],
      ["Baard scheren met/of aflijnen", "€20,00", "25 min"],
      ["Bruid VIP", "€50,00", "60 min"],
      ["Jongens", "€15,00", "25 min"],
      ["Fade", "€20,00", "30 min"],
      ["Meisjes", "€20,00", "25 min"],
      ["Knippen", "€25,00", "35 min"],
      ["Wassen & Handdoeken", "€15,00", "25 min"],
      ["Wassen knippen & Handdoeken", "€30,00", "50 min"],
    ],
  },
};

const groups = [
  { category: "✂️ Heren", items: [
    ["Knippen", "€20,00", "30 min"],
    ["Wassen & Knippen", "€25,00", "35 min"],
    ["Baard & Haar", "€35,00", "45 min"],
    ["Baard scheren met/of aflijnen", "€20,00", "25 min"],
    ["Bruid VIP", "€50,00", "60 min"],
  ]},
  { category: "👦 Kinderen onder 10 Jaar", items: [
    ["Jongens", "€15,00", "25 min"],
    ["Fade", "€20,00", "30 min"],
    ["Meisjes", "€20,00", "25 min"],
  ]},
  { category: "👩 Dames", items: [
    ["Knippen", "€25,00", "35 min"],
    ["Wassen & Handdoeken", "€15,00", "25 min"],
    ["Wassen knippen & Handdoeken", "€30,00", "50 min"],
  ]},
];

function Services() {
  const { t } = useTranslation();

  return (
    <section className="services" id="services">
      <h2>{t("services.title")}</h2>

      <p className="services-subtitle">{t("services.subtitle")}</p>

      <div className="price-grid">
        {groups.map((group) => (
          <div className="price-card" key={group.category}>
            <h3>{group.category}</h3>

            {group.items.map(([name, price, duration]) => (
              <div className="price-row" key={`${group.category}-${name}`}>
                <span>{name}</span>
                <small>{duration}</small>
                <strong>{price}</strong>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="services-note">{t("services.onlineNote")}</p>
    </section>
  );
}

export default Services;