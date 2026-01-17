# 📏 Development Rules

This document outlines the architectural and coding standards for `formix-ui`.

## 1. Stack & Architecture

- **Framework**: React + TypeScript + Vite.
- **Styling**: Tailwind CSS 4.1 (No JS config, pure CSS/Tokens).
- **No External UI**: **Strictly NO external UI libraries** (MUI, Shadcn, etc.). Build from scratch.
- **State Management**: React Context + Hooks (No Redux/Zustand unless specified).
- **Architecture**: Monolith-of-components within `src/components`.
  - `src/lib`: Public entry point.
  - `src/components/theme`: Theme engine.
  - `src/components/ui`: Atomic UI components.
  - `src/cli`: CLI tools.

## 2. Coding Standards

- **Semantic HTML**: Mandatory use of semantic tags (`<header>`, `<main>`, `<section>`, etc.) over `<div>`.
- **Strict TypeScript**: No `any`. Use generics and interfaces.
- **Component Anatomy**:
  - Components should be stateless/controlled where possible.
  - Rely on `SchemaForm` state manager for complex logic.
  - Components: PascalCase (`TextInput.tsx`)
  - Hooks: camelCase (`useFormState.ts`)
  - Utilities: camelCase (`dateUtils.ts`)
  - **Stable Classes**: kebab-case (`formix-text-input`, `formix-label`) for override targeting.

## 3. Schema Design

- **Source of Truth**: The JSON schema is the single source of truth for the UI.
- **Validation**: All validation must be serializable in the schema (Zod for runtime).
- **Dependencies**: Visibility/Logic must be defined in the schema `dependencies` object.

### 4. Release Process

1. **Build**: `npm run build:lib` (Library + Types + CLI).
2. **Version**: Semantic versioning (`npm version patch/minor`).
3. **Publish**: `npm publish --access public`.
