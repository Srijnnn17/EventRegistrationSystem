import React, { useState, useCallback } from "react";
import EventList from "./components/EventList";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationSummary from "./components/RegistrationSummary";
import { EVENTS_DATA } from "./data/events";

/* ─────────────────────────────────────
   Toast Component
───────────────────────────────────── */
const Toast = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map((t) => (
      <div key={t.id} className={`toast ${t.type}`}>
        <span className="toast-icon">{t.icon}</span>
        <span>{t.message}</span>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────
   Success Modal
───────────────────────────────────── */
const SuccessModal = ({ registration, onClose }) => {
  if (!registration) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-confetti-header" />
        <div className="modal-body">
          <div className="success-icon-wrapper">🎉</div>
          <h2 className="modal-title">You're In!</h2>
          <p className="modal-subtitle">
            Your registration is confirmed. We've sent a confirmation to{" "}
            <strong>{registration.email}</strong>
          </p>

          <div className="modal-event-info">
            <div className="modal-event-title">
              {registration.eventIcon} {registration.eventTitle}
            </div>
            <div className="modal-event-meta">
              <span>📅 {registration.eventDate}</span>
              <span>📍 {registration.eventLocation}</span>
              <span>
                🎫 {registration.tickets}x {registration.ticketType} ticket
                {registration.tickets > 1 ? "s" : ""}
              </span>
              <span>
                💰{" "}
                {registration.totalPrice === 0
                  ? "FREE"
                  : `$${registration.totalPrice} paid`}
              </span>
            </div>
          </div>

          <div className="booking-id">
            <span>🔖</span>
            <span>Booking ID: {registration.bookingId}</span>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            Continue Browsing Events
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   App Root Component
───────────────────────────────────── */
export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [toasts, setToasts] = useState([]);
  const [successModal, setSuccessModal] = useState(null);
  const [activePanel, setActivePanel] = useState("form"); // 'form' | 'summary'

  /* ── Toast helper ── */
  const showToast = useCallback((message, type = "info", icon = "ℹ️") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  /* ── Select Event ── */
  const handleSelectEvent = useCallback(
    (event) => {
      const alreadyRegistered = registrations.some((r) => r.eventId === event.id);
      if (alreadyRegistered) {
        showToast(`You're already registered for ${event.title}!`, "info", "🎫");
      }
      setSelectedEvent(event);
      setActivePanel("form");
    },
    [registrations, showToast]
  );

  /* ── Register ── */
  const handleRegister = useCallback(
    (registrationData) => {
      setRegistrations((prev) => [...prev, registrationData]);
      setSuccessModal(registrationData);
      setSelectedEvent(null);
      showToast(
        `Successfully registered for ${registrationData.eventTitle}!`,
        "success",
        "🎉"
      );
      setActivePanel("summary");
    },
    [showToast]
  );

  /* ── Remove Registration ── */
  const handleRemove = useCallback(
    (bookingId) => {
      const reg = registrations.find((r) => r.bookingId === bookingId);
      setRegistrations((prev) => prev.filter((r) => r.bookingId !== bookingId));
      if (reg) {
        showToast(`Removed registration for ${reg.eventTitle}`, "error", "🗑️");
      }
    },
    [registrations, showToast]
  );

  const totalRegistrations = registrations.length;
  const totalSpent = registrations.reduce((sum, r) => sum + r.totalPrice, 0);

  return (
    <>
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      <div className="app-container">
        {/* ── Header ── */}
        <header className="app-header">
          <div className="header-logo">
            <div className="logo-icon">🌐</div>
            <span className="logo-text">EventSphere</span>
          </div>

          <nav className="header-nav">
            <button className="nav-pill active">Events</button>
            <button className="nav-pill">Schedule</button>
            <button className="nav-pill">Speakers</button>
          </nav>

          <div className="header-badge">
            <div className="badge-dot" />
            <span>
              {totalRegistrations > 0
                ? `${totalRegistrations} Registered`
                : "Live Events"}
            </span>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="hero-section">
          <div className="hero-badge">
            <span>✦</span> Premium Event Experience Platform
          </div>
          <h1 className="hero-title">
            Discover & Register for
            <br />
            <span className="gradient-text">World-Class Events</span>
          </h1>
          <p className="hero-subtitle">
            From tech summits to creative festivals — find your next unforgettable
            experience and secure your spot in seconds.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">{EVENTS_DATA.length}</div>
              <div className="stat-label">Live Events</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">50K+</div>
              <div className="stat-label">Attendees</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{totalRegistrations}</div>
              <div className="stat-label">Your Registrations</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {totalSpent === 0 ? "$0" : `$${totalSpent.toLocaleString()}`}
              </div>
              <div className="stat-label">Total Spent</div>
            </div>
          </div>
        </section>

        {/* ── Main Content ── */}
        <main className="main-layout">
          {/* Left: EventList */}
          <EventList
            events={EVENTS_DATA}
            selectedEvent={selectedEvent}
            registrations={registrations}
            onSelectEvent={handleSelectEvent}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Right: Form + Summary */}
          <aside className="right-panel">
            {/* Mobile Tab Switcher */}
            <div
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--clr-border)",
                borderRadius: "var(--radius-full)",
                padding: "4px",
                gap: "4px",
              }}
            >
              {[
                { id: "form", label: "📝 Register" },
                { id: "summary", label: `🛒 Cart (${registrations.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id)}
                  style={{
                    flex: 1,
                    padding: "9px",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    background:
                      activePanel === tab.id
                        ? "var(--gradient-brand)"
                        : "transparent",
                    color:
                      activePanel === tab.id
                        ? "white"
                        : "var(--clr-text-secondary)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "var(--transition-fast)",
                    fontFamily: "var(--font-primary)",
                    boxShadow:
                      activePanel === tab.id
                        ? "0 4px 14px rgba(99,102,241,0.35)"
                        : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activePanel === "form" ? (
              <RegistrationForm
                selectedEvent={selectedEvent}
                onRegister={handleRegister}
                existingRegistrations={registrations}
              />
            ) : (
              <RegistrationSummary
                registrations={registrations}
                onRemove={handleRemove}
              />
            )}

            {/* Quick tip card */}
            {activePanel === "form" && !selectedEvent && (
              <div
                style={{
                  padding: "16px",
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>💡</span>
                <div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--clr-text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    How it works
                  </p>
                  <p
                    style={{
                      fontSize: "0.77rem",
                      color: "var(--clr-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    1. Browse events and click <strong style={{ color: "var(--clr-text-secondary)" }}>Register →</strong> on any card
                    <br />
                    2. Fill in your details and choose your ticket type
                    <br />
                    3. Complete registration and get your booking ID
                  </p>
                </div>
              </div>
            )}
          </aside>
        </main>
      </div>

      {/* ── Success Modal ── */}
      {successModal && (
        <SuccessModal
          registration={successModal}
          onClose={() => setSuccessModal(null)}
        />
      )}

      {/* ── Toast Notifications ── */}
      <Toast toasts={toasts} />
    </>
  );
}
