const prices = [
  {
    category: "✂️ Heren",
    items: [
      ["Knippen", "€20,00", "30 min"],
      ["Wassen & Knippen", "€25,00", "35 min"],
      ["Baard & Haar", "€35,00", "45 min"],
      ["Baard scheren met/of aflijnen", "€20,00", "25 min"],
      ["Bruid VIP", "€50,00", "60 min"],
    ],
  },
  {
    category: "👦 Kinderen onder 10 Jaar",
    items: [
      ["Jongens", "€15,00", "25 min"],
      ["Fade", "€20,00", "30 min"],
      ["Meisjes", "€20,00", "25 min"],
    ],
  },
  {
    category: "👩 Dames",
    items: [
      ["Knippen", "€25,00", "35 min"],
      ["Wassen & Handdoeken", "€15,00", "25 min"],
      ["Wassen knippen & Handdoeken", "€30,00", "50 min"],
    ],
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <h2>Onze Prijslijst</h2>

      <div className="price-grid">
        {prices.map((group) => (
          <div className="price-card" key={group.category}>
            <h3>{group.category}</h3>

            {group.items.map(([name, price, duration]) => (
              <div className="price-row" key={name}>
                <span>{name}</span>
                <small>{duration}</small>
                <strong>{price}</strong>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;