import React from "react";

/* ─────────────────────────────────────
   EventCard Component
   Displays a single event with banner,
   metadata, price and register CTA.
───────────────────────────────────── */
const EventCard = ({ event, onSelect, isSelected, isRegistered, animationDelay = 0 }) => {
  const spotsPercent = Math.round(
    ((event.capacity - event.spotsLeft) / event.capacity) * 100
  );
  const isLow = event.spotsLeft < 50;
  const isFull = event.spotsLeft === 0;

  return (
    <div
      className={`event-card ${isSelected ? "selected" : ""}`}
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={() => !isFull && onSelect(event)}
    >
      {/* Gradient Banner */}
      <div className="card-banner">
        <div
          className="card-banner-gradient"
          style={{ background: event.bannerGradient }}
        >
          <span className="banner-icon">{event.icon}</span>
        </div>

        {/* Category Badge */}
        <span
          className="card-category-badge"
          style={{
            background: event.categoryColor,
            color: event.categoryTextColor,
            border: `1px solid ${event.categoryTextColor}40`,
          }}
        >
          {event.category}
        </span>

        {/* Spots Badge */}
        <span className={`card-spots-badge ${isLow ? "low" : ""}`}>
          {isFull
            ? "🚫 Full"
            : isLow
            ? `🔥 ${event.spotsLeft} left`
            : `${event.spotsLeft.toLocaleString()} spots`}
        </span>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <h3 className="card-title">{event.title}</h3>

        <div className="card-meta">
          <div className="card-meta-item">
            <div className="card-meta-icon">📅</div>
            <span>{event.date}</span>
          </div>
          <div className="card-meta-item">
            <div className="card-meta-icon">📍</div>
            <span>{event.location}</span>
          </div>
          <div className="card-meta-item">
            <div className="card-meta-icon">🎤</div>
            <span>{event.speaker}</span>
          </div>
        </div>

        <p className="card-description">{event.description}</p>

        {/* Capacity Progress */}
        <div style={{ marginBottom: "4px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.72rem",
              color: "var(--clr-text-muted)",
              marginBottom: "5px",
            }}
          >
            <span>{spotsPercent}% filled</span>
            <span>{event.capacity.toLocaleString()} capacity</span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{
                width: `${spotsPercent}%`,
                background:
                  isLow
                    ? "linear-gradient(90deg,#f43f5e,#fb7185)"
                    : "var(--gradient-brand)",
              }}
            />
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "12px" }}>
          {event.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "3px 9px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--clr-border)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.7rem",
                color: "var(--clr-text-muted)",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="card-footer">
        <div className="card-price">
          <span className="price-label">Price</span>
          <span className={`price-value ${event.price === 0 ? "free" : ""}`}>
            {event.price === 0 ? "FREE" : `$${event.price}`}
          </span>
        </div>

        <button
          className={`card-register-btn ${
            isRegistered ? "registered" : isFull ? "full" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isFull) onSelect(event);
          }}
          disabled={isFull}
        >
          {isRegistered
            ? "✓ Registered"
            : isFull
            ? "Event Full"
            : isSelected
            ? "✓ Selected"
            : "Register →"}
        </button>
      </div>

      {/* Animated border for selected */}
      {isSelected && <div className="selected-indicator" />}
    </div>
  );
};

export default EventCard;
