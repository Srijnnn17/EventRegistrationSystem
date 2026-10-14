# 🌐 EventSphere — React Event Registration System

> **Live at:** `https://event-registration-system-pearl.vercel.app/`

---

## 📂 Project Architecture

```
event-registration-system/
├── index.html                    ← Entry HTML with Google Fonts
├── vite.config.js                ← Vite + React plugin
├── package.json
└── src/
    ├── main.jsx                  ← React root mount
    ├── App.jsx                   ← Root component (state orchestration)
    ├── index.css                 ← Full design system (600+ lines)
    ├── data/
    │   └── events.js             ← 6 events dataset
    └── components/
        ├── EventCard.jsx         ← Individual event card
        ├── EventList.jsx         ← Filter bar + event grid
        ├── RegistrationForm.jsx  ← Multi-step validated form
        └── RegistrationSummary.jsx ← Cart/booking summary
```

---

## 🧩 React Components (Assignment Requirements)

| Component | Role | Key Features |
|---|---|---|
| **EventList** | Grid of event cards with filtering | Category filter chips, count badge, responsive grid |
| **EventCard** | Single event display | Banner gradient, progress bar, tags, price, register CTA |
| **RegistrationForm** | Multi-step validated form | 2-step flow, real-time validation, ticket types, quantity |
| **RegistrationSummary** | Booking cart & totals | Dynamic totals, service fee, booking IDs, remove |

---

## ✅ MVP Requirements Satisfied

- [x] **Reusable Components** — EventList, EventCard, RegistrationForm, RegistrationSummary
- [x] **Event Registration Flow** — Select event → Fill form → Confirm
- [x] **Form Validation** — Field-level, real-time, on blur and submit
- [x] **Dynamic Registration Summary** — Updates live on every registration
- [x] **State Management** — React useState/useCallback in App.jsx
- [x] **User Feedback** — Toast notifications + Success modal with booking ID
- [x] **Remove Registrations** — Users can remove from summary

---

## 🎨 Design Features

- **Dark theme** with deep navy background (`#050812`)
- **Purple/indigo/pink gradients** across all interactive elements
- **Glassmorphism** on panels with backdrop-filter blur
- **Animated background orbs** for depth
- **Micro-animations** — card hover lift, button glow, spinner, modal pop
- **Typography** — Outfit + Inter from Google Fonts
- **Color-coded categories** — Technology, Design, Business, AI/ML, Arts
- **Capacity progress bars** with low-spot warning (turns red)
- **Premium scrollbar** with gradient thumb

---

## 📸 Screenshots

| View | Description |
|---|---|
| Hero + Event Grid | Full page with 6 event cards and filter bar |
| Step 1 — Personal Details | Name, email, phone, organization form |
| Step 2 — Ticket Selection | Standard/VIP/Group ticket picker + quantity |
| Success Modal | Booking confirmation with unique ID |
| Registration Summary | Cart with totals, service fee, checkout |

![Initial Full Page](file:///C:/Users/srija/.gemini/antigravity-ide/brain/688f2f78-e2eb-4413-bbde-6164adc5787e/initial_full_page_1791988622546.png)

![Step 1 Form](file:///C:/Users/srija/.gemini/antigravity-ide/brain/688f2f78-e2eb-4413-bbde-6164adc5787e/registration_form_panel_1791988647768.png)

![Step 2 Ticket Selection](file:///C:/Users/srija/.gemini/antigravity-ide/brain/688f2f78-e2eb-4413-bbde-6164adc5787e/ticket_selection_step_1791988743610.png)

---

## 🚀 How to Run

```bash
cd C:\Users\srija\.gemini\antigravity-ide\scratch\event-registration-system
npm run dev
# → http://localhost:5173
```
