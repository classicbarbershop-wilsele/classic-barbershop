import { useState } from "react";
import { useTranslation } from "react-i18next";
import services from "../data/services";
import branches from "../data/branches";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

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

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function overlaps(startA, durationA, startB, durationB) {
  const aStart = timeToMinutes(startA);
  const aEnd = aStart + durationA;
  const bStart = timeToMinutes(startB);
  const bEnd = bStart + durationB;

  return aStart < bEnd && aEnd > bStart;
}

function getAvailableTimes(branchName, date, service, bookingsForDay) {
  if (!branchName || !date || !service) return [];

  const selectedDate = new Date(`${date}T00:00:00`);
  const dayName = dayNames[selectedDate.getDay()];
  const workingDay = branches[branchName].workingHours[dayName];

  if (!workingDay) return [];

  return generateTimes(workingDay[0], workingDay[1], service.duration).filter(
    (time) =>
      !bookingsForDay.some(
        (booking) =>
          booking.status !== "cancelled" &&
          overlaps(time, service.duration, booking.time, booking.duration)
      )
  );
}

function Booking() {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingsForDay, setBookingsForDay] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const bookingPrice = selectedService ? selectedService.price + 5 : 0;

  const categories = [
    { key: "heren", label: "Heren" },
    { key: "kinderen", label: "Kinderen onder 10 jaar" },
    { key: "dames", label: "Dames" },
  ];

  const times = getAvailableTimes(branch, customer.date, selectedService, bookingsForDay);

  async function loadBookingsForDate(selectedDate) {
    const q = query(
      collection(db, "bookings"),
      where("branch", "==", branch),
      where("date", "==", selectedDate)
    );

    const snapshot = await getDocs(q);
    setBookingsForDay(snapshot.docs.map((doc) => doc.data()));
  }

  async function submitBooking() {
    setSuccessMessage("");
    setErrorMessage("");

    if (!customer.name || !customer.phone || !customer.email || !customer.date || !customer.time) {
      setErrorMessage(t("booking.fillAll", "Vul alle gegevens in."));
      return;
    }

    try {
      setIsSubmitting(true);

      const q = query(
        collection(db, "bookings"),
        where("branch", "==", branch),
        where("date", "==", customer.date)
      );

      const snapshot = await getDocs(q);
      const existingBookings = snapshot.docs.map((doc) => doc.data());

      const isTaken = existingBookings.some(
        (booking) =>
          booking.status !== "cancelled" &&
          overlaps(customer.time, selectedService.duration, booking.time, booking.duration)
      );

      if (isTaken) {
        setErrorMessage(
          t("booking.timeTaken", "Dit tijdstip is net gereserveerd. Kies een ander tijdstip.")
        );
        setBookingsForDay(existingBookings);
        return;
      }

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

      setSuccessMessage(
        t(
          "booking.success",
          "Uw afspraak is succesvol aangevraagd. Wij nemen zo snel mogelijk contact met u op."
        )
      );

      setCustomer({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
      });

      setBookingsForDay([]);
      setStep(1);
      setBranch("");
      setCategory("");
      setSelectedService(null);
    } catch (error) {
      setErrorMessage(t("booking.error", "Er ging iets mis. Probeer opnieuw."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="booking" id="booking">
      <h2>{t("booking.title")}</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {step === 1 && (
        <>
          <h3>{t("booking.chooseBranch")}</h3>
          <div className="booking-options">
            {Object.keys(branches).map((branchName) => (
              <button
                key={branchName}
                onClick={() => {
                  setSuccessMessage("");
                  setErrorMessage("");
                  setBranch(branchName);
                  setCategory("");
                  setSelectedService(null);
                  setBookingsForDay([]);
                  setCustomer({
                    name: "",
                    phone: "",
                    email: "",
                    date: "",
                    time: "",
                  });
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
          <h3>{t("booking.chooseCategory")}</h3>
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
            {t("booking.back")}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>{t("booking.chooseService")}</h3>
          <div className="services-list">
            {services[category]?.map((service) => (
              <div
                className="booking-service"
                key={service.name}
                onClick={() => {
                  setSelectedService(service);
                  setBookingsForDay([]);
                  setCustomer({
                    ...customer,
                    date: "",
                    time: "",
                  });
                  setStep(4);
                }}
              >
                <span>
                  {service.name}
                  <small> {service.duration} min</small>
                </span>
                <strong>€ {(service.price + 5).toFixed(2).replace(".", ",")}</strong>
              </div>
            ))}
          </div>

          <button className="back-btn" onClick={() => setStep(2)}>
            {t("booking.back")}
          </button>
        </>
      )}

      {step === 4 && selectedService && (
        <div className="booking-form">
          <h3>{t("booking.yourDetails")}</h3>

          <input
            type="text"
            placeholder={t("booking.name", "Naam")}
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />

          <input
            type="tel"
            placeholder={t("booking.phone", "Telefoonnummer")}
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />

          <input
            type="email"
            placeholder={t("booking.email", "E-mail")}
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />

          <button className="back-btn" onClick={() => setStep(3)}>
            {t("booking.back")}
          </button>

          <button onClick={() => setStep(5)}>{t("booking.next")}</button>
        </div>
      )}

      {step === 5 && selectedService && (
        <div className="booking-form">
          <h3>{t("booking.chooseDate")}</h3>

          <input
            type="date"
            min={today}
            value={customer.date}
            onChange={async (e) => {
              const selectedDate = e.target.value;

              setCustomer({
                ...customer,
                date: selectedDate,
                time: "",
              });

              await loadBookingsForDate(selectedDate);
            }}
          />

          <select
            value={customer.time}
            onChange={(e) => setCustomer({ ...customer, time: e.target.value })}
          >
            <option value="">{t("booking.chooseTime", "Kies een tijd")}</option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {customer.date && times.length === 0 && (
            <p className="error-message">
              {t("booking.noTimes", "Geen beschikbare tijden op deze datum.")}
            </p>
          )}

          <div className="booking-summary">
            <h3>{t("booking.overview")}</h3>
            <p><strong>{t("booking.branch", "Vestiging")}:</strong> {branch}</p>
            <p><strong>{t("booking.service", "Dienst")}:</strong> {selectedService.name}</p>
            <p><strong>{t("booking.duration", "Duur")}:</strong> {selectedService.duration} min</p>
            <p><strong>{t("booking.totalPrice", "Totaalprijs")}:</strong> €{bookingPrice.toFixed(2).replace(".", ",")}</p>
            <p><strong>{t("booking.name", "Naam")}:</strong> {customer.name}</p>
            <p><strong>{t("booking.phone", "Telefoon")}:</strong> {customer.phone}</p>
            <p><strong>{t("booking.email", "E-mail")}:</strong> {customer.email}</p>
            <p><strong>{t("booking.date", "Datum")}:</strong> {customer.date}</p>
            <p><strong>{t("booking.time", "Tijd")}:</strong> {customer.time}</p>
          </div>

          <button className="back-btn" onClick={() => setStep(4)}>
            {t("booking.back")}
          </button>

          <button
            disabled={
              isSubmitting ||
              !customer.name ||
              !customer.phone ||
              !customer.email ||
              !customer.date ||
              !customer.time
            }
            onClick={submitBooking}
          >
            {isSubmitting ? t("booking.booking") : t("booking.confirm")}
          </button>
        </div>
      )}
    </section>
  );
}

export default Booking;