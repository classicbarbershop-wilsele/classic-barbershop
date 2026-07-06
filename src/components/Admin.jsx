import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
    const confirmDelete = window.confirm(
      t("admin.deleteConfirm", "Weet je zeker dat je deze afspraak wilt verwijderen?")
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "bookings", id));
    setBookings(bookings.filter((booking) => booking.id !== id));
  }

  function statusLabel(status) {
    if (status === "confirmed") return t("admin.confirmed", "Confirmed");
    if (status === "cancelled") return t("admin.cancelled", "Cancelled");
    return t("admin.pending", "Pending");
  }

  if (!isLoggedIn) {
    return (
      <section className="booking">
        <h2>{t("admin.login")}</h2>

        <div className="booking-form">
          <input
            type="password"
            placeholder={t("admin.password", "Wachtwoord")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => {
              if (password === "classic-barbershop") {
                setIsLoggedIn(true);
                setPassword("");
              } else {
                alert(t("admin.wrongPassword", "Verkeerd wachtwoord"));
              }
            }}
          >
            {t("admin.signIn", "Inloggen")}
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
    .filter((booking) => booking.date === today && booking.status === "confirmed")
    .reduce((total, booking) => total + Number(booking.price || 0), 0);

  const filteredBookings = bookings.filter((booking) => {
    const text = `${booking.name} ${booking.phone} ${booking.email} ${booking.branch} ${booking.service}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesDate = dateFilter === "" || booking.date === dateFilter;
    const matchesBranch = branchFilter === "all" || booking.branch === branchFilter;

    return matchesSearch && matchesStatus && matchesDate && matchesBranch;
  });

  return (
    <section className="booking">
      <h2>{t("admin.title", "Admin - Afspraken")}</h2>

      <button
        className="back-btn"
        onClick={() => {
          setIsLoggedIn(false);
          setPassword("");
        }}
      >
        {t("admin.logout", "Uitloggen")}
      </button>

      <div className="admin-stats">
        <div>
          <h3>{todayBookings}</h3>
          <p>{t("admin.today", "Vandaag")}</p>
        </div>

        <div>
          <h3>{pendingBookings}</h3>
          <p>{t("admin.pending", "Pending")}</p>
        </div>

        <div>
          <h3>{confirmedBookings}</h3>
          <p>{t("admin.confirmed", "Confirmed")}</p>
        </div>

        <div>
          <h3>{cancelledBookings}</h3>
          <p>{t("admin.cancelled", "Cancelled")}</p>
        </div>

        <div>
          <h3>€{todayRevenue}</h3>
          <p>{t("admin.todayRevenue", "Omzet vandaag")}</p>
        </div>
      </div>

      <div className="admin-filters">
        <button onClick={() => setStatusFilter("all")}>{t("admin.all", "All")}</button>
        <button onClick={() => setStatusFilter("pending")}>{t("admin.pending", "Pending")}</button>
        <button onClick={() => setStatusFilter("confirmed")}>{t("admin.confirmed", "Confirmed")}</button>
        <button onClick={() => setStatusFilter("cancelled")}>{t("admin.cancelled", "Cancelled")}</button>
      </div>

      <div className="admin-filters">
        <button onClick={() => setBranchFilter("all")}>
          {t("admin.allBranches", "Alle vestigingen")}
        </button>
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
        {t("admin.allDates", "Alle datums")}
      </button>

      <input
        className="admin-search"
        type="text"
        placeholder={t("admin.searchPlaceholder", "Zoek op naam, telefoon, e-mail, vestiging...")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>
        {filteredBookings.length}{" "}
        {t("admin.found", "afspraak/afspraken gevonden.")}
      </p>

      {filteredBookings.length === 0 && (
        <p>{t("admin.noBookings", "Geen afspraken gevonden.")}</p>
      )}

      {filteredBookings.map((booking) => (
        <div className="booking-summary" key={booking.id}>
          <p><strong>{t("admin.branch", "Vestiging")}:</strong> {booking.branch}</p>
          <p><strong>{t("admin.service", "Dienst")}:</strong> {booking.service}</p>
          <p><strong>{t("admin.price", "Prijs")}:</strong> €{booking.price}</p>
          <p><strong>{t("admin.name", "Naam")}:</strong> {booking.name}</p>
          <p><strong>{t("admin.phone", "Telefoon")}:</strong> {booking.phone}</p>
          <p><strong>{t("admin.email", "E-mail")}:</strong> {booking.email}</p>
          <p><strong>{t("admin.date", "Datum")}:</strong> {booking.date}</p>
          <p><strong>{t("admin.time", "Tijd")}:</strong> {booking.time}</p>

          <p>
            <strong>{t("admin.status", "Status")}:</strong>{" "}
            <span className={`status-badge ${booking.status}`}>
              {statusLabel(booking.status)}
            </span>
          </p>

          <div className="admin-actions">
            <button onClick={() => updateStatus(booking.id, "confirmed")}>
              ✅ {t("admin.confirm", "Bevestigen")}
            </button>

            <button onClick={() => updateStatus(booking.id, "cancelled")}>
              ❌ {t("admin.cancel", "Annuleren")}
            </button>

            <button onClick={() => deleteBooking(booking.id)}>
              🗑️ {t("admin.delete", "Verwijderen")}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Admin;