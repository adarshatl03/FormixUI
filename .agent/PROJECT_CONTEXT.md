# Dynamic Form Engine — Master Project Context (Full Spec)

This document consolidates **every locked decision, UX rule, and architectural constraint** discussed from the beginning of this chat. This is the **authoritative source of truth**.

---

## 1. Stack (Locked)

- Vite
- React + TypeScript
- Tailwind CSS 4.1 (CSS-config, token-based)
- **Custom Native UI Library** (Replaced Kendo React)
- **Themed Variant System** (Outline, Filled, Standard, Floating)
- **CLI Power Tools** (Custom package names, component tracking, update system)
- Frontend-only (no backend)
- Mocked APIs

---

## 2. Global UX Rules (Locked)

### 2.1 Labels

- Notched floating labels
- Half inside / half outside the input border
- Solid background behind label (border cut)
- Label never fully leaves the input
- Placeholder appears **only when focused**
- Label floats on focus OR when value exists
- Works consistently for **ALL inputs**, including Kendo components

---

### 2.2 Error Handling

- All inputs show an ⓘ icon on error
- Tooltip shows **on hover only** (not on focus)
- No layout shift
- Tooltip anchored to icon
- Works with all inputs, including Kendo

---

### 2.3 Adornments

- All inputs support adornments
- Left icon / text
- Right icon / text
- Padding auto-adjusts based on adornment width
- Caret never overlaps adornments
- Label and notch reposition based on adornments
- Works with all inputs including Kendo

---

### 2.4 Grid Layout

- 12-column grid system
- Auto-flow
- Row height auto
- Field-level colSpan
- Responsive support
- Token-based spacing

---

### 2.5 Autocomplete & Select

- Static or async
- Unified API: `registers(apiKey, typedValue)`
- Supports single-select & multi-select
- Searchable
- Debounced
- Caching
- Keyboard navigable

---

### 2.6 Chips (Multi-select)

- Default: wrap to next line
- Optional: collapse mode
- +N more opens a **dropdown**
- Dropdown is scrollable
- Items removable
- Click outside closes

---

### 2.7 Kendo Integration

- Real Kendo React components
- Tailwind-styled override
- No Kendo visual UI leakage
- Custom calendar/clock/datetime icons
- Overlay popup (not inline)
- Close on select
- Close on outside click
- Close on Escape

---

### 2.8 Date & Time Rules

- Time includes seconds
- Week numbers OFF by default
- Locale configurable (not auto-detected)
- Date range = combined single field
- Min/max supported
- Disabled dates supported
- Step configuration supported

---

### 2.9 Toggle Switch

- Keyboard accessible
- Label compatible
- Error compatible
- Grid compatible

---

### 2.10 Theming

- Token-based theming
- Light + Dark
- Configurable
- Theme switcher included

---

### 2.11 Data Rules

- Select stores IDs only
- Multi-select stores array of IDs
- Dates stored as ISO
- Time stored as HH:mm:ss
- DateTime stored as ISO

---

### 2.12 Automation & Status (Locked)

- **README Automation**: `README.md` must be thoroughly regenerated on every release (git tag).
- **Status Tracking**: Project status (Completion %, Task Counts) is derived from `.agent/dev_plan/DEVELOPMENT_TASKS.md`.
- **Dashboard**: Both `README.md` and `Home.tsx` must display:
  - Completion %
  - Completed/Ongoing/Upcoming feature lists
  - Current Version

---

### 2.13 Coding Standards (Strict)

- **Semantic HTML**: UI must use semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<dialog>`, etc.) instead of generic `div` soup.
- **No External UI**: Do not install external UI libraries (e.g., MUI, AntD). Build everything from scratch using standard HTML elements + Tailwind.
- **Unique Identifiers**: Every interactive element/component must have a unique `id` and a consistently named `className` to support future CSS overrides.

---

## 3. Schema Driven (Locked)

All UI is generated from JSON schema.

Schema supports:

- Default values
- Validation
- Layout
- Dependencies
- Async data
- Visibility rules

---

## 4. Form Builder (Frontend Only)

- Field palette
- Property editor
- Default value editor
- Grid editor
- Live preview
- Schema export/import

---

## 5. Non-goals

- No backend
- No server-side validation
- No other CSS frameworks

---

## 6. Change Policy

If this file changes:

- TODO list must be regenerated
- Code must be refactored accordingly
- Assumptions reset

---

## 7. Delivery Model

- Phase-based ZIP releases
- No stubs for complex phases
- No half-working features
- Stability over speed

---

## 8. Agent Workflow & Documentation Governance (Required)

### 8.1 Proactive Rule Updates

- If a new rule, architectural constraint, or recurring task is identified during conversation:
  - **IMMEDIATE ACTION**: Update the corresponding file in `.agent` (e.g., `PROJECT_CONTEXT.md`) or `.agent/dev_plan` (e.g., `AGENT_RULES.md`, `DEVELOPMENT_TASKS.md`).
  - Do NOT wait for specific user instruction to save these "meta-rules".

### 8.2 Documentation Timing

- **Feature Plans (.agent/dev_plan)**: Update _before/during_ implementation.
- **Developer Manuals (.agent/developer_manual)**: Update _after_ feature implementation is fully declared complete. Avoid premature documentation of half-baked features.

### 8.3 Source of Truth

- **clarification**: Always refer to the `.agent` folder structure for answers.
- **conflicts**: If user instructions conflict with `PROJECT_CONTEXT.md`, ask for verification (unless it's an explicit override).

### 8.4 Self-Correction

- The agent must verify that its actions align with `AGENT_RULES.md` before finalizing a turn.

End of Master Context
