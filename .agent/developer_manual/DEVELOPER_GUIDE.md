# 👨‍💻 FormEngine — Developer Guide (v3.1.0)

This guide is for developers contributing to the FormEngine core or extending its functionality.

---

## 🏗️ Architecture Overview

FormEngine is built as a **monolith-of-components** architecture with a centralized theme engine.

1. **`src/lib`**: The public entry point.
2. **`src/components/theme`**: The logical core. All components consume `useComponentTheme` to resolve their styles.
3. **`src/components/ui`**: Atomic UI components (TextInput, Select, etc.).
4. **`src/cli`**: The TypeScript-based CLI tools.

---

## 🎨 Theming System

We use a **Slot-based Styling** approach via `ThemeContext`.

### 1. Define Theme Structure (`types.ts`)

Each component has slots (e.g., `root`, `label`, `input`).

```typescript
interface TextInputTheme {
  root: StyleOrFn;
  label: StyleOrFn;
  // ...
}
```

### 2. Implement Default Styles (`defaultTheme.ts`)

Use functions to apply styles based on `ComponentState` (variant, focused, error).

```typescript
textInput: {
  root: ({ variant, focused }) => cn(
    "relative flex flex-col",
    variant === "floating" && "mt-2"
  ),
  // ...
}
```

---

## 🛠️ Developing for the CLI (CLI 3.0)

The CLI is located in `src/cli` and is compiled using `tsconfig.cli.json`.

### Registration

All copy-installable components must be registered in `src/cli/registry.ts`:

```typescript
"my-component": {
  name: "my-component",
  files: [`${COMPONENTS_BASE_PATH}/ui/MyComponent.tsx`],
  internalDependencies: ["theme-core"]
}
```

### Test Local CLI

```bash
npm run build:cli
node dist/bin/index.js init
```

---

## 🧪 Development Workflow

### 1. Start Playground

```bash
npm run dev
```

### 2. Build Library

```bash
npm run build:lib
```

_This runs Vite for the bundle + TSC for declarations + TSC for CLI._

### 3. Build Site

```bash
npm run build:site
```

---

## 📜 Coding Standards

- **Strict TypeScript**: No `any` unless absolutely necessary (e.g., in some external library integrations).
- **Tailwind 4.1**: Use CSS variables and `@theme` blocks where possible.
- **Semantic HTML**: Maintain ARIA compliance for all UI components.
- **Component Anatomy**: Components should be stateless where possible, relying on the schema-form state manager.

---

## 🚀 Release Process

1. Commit changes.
2. Run `npm version minor` (or patch).
3. Run `npm run build:lib`.
4. Run `npm publish --access public`.
5. Run `npm run deploy`.
6. Push tags with `git push --follow-tags`.

---

**Questions?** Check `PUBLISHING_GUIDE.md` or contact the core team.
