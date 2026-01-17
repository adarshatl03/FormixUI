# FormEngine - Complete Usage Guide

## 📦 Installation & Setup

### Step 1: Install the Package

```bash
npm install formix-ui
```

Or with yarn:

```bash
yarn add formix-ui
```

### Step 2: Install Peer Dependencies

```bash
npm install react react-dom tailwindcss zod formik yup
```

**Note:** Date/time pickers are built as custom native components and do not require external UI libraries like Kendo UI.

### Step 3: Configure Tailwind CSS

Update your `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/formix-ui/**/*.{js,ts,jsx,tsx}", // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Step 4: Import Styles

In your main CSS file (`index.css` or `App.css`):

```css
@import "formix-ui/styles";

/* Or if using Tailwind */
@import "tailwindcss";
```

### Step 5: Start Using

```typescript
import {
  SchemaForm,
  FormikSchemaForm, // For Formik integration
  FormBuilder,
  ThemeProvider,
} from "formix-ui";
import type { FormSchema } from "formix-ui";
```

---

## 🏗️ Framework & State Management

FormEngine supports multiple state management libraries. The right component depends on your chosen stack.

### 1. Standard (Native `useForm`)

Best for lightweight apps or projects avoiding extra dependencies.

```tsx
import { SchemaForm } from "formix-ui";

// Uses internal state and Zod validation by default
<SchemaForm schema={schema} onSubmit={(values) => console.log(values)} />;
```

### 2. Formik + Yup

Ideal for enterprise apps already invested in the Formik ecosystem.

```tsx
import { FormikSchemaForm } from "formix-ui";
import { generateYupSchema } from "formix-ui/utils/yup-validation";

// Use the Formik-specific component
<FormikSchemaForm schema={schema} validationLib="yup" onSubmit={(values) => console.log(values)} />;
```

### 3. React Hook Form (RHF)

RHF is supported via the CLI scaffolding. For manual integration, use the standard `SchemaForm` and pass external control if needed.

---

## 💡 Complete Examples

### Example 1: Simple Contact Form

```typescript
import { SchemaForm } from 'formix-ui';
import type { FormSchema } from 'formix-ui';

const contactSchema: FormSchema = {
  title: "Contact Us",
  description: "We'd love to hear from you",
  fields: [
    {
      id: "name",
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      validation: [
        { type: "required", message: "Name is required" },
        { type: "minLength", value: 2, message: "Name too short" }
      ],
      grid: { colSpan: 12, xs: 12, sm: 6 }
    },
    {
      id: "email",
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      validation: [
        { type: "required" },
        { type: "email", message: "Invalid email" }
      ],
      grid: { colSpan: 12, xs: 12, sm: 6 }
    },
    {
      id: "message",
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Your message here...",
      rows: 4,
      validation: [
        { type: "required" },
        { type: "minLength", value: 10 }
      ],
      grid: { colSpan: 12 }
    }
  ]
};

export default function ContactForm() {
  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);

    // Send to API
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <SchemaForm
        schema={contactSchema}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

---

### Example 2: Registration Form with Custom Validation

```typescript
import { SchemaForm } from 'formix-ui';
import { useRef } from 'react';
import type { SchemaFormHandle, FormSchema } from 'formix-ui';

const registrationSchema: FormSchema = {
  title: "Create Account",
  fields: [
    {
      id: "username",
      name: "username",
      label: "Username",
      type: "text",
      validation: [
        { type: "required" },
        { type: "minLength", value: 3 },
        {
          type: "pattern",
          value: "^[a-zA-Z0-9_]+$",
          message: "Only letters, numbers, and underscores"
        }
      ],
      grid: { colSpan: 12 }
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      validation: [
        { type: "required" },
        { type: "email" }
      ],
      grid: { colSpan: 12 }
    },
    {
      id: "password",
      name: "password",
      label: "Password",
      type: "password",
      helperText: "Min 8 characters, 1 uppercase, 1 number",
      validation: [
        { type: "required" },
        { type: "minLength", value: 8 }
      ],
      grid: { colSpan: 12, sm: 6 }
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      validation: [{ type: "required" }],
      grid: { colSpan: 12, sm: 6 }
    },
    {
      id: "terms",
      name: "terms",
      label: "I agree to Terms & Conditions",
      type: "checkbox",
      validation: [
        { type: "required", message: "You must accept terms" }
      ],
      grid: { colSpan: 12 }
    }
  ]
};

export default function RegistrationForm() {
  const formRef = useRef<SchemaFormHandle>(null);

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert('Registration successful!');
        formRef.current?.reset(); // Reset form
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Custom cross-field validation
  const handleValidate = (values: any) => {
    const errors: Record<string, string> = {};

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    return errors;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <SchemaForm
        ref={formRef}
        schema={registrationSchema}
        onSubmit={handleSubmit}
        onValidate={handleValidate}
        debug // Show debug panel
      />

      {/* External buttons using ref */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => formRef.current?.submit()}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Submit
        </button>
        <button
          onClick={() => formRef.current?.reset()}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
```

---

### Example 3: Dynamic Form with Conditional Fields

```typescript
const jobApplicationSchema: FormSchema = {
  title: "Job Application",
  fields: [
    {
      id: "role",
      name: "role",
      label: "Applying For",
      type: "autocomplete",
      options: [
        { label: "Developer", value: "dev" },
        { label: "Designer", value: "design" },
        { label: "Manager", value: "manager" },
        { label: "Other", value: "other" }
      ],
      validation: [{ type: "required" }],
      grid: { colSpan: 12 }
    },
    {
      id: "otherRole",
      name: "otherRole",
      label: "Specify Role",
      type: "text",
      // Only show if "Other" is selected
      visibilityRules: [
        { field: "role", operator: "eq", value: "other" }
      ],
      validation: [{ type: "required" }],
      grid: { colSpan: 12 }
    },
    {
      id: "experience",
      name: "experience",
      label: "Years of Experience",
      type: "number",
      min: 0,
      max: 50,
      validation: [{ type: "required" }],
      grid: { colSpan: 12, sm: 6 }
    },
    {
      id: "portfolio",
      name: "portfolio",
      label: "Portfolio URL",
      type: "url",
      // Only show for developers and designers
      visibilityRules: [
        { field: "role", operator: "eq", value: "dev" },
        { field: "role", operator: "eq", value: "design" }
      ],
      grid: { colSpan: 12, sm: 6 }
    },
    {
      id: "salary",
      name: "salary",
      label: "Expected Salary",
      type: "number",
      min: 0,
      step: 1000,
      // Only show for experienced candidates
      visibilityRules: [
        { field: "experience", operator: "gt", value: 2 }
      ],
      grid: { colSpan: 12 }
    }
  ]
};

function JobApplicationForm() {
  return <SchemaForm schema={jobApplicationSchema} onSubmit={console.log} />;
}
```

---

### Example 4: File Upload Form

```typescript
const uploadSchema: FormSchema = {
  title: "Document Upload",
  fields: [
    {
      id: "document",
      name: "document",
      label: "Upload Document",
      type: "file",
      accept: ".pdf,.doc,.docx",
      maxSize: 5242880, // 5MB in bytes
      validation: [{ type: "required" }],
      grid: { colSpan: 12 }
    },
    {
      id: "images",
      name: "images",
      label: "Upload Images",
      type: "file",
      accept: "image/*",
      multiple: true,
      maxFiles: 5,
      maxSize: 2097152, // 2MB per file
      previewMode: "grid",
      grid: { colSpan: 12 }
    },
    {
      id: "description",
      name: "description",
      label: "Description",
      type: "textarea",
      rows: 3,
      grid: { colSpan: 12 }
    }
  ]
};

function FileUploadForm() {
  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    // Add single file
    if (values.document) {
      formData.append('document', values.document);
    }

    // Add multiple files
    if (values.images) {
      values.images.forEach((file: File, index: number) => {
        formData.append(`image_${index}`, file);
      });
    }

    // Add other fields
    formData.append('description', values.description || '');

    // Upload to server
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('Upload result:', result);
  };

  return <SchemaForm schema={uploadSchema} onSubmit={handleSubmit} />;
}
```

---

### Example 5: Async Autocomplete

```typescript
const userSearchSchema: FormSchema = {
  title: "Search Users",
  fields: [
    {
      id: "user",
      name: "user",
      label: "Select User",
      type: "autocomplete",
      asyncUrl: "https://api.example.com/users/search",
      searchable: true,
      clearable: true,
      loadingText: "Searching users...",
      noOptionsText: "No users found",
      validation: [{ type: "required" }],
      grid: { colSpan: 12 },
    },
  ],
};

// The asyncUrl will be called with query parameter:
// GET https://api.example.com/users/search?q=john

// Expected API response format:
// [
//   { label: "John Doe", value: "user_1" },
//   { label: "John Smith", value: "user_2" }
// ]
```

---

## 🎨 Using the Form Builder

```typescript
import { FormBuilder } from 'formix-ui';

export default function BuilderPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Form Builder</h1>
      <FormBuilder />
    </div>
  );
}
```

**Features:**

- Visual field configuration
- 60+ properties per field
- Real-time preview
- Copy schema to clipboard
- Download as JSON
- Import from JSON
- Load demo schemas

---

## 🌙 Theme Integration

```typescript
import { ThemeProvider, ThemeSwitcher, SchemaForm } from 'formix-ui';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="p-4 flex justify-between items-center border-b">
          <h1 className="text-2xl font-bold">My App</h1>
          <ThemeSwitcher />
        </header>

        <main className="p-8">
          <SchemaForm schema={mySchema} onSubmit={handleSubmit} />
        </main>
      </div>
    </ThemeProvider>
  );
}
```

**Theme Options:**

- `"light"` - Light mode
- `"dark"` - Dark mode
- `"system"` - Follow system preference

---

## 📚 API Reference

### SchemaForm Props

| Prop         | Type                                      | Description                       |
| ------------ | ----------------------------------------- | --------------------------------- |
| `schema`     | `FormSchema`                              | Form schema definition (required) |
| `onSubmit`   | `(values: any) => void`                   | Submit handler (required)         |
| `onValidate` | `(values: any) => Record<string, string>` | Custom validation function        |
| `debug`      | `boolean`                                 | Show debug panel                  |
| `hideTitle`  | `boolean`                                 | Hide form title                   |
| `ref`        | `SchemaFormHandle`                        | Form ref for external control     |

### SchemaFormHandle Methods

```typescript
const formRef = useRef<SchemaFormHandle>(null);

// Submit form programmatically
formRef.current?.submit();

// Reset form to initial values
formRef.current?.reset();
```

### FormSchema Type

```typescript
interface FormSchema {
  title?: string;
  description?: string;
  fields: FieldSchema[];
}
```

### FieldSchema Type

```typescript
interface FieldSchema {
  id: string;
  name: string;
  label: string;
  type: FieldType;

  // Common props
  placeholder?: string;
  helperText?: string;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;

  // Validation
  validation?: ValidationRule[];

  // Layout
  grid?: GridProps;

  // Conditional visibility
  visibilityRules?: VisibilityRule[];
  reserveSpace?: boolean;

  // Type-specific props
  // ... see documentation for each field type
}
```

---

## 🔍 Validation Rules

```typescript
type ValidationRule =
  | { type: "required"; message?: string }
  | { type: "email"; message?: string }
  | { type: "url"; message?: string }
  | { type: "minLength"; value: number; message?: string }
  | { type: "maxLength"; value: number; message?: string }
  | { type: "min"; value: number; message?: string }
  | { type: "max"; value: number; message?: string }
  | { type: "pattern"; value: string; message?: string }
  | { type: "regex"; value: RegExp; message?: string }
  | { type: "fileSize"; value: number; message?: string }
  | { type: "fileType"; value: string[]; message?: string }
  | { type: "minDate"; value: Date; message?: string }
  | { type: "maxDate"; value: Date; message?: string }
  | { type: "integer"; message?: string }
  | { type: "positive"; message?: string }
  | { type: "negative"; message?: string }
  | { type: "custom"; validate: (value: any) => boolean; message?: string };
```

---

## 📐 Grid System

```typescript
interface GridProps {
  colSpan?: number; // Desktop (default: 12)
  xs?: number; // Mobile <640px
  sm?: number; // Tablet 640px+
  lg?: number; // Desktop 1024px+
}
```

**Example:**

```typescript
grid: {
  colSpan: 6,    // Half width on desktop
  xs: 12,        // Full width on mobile
  sm: 6,         // Half width on tablet
  lg: 4          // Third width on large screens
}
```

---

## 🔀 Conditional Visibility

```typescript
interface VisibilityRule {
  field: string;
  operator: "eq" | "neq" | "gt" | "lt" | "contains" | "startsWith";
  value: any;
}
```

**Example:**

```typescript
visibilityRules: [
  { field: "country", operator: "eq", value: "USA" },
  { field: "age", operator: "gt", value: 18 },
];
```

---

## 📞 Support

- **GitHub**: [formix-ui](https://github.com/adarshatl03/form-engine)
- **npm**: [@formix-ui](https://www.npmjs.com/package/formix-ui)
- **Email**: <adarshatl03@gmail.com>

---

### Built with ❤️ by Adarsh • MIT License • v3.1.3
