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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    setBookings(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  }

  async function updateStatus(id, status) {
    await updateDoc(doc(db, "bookings", id), { status });

    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  }

  async function deleteBooking(id) {
    const confirmDelete = window.confirm("Weet je zeker dat je deze afspraak wilt verwijderen?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "bookings", id));
    setBookings(bookings.filter((booking) => booking.id !== id));
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

  const today = new Date().toISOString().split("T")[0];

  const todayBookings = bookings.filter((booking) => booking.date === today).length;
  const pendingBookings = bookings.filter((booking) => booking.status === "pending").length;
  const confirmedBookings = bookings.filter((booking) => booking.status === "confirmed").length;
  const cancelledBookings = bookings.filter((booking) => booking.status === "cancelled").length;

  const todayRevenue = bookings
    .filter((booking) => booking.date === today && booking.status !== "cancelled")
    .reduce((total, booking) => total + Number(booking.price || 0), 0);

  const filteredBookings = bookings.filter((booking) => {
    const text =
      `${booking.name} ${booking.phone} ${booking.email} ${booking.branch} ${booking.service}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesDate = dateFilter === "" || booking.date === dateFilter;
    const matchesBranch = branchFilter === "all" || booking.branch === branchFilter;

    return matchesSearch && matchesStatus && matchesDate && matchesBranch;
  });

  return (
    <section className="booking">
      <h2>Admin - Afspraken</h2>

      <div className="admin-stats">
        <div>
          <h3>{todayBookings}</h3>
          <p>Vandaag</p>
        </div>

        <div>
          <h3>{pendingBookings}</h3>
          <p>Pending</p>
        </div>

        <div>
          <h3>{confirmedBookings}</h3>
          <p>Confirmed</p>
        </div>

        <div>
          <h3>{cancelledBookings}</h3>
          <p>Cancelled</p>
        </div>

        <div>
          <h3>€{todayRevenue}</h3>
          <p>Omzet vandaag</p>
        </div>
      </div>

      <div className="admin-filters">
        <button onClick={() => setStatusFilter("all")}>All</button>
        <button onClick={() => setStatusFilter("pending")}>Pending</button>
        <button onClick={() => setStatusFilter("confirmed")}>Confirmed</button>
        <button onClick={() => setStatusFilter("cancelled")}>Cancelled</button>
      </div>

      <div className="admin-filters">
        <button onClick={() => setBranchFilter("all")}>Alle vestigingen</button>
        <button onClick={() => setBranchFilter("Haacht")}>Haacht</button>
        <button onClick={() => setBranchFilter("Wilsele")}>Wilsele</button>
      </div>

      <input
        className="admin-search"
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <button className="back-btn" onClick={() => setDateFilter("")}>
        Alle datums
      </button>

      <input
        className="admin-search"
        type="text"
        placeholder="Zoek op naam, telefoon, e-mail, vestiging..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredBookings.length === 0 && (
        <p>Geen afspraken gevonden.</p>
      )}

      {filteredBookings.map((booking) => (
        <div className="booking-summary" key={booking.id}>
          <p><strong>Vestiging:</strong> {booking.branch}</p>
          <p><strong>Dienst:</strong> {booking.service}</p>
          <p><strong>Prijs:</strong> €{booking.price}</p>
          <p><strong>Naam:</strong> {booking.name}</p>
          <p><strong>Telefoon:</strong> {booking.phone}</p>
          <p><strong>E-mail:</strong> {booking.email}</p>
          <p><strong>Datum:</strong> {booking.date}</p>
          <p><strong>Tijd:</strong> {booking.time}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge ${booking.status}`}>
              {booking.status}
            </span>
          </p>

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