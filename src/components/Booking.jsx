import { useState } from "react";
import services from "../data/services";
import branches from "../data/branches";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

function generateTimes(start, end, duration = 30) {
  const times = [];
  let [hour, minute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute + duration <= endMinute)) {
    times.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
    minute += duration;
    if (minute >= 60) {
      hour += Math.floor(minute / 60);
      minute = minute % 60;
    }
  }
  return times;
}

function getAvailableTimes(branchName, date, service) {
  if (!branchName || !date || !service) return [];
  const selectedDate = new Date(date);
  const dayName = dayNames[selectedDate.getDay()];
  const workingDay = branches[branchName].workingHours[dayName];
  if (!workingDay) return [];
  return generateTimes(workingDay[0], workingDay[1], service.duration);
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
function Booking() {
  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingsForDay, setBookingsForDay] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const bookingPrice = selectedService ? selectedService.price + 5 : 0;

  const categories = [
    { key: "heren", label: "Heren" },
    { key: "kinderen", label: "Kinderen onder 10 jaar" },
    { key: "dames", label: "Dames" },
  ];

  const times = getAvailableTimes(branch, customer.date, selectedService);

  return (
    <section className="booking" id="booking">
      <h2>Maak een afspraak</h2>

      {step === 1 && (
        <>
          <h3>Kies een vestiging</h3>
          <div className="booking-options">
            {Object.keys(branches).map((branchName) => (
              <button
                key={branchName}
                onClick={() => {
                  setBranch(branchName);
                  setStep(2);
                }}
              >
                {branchName}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Kies een categorie</h3>
          <div className="booking-options">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setCategory(cat.key);
                  setStep(3);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button className="back-btn" onClick={() => setStep(1)}>
            ← Terug
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Kies een dienst</h3>
          <div className="services-list">
            {services[category]?.map((service) => (
              <div
                className="booking-service"
                key={service.name}
                onClick={() => {
                  setSelectedService(service);
                  setStep(4);
                }}
              >
                <span>{service.name}</span>
                <strong>
                  {"€ "}
                  {(service.price + 5).toFixed(2).replace(".", ",")}
                </strong>
              </div>
            ))}
          </div>

          <button className="back-btn" onClick={() => setStep(2)}>
            ← Terug
          </button>
        </>
      )}

      {step === 4 && selectedService && (
        <div className="booking-form">
          <h3>Vul uw gegevens in</h3>

          <input
            type="text"
            placeholder="Naam"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Telefoonnummer"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />

          <button className="back-btn" onClick={() => setStep(3)}>
            ← Terug
          </button>

          <button onClick={() => setStep(5)}>Volgende</button>
        </div>
      )}

      {step === 5 && selectedService && (
        <div className="booking-form">
          <h3>Kies datum en tijd</h3>

          <input
  type="date"
  value={customer.date}
  onChange={async (e) => {
    const selectedDate = e.target.value;

    setCustomer({
      ...customer,
      date: selectedDate,
      time: "",
    });

    const q = query(
      collection(db, "bookings"),
      where("branch", "==", branch),
      where("date", "==", selectedDate)
    );

    const snapshot = await getDocs(q);

   setBookingsForDay(
  snapshot.docs.map((doc) => doc.data())
);
  }}
/>

          <select
            value={customer.time}
            onChange={(e) => setCustomer({ ...customer, time: e.target.value })}
          >
            <option value="">Kies een tijd</option>
           {times
  .filter((time) => {
    const selectedStart = timeToMinutes(time);
    const selectedEnd = selectedStart + selectedService.duration;

    return !bookingsForDay.some((booking) => {
      const bookedStart = timeToMinutes(booking.time);
      const bookedEnd = bookedStart + booking.duration;

      return selectedStart < bookedEnd && selectedEnd > bookedStart;
    });
  })
  .map((time) => (
    <option key={time} value={time}>
      {time}
    </option>
  ))}
          </select>

          <div className="booking-summary">
            <h3>Overzicht</h3>
            <p><strong>Vestiging:</strong> {branch}</p>
            <p><strong>Dienst:</strong> {selectedService.name}</p>
            <p><strong>Totaalprijs:</strong> €{bookingPrice.toFixed(2).replace(".", ",")}</p>
            <p><strong>Naam:</strong> {customer.name}</p>
            <p><strong>Telefoon:</strong> {customer.phone}</p>
            <p><strong>E-mail:</strong> {customer.email}</p>
            <p><strong>Datum:</strong> {customer.date}</p>
            <p><strong>Tijd:</strong> {customer.time}</p>
          </div>

          <button className="back-btn" onClick={() => setStep(4)}>
            ← Terug
          </button>

          <button
          onClick={async () => {
  await addDoc(collection(db, "bookings"), {
    branch,
    service: selectedService.name,
    price: bookingPrice,
    duration: selectedService.duration,
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    date: customer.date,
    time: customer.time,
    status: "pending",
    createdAt: new Date(),
  });

  alert("Afspraak succesvol aangevraagd!");
}} 
>
            Afspraak bevestigen
          </button>
        </div>
      )}
    </section>
    );

}

export default Booking;