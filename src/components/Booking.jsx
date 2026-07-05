import { useState } from "react";
import services from "../data/services";
import branches from "../data/branches";
function generateTimes(start, end) {
  const times = [];
  let [hour, minute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    times.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );

    minute += 30;

    if (minute >= 60) {
      hour += 1;
      minute = 0;
    }
  }

  return times;
}


function Booking() {
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="booking" id="booking">
      <h2>Maak een afspraak</h2>

      <h3>Kies een vestiging</h3>
      <div className="booking-options">
       {Object.keys(branches).map((branchName) => (
  <button key={branchName} onClick={() => setBranch(branchName)}>
    {branchName}
  </button>
))}
      </div>

      {branch && (
        <>
          <h3>Kies een categorie</h3>
          <div className="booking-options">
            <button onClick={() => setCategory("heren")}>Heren</button>
            <button onClick={() => setCategory("kinderen")}>
              Kinderen onder 10 jaar
            </button>
            <button onClick={() => setCategory("dames")}>Dames</button>
          </div>
        </>
      )}

      {category && (
        <>
          <h3>Kies een dienst</h3>
          <div className="services-list">
            {services[category].map((service) => (
              <div
  className="booking-service"
  key={service.name}
  onClick={() => setSelectedService(service)}
>
                <span>{service.name}</span>
                <strong>{service.price}</strong>
              </div>
            ))}
          </div>
        </>
      )}
      {selectedService && (
  <div className="booking-form">
    <h3>Vul uw gegevens in</h3>

    <div className="booking-summary">
  <h3>Overzicht</h3>

  <p><strong>Vestiging:</strong> {branch}</p>

  <p>
    <strong>Categorie:</strong>{" "}
    {category === "heren"
      ? "Heren"
      : category === "dames"
      ? "Dames"
      : "Kinderen"}
  </p>

  <p><strong>Dienst:</strong> {selectedService.name}</p>

  <p><strong>Prijs:</strong> {selectedService.price}</p>
</div>

    <input type="text" placeholder="Naam" />

    <input type="tel" placeholder="Telefoonnummer" />

    <input type="date" />

    <input type="time" />

    <button
  onClick={() =>
    alert(
      `Afspraak aangevraagd voor ${selectedService.name} bij ${branch}`
    )
  }
>
  Afspraak bevestigen
</button>
  </div>
)}
    </section>
  );
}

export default Booking;