# 💅 Styling Rules

This document defines the UX and visual rules that must be maintained across all `formix-ui` components.

## 1. Global UX Patterns (Locked)

### 1.1 Labels & Inputs

- **Notched Floating Label**:
  - Label floats to the top border on focus or when value exists.
  - Label must have a solid background matching the parent background to "cut" the border.
  - Label never fully leaves the input container.
- **Placeholder**:
  - Only visible when the input is **focused**. Hides on blur to verify the label is read.

### 1.2 Error Handling

- **Indicator**: All inputs show an ⓘ icon on error state.
- **Tooltip**: Error message appears in a tooltip **only on hover** of the icon.
- **Layout**: Errors must NOT cause layout shift (no growing inputs).
- **Contrast**: Tooltip background should match error color (usually red).

### 1.3 Adornments

- **Flexible**: Inputs support left/right icons or text.
- **Spacing**: Input padding must auto-adjust to prevent caret overlap.
- **Touch**: Adornments should not interfere with the native input click target.

## 2. Theming Engine

- **Slot-Based**: Every component defines slots (root, label, input, helper).
- **Tailwind First**: Themes are collections of Tailwind utility classes.
- **CSS Variables**: Use `--primary`, `--background`, `--destructive` for colors to support runtime theming.

## 3. Grid System

- **12-Column Grid**: The layout engine uses a standard 12-column grid.
- **Responsive Spans**: Fields define `colSpan` for breakpoint targets (xs, sm, md, lg).

## 4. Semantic & Implementations (Strict)

- **Semantic HTML**: Use semantic tags (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<aside>`) instead of generic `div` soup.
  - Buttons must be `<button>`, links must be `<a>`.
  - Inputs must have associated `<label>` tags.
- **No External UI**: **Do NOT install external UI libraries** (e.g., MUI, AntD, Chakra, Radix).
  - All UI must be built from scratch using HTML5 + Tailwind CSS.
  - This ensures full control over standard styling and bundle size.
- **Overrides Preparation**:
  - Every interactive element must have a unique `id`.
  - Every container and sub-element must have a stable `className` (e.g., `formix-input-root`, `formix-input-label`) to support traditional CSS overrides.

## 5. Theme Engine & Overrides (Detailed)

Our styling system is built to be **framework-agnostic** regarding the underlying CSS engine, though it defaults to Tailwind. It essentially manages class string concatenation.

### 5.1 Architecture & Cascade

Styles are resolved in the following order (Last wins):

1. **Global Theme** (`theme.global`): Base styles applied to all components (unless opted out).
2. **Component Theme** (`theme.textInput`, etc.): Component-specific default styles.
3. **Prop Overrides** (`classes={...}`): Instance-specific overrides passed at the call site.

### 5.2 Tailwind Version Independence

Because the engine treats styles as simple strings, it supports any version of Tailwind or even vanilla CSS:

- **Tailwind v4**: Use native CSS variables and generic classes.
- **Tailwind v3**: Use standard utility classes from `tailwind.config.js`.
- **No Tailwind** (Vanilla/Modules): Simply pass your custom class names (e.g., `styles.myInput`) into the theme or override props. The engine does not validate class existence.

### 5.3 Overrides & Opt-Outs

- **Global Opt-Out**: Set `globalOverride={false}` on any component to ignore global theme styles.
- **Slot Overrides**: Target specific parts of a component using the `classes` prop:

  ```tsx
  <TextInput
    classes={{
      input: "bg-blue-50 text-blue-900", // Tailwind override
      label: styles.customLabel, // CSS Module override or Vanilla class
    }}
  />
  ```

### 5.4 Default Theme

- The `defaultTheme` provides a baseline Tailwind v3/v4 compatible look.
- When creating custom designs, prefer extending `defaultTheme` over replacing it entirely to maintain layout integrity.
