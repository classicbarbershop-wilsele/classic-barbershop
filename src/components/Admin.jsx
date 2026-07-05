import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const q = query(
      collection(db, "bookings"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    setBookings(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  }

  async function updateStatus(id, status) {
    await updateDoc(doc(db, "bookings", id), {
      status,
    });

    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, status }
          : booking
      )
    );
  }

  async function deleteBooking(id) {
    await deleteDoc(doc(db, "bookings", id));

    setBookings(
      bookings.filter((booking) => booking.id !== id)
    );
  }
if (!isLoggedIn) {
  return (
    <section className="booking">
      <h2>Admin Login</h2>

      <div className="booking-form">
        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            if (password === "classic-barbershop") {
              setIsLoggedIn(true);
            } else {
              alert("Verkeerd wachtwoord");
            }
          }}
        >
          Inloggen
        </button>
      </div>
    </section>
  );
}
  return (
    <section className="booking">
      <h2>Admin - Afspraken</h2>

      {bookings.map((booking) => (
        <div className="booking-summary" key={booking.id}>
          <p><strong>Vestiging:</strong> {booking.branch}</p>
          <p><strong>Dienst:</strong> {booking.service}</p>
          <p><strong>Prijs:</strong> €{booking.price}</p>
          <p><strong>Naam:</strong> {booking.name}</p>
          <p><strong>Telefoon:</strong> {booking.phone}</p>
          <p><strong>E-mail:</strong> {booking.email}</p>
          <p><strong>Datum:</strong> {booking.date}</p>
          <p><strong>Tijd:</strong> {booking.time}</p>
          <p><strong>Status:</strong> {booking.status}</p>

          <div className="admin-actions">
            <button onClick={() => updateStatus(booking.id, "confirmed")}>
              ✅ Bevestigen
            </button>

            <button onClick={() => updateStatus(booking.id, "cancelled")}>
              ❌ Annuleren
            </button>

            <button onClick={() => deleteBooking(booking.id)}>
              🗑️ Verwijderen
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Admin;