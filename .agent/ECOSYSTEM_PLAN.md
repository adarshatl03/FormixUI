# Ecosystem Expansion Plan & Placeholder Reservation

This document outlines the strategy for expanding the `formix-ui` ecosystem and ensuring modular compatibility.

> **⚠️ Naming Consideration**: "FormixUI" is a registered trademark of FormixUI, LLC. While `formix-ui` is currently used, consider that building a large ecosystem around this name carries some risk of trademark dispute. If you proceed, ensure differentiation or consider a distinct brand name if the project grows significantly.

## 🎯 Objective

Reserve strategic package names to prevent squatting and ensure a cohesive future ecosystem for `formix-ui`.

## 📦 Placeholder Packages to Reserve

We should reserve the following package names immediately to ensure future modules can be officially supported.

### Primary Scope (Preferred: `@formix-ui/*`)

If we can secure the `@formix-ui` organization on NPM (Recommended):

- [x] **`@formix-ui/core`**
  - _Purpose_: The headless logic engine (hooks only, no UI). Allows users to bring their own UI library while using our form logic.
- [x] **`@formix-ui/charts`**
  - _Purpose_: Data visualization components (Bar, Line, Pie) that integrate with form data.
- [x] **`@formix-ui/tables`**
  - _Purpose_: Enterprise-grade data grids with sorting, filtering, and mass actions.
- [x] **`@formix-ui/auth`**
  - _Purpose_: Pre-built login/register/forgot-password templates and validation logic.
- [x] **`@formix-ui/editor`**
  - _Purpose_: The visual drag-and-drop builder exported as a standalone component for integration into other admin panels.
- [x] **`@formix-ui/cli`**
  - _Purpose_: Dedicated package for the CLI to keep the main package lighter.
- [x] **`@formix-ui/native`**
  - _Purpose_: React Native support.

### Flat Names (Alternative)

If the organization scope is not desired:

- [ ] `formix-charts`
- [ ] `formix-tables`
- [ ] `formix-ui-react-native`

## 🔄 Phasability & Compatibility Strategy

To ensure these future packages work seamlessly with the main package:

### Phase 1: Reservation (Immediate)

1.  **Create NPM Organization**: Attempt to create `formix-ui` org on NPM.
2.  **Publish Placeholders**: Create minimal `package.json` files for each package and publish `0.0.0-placeholder` versions.
    - _Note_: Placeholders should just contain a README explaining "Coming Soon - Part of FormixUI".

### Phase 2: Core Migration (Development)

1.  **Extract Shared Logic**: Move hooks, state management, and validation logic from `src/components/formix` to `@formix-ui/core`.
2.  **Monorepo Setup**: Configure the repository as a monorepo (using pnpm workspaces or Turborepo) to manage multiple packages.
3.  **Component Refactor**: Update UI components to consume logic from `@formix-ui/core`.

### Phase 3: The "Facade" Architecture (Recommended)

**Do NOT unpublish `formix-ui`.**

The strongest architectural pattern for popular libraries (like `vite`, `remix`, or `material-ui`) is to keep the short, unscoped name as the primary entry point.

1.  **`formix-ui` (The Wrapper)**:FormixUI
    - The "easy button" for most users.
    - It will simply re-export everything from your scoped packages.
    - Users install: `npm install formix-ui` (Simple).
2.  **`@formix-ui/core` (The Engine)**:
    - Contains the actual logic.
    - Advanced users can install just this if they want a smaller bundle without your default UI.
3.  **`@formix-ui/charts` (Add-ons)**:
    - Optional extras that don't bloat the main package.

**Benefits:**

- You keep the premium "short name" on NPM.
- You don't break existing installs.
- You gain modularity without forcing complex import paths on beginners.

### Phase 4: Expansion (Growth)

Once the core is finalized, we will build out the ecosystem packages:

1.  **`@formix-ui/charts`**: Build data visualization components (Recharts wrapper).
2.  **`@formix-ui/tables`**: Build the data grid component (TanStack Table wrapper).
3.  **`@formix-ui/auth`**: Create auth templates (Login, Register, MFA).
4.  **`@formix-ui/native`**: Port logic to React Native.

### ⚠️ Housekeeping: Fix Publisher Name

Currently, `formix-ui` shows **your personal account** as the publisher. To show the organization `formix-ui` as the publisher:

1.  **Go to NPM Website**: Navigate to your `formix-ui` package page.
2.  **Settings**: Click **Settings**.
3.  **Manage Access**: Look for "Invite Maintainers" or "Access".
4.  **Invite Organization**:
    - Invite `formix-ui` (the organization user).
    - Grant **Read/Write** or **Admin** access.
5.  _(Optional)_ Remove yourself: Once the org is added, you can technically remove your personal account, but it's safer to keep both.

Alternatively, via CLI:

```bash
npm access grant read-write formix-ui:developers formix-ui
```

## ✅ Action Items (To-Do List)

- [x] **Check Availability**: Verify `formix-ui` org availability on NPM.
- [x] **Create Organization**: Sign up/Create the organization on NPM. (Note: Enter `formix-ui` without the `@` symbol).
- [x] **Prepare Placeholder Script**: Run `node scripts/prepare-placeholders.js` to generate the packages.
- [x] **Publish Placeholders**: Navigate to `dist-placeholders` and run `sh publish-all.sh`.
- [x] **Update Main Roadmap**: Add "Ecosystem" section to `TASKS.md` or `README.md`.
