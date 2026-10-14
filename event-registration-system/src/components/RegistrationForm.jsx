import React, { useState, useEffect } from "react";

/* ─────────────────────────────────────
   RegistrationForm Component
   Full validated form with field-level
   errors, ticket count, and submission.
───────────────────────────────────── */

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  ticketType: "standard",
  tickets: 1,
  dietaryPreference: "",
  agreeTerms: false,
  newsletter: false,
};

const RegistrationForm = ({ selectedEvent, onRegister, existingRegistrations }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // multi-step form

  // Reset form when event changes
  useEffect(() => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setStep(1);
  }, [selectedEvent?.id]);

  const isAlreadyRegistered = selectedEvent
    ? existingRegistrations.some((r) => r.eventId === selectedEvent.id)
    : false;

  // ── Validation ──
  const validate = (data, stepNum = step) => {
    const errs = {};
    if (stepNum >= 1) {
      if (!data.firstName.trim()) errs.firstName = "First name is required";
      else if (data.firstName.trim().length < 2)
        errs.firstName = "Must be at least 2 characters";

      if (!data.lastName.trim()) errs.lastName = "Last name is required";

      if (!data.email.trim()) errs.email = "Email address is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errs.email = "Please enter a valid email";

      if (data.phone && !/^[\+]?[\d\s\-\(\)]{7,15}$/.test(data.phone))
        errs.phone = "Enter a valid phone number";
    }
    if (stepNum >= 2) {
      if (!data.ticketType) errs.ticketType = "Please select a ticket type";
      if (!data.agreeTerms) errs.agreeTerms = "You must agree to the terms";
    }
    return errs;
  };

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const errs = validate(updated);
      setErrors(errs);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors(errs);
  };

  const getFieldState = (field) => {
    if (!touched[field]) return "";
    return errors[field] ? "error" : "success";
  };

  const ticketPrices = {
    standard: selectedEvent?.price || 0,
    vip: selectedEvent ? Math.round(selectedEvent.price * 2.2) : 0,
    group: selectedEvent ? Math.round(selectedEvent.price * 0.75) : 0,
  };

  const totalPrice = ticketPrices[form.ticketType] * form.tickets;

  const handleNextStep = () => {
    const allStep1Touched = {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    };
    setTouched((prev) => ({ ...prev, ...allStep1Touched }));
    const errs = validate(form, 1);
    setErrors(errs);
    const step1Fields = ["firstName", "lastName", "email", "phone"];
    const hasStep1Errors = step1Fields.some((f) => errs[f]);
    if (!hasStep1Errors) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    );
    setTouched(allTouched);
    const errs = validate(form, 2);
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1600));
    setIsLoading(false);

    onRegister({
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      eventLocation: selectedEvent.location,
      eventIcon: selectedEvent.icon,
      eventPrice: selectedEvent.price,
      ...form,
      ticketPrice: ticketPrices[form.ticketType],
      totalPrice,
      bookingId: `EVT-${Date.now().toString(36).toUpperCase()}`,
      registeredAt: new Date().toLocaleString(),
    });
  };

  if (!selectedEvent) {
    return (
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <div
              className="panel-title-icon"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
              }}
            >
              📝
            </div>
            Registration Form
          </div>
          <p className="panel-subtitle">Fill in your details to secure your spot</p>
        </div>
        <div className="panel-body">
          <div className="no-event-prompt">
            <div className="no-event-prompt-icon">👈</div>
            <p className="no-event-prompt-text">
              Select an event from the list to begin your registration
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAlreadyRegistered) {
    return (
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <div
              className="panel-title-icon"
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.2))" }}
            >
              ✅
            </div>
            Already Registered
          </div>
        </div>
        <div className="panel-body" style={{ textAlign: "center", padding: "30px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "14px" }}>🎉</div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
            You're registered for
          </h3>
          <p
            style={{
              color: "var(--clr-accent-purple)",
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: "12px",
            }}
          >
            {selectedEvent.title}
          </p>
          <p
            style={{ fontSize: "0.85rem", color: "var(--clr-text-muted)" }}
          >
            Check your email for confirmation details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <div className="panel-header">
        <div className="panel-title">
          <div
            className="panel-title-icon"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
            }}
          >
            📝
          </div>
          Registration Form
        </div>
        <p className="panel-subtitle">
          Step {step} of 2 — {step === 1 ? "Personal Details" : "Ticket & Preferences"}
        </p>
        {/* Step Progress */}
        <div className="progress-bar-container" style={{ marginTop: "10px" }}>
          <div
            className="progress-bar-fill"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <div className="panel-body">
        {/* Selected Event Preview */}
        <div className="form-event-preview">
          <div
            className="form-event-icon"
            style={{ background: selectedEvent.bannerGradient }}
          >
            {selectedEvent.icon}
          </div>
          <div className="form-event-info">
            <div className="event-name">{selectedEvent.title}</div>
            <div className="event-date">
              {selectedEvent.date} • {selectedEvent.location}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* ── STEP 1: Personal Details ── */}
          {step === 1 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {/* First Name */}
                <div className="form-group">
                  <label className="form-label">
                    First Name <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      className={`form-input ${getFieldState("firstName")}`}
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      onBlur={() => handleBlur("firstName")}
                    />
                  </div>
                  {touched.firstName && errors.firstName && (
                    <p className="field-error">⚠ {errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label className="form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      className={`form-input ${getFieldState("lastName")}`}
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      onBlur={() => handleBlur("lastName")}
                    />
                  </div>
                  {touched.lastName && errors.lastName && (
                    <p className="field-error">⚠ {errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    className={`form-input ${getFieldState("email")}`}
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="field-error">⚠ {errors.email}</p>
                )}
                {touched.email && !errors.email && form.email && (
                  <p style={{ fontSize: "0.75rem", color: "var(--clr-accent-emerald)", marginTop: "5px" }}>
                    ✓ Confirmation will be sent here
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-wrapper">
                  <span className="input-icon">📱</span>
                  <input
                    type="tel"
                    className={`form-input ${getFieldState("phone")}`}
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="field-error">⚠ {errors.phone}</p>
                )}
                <p className="field-hint">Optional — for event reminders</p>
              </div>

              {/* Organization */}
              <div className="form-group">
                <label className="form-label">Organization / Company</label>
                <div className="input-wrapper">
                  <span className="input-icon">🏢</span>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your company name"
                    value={form.organization}
                    onChange={(e) => handleChange("organization", e.target.value)}
                  />
                </div>
              </div>

              <button
                type="button"
                className="submit-btn"
                onClick={handleNextStep}
              >
                Continue to Tickets →
              </button>
            </>
          )}

          {/* ── STEP 2: Ticket & Preferences ── */}
          {step === 2 && (
            <>
              {/* Ticket Type */}
              <div className="form-group">
                <label className="form-label">
                  Ticket Type <span className="required">*</span>
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    {
                      id: "standard",
                      label: "Standard",
                      desc: "General admission",
                      icon: "🎫",
                      price: ticketPrices.standard,
                    },
                    {
                      id: "vip",
                      label: "VIP",
                      desc: "Priority seating + exclusive networking",
                      icon: "⭐",
                      price: ticketPrices.vip,
                    },
                    {
                      id: "group",
                      label: "Group (25% off)",
                      desc: "Best value for teams",
                      icon: "👥",
                      price: ticketPrices.group,
                    },
                  ].map((type) => (
                    <div
                      key={type.id}
                      onClick={() => handleChange("ticketType", type.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        background:
                          form.ticketType === type.id
                            ? "rgba(99,102,241,0.1)"
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${
                          form.ticketType === type.id
                            ? "rgba(139,92,246,0.5)"
                            : "var(--clr-border)"
                        }`,
                        borderRadius: "var(--radius-md)",
                        cursor: "pointer",
                        transition: "var(--transition-fast)",
                      }}
                    >
                      <span style={{ fontSize: "1.4rem" }}>{type.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: "0.88rem",
                            fontWeight: 700,
                            color: "var(--clr-text-primary)",
                          }}
                        >
                          {type.label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--clr-text-muted)",
                          }}
                        >
                          {type.desc}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 800,
                          color:
                            type.price === 0
                              ? "var(--clr-accent-emerald)"
                              : "var(--clr-accent-purple)",
                        }}
                      >
                        {type.price === 0 ? "FREE" : `$${type.price}`}
                      </div>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border:
                            form.ticketType === type.id
                              ? "none"
                              : "2px solid var(--clr-border)",
                          background:
                            form.ticketType === type.id
                              ? "var(--gradient-brand)"
                              : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          flexShrink: 0,
                        }}
                      >
                        {form.ticketType === type.id && "✓"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Number of Tickets */}
              <div className="form-group">
                <label className="form-label">Number of Tickets</label>
                <div className="ticket-control">
                  <button
                    type="button"
                    className="ticket-btn"
                    onClick={() => handleChange("tickets", Math.max(1, form.tickets - 1))}
                    disabled={form.tickets <= 1}
                  >
                    −
                  </button>
                  <div className="ticket-value">{form.tickets}</div>
                  <button
                    type="button"
                    className="ticket-btn"
                    onClick={() =>
                      handleChange(
                        "tickets",
                        Math.min(10, form.tickets + 1)
                      )
                    }
                    disabled={form.tickets >= 10}
                  >
                    +
                  </button>
                </div>
                <p className="field-hint">Maximum 10 tickets per registration</p>
              </div>

              {/* Dietary Preference */}
              <div className="form-group">
                <label className="form-label">Dietary Preference</label>
                <div className="input-wrapper">
                  <span className="input-icon">🍽️</span>
                  <select
                    className="form-select"
                    value={form.dietaryPreference}
                    onChange={(e) =>
                      handleChange("dietaryPreference", e.target.value)
                    }
                  >
                    <option value="">No preference</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="halal">Halal</option>
                    <option value="kosher">Kosher</option>
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
              </div>

              {/* Price Summary */}
              <div
                style={{
                  padding: "14px",
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.83rem",
                    color: "var(--clr-text-secondary)",
                    marginBottom: "6px",
                  }}
                >
                  <span>
                    {form.tickets}x{" "}
                    {form.ticketType.charAt(0).toUpperCase() +
                      form.ticketType.slice(1)}{" "}
                    Ticket
                  </span>
                  <span>
                    ${ticketPrices[form.ticketType]} × {form.tickets}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                  }}
                >
                  <span>Total</span>
                  <span
                    style={{
                      background: "var(--gradient-brand)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {totalPrice === 0 ? "FREE" : `$${totalPrice}`}
                  </span>
                </div>
              </div>

              {/* Newsletter */}
              <div
                className="checkbox-group"
                onClick={() => handleChange("newsletter", !form.newsletter)}
                style={{ marginBottom: "10px" }}
              >
                <div className={`custom-checkbox ${form.newsletter ? "checked" : ""}`}>
                  {form.newsletter && (
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  )}
                </div>
                <label className="checkbox-label">
                  Keep me updated about future events and announcements
                </label>
              </div>

              {/* Terms */}
              <div
                className="checkbox-group"
                onClick={() => handleChange("agreeTerms", !form.agreeTerms)}
              >
                <div className={`custom-checkbox ${form.agreeTerms ? "checked" : ""}`}>
                  {form.agreeTerms && (
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  )}
                </div>
                <label className="checkbox-label">
                  I agree to the{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </a>
                  <span className="required"> *</span>
                </label>
              </div>
              {touched.agreeTerms && errors.agreeTerms && (
                <p className="field-error" style={{ marginTop: "6px" }}>
                  ⚠ {errors.agreeTerms}
                </p>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    padding: "13px 20px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--clr-border)",
                    background: "transparent",
                    color: "var(--clr-text-secondary)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-primary)",
                    transition: "var(--transition-fast)",
                    whiteSpace: "nowrap",
                  }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className={`submit-btn ${isLoading ? "loading" : ""}`}
                  style={{ margin: 0, flex: 1 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner" />
                      Processing...
                    </>
                  ) : (
                    <>🎫 Complete Registration</>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
