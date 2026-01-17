import { useMemo, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useForm } from "../hooks/useForm";
import type { FormSchema, FieldSchema } from "../types/schema";
import {
  generateDefaultValues,
  generateZodSchema,
  checkVisibility,
  checkDisabled,
  checkShouldClearValue,
  getByPath,
} from "../lib/schema-helpers";
import { generateYupSchema } from "../utils/yup-validation";
import { GridContainer, GridItem } from "./ui/Grid";

// Theming
import { ThemeProvider, useFormTheme } from "./theme/ThemeContext";
import type { FormTheme } from "./theme/types";

// Components
import { TextInput } from "./ui/TextInput";
import { Textarea } from "./ui/Textarea";
import { Checkbox } from "./ui/Checkbox";
import { Switch } from "./ui/Switch";
import { RadioGroup } from "./ui/RadioGroup";
import { Autocomplete } from "./ui/select/Autocomplete";
import { DatePicker, TimePicker, DateTimePicker, DateRangePicker } from "./ui/date";
import { FileInput } from "./ui/FileInput";

interface SchemaFormProps {
  schema: FormSchema;
  onSubmit: (values: any) => void;
  initialValues?: any;
  className?: string;
  debug?: boolean;
  breakpoint?: "mobile" | "tablet" | "desktop";
  hideTitle?: boolean;
  id?: string;
  onValidate?: (values: any) => Record<string, string>;
  onValuesChange?: (values: any) => void;
  validationLib?: "zod" | "yup";
  /**
   * Optional theme override for this form.
   * If provided, all fields within this form will use this theme.
   */
  theme?: FormTheme;
}

export interface SchemaFormHandle {
  submit: () => void;
  reset: () => void;
}

export const SchemaForm = forwardRef<SchemaFormHandle, SchemaFormProps>(
  (
    {
      schema,
      onSubmit,
      initialValues: providedValues,
      className = "",
      debug = false,
      breakpoint,
      hideTitle = false,
      id = "schema-form",
      onValidate,
      onValuesChange,
      validationLib = "zod",
      theme, // New Prop
    },
    ref
  ) => {
    // Memoize validation schema and defaults
    const validationSchema = useMemo(() => {
      if (validationLib === "yup") {
        return generateYupSchema(schema);
      }
      return generateZodSchema(schema);
    }, [schema, validationLib]);
    const defaultValues = useMemo(
      () => providedValues || generateDefaultValues(schema),
      [schema, providedValues]
    );

    const { values, errors, touched, setFieldValue, handleBlur, handleSubmit, isSubmitted, reset } =
      useForm({
        initialValues: defaultValues,
        schema: validationSchema,
        onSubmit,
        validate: onValidate,
        mode: "onSubmit", // or onChange
      });

    // Theme Resolution:
    // We capture the "current" theme from context (if any) or default.
    // If props.theme is passed, it takes precedence.
    const parentTheme = useFormTheme();
    const activeTheme = theme || parentTheme;

    // Track previous values for "changed" operator
    const previousValuesRef = useRef<any>(values);

    useEffect(() => {
      previousValuesRef.current = values;
      if (onValuesChange) {
        onValuesChange(values);
      }
    }, [values, onValuesChange]);

    useImperativeHandle(ref, () => ({
      submit: () => {
        handleSubmit({
          preventDefault: () => {},
        } as React.FormEvent);
      },
      reset: () => {
        reset();
      },
    }));

    // Render Field Helper
    const renderField = (field: FieldSchema) => {
      const isVisible = checkVisibility(field, values) && !field.hidden;

      // Check if field value should be cleared (pass previous values for "changed" operator)
      const shouldClearValue = checkShouldClearValue(field, values, previousValuesRef.current);
      const currentValue = getByPath(values, field.name);

      // Side effect: Clear value if rules are met
      if (
        shouldClearValue &&
        currentValue !== "" &&
        currentValue !== null &&
        currentValue !== undefined
      ) {
        // Determine appropriate empty value based on field type
        let emptyValue: any = "";
        if (field.type === "daterange") {
          emptyValue = { start: null, end: null };
        } else if ((field.type === "autocomplete" || field.type === "select") && field.multiple) {
          emptyValue = [];
        } else if (field.type === "checkbox" || field.type === "switch") {
          emptyValue = false;
        } else if (
          field.type === "date" ||
          field.type === "time" ||
          field.type === "datetime" ||
          field.type === "file"
        ) {
          emptyValue = null;
        }

        // Clear the value
        setFieldValue(field.name, emptyValue);
      }

      if (!isVisible) return null;

      // Check if field should be disabled based on rules
      const isDisabled = checkDisabled(field, values);

      const commonProps = {
        id: field.name,
        label: field.label,
        placeholder: field.placeholder,
        disabled: isDisabled, // Use dynamic disabled state
        required: field.validation?.some((r) => r.type === "required"),
        error: isSubmitted || touched[field.name] ? errors[field.name] : undefined,
        startAdornment: field.startAdornment,
        endAdornment: field.endAdornment,
        fullWidth: true,
        // Bindings
        value: getByPath(values, field.name),
        onChange: (val: any) => setFieldValue(field.name, val, field.validateOnChange),
        onBlur: () => handleBlur(field.name),
        onClear: field.clearable
          ? () => {
              if (field.type === "daterange") {
                setFieldValue(field.name, { start: null, end: null });
              } else if (
                (field.type === "autocomplete" || field.type === "select") &&
                field.multiple
              ) {
                setFieldValue(field.name, []);
              } else {
                setFieldValue(field.name, "");
              }
            }
          : undefined,
        pattern: field.validation?.find((r) => r.type === "pattern")?.value,
      };

      const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = e.target.value;

        // Real-time restriction logic
        if (field.restrictInput && val !== "") {
          const patternRule = field.validation?.find((r) => r.type === "pattern");
          if (patternRule) {
            try {
              // We create a "permissive" version of the regex for real-time typing
              // by removing anchors and allowing partial matches if possible,
              // or just checking if the full string violates the core pattern.
              const regex = new RegExp(patternRule.value);

              // If the regex is a simple character class like ^[A-Za-z]+$,
              // we can test if the new string is still valid.
              if (!regex.test(val)) {
                // Check if it's at least a prefix for common patterns
                // For simplicity in this engine: if it doesn't match and restriction is on, we block
                // unless the regex is complex.
                return;
              }
            } catch {
              // fallback to allowing if regex is invalid
            }
          }
        }

        setFieldValue(field.name, val, field.validateOnChange);
      };

      switch (field.type) {
        case "text":
        case "password":
        case "number":
        case "email":
        case "url":
        case "tel":
          return (
            <TextInput
              type={field.type}
              {...commonProps}
              onChange={handleTextChange}
              onBlur={() => handleBlur(field.name)}
              startAdornment={field.startAdornment}
              endAdornment={field.endAdornment}
            />
          );
        case "textarea":
          return (
            <Textarea
              {...commonProps}
              onChange={handleTextChange}
              onBlur={() => handleBlur(field.name)}
              rows={field.rows}
              minRows={field.minRows}
              maxRows={field.maxRows}
              resize={field.resize}
            />
          );
        case "checkbox":
          // Checkbox value is boolean
          return (
            <Checkbox
              {...commonProps}
              checked={!!getByPath(values, field.name)}
              onChange={(e) => setFieldValue(field.name, e.target.checked, field.validateOnChange)}
            />
          );
        case "switch":
          return (
            <Switch
              {...commonProps}
              checked={!!getByPath(values, field.name)}
              onChange={(e) => setFieldValue(field.name, e.target.checked, field.validateOnChange)}
            />
          );
        case "radio":
          return (
            <RadioGroup
              {...commonProps}
              name={field.name}
              options={field.options || []}
              direction={field.direction}
              value={getByPath(values, field.name)}
              // RadioGroup onChange passes value directly
              onChange={(val) => setFieldValue(field.name, val, field.validateOnChange)}
            />
          );
        case "select":
        case "autocomplete":
          return (
            <Autocomplete
              {...commonProps}
              options={field.options || []}
              multiple={field.multiple}
              loadOptions={
                field.asyncUrl
                  ? async (query) => {
                      try {
                        // Basic fetch implementation expecting JSON array of Options
                        const url = new URL(field.asyncUrl!);
                        url.searchParams.set("q", query);
                        const res = await fetch(url.toString());
                        if (!res.ok) throw new Error("Fetch error");
                        const data = await res.json();
                        return Array.isArray(data) ? data : [];
                      } catch (e) {
                        console.error("Async load failed", e);
                        return [];
                      }
                    }
                  : undefined
              }
            />
          );
        case "date":
          return <DatePicker {...commonProps} format={field.format} />;
        case "time":
          return <TimePicker {...commonProps} format={field.format} />;
        case "datetime":
          return <DateTimePicker {...commonProps} format={field.format} />;
        case "daterange":
          return (
            <DateRangePicker
              {...commonProps}
              format={field.format}
              showTime={field.format?.includes("HH") || field.format?.includes("mm")}
            />
          );
        /* Removed duplicate email/url/tel cases */
        case "file": {
          return (
            <FileInput
              {...commonProps}
              value={values[field.name]}
              onChange={(file) => setFieldValue(field.name, file, field.validateOnChange)}
              multiple={field.multiple}
              accept={field.accept}
              maxSize={field.maxSize}
            />
          );
        }
        default:
          // Fallback for types not strictly matched like 'email' if schema uses them as field type but we map them to text
          // But our FieldType enum doesn't include email/url anymore, they are text + validation.
          // If a legacy schema passes 'email', it goes to default.
          // Let's safe fallback to TextInput
          return (
            <TextInput
              type="text"
              {...commonProps}
              onChange={(e) => setFieldValue(field.name, e.target.value, field.validateOnChange)}
              onBlur={() => handleBlur(field.name)}
            />
          );
      }
    };

    return (
      <ThemeProvider value={activeTheme}>
        <form id={id} onSubmit={handleSubmit} className={`w-full ${className}`} noValidate>
          {schema.title && !hideTitle && (
            <h2 className="text-2xl font-bold mb-4 text-foreground">{schema.title}</h2>
          )}

          <GridContainer gap={schema.styling?.spacing?.fieldGap ?? schema.layout?.gap}>
            {schema.fields.map((field) => {
              // Calculate responsive props if breakpoint is enforced (Preview Mode)
              let gridProps = {
                colSpan: field.grid?.colSpan || 12,
                xs: field.grid?.xs,
                sm: field.grid?.sm,
                md: field.grid?.md,
                lg: field.grid?.lg,
              };

              if (breakpoint) {
                let resolved = 12;
                if (breakpoint === "mobile") {
                  resolved = field.grid?.xs || 12;
                } else if (breakpoint === "tablet") {
                  resolved = field.grid?.sm || field.grid?.colSpan || 12;
                } else {
                  resolved = field.grid?.lg || field.grid?.sm || field.grid?.colSpan || 12;
                }
                // Override to force specific span without media queries
                gridProps = {
                  colSpan: resolved as any,
                  xs: resolved as any,
                  sm: undefined,
                  md: undefined,
                  lg: undefined,
                };
              }

              const isVisible = checkVisibility(field, values) && !field.hidden;
              if (!isVisible && !field.reserveSpace) return null;

              return (
                <GridItem key={field.id} {...gridProps}>
                  {renderField(field)}
                </GridItem>
              );
            })}
          </GridContainer>

          {isSubmitted && Object.keys(errors).length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>
                Please fix the {Object.keys(errors).length} errors highlighted above before
                submitting.
              </span>
            </div>
          )}

          {debug && (
            <div className="mt-8 space-y-4">
              <div className="text-xs font-bold uppercase text-slate-400">Debug Information</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-[10px] mb-1 text-slate-500">VALUES</div>
                  <pre className="p-4 bg-slate-100 dark:bg-slate-800 rounded text-xs overflow-auto text-foreground border border-border max-h-60">
                    {JSON.stringify(values, null, 2)}
                  </pre>
                </div>
                <div>
                  <div className="text-[10px] mb-1 text-slate-500">ERRORS</div>
                  <pre className="p-4 bg-slate-100 dark:bg-slate-800 rounded text-xs overflow-auto text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 max-h-60">
                    {JSON.stringify(errors, null, 2)}
                  </pre>
                </div>
                <div>
                  <div className="text-[10px] mb-1 text-slate-500">TOUCHED</div>
                  <pre className="p-4 bg-slate-100 dark:bg-slate-800 rounded text-xs overflow-auto text-foreground border border-border max-h-60">
                    {JSON.stringify(touched, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </form>
      </ThemeProvider>
    );
  }
);

SchemaForm.displayName = "SchemaForm";
