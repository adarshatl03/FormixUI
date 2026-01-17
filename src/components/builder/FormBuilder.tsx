import { useState, useRef } from "react";
import { SchemaForm, type SchemaFormHandle } from "../SchemaForm";
import type {
  FormSchema,
  FieldSchema,
  FieldType,
  VisibilityRule,
  FieldDirection,
  ResponsiveDirection,
} from "../../types/schema";
import { TextInput } from "../ui/TextInput";
import { Autocomplete } from "../ui/select/Autocomplete";
import { Switch } from "../ui/Switch";
import { Textarea } from "../ui/Textarea";
import { KITCHEN_SINK_SCHEMA } from "../../lib/demo-schemas";

const INITIAL_SCHEMA: FormSchema = {
  fields: [],
};

const FIELD_TYPES: { label: string; value: FieldType }[] = [
  { label: "Text Input", value: "text" },
  { label: "Email", value: "email" },
  { label: "URL", value: "url" },
  { label: "Tel", value: "tel" },
  { label: "Number", value: "number" },
  { label: "Password", value: "password" },
  { label: "Text Area", value: "textarea" },
  { label: "Select (Autocomplete)", value: "autocomplete" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Switch", value: "switch" },
  { label: "Radio Group", value: "radio" },
  { label: "Native Select", value: "select" },
  { label: "Date Picker", value: "date" },
  { label: "Time Picker", value: "time" },
  { label: "Date Time", value: "datetime" },
  { label: "Date Range", value: "daterange" },
  { label: "File Upload", value: "file" },
];

const PRESET_PATTERNS = [
  { label: "Alphanumeric", value: "^[a-zA-Z0-9]+$" },
  {
    label: "Email Address",
    value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  },
  { label: "Phone (International)", value: "^\\+?[1-9]\\d{1,14}$" },
  {
    label: "URL (Web Address)",
    value: "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$",
  },
  { label: "Alphabets Only", value: "^[A-Za-z]+$" },

  { label: "Numeric Only", value: "^\\d+$" },
  { label: "Percentage (Whole Number)", value: "^(100|[1-9]?\\d)$" },
  {
    label: "Percentage (Decimal)",
    value: "^(100(\\.0+)?|[1-9]?\\d(\\.\\d*)?)$",
  },
  { label: "Decimal Number", value: "^-?\\d*(\\.\\d*)?$" },
  {
    label: "Date (YYYY-MM-DD)",
    value: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
  },
  {
    label: "IP Address (v4)",
    value: "^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$",
  },
  {
    label: "Credit Card",
    value:
      "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$",
  },
  { label: "Postal Code", value: "^[a-zA-Z0-9\\s-]{3,10}$" },
  {
    label: "Strong Password (8+ chars, Letter & Number)",
    value: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
  },
  { label: "Hex Color Code", value: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" },
  { label: "Slug (kebab-case)", value: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
  { label: "Custom / Manual", value: "custom" },
];

const VISIBILITY_OPERATORS = [
  { label: "Equals (==)", value: "eq" },
  { label: "Not Equals (!=)", value: "neq" },
  { label: "Greater Than (>)", value: "gt" },
  { label: "Less Than (<)", value: "lt" },
  { label: "One Of (Array)", value: "in" },
  { label: "Contains (Array)", value: "contains" },
  { label: "Value Changed", value: "changed" },
];

export const FormBuilder = () => {
  const [schema, setSchema] = useState<FormSchema>(INITIAL_SCHEMA);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  // Preview State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [submitResult, setSubmitResult] = useState<any>(null);
  const previewFormRef = useRef<SchemaFormHandle>(null);
  const inlineFormRef = useRef<SchemaFormHandle>(null);

  const activeField = schema.fields.find((f) => f.id === selectedFieldId);

  // Update Schema Helper
  const updateField = (id: string, updates: Partial<FieldSchema>) => {
    setSchema((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  };

  // Get field-type-specific defaults
  const getFieldDefaults = (type: FieldType): Partial<FieldSchema> => {
    const baseDefaults: Partial<FieldSchema> = {
      grid: { colSpan: 12, xs: 12, sm: 6, lg: 4 },
    };

    switch (type) {
      case "email":
        return {
          ...baseDefaults,
          placeholder: "user@example.com",
          validation: [
            { type: "required", message: "Email is required" },
            { type: "email", message: "Invalid email format" },
          ],
        };
      case "url":
        return {
          ...baseDefaults,
          placeholder: "https://example.com",
          validation: [{ type: "url", message: "Invalid URL format" }],
        };
      case "tel":
        return {
          ...baseDefaults,
          placeholder: "+1 (555) 000-0000",
          inputMode: "tel",
        };
      case "number":
        return {
          ...baseDefaults,
          placeholder: "0",
          inputMode: "numeric",
          step: 1,
        };
      case "password":
        return {
          ...baseDefaults,
          placeholder: "Enter password",
          minLength: 8,
          validation: [
            { type: "required", message: "Password is required" },
            {
              type: "minLength",
              value: 8,
              message: "Password must be at least 8 characters",
            },
          ],
        };
      case "textarea":
        return {
          ...baseDefaults,
          rows: 4,
          resize: "vertical",
          grid: { colSpan: 12, xs: 12, sm: 12, lg: 12 },
        };
      case "autocomplete":
      case "select":
        return {
          ...baseDefaults,
          options: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
          ],
          clearable: true,
          searchable: type === "autocomplete",
        };
      case "radio":
        return {
          ...baseDefaults,
          options: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
          ],
          direction: "vertical",
        };
      case "checkbox":
        return {
          ...baseDefaults,
          checkboxLabel: "I agree to the terms and conditions",
        };
      case "switch":
        return {
          ...baseDefaults,
          defaultValue: false,
        };
      case "file":
        return {
          ...baseDefaults,
          accept: "image/*",
          maxSize: 5242880, // 5MB
          grid: { colSpan: 12, xs: 12, sm: 12, lg: 12 },
        };
      case "date":
        return {
          ...baseDefaults,
          format: "MM/dd/yyyy",
        };
      case "time":
        return {
          ...baseDefaults,
          timeFormat: "12h",
        };
      case "datetime":
        return {
          ...baseDefaults,
          format: "MM/dd/yyyy HH:mm",
        };
      case "daterange":
        return {
          ...baseDefaults,
          grid: { colSpan: 12, xs: 12, sm: 12, lg: 6 },
        };
      default:
        return baseDefaults;
    }
  };

  const addField = () => {
    const newField: FieldSchema = {
      id: `field_${schema.fields.length + 1}`,
      name: `field_${schema.fields.length + 1}`,
      label: "New Field",
      type: "text",
      ...getFieldDefaults("text"),
    };
    setSchema((prev) => ({ ...prev, fields: [...prev.fields, newField] }));
    setSelectedFieldId(newField.id);
  };

  const removeField = (id: string) => {
    setSchema((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Left Panel: Field List & Controls */}
      <div className="lg:col-span-3 bg-surface-50 border border-border rounded-lg p-4 flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold text-lg">Fields</h2>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "This will replace your current form with the demo schema. Any unsaved changes will be lost. Continue?"
                )
              ) {
                setSchema(KITCHEN_SINK_SCHEMA);
                setSelectedFieldId(null);
              }
            }}
            title="Load Full Feature Demo (Kitchen Sink)"
            className="p-1.5 rounded transition-colors text-slate-500 hover:text-slate-600 hover:bg-surface-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
          </button>
          <div className="flex-1" />

          {/* Copy Schema Button */}
          <button
            onClick={() => {
              const schemaJson = JSON.stringify(schema, null, 2);
              navigator.clipboard.writeText(schemaJson).then(() => {
                // Visual feedback
                const btn = document.getElementById("copy-schema-btn");
                if (btn) {
                  const originalText = btn.innerHTML;
                  btn.innerHTML = "✓ Copied!";
                  btn.classList.add("bg-green-100", "text-green-600");
                  setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove("bg-green-100", "text-green-600");
                  }, 2000);
                }
              });
            }}
            id="copy-schema-btn"
            title="Copy Schema to Clipboard"
            className="p-1.5 rounded transition-colors text-slate-500 hover:text-slate-600 hover:bg-surface-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>

          {/* Download Schema Button */}
          <button
            onClick={() => {
              const schemaJson = JSON.stringify(schema, null, 2);
              const blob = new Blob([schemaJson], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `form-schema-${new Date().toISOString().split("T")[0]}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            title="Download Schema as JSON"
            className="p-1.5 rounded transition-colors text-slate-500 hover:text-slate-600 hover:bg-surface-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>

          {/* Import Schema Button */}
          <button
            onClick={() => {
              document.getElementById("import-schema-input")?.click();
            }}
            title="Import Schema from JSON"
            className="p-1.5 rounded transition-colors text-slate-500 hover:text-slate-600 hover:bg-surface-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </button>
          <input
            id="import-schema-input"
            type="file"
            accept=".json,application/json"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const importedSchema = JSON.parse(event.target?.result as string);
                    if (importedSchema && importedSchema.fields) {
                      setSchema(importedSchema);
                      setSelectedFieldId(null);
                      alert("Schema imported successfully!");
                    } else {
                      alert(
                        "Invalid schema format. Please ensure the JSON file contains a valid FormSchema."
                      );
                    }
                  } catch {
                    alert("Error parsing JSON file. Please ensure it is valid JSON.");
                  }
                };
                reader.readAsText(file);
              }
              // Reset input so the same file can be selected again
              e.target.value = "";
            }}
          />

          <button
            onClick={() => setSelectedFieldId(null)}
            title="Form Global Settings"
            className={`p-1.5 rounded transition-colors ${
              selectedFieldId === null
                ? "bg-primary-100 text-primary-600 dark:bg-primary-900/30"
                : "text-slate-500 hover:text-slate-600 hover:bg-surface-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button
            onClick={addField}
            title="Add New Field"
            className="p-1.5 rounded transition-colors bg-[var(--brand-secondary-orange)] text-white hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {schema.fields.map((field, index) => (
            <div
              key={field.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", index.toString());
                e.dataTransfer.effectAllowed = "move";
              }}
              onDragOver={(e) => {
                e.preventDefault(); // Necessary to allow dropping
                e.dataTransfer.dropEffect = "move";
              }}
              onDrop={(e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
                const toIndex = index;
                if (fromIndex === toIndex) return;

                const newFields = [...schema.fields];
                const [moved] = newFields.splice(fromIndex, 1);
                newFields.splice(toIndex, 0, moved);

                setSchema((prev) => ({ ...prev, fields: newFields }));
              }}
              onClick={() => setSelectedFieldId(field.id)}
              className={`
                        p-3 rounded border cursor-pointer transition-all relative group select-none
                        ${
                          selectedFieldId === field.id
                            ? "border-ring bg-primary-50 dark:bg-primary-900/10"
                            : "border-border hover:border-ring/50"
                        }
                    `}
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400 cursor-grab active:cursor-grabbing">⋮⋮</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{field.label}</div>
                  <div className="text-xs text-slate-500 font-mono truncate">{field.name}</div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeField(field.id);
                }}
                className="absolute top-2 right-2 text-slate-400 hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel: Property Editor */}
      <div className="lg:col-span-4 bg-surface-50 border border-border rounded-lg p-4 h-full overflow-y-auto">
        {activeField ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <button
                onClick={() => setSelectedFieldId(null)}
                className="text-slate-500 hover:text-slate-600 transition-colors bg-surface-100 p-1.5 rounded border border-border shadow-sm md:hidden lg:block"
                title="Back to Global Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="font-semibold text-lg">Field Properties</h2>
              <div className="flex-1 text-right text-xs font-mono text-slate-400 truncate max-w-[120px]">
                {activeField.name}
              </div>
            </div>
            <TextInput
              id="prop-label"
              label="Label"
              value={activeField.label}
              onChange={(e) => updateField(activeField.id, { label: e.target.value })}
            />
            <TextInput
              id="prop-name"
              label="Field Name (Key)"
              value={activeField.name}
              onChange={(e) =>
                updateField(activeField.id, {
                  name: e.target.value,
                  id: e.target.value,
                })
              }
            />

            <Switch
              id="prop-revalidate"
              label="Revalidate on value change"
              checked={activeField.validateOnChange || false}
              onChange={(e) =>
                updateField(activeField.id, {
                  validateOnChange: e.target.checked,
                })
              }
            />

            {activeField.type !== "file" && activeField.type !== "daterange" && (
              <TextInput
                id="prop-default"
                label="Default Value"
                value={activeField.defaultValue || ""}
                onChange={(e) =>
                  updateField(activeField.id, {
                    defaultValue: e.target.value,
                  })
                }
              />
            )}

            <Autocomplete
              id="prop-type"
              label="Type"
              options={FIELD_TYPES}
              value={activeField.type}
              onChange={(value: any) => {
                const newType = value as FieldType;
                const defaults = getFieldDefaults(newType);
                // Merge defaults with existing field, preserving user-configured values
                updateField(activeField.id, {
                  type: newType,
                  ...defaults,
                  // Preserve these critical fields
                  id: activeField.id,
                  name: activeField.name,
                  label: activeField.label,
                });
              }}
            />

            <div className="pt-2">
              <div className="text-xs font-semibold mb-2 text-slate-500">
                Responsive Width (1-12)
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  id="prop-span"
                  label="Default"
                  type="number"
                  min={1}
                  max={12}
                  value={activeField.grid?.colSpan || 12}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      updateField(activeField.id, {
                        grid: { ...activeField.grid, colSpan: val as any },
                      });
                    }
                  }}
                />
                <TextInput
                  id="prop-xs"
                  label="Mobile (XS)"
                  type="number"
                  min={1}
                  max={12}
                  placeholder="Inherit"
                  value={activeField.grid?.xs || ""}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    updateField(activeField.id, {
                      grid: {
                        ...activeField.grid,
                        xs: isNaN(val) ? undefined : (val as any),
                      },
                    });
                  }}
                />
                <TextInput
                  id="prop-sm"
                  label="Tablet (SM)"
                  type="number"
                  min={1}
                  max={12}
                  placeholder="Inherit"
                  value={activeField.grid?.sm || ""}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    updateField(activeField.id, {
                      grid: {
                        ...activeField.grid,
                        sm: isNaN(val) ? undefined : (val as any),
                      },
                    });
                  }}
                />
                <TextInput
                  id="prop-lg"
                  label="Desktop (LG)"
                  type="number"
                  min={1}
                  max={12}
                  placeholder="Inherit"
                  value={activeField.grid?.lg || ""}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    updateField(activeField.id, {
                      grid: {
                        ...activeField.grid,
                        lg: isNaN(val) ? undefined : (val as any),
                      },
                    });
                  }}
                />
              </div>
            </div>

            {/* Field Specific Options */}
            {(activeField.type === "text" ||
              activeField.type === "email" ||
              activeField.type === "url" ||
              activeField.type === "tel" ||
              activeField.type === "number" ||
              activeField.type === "password" ||
              activeField.type === "textarea" ||
              activeField.type === "autocomplete" ||
              activeField.type === "select") && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2">Field Options</h3>
                <TextInput
                  id="prop-placeholder"
                  label="Placeholder"
                  value={activeField.placeholder || ""}
                  onChange={(e) => updateField(activeField.id, { placeholder: e.target.value })}
                />
                <Textarea
                  id="prop-helper-text"
                  label="Helper Text"
                  placeholder="Additional help text shown below the field"
                  rows={2}
                  value={activeField.helperText || ""}
                  onChange={(e) => updateField(activeField.id, { helperText: e.target.value })}
                />

                {/* Text Input Constraints */}
                {(activeField.type === "text" ||
                  activeField.type === "email" ||
                  activeField.type === "url" ||
                  activeField.type === "tel" ||
                  activeField.type === "password" ||
                  activeField.type === "textarea") && (
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <TextInput
                      id="prop-min-length"
                      label="Min Length"
                      type="number"
                      min={0}
                      value={activeField.minLength || ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        updateField(activeField.id, {
                          minLength: isNaN(val) ? undefined : val,
                        });
                      }}
                    />
                    <TextInput
                      id="prop-max-length"
                      label="Max Length"
                      type="number"
                      min={0}
                      value={activeField.maxLength || ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        updateField(activeField.id, {
                          maxLength: isNaN(val) ? undefined : val,
                        });
                      }}
                    />
                  </div>
                )}

                {/* Number Input Constraints */}
                {activeField.type === "number" && (
                  <div className="space-y-2 mt-2">
                    <div className="grid grid-cols-3 gap-2">
                      <TextInput
                        id="prop-min"
                        label="Min Value"
                        type="number"
                        value={activeField.min !== undefined ? activeField.min : ""}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          updateField(activeField.id, {
                            min: isNaN(val) ? undefined : val,
                          });
                        }}
                      />
                      <TextInput
                        id="prop-max"
                        label="Max Value"
                        type="number"
                        value={activeField.max !== undefined ? activeField.max : ""}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          updateField(activeField.id, {
                            max: isNaN(val) ? undefined : val,
                          });
                        }}
                      />
                      <TextInput
                        id="prop-step"
                        label="Step"
                        type="number"
                        value={activeField.step !== undefined ? activeField.step : ""}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          updateField(activeField.id, {
                            step: isNaN(val) ? undefined : val,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Input Mode for better mobile keyboards */}
                {(activeField.type === "text" ||
                  activeField.type === "email" ||
                  activeField.type === "url" ||
                  activeField.type === "tel" ||
                  activeField.type === "number") && (
                  <Autocomplete
                    id="prop-input-mode"
                    label="Input Mode (Mobile Keyboard)"
                    options={[
                      { label: "Default", value: "default" },
                      { label: "Text", value: "text" },
                      { label: "Numeric", value: "numeric" },
                      { label: "Decimal", value: "decimal" },
                      { label: "Tel", value: "tel" },
                      { label: "Email", value: "email" },
                      { label: "URL", value: "url" },
                      { label: "Search", value: "search" },
                    ]}
                    value={activeField.inputMode || "default"}
                    onChange={(val: any) =>
                      updateField(activeField.id, {
                        inputMode: val === "default" ? undefined : val,
                      })
                    }
                  />
                )}

                {(activeField.type === "text" ||
                  activeField.type === "email" ||
                  activeField.type === "url" ||
                  activeField.type === "tel" ||
                  activeField.type === "number" ||
                  activeField.type === "password") && (
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <TextInput
                      id="prop-start-adorn"
                      label="Start Icon/Text"
                      value={activeField.startAdornment || ""}
                      onChange={(e) =>
                        updateField(activeField.id, {
                          startAdornment: e.target.value,
                        })
                      }
                    />
                    <TextInput
                      id="prop-end-adorn"
                      label="End Icon/Text"
                      value={activeField.endAdornment || ""}
                      onChange={(e) =>
                        updateField(activeField.id, {
                          endAdornment: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                {activeField.type === "textarea" && (
                  <div className="mt-2 space-y-2">
                    <TextInput
                      id="prop-rows"
                      label="Initial Rows"
                      type="number"
                      value={activeField.rows || ""}
                      onChange={(e) =>
                        updateField(activeField.id, {
                          rows: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <TextInput
                        id="prop-min-rows"
                        label="Min Lines"
                        type="number"
                        value={activeField.minRows || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            minRows: parseInt(e.target.value) || undefined,
                          })
                        }
                      />
                      <TextInput
                        id="prop-max-rows"
                        label="Max Lines"
                        type="number"
                        value={activeField.maxRows || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            maxRows: parseInt(e.target.value) || undefined,
                          })
                        }
                      />
                    </div>
                    <Autocomplete
                      id="prop-resize"
                      label="Resize Handle"
                      options={[
                        { label: "None (Fixed)", value: "none" },
                        { label: "Vertical", value: "vertical" },
                        { label: "Horizontal", value: "horizontal" },
                        { label: "Both", value: "both" },
                      ]}
                      value={activeField.resize || "none"}
                      onChange={(val: any) =>
                        updateField(activeField.id, {
                          resize: val,
                        })
                      }
                    />
                  </div>
                )}
                {(activeField.type === "autocomplete" || activeField.type === "select") && (
                  <div className="mt-2 space-y-3">
                    <Switch
                      id="prop-multiple"
                      label="Multiple Selection"
                      checked={activeField.multiple || false}
                      onChange={(e) =>
                        updateField(activeField.id, {
                          multiple: e.target.checked,
                        })
                      }
                    />
                    {activeField.type === "autocomplete" && (
                      <TextInput
                        id="prop-async"
                        label="Async Data URL"
                        placeholder="https://api.example.com/search"
                        value={activeField.asyncUrl || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            asyncUrl: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {(activeField.type === "date" ||
              activeField.type === "time" ||
              activeField.type === "datetime" ||
              activeField.type === "daterange") && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2">Date/Time Settings</h3>
                <TextInput
                  id="prop-format"
                  label="Format Pattern"
                  placeholder="e.g. dd/MM/yyyy HH:mm"
                  value={activeField.format || ""}
                  onChange={(e) => updateField(activeField.id, { format: e.target.value })}
                />
              </div>
            )}

            {activeField.type === "file" && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2">File Settings</h3>
                <TextInput
                  id="prop-accept"
                  label="Accepted Types"
                  placeholder=".jpg,.png,image/*"
                  value={activeField.accept || ""}
                  onChange={(e) => updateField(activeField.id, { accept: e.target.value })}
                />
                <div className="mt-2">
                  <TextInput
                    id="prop-maxsize"
                    label="Max Size (MB)"
                    type="number"
                    value={activeField.maxSize ? activeField.maxSize / (1024 * 1024) : ""}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      updateField(activeField.id, {
                        maxSize: isNaN(val) ? undefined : val * 1024 * 1024,
                      });
                    }}
                  />
                </div>
              </div>
            )}

            {activeField.type === "radio" && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2 text-slate-500 uppercase tracking-wider">
                  Orientation (Responsive)
                </h3>
                <div className="space-y-3">
                  <Autocomplete
                    id="prop-direction-xs"
                    label="Mobile (Base)"
                    options={[
                      { label: "Vertical", value: "vertical" },
                      { label: "Horizontal", value: "horizontal" },
                    ]}
                    value={
                      activeField.direction && typeof activeField.direction === "string"
                        ? activeField.direction
                        : (activeField.direction as ResponsiveDirection)?.xs || "vertical"
                    }
                    onChange={(val: any) => {
                      if (typeof activeField.direction === "string") {
                        updateField(activeField.id, {
                          direction: { xs: val as FieldDirection },
                        });
                      } else {
                        updateField(activeField.id, {
                          direction: {
                            ...(activeField.direction as ResponsiveDirection),
                            xs: val as FieldDirection,
                          },
                        });
                      }
                    }}
                  />
                  <Autocomplete
                    id="prop-direction-sm"
                    label="Tablet (SM)"
                    options={[
                      { label: "Inherit", value: "default" },
                      { label: "Vertical", value: "vertical" },
                      { label: "Horizontal", value: "horizontal" },
                    ]}
                    value={
                      typeof activeField.direction === "object"
                        ? (activeField.direction as ResponsiveDirection)?.sm || "default"
                        : "default"
                    }
                    onChange={(val: any) => {
                      const current =
                        typeof activeField.direction === "object"
                          ? (activeField.direction as ResponsiveDirection)
                          : {
                              xs: (activeField.direction as FieldDirection) || "vertical",
                            };
                      updateField(activeField.id, {
                        direction: {
                          ...current,
                          sm: (val === "default" ? undefined : val) as FieldDirection,
                        },
                      });
                    }}
                  />
                  <Autocomplete
                    id="prop-direction-lg"
                    label="Desktop (LG)"
                    options={[
                      { label: "Inherit", value: "default" },
                      { label: "Vertical", value: "vertical" },
                      { label: "Horizontal", value: "horizontal" },
                    ]}
                    value={
                      typeof activeField.direction === "object"
                        ? (activeField.direction as ResponsiveDirection)?.lg || "default"
                        : "default"
                    }
                    onChange={(val: any) => {
                      const current =
                        typeof activeField.direction === "object"
                          ? (activeField.direction as ResponsiveDirection)
                          : {
                              xs: (activeField.direction as FieldDirection) || "vertical",
                            };
                      updateField(activeField.id, {
                        direction: {
                          ...current,
                          lg: (val === "default" ? undefined : val) as FieldDirection,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            )}

            {(activeField.type === "select" ||
              activeField.type === "radio" ||
              activeField.type === "autocomplete") && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2">Options</h3>
                <div className="text-[10px] text-slate-500 mb-2">
                  Format: Label:Value (one per line)
                </div>
                <Textarea
                  id="prop-options"
                  label="Defined Options"
                  rows={5}
                  placeholder="Option 1:opt1&#10;Option 2:opt2"
                  value={activeField.options?.map((o) => `${o.label}:${o.value}`).join("\n") || ""}
                  onChange={(e) => {
                    const lines = e.target.value.split("\n");
                    const opts = lines
                      .map((line) => {
                        if (!line.trim()) return null;
                        const parts = line.split(":");
                        const label = parts[0].trim();
                        const value = parts.length > 1 ? parts.slice(1).join(":").trim() : label;
                        return { label, value };
                      })
                      .filter((o): o is any => !!o);
                    updateField(activeField.id, { options: opts });
                  }}
                />
              </div>
            )}

            {/* File Upload Settings */}
            {activeField.type === "file" && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2 text-slate-500 uppercase tracking-wider">
                  File Upload Settings
                </h3>
                <div className="space-y-3">
                  <TextInput
                    id="prop-accept"
                    label="Accepted File Types"
                    placeholder="e.g. image/*, .pdf, .doc"
                    value={activeField.accept || ""}
                    onChange={(e) => updateField(activeField.id, { accept: e.target.value })}
                  />
                  <TextInput
                    id="prop-max-size"
                    label="Max File Size (bytes)"
                    type="number"
                    placeholder="e.g. 5242880 (5MB)"
                    value={activeField.maxSize || ""}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      updateField(activeField.id, {
                        maxSize: isNaN(val) ? undefined : val,
                      });
                    }}
                  />
                  <Switch
                    id="prop-multiple-files"
                    label="Allow Multiple Files"
                    checked={activeField.multiple || false}
                    onChange={(e) =>
                      updateField(activeField.id, {
                        multiple: e.target.checked,
                      })
                    }
                  />
                  {activeField.multiple && (
                    <TextInput
                      id="prop-max-files"
                      label="Max Number of Files"
                      type="number"
                      min={1}
                      value={activeField.maxFiles || ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        updateField(activeField.id, {
                          maxFiles: isNaN(val) ? undefined : val,
                        });
                      }}
                    />
                  )}
                  <Autocomplete
                    id="prop-preview-mode"
                    label="Preview Mode"
                    options={[
                      { label: "List", value: "list" },
                      { label: "Grid", value: "grid" },
                      { label: "Compact", value: "compact" },
                    ]}
                    value={activeField.previewMode || "list"}
                    onChange={(val: any) => updateField(activeField.id, { previewMode: val })}
                  />
                </div>
              </div>
            )}

            {/* Autocomplete/Select Advanced Settings */}
            {(activeField.type === "autocomplete" || activeField.type === "select") && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2 text-slate-500 uppercase tracking-wider">
                  Advanced Select Settings
                </h3>
                <div className="space-y-3">
                  <Switch
                    id="prop-searchable"
                    label="Searchable"
                    checked={activeField.searchable !== false}
                    onChange={(e) =>
                      updateField(activeField.id, {
                        searchable: e.target.checked,
                      })
                    }
                  />
                  <Switch
                    id="prop-clearable"
                    label="Clearable"
                    checked={activeField.clearable || false}
                    onChange={(e) =>
                      updateField(activeField.id, {
                        clearable: e.target.checked,
                      })
                    }
                  />
                  <Switch
                    id="prop-multiple"
                    label="Multiple Selection"
                    checked={activeField.multiple || false}
                    onChange={(e) =>
                      updateField(activeField.id, {
                        multiple: e.target.checked,
                      })
                    }
                  />
                  {activeField.type === "autocomplete" && (
                    <>
                      <Switch
                        id="prop-creatable"
                        label="Allow Creating New Options"
                        checked={activeField.creatable || false}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            creatable: e.target.checked,
                          })
                        }
                      />
                      <TextInput
                        id="prop-async-url"
                        label="Async Data URL"
                        placeholder="https://api.example.com/options"
                        value={activeField.asyncUrl || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            asyncUrl: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        id="prop-loading-text"
                        label="Loading Text"
                        placeholder="Loading..."
                        value={activeField.loadingText || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            loadingText: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        id="prop-no-options-text"
                        label="No Options Text"
                        placeholder="No options available"
                        value={activeField.noOptionsText || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            noOptionsText: e.target.value,
                          })
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Date/Time Settings */}
            {(activeField.type === "date" ||
              activeField.type === "time" ||
              activeField.type === "datetime" ||
              activeField.type === "daterange") && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2 text-slate-500 uppercase tracking-wider">
                  Date/Time Settings
                </h3>
                <div className="space-y-3">
                  {(activeField.type === "date" ||
                    activeField.type === "datetime" ||
                    activeField.type === "daterange") && (
                    <>
                      <TextInput
                        id="prop-date-format"
                        label="Date Format"
                        placeholder="MM/dd/yyyy"
                        value={activeField.dateFormat || activeField.format || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            dateFormat: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        id="prop-min-date"
                        label="Min Date (ISO)"
                        type="date"
                        value={activeField.minDate || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            minDate: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        id="prop-max-date"
                        label="Max Date (ISO)"
                        type="date"
                        value={activeField.maxDate || ""}
                        onChange={(e) =>
                          updateField(activeField.id, {
                            maxDate: e.target.value,
                          })
                        }
                      />
                    </>
                  )}
                  {(activeField.type === "time" || activeField.type === "datetime") && (
                    <Autocomplete
                      id="prop-time-format"
                      label="Time Format"
                      options={[
                        { label: "12 Hour", value: "12h" },
                        { label: "24 Hour", value: "24h" },
                      ]}
                      value={activeField.timeFormat || "12h"}
                      onChange={(val: any) => updateField(activeField.id, { timeFormat: val })}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Textarea Specific Settings */}
            {activeField.type === "textarea" && (
              <div className="pt-4 border-t border-border mt-4">
                <h3 className="font-medium text-sm mb-2 text-slate-500 uppercase tracking-wider">
                  Textarea Settings
                </h3>
                <div className="space-y-3">
                  <Switch
                    id="prop-auto-grow"
                    label="Auto-grow Height"
                    checked={activeField.autoGrow || false}
                    onChange={(e) =>
                      updateField(activeField.id, {
                        autoGrow: e.target.checked,
                      })
                    }
                  />
                  <Switch
                    id="prop-show-char-count"
                    label="Show Character Count"
                    checked={activeField.showCharCount || false}
                    onChange={(e) =>
                      updateField(activeField.id, {
                        showCharCount: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border mt-4 space-y-4">
              <h3 className="font-medium text-sm">Validation</h3>

              <Switch
                id="prop-req"
                label="Required"
                checked={activeField.validation?.some((r) => r.type === "required") || false}
                onChange={(e) => {
                  const isReq = e.target.checked;
                  const valid = activeField.validation || [];
                  if (isReq) {
                    updateField(activeField.id, {
                      validation: [
                        ...valid,
                        {
                          type: "required",
                          message: `${activeField.label || activeField.name} is required`,
                        },
                      ],
                    });
                  } else {
                    updateField(activeField.id, {
                      validation: valid.filter((r) => r.type !== "required"),
                    });
                  }
                }}
              />
              {activeField.validation?.some((r) => r.type === "required") && (
                <div className="mt-2 ml-1 pl-3 border-l-2 border-border">
                  <TextInput
                    id="prop-req-msg"
                    label="Error Message"
                    placeholder="e.g. This field is required"
                    className="text-sm"
                    value={
                      activeField.validation?.find((r) => r.type === "required")?.message || ""
                    }
                    onChange={(e) => {
                      const msg = e.target.value;
                      const valid = (activeField.validation || []).map((r) =>
                        r.type === "required" ? { ...r, message: msg } : r
                      );
                      updateField(activeField.id, { validation: valid });
                    }}
                  />
                </div>
              )}

              {activeField.type !== "checkbox" && activeField.type !== "switch" && (
                <Switch
                  id="prop-clearable"
                  label="Show Clear Button"
                  checked={activeField.clearable || false}
                  onChange={(e) =>
                    updateField(activeField.id, {
                      clearable: e.target.checked,
                    })
                  }
                />
              )}

              <Switch
                id="prop-disabled"
                label="Disabled"
                checked={activeField.disabled || false}
                onChange={(e) =>
                  updateField(activeField.id, {
                    disabled: e.target.checked,
                  })
                }
              />

              <Switch
                id="prop-readonly"
                label="Read Only"
                checked={activeField.readOnly || false}
                onChange={(e) =>
                  updateField(activeField.id, {
                    readOnly: e.target.checked,
                  })
                }
              />

              {activeField.type === "file" && (
                <div className="space-y-4 pt-2 border-t border-border mt-2">
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    File Settings
                  </h4>
                  <TextInput
                    id="prop-accept"
                    label="Accepted File Types"
                    placeholder="e.g. .pdf, .jpg, image/*"
                    value={activeField.accept || ""}
                    onChange={(e) =>
                      updateField(activeField.id, {
                        accept: e.target.value,
                      })
                    }
                  />
                  <p className="mt-1 text-[10px] text-slate-500">
                    Comma-separated list of file extensions or MIME types
                  </p>
                  <TextInput
                    id="prop-max-size"
                    label="Max File Size (Bytes)"
                    type="number"
                    placeholder="e.g. 1048576 (1MB)"
                    value={activeField.maxSize || ""}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      updateField(activeField.id, {
                        maxSize: isNaN(val) ? undefined : val,
                      });
                    }}
                  />
                  {activeField.maxSize && (
                    <p className="text-[10px] text-slate-500">
                      Equals {(activeField.maxSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
              )}

              {(activeField.type === "text" ||
                activeField.type === "textarea" ||
                activeField.type === "password" ||
                activeField.type === "email" ||
                activeField.type === "url" ||
                activeField.type === "tel") && (
                <>
                  <div className="space-y-4">
                    {/* Min Length */}
                    <div>
                      <TextInput
                        id="prop-min"
                        label="Min Length"
                        type="number"
                        value={
                          activeField.validation?.find((r) => r.type === "minLength")?.value || ""
                        }
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const valid = (activeField.validation || []).filter(
                            (r) => r.type !== "minLength"
                          );
                          const existingWrapper = activeField.validation?.find(
                            (r) => r.type === "minLength"
                          );
                          if (!isNaN(val)) {
                            // Preserve existing message or use default
                            const msg =
                              existingWrapper?.message ||
                              `${
                                activeField.label || activeField.name
                              } must be at least ${val} characters`;
                            valid.push({
                              type: "minLength",
                              value: val,
                              message: msg,
                            });
                          }
                          updateField(activeField.id, { validation: valid });
                        }}
                      />
                      {activeField.validation?.some((r) => r.type === "minLength") && (
                        <div className="mt-1">
                          <TextInput
                            id="prop-min-msg"
                            label="Error Message"
                            placeholder="Error Message"
                            className="text-xs"
                            value={
                              activeField.validation?.find((r) => r.type === "minLength")
                                ?.message || ""
                            }
                            onChange={(e) => {
                              const msg = e.target.value;
                              const valid = (activeField.validation || []).map((r) =>
                                r.type === "minLength" ? { ...r, message: msg } : r
                              );
                              updateField(activeField.id, {
                                validation: valid,
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Max Length */}
                    <div>
                      <TextInput
                        id="prop-max"
                        label="Max Length"
                        type="number"
                        value={
                          activeField.validation?.find((r) => r.type === "maxLength")?.value || ""
                        }
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const valid = (activeField.validation || []).filter(
                            (r) => r.type !== "maxLength"
                          );
                          const existingWrapper = activeField.validation?.find(
                            (r) => r.type === "maxLength"
                          );
                          if (!isNaN(val)) {
                            const msg =
                              existingWrapper?.message ||
                              `${
                                activeField.label || activeField.name
                              } must be at most ${val} characters`;
                            valid.push({
                              type: "maxLength",
                              value: val,
                              message: msg,
                            });
                          }
                          updateField(activeField.id, { validation: valid });
                        }}
                      />
                      {activeField.validation?.some((r) => r.type === "maxLength") && (
                        <div className="mt-1">
                          <TextInput
                            id="prop-max-msg"
                            label="Error Message"
                            placeholder="Error Message"
                            className="text-xs"
                            value={
                              activeField.validation?.find((r) => r.type === "maxLength")
                                ?.message || ""
                            }
                            onChange={(e) => {
                              const msg = e.target.value;
                              const valid = (activeField.validation || []).map((r) =>
                                r.type === "maxLength" ? { ...r, message: msg } : r
                              );
                              updateField(activeField.id, {
                                validation: valid,
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Exact Length */}
                    <div>
                      <TextInput
                        id="prop-length"
                        label="Exact Length"
                        type="number"
                        value={
                          activeField.validation?.find((r) => r.type === "length")?.value || ""
                        }
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const valid = (activeField.validation || []).filter(
                            (r) => r.type !== "length"
                          );
                          const existingWrapper = activeField.validation?.find(
                            (r) => r.type === "length"
                          );
                          if (!isNaN(val)) {
                            const msg =
                              existingWrapper?.message ||
                              `${
                                activeField.label || activeField.name
                              } must be exactly ${val} characters`;
                            valid.push({
                              type: "length",
                              value: val,
                              message: msg,
                            });
                          }
                          updateField(activeField.id, { validation: valid });
                        }}
                      />
                      {activeField.validation?.some((r) => r.type === "length") && (
                        <div className="mt-1">
                          <TextInput
                            id="prop-length-msg"
                            label="Error Message"
                            placeholder="Error Message"
                            className="text-xs"
                            value={
                              activeField.validation?.find((r) => r.type === "length")?.message ||
                              ""
                            }
                            onChange={(e) => {
                              const msg = e.target.value;
                              const valid = (activeField.validation || []).map((r) =>
                                r.type === "length" ? { ...r, message: msg } : r
                              );
                              updateField(activeField.id, {
                                validation: valid,
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4 pt-2">
                    <Autocomplete
                      id="prop-regex-preset"
                      label="Regex Preset"
                      options={PRESET_PATTERNS}
                      value={(() => {
                        const current = activeField.validation?.find(
                          (r) => r.type === "pattern"
                        )?.value;
                        if (!current) return "";
                        const preset = PRESET_PATTERNS.find((p) => p.value === current);
                        return preset ? preset.value : "custom";
                      })()}
                      onChange={(val: any) => {
                        const valid = (activeField.validation || []).filter(
                          (r) => r.type !== "pattern"
                        );
                        if (val && val !== "custom") {
                          valid.push({
                            type: "pattern",
                            value: val,
                            message: `${activeField.label || activeField.name} format is invalid`,
                          });
                        }
                        // If 'custom', we just keep the pattern as is or cleared,
                        // the TextInput below will handle refining it.
                        updateField(activeField.id, { validation: valid });
                      }}
                    />

                    {(activeField.validation?.some((r) => r.type === "pattern") ||
                      !PRESET_PATTERNS.find(
                        (p) =>
                          p.value ===
                          activeField.validation?.find((r) => r.type === "pattern")?.value
                      ) ||
                      // Or if they specifically selected custom but haven't typed yet
                      false) && (
                      <TextInput
                        id="prop-regex"
                        label="Raw Regex Pattern"
                        placeholder="e.g. ^[0-9]*$"
                        value={
                          activeField.validation?.find((r) => r.type === "pattern")?.value || ""
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          const valid = (activeField.validation || []).filter(
                            (r) => r.type !== "pattern"
                          );
                          if (val) {
                            valid.push({
                              type: "pattern",
                              value: val,
                              message: `${activeField.label || activeField.name} format is invalid`,
                            });
                          }
                          updateField(activeField.id, { validation: valid });
                        }}
                      />
                    )}

                    {activeField.validation?.some((r) => r.type === "pattern") && (
                      <div className="pt-2 space-y-2">
                        <TextInput
                          id="prop-regex-msg"
                          label="Pattern Error Message"
                          placeholder="e.g. Invalid format"
                          value={
                            activeField.validation?.find((r) => r.type === "pattern")?.message || ""
                          }
                          onChange={(e) => {
                            const msg = e.target.value;
                            const valid = (activeField.validation || []).map((r) =>
                              r.type === "pattern" ? { ...r, message: msg } : r
                            );
                            updateField(activeField.id, { validation: valid });
                          }}
                        />

                        <Switch
                          id="prop-restrict"
                          label="Restrict Input (Block invalid keys)"
                          checked={activeField.restrictInput || false}
                          onChange={(e) =>
                            updateField(activeField.id, {
                              restrictInput: e.target.checked,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeField.type === "number" && (
                <div className="space-y-4">
                  {/* Min Value */}
                  <div>
                    <TextInput
                      id="prop-min-val"
                      label="Min Value"
                      type="number"
                      value={activeField.validation?.find((r) => r.type === "min")?.value || ""}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        const valid = (activeField.validation || []).filter(
                          (r) => r.type !== "min"
                        );
                        const existingWrapper = activeField.validation?.find(
                          (r) => r.type === "min"
                        );
                        if (!isNaN(val)) {
                          const msg =
                            existingWrapper?.message ||
                            `${activeField.label || activeField.name} must be at least ${val}`;
                          valid.push({
                            type: "min",
                            value: val,
                            message: msg,
                          });
                        }
                        updateField(activeField.id, { validation: valid });
                      }}
                    />
                    {activeField.validation?.some((r) => r.type === "min") && (
                      <div className="mt-1">
                        <TextInput
                          id="prop-min-val-msg"
                          label="Error Message"
                          placeholder="Error Message"
                          className="text-xs"
                          value={
                            activeField.validation?.find((r) => r.type === "min")?.message || ""
                          }
                          onChange={(e) => {
                            const msg = e.target.value;
                            const valid = (activeField.validation || []).map((r) =>
                              r.type === "min" ? { ...r, message: msg } : r
                            );
                            updateField(activeField.id, { validation: valid });
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Max Value */}
                  <div>
                    <TextInput
                      id="prop-max-val"
                      label="Max Value"
                      type="number"
                      value={activeField.validation?.find((r) => r.type === "max")?.value || ""}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        const valid = (activeField.validation || []).filter(
                          (r) => r.type !== "max"
                        );
                        const existingWrapper = activeField.validation?.find(
                          (r) => r.type === "max"
                        );
                        if (!isNaN(val)) {
                          const msg =
                            existingWrapper?.message ||
                            `${activeField.label || activeField.name} must be at most ${val}`;
                          valid.push({
                            type: "max",
                            value: val,
                            message: msg,
                          });
                        }
                        updateField(activeField.id, { validation: valid });
                      }}
                    />
                    {activeField.validation?.some((r) => r.type === "max") && (
                      <div className="mt-1">
                        <TextInput
                          id="prop-max-val-msg"
                          label="Error Message"
                          placeholder="Error Message"
                          className="text-xs"
                          value={
                            activeField.validation?.find((r) => r.type === "max")?.message || ""
                          }
                          onChange={(e) => {
                            const msg = e.target.value;
                            const valid = (activeField.validation || []).map((r) =>
                              r.type === "max" ? { ...r, message: msg } : r
                            );
                            updateField(activeField.id, { validation: valid });
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Step */}
                  <div>
                    <TextInput
                      id="prop-step"
                      label="Step / Multiple Of"
                      type="number"
                      value={activeField.validation?.find((r) => r.type === "step")?.value || ""}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        const valid = (activeField.validation || []).filter(
                          (r) => r.type !== "step"
                        );
                        const existingWrapper = activeField.validation?.find(
                          (r) => r.type === "step"
                        );
                        if (!isNaN(val)) {
                          const msg =
                            existingWrapper?.message ||
                            `${activeField.label || activeField.name} must be a multiple of ${val}`;
                          valid.push({
                            type: "step",
                            value: val,
                            message: msg,
                          });
                        }
                        updateField(activeField.id, { validation: valid });
                      }}
                    />
                    {activeField.validation?.some((r) => r.type === "step") && (
                      <div className="mt-1">
                        <TextInput
                          id="prop-step-msg"
                          label="Error Message"
                          placeholder="Error Message"
                          className="text-xs"
                          value={
                            activeField.validation?.find((r) => r.type === "step")?.message || ""
                          }
                          onChange={(e) => {
                            const msg = e.target.value;
                            const valid = (activeField.validation || []).map((r) =>
                              r.type === "step" ? { ...r, message: msg } : r
                            );
                            updateField(activeField.id, { validation: valid });
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* UI Customization */}
            <div className="pt-4 border-t border-border mt-4">
              <h3 className="font-medium text-sm mb-2 text-slate-500 uppercase tracking-wider">
                UI Customization
              </h3>
              <div className="space-y-3">
                <Autocomplete
                  id="prop-variant"
                  label="Input Variant"
                  options={[
                    { label: "Default", value: "default" },
                    { label: "Outlined", value: "outlined" },
                    { label: "Filled", value: "filled" },
                    { label: "Standard", value: "standard" },
                  ]}
                  value={activeField.variant || "default"}
                  onChange={(val: any) =>
                    updateField(activeField.id, {
                      variant: val === "default" ? undefined : val,
                    })
                  }
                />
                <Autocomplete
                  id="prop-size"
                  label="Input Size"
                  options={[
                    { label: "Default", value: "default" },
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                  ]}
                  value={activeField.size || "default"}
                  onChange={(val: any) =>
                    updateField(activeField.id, {
                      size: val === "default" ? undefined : val,
                    })
                  }
                />
                <Autocomplete
                  id="prop-color"
                  label="Color Theme"
                  options={[
                    { label: "Default", value: "default" },
                    { label: "Primary", value: "primary" },
                    { label: "Secondary", value: "secondary" },
                    { label: "Success", value: "success" },
                    { label: "Error", value: "error" },
                    { label: "Warning", value: "warning" },
                    { label: "Info", value: "info" },
                  ]}
                  value={activeField.color || "default"}
                  onChange={(val: any) =>
                    updateField(activeField.id, {
                      color: val === "default" ? undefined : val,
                    })
                  }
                />
                <Switch
                  id="prop-dense"
                  label="Dense/Compact Spacing"
                  checked={activeField.dense || false}
                  onChange={(e) => updateField(activeField.id, { dense: e.target.checked })}
                />
                <Switch
                  id="prop-full-width"
                  label="Full Width"
                  checked={activeField.fullWidth !== false}
                  onChange={(e) => updateField(activeField.id, { fullWidth: e.target.checked })}
                />
              </div>
            </div>

            {/* State & Behavior */}
            <div className="pt-4 border-t border-border mt-4">
              <h3 className="font-medium text-sm mb-2 text-slate-500 uppercase tracking-wider">
                State & Behavior
              </h3>
              <div className="space-y-3">
                <Switch
                  id="prop-disabled"
                  label="Disabled"
                  checked={activeField.disabled || false}
                  onChange={(e) => updateField(activeField.id, { disabled: e.target.checked })}
                />
                <Switch
                  id="prop-readonly"
                  label="Read Only"
                  checked={activeField.readOnly || false}
                  onChange={(e) => updateField(activeField.id, { readOnly: e.target.checked })}
                />
                <Switch
                  id="prop-autofocus"
                  label="Auto Focus on Mount"
                  checked={activeField.autoFocus || false}
                  onChange={(e) => updateField(activeField.id, { autoFocus: e.target.checked })}
                />
                <Switch
                  id="prop-validate-blur"
                  label="Validate on Blur"
                  checked={activeField.validateOnBlur || false}
                  onChange={(e) =>
                    updateField(activeField.id, {
                      validateOnBlur: e.target.checked,
                    })
                  }
                />
                <TextInput
                  id="prop-debounce"
                  label="Debounce Validation (ms)"
                  type="number"
                  min={0}
                  placeholder="e.g. 300"
                  value={activeField.debounceValidation || ""}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    updateField(activeField.id, {
                      debounceValidation: isNaN(val) ? undefined : val,
                    });
                  }}
                />
                <TextInput
                  id="prop-tooltip"
                  label="Tooltip Text"
                  placeholder="Helpful tooltip for users"
                  value={activeField.tooltip || ""}
                  onChange={(e) => updateField(activeField.id, { tooltip: e.target.value })}
                />
                <Autocomplete
                  id="prop-transform"
                  label="Text Transform"
                  options={[
                    { label: "None", value: "default" },
                    { label: "Uppercase", value: "uppercase" },
                    { label: "Lowercase", value: "lowercase" },
                    { label: "Capitalize", value: "capitalize" },
                  ]}
                  value={activeField.transform || "default"}
                  onChange={(val: any) =>
                    updateField(activeField.id, {
                      transform: val === "default" ? undefined : val,
                    })
                  }
                />
              </div>
            </div>

            {/* Visibility Rules Editor */}
            <div className="pt-4 border-t border-border mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Visibility (Show when...)</h3>
                <Switch
                  id="prop-reserve-space"
                  label="Reserve Space"
                  checked={activeField.reserveSpace || false}
                  onChange={(e) =>
                    updateField(activeField.id, {
                      reserveSpace: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="space-y-3">
                {activeField.visibilityRules?.map((rule, index) => (
                  <div
                    key={index}
                    className="p-3 bg-surface-100 dark:bg-slate-800 rounded-lg border border-border space-y-3 relative group"
                  >
                    <button
                      onClick={() => {
                        const newRules = [...(activeField.visibilityRules || [])];
                        newRules.splice(index, 1);
                        updateField(activeField.id, {
                          visibilityRules: newRules,
                        });
                      }}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                    >
                      &times;
                    </button>

                    <Autocomplete
                      id={`rule-field-${index}`}
                      label="Depends on field"
                      options={schema.fields
                        .filter((f) => f.id !== activeField.id)
                        .map((f) => ({
                          label: f.label || f.name,
                          value: f.name,
                        }))}
                      value={rule.field}
                      onChange={(val: any) => {
                        const newRules = [...(activeField.visibilityRules || [])];
                        newRules[index] = { ...rule, field: val };
                        updateField(activeField.id, {
                          visibilityRules: newRules,
                        });
                      }}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Autocomplete
                        id={`rule-op-${index}`}
                        label="Operator"
                        options={VISIBILITY_OPERATORS}
                        value={rule.operator}
                        onChange={(val: any) => {
                          const newRules = [...(activeField.visibilityRules || [])];
                          newRules[index] = { ...rule, operator: val };
                          updateField(activeField.id, {
                            visibilityRules: newRules,
                          });
                        }}
                      />
                      <TextInput
                        id={`rule-val-${index}`}
                        label="Value"
                        value={String(rule.value)}
                        onChange={(e) => {
                          const newRules = [...(activeField.visibilityRules || [])];
                          let val: any = e.target.value;
                          // Simple auto-casting for common types
                          if (val === "true") val = true;
                          if (val === "false") val = false;
                          if (!isNaN(Number(val)) && val !== "") val = Number(val);

                          newRules[index] = { ...rule, value: val };
                          updateField(activeField.id, {
                            visibilityRules: newRules,
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full py-2 border-2 border-dashed border-border rounded-lg text-xs text-slate-500 hover:border-primary-500 hover:text-primary-600 transition-all flex items-center justify-center gap-2"
                onClick={() => {
                  const otherFields = schema.fields.filter((f) => f.id !== activeField.id);
                  if (otherFields.length === 0) return;

                  const newRule: VisibilityRule = {
                    field: otherFields[0].name,
                    operator: "eq",
                    value: "true",
                  };
                  updateField(activeField.id, {
                    visibilityRules: [...(activeField.visibilityRules || []), newRule],
                  });
                }}
              >
                <span>+ Add Visibility Rule</span>
              </button>
            </div>

            {/* Disable Rules Editor */}
            <div className="pt-4 border-t border-border mt-4 space-y-4">
              <h3 className="font-medium text-sm">Disable (Disable when...)</h3>

              <div className="space-y-3">
                {activeField.disableRules?.map((rule, index) => (
                  <div
                    key={index}
                    className="p-3 bg-surface-100 dark:bg-slate-800 rounded-lg border border-border space-y-3 relative group"
                  >
                    <button
                      onClick={() => {
                        const newRules = [...(activeField.disableRules || [])];
                        newRules.splice(index, 1);
                        updateField(activeField.id, {
                          disableRules: newRules,
                        });
                      }}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                    >
                      &times;
                    </button>

                    <Autocomplete
                      id={`disable-rule-field-${index}`}
                      label="Depends on field"
                      options={schema.fields
                        .filter((f) => f.id !== activeField.id)
                        .map((f) => ({
                          label: f.label || f.name,
                          value: f.name,
                        }))}
                      value={rule.field}
                      onChange={(val: any) => {
                        const newRules = [...(activeField.disableRules || [])];
                        newRules[index] = { ...rule, field: val };
                        updateField(activeField.id, {
                          disableRules: newRules,
                        });
                      }}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Autocomplete
                        id={`disable-rule-op-${index}`}
                        label="Operator"
                        options={VISIBILITY_OPERATORS}
                        value={rule.operator}
                        onChange={(val: any) => {
                          const newRules = [...(activeField.disableRules || [])];
                          newRules[index] = { ...rule, operator: val };
                          updateField(activeField.id, {
                            disableRules: newRules,
                          });
                        }}
                      />
                      <TextInput
                        id={`disable-rule-val-${index}`}
                        label="Value"
                        value={String(rule.value)}
                        onChange={(e) => {
                          const newRules = [...(activeField.disableRules || [])];
                          let val: any = e.target.value;
                          if (val === "true") val = true;
                          if (val === "false") val = false;
                          if (!isNaN(Number(val)) && val !== "") val = Number(val);

                          newRules[index] = { ...rule, value: val };
                          updateField(activeField.id, {
                            disableRules: newRules,
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full py-2 border-2 border-dashed border-border rounded-lg text-xs text-slate-500 hover:border-primary-500 hover:text-primary-600 transition-all flex items-center justify-center gap-2"
                onClick={() => {
                  const otherFields = schema.fields.filter((f) => f.id !== activeField.id);
                  if (otherFields.length === 0) return;

                  const newRule: VisibilityRule = {
                    field: otherFields[0].name,
                    operator: "eq",
                    value: "true",
                  };
                  updateField(activeField.id, {
                    disableRules: [...(activeField.disableRules || []), newRule],
                  });
                }}
              >
                <span>+ Add Disable Rule</span>
              </button>
            </div>

            {/* Clear Value Rules Editor */}
            <div className="pt-4 border-t border-border mt-4 space-y-4">
              <h3 className="font-medium text-sm">Clear Value (Clear when...)</h3>

              <div className="space-y-3">
                {activeField.clearValueRules?.map((rule, index) => (
                  <div
                    key={index}
                    className="p-3 bg-surface-100 dark:bg-slate-800 rounded-lg border border-border space-y-3 relative group"
                  >
                    <button
                      onClick={() => {
                        const newRules = [...(activeField.clearValueRules || [])];
                        newRules.splice(index, 1);
                        updateField(activeField.id, {
                          clearValueRules: newRules,
                        });
                      }}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                    >
                      &times;
                    </button>

                    <Autocomplete
                      id={`clear-rule-field-${index}`}
                      label="Depends on field"
                      options={schema.fields
                        .filter((f) => f.id !== activeField.id)
                        .map((f) => ({
                          label: f.label || f.name,
                          value: f.name,
                        }))}
                      value={rule.field}
                      onChange={(val: any) => {
                        const newRules = [...(activeField.clearValueRules || [])];
                        newRules[index] = { ...rule, field: val };
                        updateField(activeField.id, {
                          clearValueRules: newRules,
                        });
                      }}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Autocomplete
                        id={`clear-rule-op-${index}`}
                        label="Operator"
                        options={VISIBILITY_OPERATORS}
                        value={rule.operator}
                        onChange={(val: any) => {
                          const newRules = [...(activeField.clearValueRules || [])];
                          newRules[index] = { ...rule, operator: val };
                          updateField(activeField.id, {
                            clearValueRules: newRules,
                          });
                        }}
                      />
                      <TextInput
                        id={`clear-rule-val-${index}`}
                        label="Value"
                        value={String(rule.value)}
                        onChange={(e) => {
                          const newRules = [...(activeField.clearValueRules || [])];
                          let val: any = e.target.value;
                          if (val === "true") val = true;
                          if (val === "false") val = false;
                          if (!isNaN(Number(val)) && val !== "") val = Number(val);

                          newRules[index] = { ...rule, value: val };
                          updateField(activeField.id, {
                            clearValueRules: newRules,
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full py-2 border-2 border-dashed border-border rounded-lg text-xs text-slate-500 hover:border-primary-500 hover:text-primary-600 transition-all flex items-center justify-center gap-2"
                onClick={() => {
                  const otherFields = schema.fields.filter((f) => f.id !== activeField.id);
                  if (otherFields.length === 0) return;

                  const newRule: VisibilityRule = {
                    field: otherFields[0].name,
                    operator: "eq",
                    value: "true",
                  };
                  updateField(activeField.id, {
                    clearValueRules: [...(activeField.clearValueRules || []), newRule],
                  });
                }}
              >
                <span>+ Add Clear Value Rule</span>
              </button>
            </div>

            {/* Placeholder for more advanced props like Dependencies, Validation RegEx, etc. */}

            <div className="mt-8 p-3 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs">
              <p className="mb-1 font-semibold text-slate-500">JSON Fragment</p>
              {JSON.stringify(activeField, null, 2)}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-lg">Global Settings</h2>
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="text-xs bg-primary-600 text-white px-3 py-1.5 rounded hover:bg-primary-700 flex items-center gap-2"
              >
                <span>Open Preview</span>
                <span className="text-[10px] opacity-70">↗</span>
              </button>
            </div>

            {/* Form Info */}
            <div className="space-y-4 p-4 bg-surface-100 dark:bg-slate-800 rounded border border-border">
              <h3 className="font-medium text-sm border-b border-border pb-2 mb-3">Form Info</h3>
              <TextInput
                id="form-title"
                label="Title"
                value={schema.title || ""}
                onChange={(e) => setSchema((s) => ({ ...s, title: e.target.value }))}
              />
              <TextInput
                id="form-desc"
                label="Description"
                value={schema.description || ""}
                onChange={(e) => setSchema((s) => ({ ...s, description: e.target.value }))}
              />
            </div>

            {/* Spacing */}
            <div className="space-y-4 p-4 bg-surface-100 dark:bg-slate-800 rounded border border-border">
              <h3 className="font-medium text-sm border-b border-border pb-2 mb-3">
                Spacing & Styling
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  id="style-padding"
                  label="Form Padding"
                  value={String(schema.styling?.spacing?.formPadding ?? 6)}
                  onChange={(e) =>
                    setSchema((s) => ({
                      ...s,
                      styling: {
                        ...s.styling,
                        spacing: {
                          ...s.styling?.spacing,
                          formPadding: Number(e.target.value),
                        },
                      },
                    }))
                  }
                  type="number"
                />
                <TextInput
                  id="style-gap"
                  label="Field Gap"
                  value={String(schema.styling?.spacing?.fieldGap ?? 4)}
                  onChange={(e) =>
                    setSchema((s) => ({
                      ...s,
                      styling: {
                        ...s.styling,
                        spacing: {
                          ...s.styling?.spacing,
                          fieldGap: Number(e.target.value),
                        },
                      },
                    }))
                  }
                  type="number"
                />
              </div>
            </div>

            {/* Responsive */}
            <div className="space-y-4 p-4 bg-surface-100 dark:bg-slate-800 rounded border border-border">
              <h3 className="font-medium text-sm border-b border-border pb-2 mb-3">
                Responsive Layout
              </h3>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Mobile (default)</label>
                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    id="resp-mobile-cols"
                    label="Columns"
                    value={String(schema.styling?.responsive?.mobile?.columns ?? 1)}
                    onChange={(e) =>
                      setSchema((s) => ({
                        ...s,
                        styling: {
                          ...s.styling,
                          responsive: {
                            ...s.styling?.responsive,
                            mobile: {
                              ...s.styling?.responsive?.mobile,
                              columns: Number(e.target.value),
                            },
                          },
                        },
                      }))
                    }
                    type="number"
                  />
                  <TextInput
                    id="resp-mobile-gap"
                    label="Gap"
                    value={String(schema.styling?.responsive?.mobile?.gap ?? 4)}
                    onChange={(e) =>
                      setSchema((s) => ({
                        ...s,
                        styling: {
                          ...s.styling,
                          responsive: {
                            ...s.styling?.responsive,
                            mobile: {
                              ...s.styling?.responsive?.mobile,
                              gap: Number(e.target.value),
                            },
                          },
                        },
                      }))
                    }
                    type="number"
                  />
                </div>
              </div>

              {/* Tablet */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Tablet (sm/md)</label>
                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    id="resp-tablet-cols"
                    label="Columns"
                    value={String(schema.styling?.responsive?.tablet?.columns ?? 2)}
                    onChange={(e) =>
                      setSchema((s) => ({
                        ...s,
                        styling: {
                          ...s.styling,
                          responsive: {
                            ...s.styling?.responsive,
                            tablet: {
                              ...s.styling?.responsive?.tablet,
                              columns: Number(e.target.value),
                            },
                          },
                        },
                      }))
                    }
                    type="number"
                  />
                  <TextInput
                    id="resp-tablet-gap"
                    label="Gap"
                    value={String(schema.styling?.responsive?.tablet?.gap ?? 4)}
                    onChange={(e) =>
                      setSchema((s) => ({
                        ...s,
                        styling: {
                          ...s.styling,
                          responsive: {
                            ...s.styling?.responsive,
                            tablet: {
                              ...s.styling?.responsive?.tablet,
                              gap: Number(e.target.value),
                            },
                          },
                        },
                      }))
                    }
                    type="number"
                  />
                </div>
              </div>

              {/* Desktop */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Desktop (lg/xl)</label>
                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    id="resp-desktop-cols"
                    label="Columns"
                    value={String(
                      schema.styling?.responsive?.desktop?.columns ?? schema.layout?.columns ?? 12
                    )}
                    onChange={(e) =>
                      setSchema((s) => ({
                        ...s,
                        styling: {
                          ...s.styling,
                          responsive: {
                            ...s.styling?.responsive,
                            desktop: {
                              ...s.styling?.responsive?.desktop,
                              columns: Number(e.target.value),
                            },
                          },
                        },
                      }))
                    }
                    type="number"
                  />
                  <TextInput
                    id="resp-desktop-gap"
                    label="Gap"
                    value={String(schema.styling?.responsive?.desktop?.gap ?? 6)}
                    onChange={(e) =>
                      setSchema((s) => ({
                        ...s,
                        styling: {
                          ...s.styling,
                          responsive: {
                            ...s.styling?.responsive,
                            desktop: {
                              ...s.styling?.responsive?.desktop,
                              gap: Number(e.target.value),
                            },
                          },
                        },
                      }))
                    }
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel: Live Preview */}
      <div className="lg:col-span-5 bg-surface-50 border border-border rounded-lg p-6 h-full overflow-y-auto shadow-inner">
        <div className="mb-6 flex justify-between items-end">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-lg">Preview</h2>
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-border flex items-center gap-1 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6" />
                <path d="M9 21H3v-6" />
                <path d="M21 3l-7 7" />
                <path d="M3 21l7-7" />
              </svg>
              Full Preview
            </button>
          </div>
          <span className="text-xs text-slate-400">Live Render</span>
        </div>

        <div className="bg-background rounded-lg border border-border shadow-sm min-h-[300px] overflow-hidden">
          <div
            style={{
              transform: "scale(0.7)",
              transformOrigin: "top left",
              width: "142.8%",
              height: "142.8%",
            }}
            className="p-8"
          >
            <SchemaForm
              key={JSON.stringify(schema)} // Ensure state resets when field names/types change
              schema={schema}
              onSubmit={(val) => setSubmitResult(val)}
              ref={inlineFormRef}
              hideTitle
            />
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border/50">
              <button
                onClick={() => inlineFormRef.current?.reset()}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Reset
              </button>
              <button
                onClick={() => inlineFormRef.current?.submit()}
                className="px-4 py-1.5 bg-primary text-white text-xs font-medium rounded hover:bg-primary-700 transition-colors shadow-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-4">
          <h3 className="font-semibold text-sm mb-2 text-slate-500">Generated Schema</h3>
          <pre className="p-3 bg-slate-900 text-slate-50 rounded text-xs overflow-auto max-h-60">
            {JSON.stringify(schema, null, 2)}
          </pre>
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-lg">{schema.title || "Form Preview"}</h2>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs border border-white/10">
                Live Mode
              </span>
            </div>

            {/* Device Toggles */}
            <div className="flex bg-slate-800 rounded-lg p-1 gap-1 border border-white/10">
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-all ${
                  previewDevice === "mobile"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "hover:bg-slate-700 text-slate-300"
                }`}
              >
                <span>📱</span>
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setPreviewDevice("tablet")}
                className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-all ${
                  previewDevice === "tablet"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "hover:bg-slate-700 text-slate-300"
                }`}
              >
                <span>🖥</span>
                <span>Tablet</span>
              </button>
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-all ${
                  previewDevice === "desktop"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "hover:bg-slate-700 text-slate-300"
                }`}
              >
                <span>💻</span>

                <span>Desktop</span>
              </button>
            </div>

            <button
              onClick={() => setIsPreviewOpen(false)}
              className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>

          {/* Content Preview */}
          <div className="flex-1 overflow-y-auto bg-slate-950/50 flex justify-center p-8 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
            <div
              className={`bg-white dark:bg-slate-950 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out border border-border flex flex-col mb-8`}
              style={{
                width:
                  previewDevice === "mobile"
                    ? "375px"
                    : previewDevice === "tablet"
                      ? "768px"
                      : "100%",
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              <div className="border-b border-border p-3 bg-surface-50 dark:bg-slate-900 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-500/50" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-400 font-mono">
                  {previewDevice === "mobile"
                    ? "375px × 812px"
                    : previewDevice === "tablet"
                      ? "768px × 1024px"
                      : "Desktop View"}
                </div>
              </div>

              <div
                className="p-8 h-full bg-background overflow-y-auto"
                style={{
                  padding: `${(schema.styling?.spacing?.formPadding ?? 6) * 0.25}rem`,
                }}
              >
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2">{schema.title || "Form Title"}</h1>
                  {schema.description && <p className="text-slate-500">{schema.description}</p>}
                </div>
                <SchemaForm
                  key={JSON.stringify(schema) + previewDevice}
                  ref={previewFormRef}
                  schema={schema}
                  onSubmit={(val) => setSubmitResult(val)}
                  breakpoint={previewDevice}
                  hideTitle
                />
                <div className="mt-8 pt-6 border-t border-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => previewFormRef.current?.reset()}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => previewFormRef.current?.submit()}
                    className="px-6 py-2 bg-[var(--brand-secondary-orange)] text-white rounded hover:opacity-90 transition-colors shadow-sm font-medium"
                  >
                    Submit Form
                  </button>
                </div>
              </div>
            </div>

            {/* Submission Result Overlay */}
            {submitResult && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col border border-border">
                  <div className="p-4 border-b border-border flex items-center justify-between bg-surface-50">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <span className="text-green-500">✓</span> Form Submitted
                    </h3>
                    <button
                      onClick={() => setSubmitResult(null)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="p-4 overflow-y-auto bg-slate-50 dark:bg-slate-950">
                    <pre className="text-xs font-mono bg-white dark:bg-slate-900 p-4 rounded border border-border overflow-auto">
                      {JSON.stringify(submitResult, null, 2)}
                    </pre>
                  </div>
                  <div className="p-4 border-t border-border bg-surface-50 flex justify-end">
                    <button
                      onClick={() => setSubmitResult(null)}
                      className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
