# Ecosystem Expansion Plan & Placeholder Reservation

This document outlines the strategy for expanding the `formstack-ui` ecosystem and ensuring modular compatibility.

> **⚠️ Naming Consideration**: "Formstack" is a registered trademark of Formstack, LLC. While `formstack-ui` is currently used, consider that building a large ecosystem around this name carries some risk of trademark dispute. If you proceed, ensure differentiation or consider a distinct brand name if the project grows significantly.

## 🎯 Objective

Reserve strategic package names to prevent squatting and ensure a cohesive future ecosystem for `formstack-ui`.

## 📦 Placeholder Packages to Reserve

We should reserve the following package names immediately to ensure future modules can be officially supported.

### Primary Scope (Preferred: `@formstack-ui/*`)

If we can secure the `@formstack-ui` organization on NPM (Recommended):

- [x] **`@formstack-ui/core`**
  - _Purpose_: The headless logic engine (hooks only, no UI). Allows users to bring their own UI library while using our form logic.
- [x] **`@formstack-ui/charts`**
  - _Purpose_: Data visualization components (Bar, Line, Pie) that integrate with form data.
- [x] **`@formstack-ui/tables`**
  - _Purpose_: Enterprise-grade data grids with sorting, filtering, and mass actions.
- [x] **`@formstack-ui/auth`**
  - _Purpose_: Pre-built login/register/forgot-password templates and validation logic.
- [x] **`@formstack-ui/editor`**
  - _Purpose_: The visual drag-and-drop builder exported as a standalone component for integration into other admin panels.
- [x] **`@formstack-ui/cli`**
  - _Purpose_: Dedicated package for the CLI to keep the main package lighter.
- [x] **`@formstack-ui/native`**
  - _Purpose_: React Native support.

### Flat Names (Alternative)

If the organization scope is not desired:

- [ ] `formstack-charts`
- [ ] `formstack-tables`
- [ ] `formstack-ui-react-native`

## 🔄 Phasability & Compatibility Strategy

To ensure these future packages work seamlessly with the main package:

### Phase 1: Reservation (Immediate)

1.  **Create NPM Organization**: Attempt to create `formstack-ui` org on NPM.
2.  **Publish Placeholders**: Create minimal `package.json` files for each package and publish `0.0.0-placeholder` versions.
    - _Note_: Placeholders should just contain a README explaining "Coming Soon - Part of FormStack UI".

### Phase 3: The "Facade" Architecture (Recommended)

**Do NOT unpublish `formstack-ui`.**

The strongest architectural pattern for popular libraries (like `vite`, `remix`, or `material-ui`) is to keep the short, unscoped name as the primary entry point.

1.  **`formstack-ui` (The Wrapper)**:
    - The "easy button" for most users.
    - It will simply re-export everything from your scoped packages.
    - Users install: `npm install formstack-ui` (Simple).
2.  **`@formstack-ui/core` (The Engine)**:
    - Contains the actual logic.
    - Advanced users can install just this if they want a smaller bundle without your default UI.
3.  **`@formstack-ui/charts` (Add-ons)**:
    - Optional extras that don't bloat the main package.

**Benefits:**

- You keep the premium "short name" on NPM.
- You don't break existing installs.
- You gain modularity without forcing complex import paths on beginners.

### ⚠️ Housekeeping: Fix Publisher Name

Currently, `formstack-ui` shows **your personal account** as the publisher. To show the organization `formstack-ui` as the publisher:

1.  **Go to NPM Website**: Navigate to your `formstack-ui` package page.
2.  **Settings**: Click **Settings**.
3.  **Manage Access**: Look for "Invite Maintainers" or "Access".
4.  **Invite Organization**:
    - Invite `formstack-ui` (the organization user).
    - Grant **Read/Write** or **Admin** access.
5.  _(Optional)_ Remove yourself: Once the org is added, you can technically remove your personal account, but it's safer to keep both.

Alternatively, via CLI:

```bash
npm access grant read-write formstack-ui:developers formstack-ui
```

## ✅ Action Items (To-Do List)

- [x] **Check Availability**: Verify `formstack-ui` org availability on NPM.
- [x] **Create Organization**: Sign up/Create the organization on NPM. (Note: Enter `formstack-ui` without the `@` symbol).
- [x] **Prepare Placeholder Script**: Run `node scripts/prepare-placeholders.js` to generate the packages.
- [x] **Publish Placeholders**: Navigate to `dist-placeholders` and run `sh publish-all.sh`.
- [x] **Update Main Roadmap**: Add "Ecosystem" section to `TASKS.md` or `README.md`.
