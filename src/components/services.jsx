function Services() {
  const services = [
    { icon: "✂️", title: "Heren knippen", text: "Strakke coupe met professionele afwerking." },
    { icon: "🧔", title: "Baard trimmen", text: "Perfecte baardverzorging en scherpe lijnen." },
    { icon: "💈", title: "Haar & Baard", text: "Complete verzorging voor een frisse look." },
    { icon: "⭐", title: "VIP Service", text: "Knippen, baard, wassen en verzorging." },
    { icon: "👦", title: "Kinderen", text: "Rustige en nette knipbeurt voor kinderen." },
    { icon: "💇‍♀️", title: "Dames", text: "Knippen, wassen en drogen met zorg." },
  ];

  return (
    <section className="services" id="services">
      <h2>Onze Diensten</h2>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.title}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;