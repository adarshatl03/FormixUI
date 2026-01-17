# 📖 FormEngine — User Guide (v3.1.0)

Welcome to FormEngine! This guide will help you get started with building and deploying forms using our schema-driven engine.

---

## 🚀 Quick Start

### 1. Installation

Install the core package and its peer dependencies:

```bash
npm install formix-ui react react-dom tailwindcss zod
```

### 2. Initialization

If you want to use our **CLI 3.0** to manage components locally (Copy Mode), run:

```bash
npx formix-ui init
```

_Choose "library" for standard npm usage or "copy" to pull source files directly into your project._

---

### 3. Validation Libraries

You can use either **Zod** or **Yup** for schema validation. Use the `validationLib` prop on `SchemaForm`.

```tsx
// Using Yup
<SchemaForm schema={schema} validationLib="yup" onSubmit={handleSubmit} />
```

---

## 🛠️ Advanced Integration

### Using with Formik

If your project already uses Formik, you can use the `FormikSchemaForm` component which bridges the two.

```tsx
import { FormikSchemaForm } from "formix-ui";

function App() {
  return (
    <FormikSchemaForm
      schema={mySchema}
      onSubmit={(values) => console.log(values)}
      validationLib="zod" // or yup
    />
  );
}
```

### CLI Commands (Shadcn Style)

Our CLI allows you to selectively add components and configurations:

```bash
# Initialize your stack
npx formix-ui init

# Add specific components
npx formix-ui add autocomplete

# Update all components
npx formix-ui update
```

---

## 🎨 Field Variants

FormEngine features a premium **Themed Variant System**. You can switch between variants using the `variant` prop:

- **`outline`**: (Default) Modern outlined look.
- **`filled`**: Subtle background fill with bottom border.
- **`standard`**: Minimalist style (bottom border only).
- **`floating`**: Premium animated notched label that moves to the border on focus.

### Example:

```tsx
<SchemaForm
  schema={{
    fields: [{ name: "email", type: "email", label: "Email", variant: "floating" }],
  }}
  onSubmit={console.log}
/>
```

---

## 🛠️ Field Types

| Type           | Best For                   | New in 3.1.0              |
| :------------- | :------------------------- | :------------------------ |
| `text`         | Names, general strings     | Variant Support           |
| `date`         | Birthdays, single dates    | Native implementation     |
| `daterange`    | Trip dates, hotel bookings | Time support (`showTime`) |
| `datetime`     | Scheduled appointments     | Multi-view selection      |
| `time`         | Working hours              | Seconds support           |
| `autocomplete` | Searchable lists           | Async API support         |

---

## ✅ Validation System

We use **Zod** under the hood for robust validation. You can define rules directly in your schema:

```json
{
  "validation": [
    { "type": "required", "message": "Required!" },
    { "type": "minLength", "value": 5 }
  ]
}
```

---

## 🌙 Dark Mode Support

Ensure your app is wrapped in the `ThemeProvider`:

```tsx
import { ThemeProvider } from "formix-ui";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourAppContents />
    </ThemeProvider>
  );
}
```

---

## 📞 Support & Community

- **Playground**: [Live Demo](https://adarshatl03.github.io/form-engine/)
- **Documentation**: [Full Docs](https://adarshatl03.github.io/form-engine/guide)
- **GitHub**: [adarshatl03/form-engine](https://github.com/adarshatl03/form-engine)
