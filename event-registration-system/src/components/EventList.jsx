import React from "react";
import EventCard from "./EventCard";
import { CATEGORIES } from "../data/events";

/* ─────────────────────────────────────
   EventList Component
   Renders the filter bar + grid of EventCards.
   Handles category filtering.
───────────────────────────────────── */
const EventList = ({
  events,
  selectedEvent,
  registrations,
  onSelectEvent,
  activeFilter,
  onFilterChange,
}) => {
  const filteredEvents =
    activeFilter === "All"
      ? events
      : events.filter((e) => e.category === activeFilter);

  return (
    <section>
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">
          Upcoming <span>Events</span>
        </h2>
        <div className="section-count">
          <span>🗓</span>
          <span>
            {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${activeFilter === cat ? "active" : ""}`}
            onClick={() => onFilterChange(cat)}
          >
            {cat === "All" && "✦ "}
            {cat}
          </button>
        ))}
      </div>

      {/* Event Grid */}
      {filteredEvents.length > 0 ? (
        <div className="event-list">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={onSelectEvent}
              isSelected={selectedEvent?.id === event.id}
              isRegistered={registrations.some((r) => r.eventId === event.id)}
              animationDelay={index * 80}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--clr-text-muted)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🔍</div>
          <p>No events in this category.</p>
        </div>
      )}
    </section>
  );
};

export default EventList;
