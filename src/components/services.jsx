const prices = [
  {
    category: "✂️ Heren",
    items: [
      ["Knippen", "€20,00"],
      ["Wassen & Knippen", "€25,00"],
      ["Baard & Haar", "€35,00"],
      ["Baard scheren met/of aflijnen", "€20,00"],
      ["Bruid VIP", "€50,00"],
    ],
  },
  {
    category: "👦 Kinderen onder 10 Jaar",
    items: [
      ["Jongens", "€15,00"],
      ["Fade", "€20,00"],
      ["Meisjes", "€20,00"],
    ],
  },
  {
    category: "👩 Dames",
    items: [
      ["Knippen", "€25,00"],
      ["Wassen & Handdoeken", "€15,00"],
      ["Wassen knippen & Handdoeken", "€30,00"],
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

            {group.items.map(([name, price]) => (
              <div className="price-row" key={name}>
                <span>{name}</span>
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