export const Documentation = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl border border-border">
        <h1 className="text-4xl font-bold mb-3">
          Formix <span className="text-primary">UI</span> Documentation
        </h1>
        <p className="text-lg text-muted-foreground">
          A powerful, schema-driven form engine for React with comprehensive validation and
          enterprise features.
        </p>
      </div>

      {/* Quick Start */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">🚀</span> Quick Start
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. Install</h3>
            <pre className="bg-surface-900 text-primary p-4 rounded-lg overflow-x-auto">
              <code>npm install formix-ui react react-dom tailwindcss zod</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Use</h3>
            <pre className="bg-surface-900 text-primary p-4 rounded-lg overflow-x-auto text-sm">
              {`import { SchemaForm } from 'formix-ui';

const schema = {
  fields: [{ id: 'name', type: 'text', label: 'Name' }]
};

export default function App() {
  return <SchemaForm schema={schema} onSubmit={console.log} />;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Framework Integration */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">🏗️</span> Framework Integration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Formik + Yup</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use first-class Formik integration with Yup schema generation.
            </p>
            <pre className="bg-surface-900 text-primary p-4 rounded-lg overflow-x-auto text-sm">
              {`import { FormikSchemaForm } from 'formix-ui';

<FormikSchemaForm 
  schema={schema} 
  validationLib="yup"
  onSubmit={handleSubmit} 
/>`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Next.js 15+</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Fully optimized for Next.js App Router and Server Components.
            </p>
            <pre className="bg-surface-900 text-primary p-4 rounded-lg overflow-x-auto text-sm">
              {`"use client";
import { SchemaForm } from 'formix-ui';
import 'formix-ui/styles';`}
            </pre>
          </div>
        </div>
      </section>

      {/* Field Types */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">📝</span> Field Types
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              type: "text",
              desc: "Single-line text input",
              props: "minLength, maxLength, pattern",
            },
            {
              type: "email",
              desc: "Email input with validation",
              props: "Auto email validation",
            },
            {
              type: "url",
              desc: "URL input with validation",
              props: "Auto URL validation",
            },
            {
              type: "tel",
              desc: "Phone number input",
              props: "pattern for format",
            },
            {
              type: "password",
              desc: "Password input (masked)",
              props: "minLength validation",
            },
            { type: "number", desc: "Numeric input", props: "min, max, step" },
            {
              type: "textarea",
              desc: "Multi-line text",
              props: "rows, autoGrow, showCharCount",
            },
            {
              type: "autocomplete",
              desc: "Searchable select",
              props: "options, multiple, asyncUrl",
            },
            {
              type: "select",
              desc: "Native select dropdown",
              props: "options, multiple",
            },
            {
              type: "checkbox",
              desc: "Checkbox input",
              props: "checkboxLabel",
            },
            { type: "switch", desc: "Toggle switch", props: "Boolean value" },
            {
              type: "radio",
              desc: "Radio button group",
              props: "options, direction",
            },
            {
              type: "file",
              desc: "File upload",
              props: "accept, maxSize, maxFiles",
            },
            {
              type: "date",
              desc: "Date picker",
              props: "minDate, maxDate, dateFormat",
            },
            {
              type: "time",
              desc: "Time picker",
              props: "timeFormat (12h/24h)",
            },
            {
              type: "datetime",
              desc: "Date + Time picker",
              props: "dateFormat, timeFormat",
            },
            {
              type: "daterange",
              desc: "Date range picker",
              props: "minDate, maxDate, showTime",
            },
          ].map((field) => (
            <div
              key={field.type}
              className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-lg border border-border"
            >
              <div className="flex items-center gap-2 mb-1">
                <code className="text-primary font-mono font-semibold">{field.type}</code>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{field.desc}</p>
              <p className="text-xs text-muted-foreground/70">Props: {field.props}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Validation */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">✅</span> Validation
        </h2>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            FormEngine supports 20+ validation types with Zod integration:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              "required",
              "email",
              "url",
              "minLength",
              "maxLength",
              "min",
              "max",
              "pattern",
              "regex",
              "fileSize",
              "fileType",
              "minDate",
              "maxDate",
              "integer",
              "positive",
              "negative",
              "nonZero",
              "custom",
            ].map((rule) => (
              <div
                key={rule}
                className="px-3 py-2 bg-primary/10 rounded-md border border-primary/20"
              >
                <code className="text-sm font-mono">{rule}</code>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Example</h3>
            <pre className="bg-surface-900 text-primary p-4 rounded-lg overflow-x-auto text-sm">
              {`validation: [
  { type: "required", message: "This field is required" },
  { type: "minLength", value: 3, message: "Min 3 characters" },
  { type: "email", message: "Invalid email format" }
]`}
            </pre>
          </div>
        </div>
      </section>

      {/* Conditional Logic */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">🔀</span> Conditional Visibility
        </h2>

        <p className="text-muted-foreground mb-4">
          Show or hide fields based on other field values with AND/OR logic:
        </p>

        <pre className="bg-surface-900 text-primary p-4 rounded-lg overflow-x-auto text-sm">
          {`{
  id: "other-role",
  name: "otherRole",
  label: "Specify Role",
  type: "text",
  visibilityRules: [
    { field: "role", operator: "eq", value: "other" }
  ],
  reserveSpace: true // Keeps layout stable
}`}
        </pre>

        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>Operators:</strong> <code>eq</code> (equals), <code>neq</code> (not equals),
            <code>gt</code> (greater than), <code>lt</code> (less than),
            <code>contains</code>, <code>startsWith</code>
          </p>
        </div>
      </section>

      {/* Grid Layout */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">📐</span> Responsive Grid Layout
        </h2>

        <p className="text-muted-foreground mb-4">
          12-column responsive grid system with breakpoint support:
        </p>

        <pre className="bg-surface-900 text-primary p-4 rounded-lg overflow-x-auto text-sm">
          {`grid: {
  colSpan: 6,    // Desktop (default)
  xs: 12,        // Mobile (<640px) - full width
  sm: 6,         // Tablet (640px+) - half width
  lg: 4          // Large desktop (1024px+) - third width
}`}
        </pre>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3 bg-surface-50 dark:bg-surface-900/50 rounded border border-border">
            <strong className="text-sm">xs (Mobile)</strong>
            <p className="text-xs text-muted-foreground">&lt;640px</p>
          </div>
          <div className="p-3 bg-surface-50 dark:bg-surface-900/50 rounded border border-border">
            <strong className="text-sm">sm (Tablet)</strong>
            <p className="text-xs text-muted-foreground">640px+</p>
          </div>
          <div className="p-3 bg-surface-50 dark:bg-surface-900/50 rounded border border-border">
            <strong className="text-sm">lg (Desktop)</strong>
            <p className="text-xs text-muted-foreground">1024px+</p>
          </div>
        </div>
      </section>

      {/* Form Builder */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">🎨</span> Visual Form Builder
        </h2>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Build forms visually with our comprehensive form builder:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-2">✨ Features</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 60+ configurable properties per field</li>
                <li>• Smart field defaults by type</li>
                <li>• Real-time preview</li>
                <li>• Drag-and-drop arrangement</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg border border-secondary/20">
              <h3 className="font-semibold mb-2">📦 Schema Management</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Copy to clipboard</li>
                <li>• Download as JSON</li>
                <li>• Import from JSON</li>
                <li>• Load demo schemas</li>
              </ul>
            </div>
          </div>

          <pre className="bg-surface-900 text-primary p-4 rounded-lg overflow-x-auto text-sm">
            {`import { FormBuilder } from 'r-form-engine';

function App() {
  return <FormBuilder />;
}`}
          </pre>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">⚡</span> Advanced Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">🎯 Async Autocomplete</h3>
              <p className="text-sm text-muted-foreground">
                Load options from API with debouncing and caching
              </p>
              <code className="text-xs">asyncUrl: "https://api.example.com/search"</code>
            </div>

            <div className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">📁 File Upload</h3>
              <p className="text-sm text-muted-foreground">
                File validation, size limits, preview modes
              </p>
              <code className="text-xs">accept, maxSize, maxFiles, previewMode</code>
            </div>

            <div className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">🌙 Dark Mode</h3>
              <p className="text-sm text-muted-foreground">
                Built-in dark mode with smooth transitions
              </p>
              <code className="text-xs">ThemeProvider, ThemeSwitcher</code>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">♿ Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                ARIA labels, keyboard navigation, screen reader support
              </p>
              <code className="text-xs">Semantic HTML, WCAG compliant</code>
            </div>

            <div className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">🎨 UI Customization</h3>
              <p className="text-sm text-muted-foreground">Variants, sizes, colors, themes</p>
              <code className="text-xs">variant, size, color, fullWidth</code>
            </div>

            <div className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">⚡ Performance</h3>
              <p className="text-sm text-muted-foreground">
                Debounced validation, virtual scrolling
              </p>
              <code className="text-xs">debounceValidation, virtualScroll</code>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">📚</span> API Reference
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">SchemaForm Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-50 dark:bg-surface-900/50">
                  <tr className="border-b border-border">
                    <th className="text-left p-2">Prop</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-2">
                      <code>schema</code>
                    </td>
                    <td className="p-2">
                      <code>FormSchema</code>
                    </td>
                    <td className="p-2">Form schema definition</td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <code>onSubmit</code>
                    </td>
                    <td className="p-2">
                      <code>(values) =&gt; void</code>
                    </td>
                    <td className="p-2">Submit handler</td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <code>onValidate</code>
                    </td>
                    <td className="p-2">
                      <code>(values) =&gt; errors</code>
                    </td>
                    <td className="p-2">Custom validation</td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <code>debug</code>
                    </td>
                    <td className="p-2">
                      <code>boolean</code>
                    </td>
                    <td className="p-2">Show debug panel</td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <code>hideTitle</code>
                    </td>
                    <td className="p-2">
                      <code>boolean</code>
                    </td>
                    <td className="p-2">Hide form title</td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <code>ref</code>
                    </td>
                    <td className="p-2">
                      <code>SchemaFormHandle</code>
                    </td>
                    <td className="p-2">Form ref (submit, reset)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4">📖 Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://github.com/adarshatl03/formix-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-1">GitHub</h3>
            <p className="text-sm text-muted-foreground">Source code & issues</p>
          </a>

          <a
            href="https://www.npmjs.com/package/formix-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-1">npm Package</h3>
            <p className="text-sm text-muted-foreground">Install & versions</p>
          </a>

          <div className="p-4 bg-card rounded-lg border border-border">
            <h3 className="font-semibold mb-1">Support</h3>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:adarshatl03@gmail.com">adarshatl03@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-muted-foreground text-sm pt-8 border-t border-border">
        <p>Built with ❤️ by Adarsh • MIT License • v3.1.3</p>
      </div>
    </div>
  );
};
