import React from "react";

/* ─────────────────────────────────────
   RegistrationSummary Component
   Shows all registered events with
   attendee details, totals, and remove.
───────────────────────────────────── */
const RegistrationSummary = ({ registrations, onRemove }) => {
  const subtotal = registrations.reduce((sum, r) => sum + r.totalPrice, 0);
  const serviceFee = registrations.length > 0 ? Math.round(subtotal * 0.05) : 0;
  const grandTotal = subtotal + serviceFee;
  const totalTickets = registrations.reduce((sum, r) => sum + r.tickets, 0);

  return (
    <div className="glass-panel">
      <div className="panel-header">
        <div className="panel-title">
          <div
            className="panel-title-icon"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.2))",
            }}
          >
            🛒
          </div>
          My Registrations
          {registrations.length > 0 && (
            <span
              style={{
                marginLeft: "auto",
                padding: "3px 10px",
                background: "var(--gradient-brand)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "white",
              }}
            >
              {registrations.length}
            </span>
          )}
        </div>
        <p className="panel-subtitle">
          {registrations.length === 0
            ? "Your registered events will appear here"
            : `${registrations.length} event${
                registrations.length !== 1 ? "s" : ""
              } • ${totalTickets} ticket${totalTickets !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Registration Items */}
      <div className="panel-body" style={{ padding: "8px 24px" }}>
        {registrations.length === 0 ? (
          <div className="summary-empty">
            <div className="summary-empty-icon">🎫</div>
            <p className="summary-empty-text">
              Register for an event to see it here
            </p>
          </div>
        ) : (
          registrations.map((reg) => (
            <div key={reg.bookingId} className="summary-item">
              {/* Icon */}
              <div
                className="summary-item-icon"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                  fontSize: "1.2rem",
                }}
              >
                {reg.eventIcon}
              </div>

              {/* Info */}
              <div className="summary-item-info">
                <div className="summary-item-name">{reg.eventTitle}</div>
                <div className="summary-item-detail">
                  📅 {reg.eventDate}
                </div>
                <div className="summary-item-detail">
                  🎫 {reg.tickets}× {reg.ticketType} •{" "}
                  {reg.firstName} {reg.lastName}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      padding: "2px 7px",
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      borderRadius: "var(--radius-full)",
                      color: "var(--clr-accent-emerald)",
                      fontWeight: 600,
                    }}
                  >
                    ✓ Confirmed
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "var(--clr-text-muted)" }}>
                    {reg.bookingId}
                  </span>
                </div>
              </div>

              {/* Price & Remove */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "6px",
                }}
              >
                <span className="summary-item-price">
                  {reg.totalPrice === 0 ? (
                    <span style={{ color: "var(--clr-accent-emerald)", fontSize: "0.88rem" }}>
                      FREE
                    </span>
                  ) : (
                    `$${reg.totalPrice}`
                  )}
                </span>
                <button
                  className="summary-item-remove"
                  onClick={() => onRemove(reg.bookingId)}
                  title="Remove registration"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals Section */}
      {registrations.length > 0 && (
        <>
          <div className="summary-totals">
            <div className="totals-row">
              <span>
                Subtotal ({totalTickets} ticket
                {totalTickets !== 1 ? "s" : ""})
              </span>
              <span className="totals-amount">
                {subtotal === 0 ? "FREE" : `$${subtotal}`}
              </span>
            </div>
            {serviceFee > 0 && (
              <div className="totals-row">
                <span>Service fee (5%)</span>
                <span className="totals-amount">${serviceFee}</span>
              </div>
            )}
            <div className="totals-row total">
              <span>Total Due</span>
              <span className="totals-amount grand">
                {grandTotal === 0 ? "FREE" : `$${grandTotal}`}
              </span>
            </div>

            <button className="checkout-btn">
              🔒 Secure Checkout →
            </button>
          </div>

          {/* Security Note */}
          <div
            style={{
              padding: "10px 24px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--clr-text-muted)",
              fontSize: "0.75rem",
            }}
          >
            <span>🔐</span>
            <span>256-bit SSL encryption · Secure payment processing</span>
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrationSummary;
