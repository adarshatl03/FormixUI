import { z } from "zod";
import type { FormSchema, FieldSchema } from "../types/schema";

/**
 * Enhanced getByPath: Checks for flat key FIRST (best for dot-notated names in flat state)
 * Falls back to nested access if flat key is not found.
 */
export const getByPath = (obj: any, path: string) => {
  if (!obj || !path) return undefined;

  // Try flat key first
  if (Object.prototype.hasOwnProperty.call(obj, path)) return obj[path];

  // Try nested access
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    if (typeof current !== "object") return undefined;
    current = current[part];
  }
  return current;
};

// Check if field is visible using flat-friendly access
export function checkVisibility(field: FieldSchema, values: any) {
  if (!field.visibilityRules || field.visibilityRules.length === 0) return true;

  return field.visibilityRules.every((rule) => {
    const val = getByPath(values, rule.field);

    switch (rule.operator) {
      case "eq":
        return val === rule.value;
      case "neq":
        return val !== rule.value;
      case "in":
        return Array.isArray(rule.value) && rule.value.includes(val);
      case "contains":
        return Array.isArray(val) && val.includes(rule.value);
      case "gt":
        return val > rule.value;
      case "lt":
        return val < rule.value;
      default:
        return true;
    }
  });
}

/**
 * Check if field should be disabled based on disable rules
 */
export function checkDisabled(field: FieldSchema, values: any): boolean {
  // If field is already disabled in schema, keep it disabled
  if (field.disabled) return true;

  // If no disable rules, not disabled
  if (!field.disableRules || field.disableRules.length === 0) return false;

  // Field is disabled if ALL disable rules are met
  return field.disableRules.every((rule) => {
    const val = getByPath(values, rule.field);

    switch (rule.operator) {
      case "eq":
        return val === rule.value;
      case "neq":
        return val !== rule.value;
      case "in":
        return Array.isArray(rule.value) && rule.value.includes(val);
      case "contains":
        return Array.isArray(val) && val.includes(rule.value);
      case "gt":
        return val > rule.value;
      case "lt":
        return val < rule.value;
      default:
        return false;
    }
  });
}

/**
 * Check if field value should be cleared based on clear value rules
 */
export function checkShouldClearValue(
  field: FieldSchema,
  values: any,
  previousValues?: any
): boolean {
  if (!field.clearValueRules || field.clearValueRules.length === 0) return false;

  // Field value should be cleared if ALL clear value rules are met
  return field.clearValueRules.every((rule) => {
    const val = getByPath(values, rule.field);
    const prevVal = previousValues ? getByPath(previousValues, rule.field) : undefined;

    switch (rule.operator) {
      case "eq":
        return val === rule.value;
      case "neq":
        return val !== rule.value;
      case "in":
        return Array.isArray(rule.value) && rule.value.includes(val);
      case "contains":
        return Array.isArray(val) && val.includes(rule.value);
      case "gt":
        return val > rule.value;
      case "lt":
        return val < rule.value;
      case "changed":
        // Clear if the dependent field's value has changed
        return previousValues !== undefined && val !== prevVal;
      default:
        return false;
    }
  });
}

/**
 * Generates flat defaults for fields, even those with dot-notation
 */
export function generateDefaultValues(schema: FormSchema) {
  const defaults: Record<string, any> = {};
  schema.fields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      defaults[field.name] = field.defaultValue;
    } else {
      switch (field.type) {
        case "checkbox":
        case "switch":
          defaults[field.name] = false;
          break;
        case "daterange":
          defaults[field.name] = { start: null, end: null };
          break;
        case "autocomplete":
        case "select":
          defaults[field.name] = field.multiple ? [] : "";
          break;
        case "file":
          defaults[field.name] = null;
          break;
        case "number":
          defaults[field.name] = "";
          break;
        default:
          defaults[field.name] = "";
      }
    }
  });
  return defaults;
}

/**
 * Generates a Zod schema that treats field.name as a flat key.
 * Strictly follows the order: Base Type -> Basic Rules -> Special Refinement (Required) -> Optionality.
 */
export function generateZodSchema(schema: FormSchema) {
  const shape: Record<string, z.ZodTypeAny> = {};

  schema.fields.forEach((field) => {
    // 1. Define Base Type
    let fieldSchema: any;

    switch (field.type) {
      case "number":
        fieldSchema = z.preprocess(
          (val) => (val === "" || val === null || val === undefined ? undefined : val),
          z.coerce.number({ invalid_type_error: "Must be a number" })
        );
        break;
      case "checkbox":
      case "switch":
        fieldSchema = z.boolean();
        break;
      case "daterange":
        fieldSchema = z.object({
          start: z.any(),
          end: z.any(),
        });
        break;
      case "autocomplete":
      case "select":
      case "radio":
        if (field.multiple) {
          fieldSchema = z.array(z.union([z.string(), z.number()]));
        } else {
          fieldSchema = z.union([z.string(), z.number(), z.literal("")]);
        }
        break;
      case "date":
      case "datetime":
      case "time":
        fieldSchema = z.any();
        break;
      default:
        fieldSchema = z.string();
    }

    // 2. Apply Basic Rules (min, max, email, pattern)
    // We use .refine() for many of these so they can skip empty strings
    // and let the 'required' logic handle the priority correctly.
    if (field.validation) {
      field.validation.forEach((rule) => {
        if (rule.type === "required") return;
        const msg = rule.message || "Invalid";

        if (rule.type === "email" && typeof fieldSchema.email === "function") {
          fieldSchema = fieldSchema.email({ message: msg });
        } else if (
          rule.type === "minLength" &&
          (field.type === "text" || field.type === "textarea" || field.type === "password")
        ) {
          const minLen = rule.value;
          fieldSchema = fieldSchema.refine((val: string) => val === "" || val.length >= minLen, {
            message: msg,
          });
        } else if (
          rule.type === "maxLength" &&
          (field.type === "text" || field.type === "textarea" || field.type === "password")
        ) {
          const maxLen = rule.value;
          fieldSchema = fieldSchema.refine((val: string) => val === "" || val.length <= maxLen, {
            message: msg,
          });
        } else if (
          rule.type === "length" &&
          (field.type === "text" || field.type === "textarea" || field.type === "password")
        ) {
          const exactLen = rule.value;
          fieldSchema = fieldSchema.refine((val: string) => val === "" || val.length === exactLen, {
            message: msg,
          });
        } else if (
          rule.type === "pattern" &&
          (field.type === "text" ||
            field.type === "textarea" ||
            field.type === "password" ||
            field.type === "email" ||
            field.type === "url" ||
            field.type === "tel")
        ) {
          const regexStr = rule.value;
          fieldSchema = fieldSchema.refine(
            (val: string) => {
              if (val === "") return true;
              try {
                return new RegExp(regexStr).test(val);
              } catch {
                return true;
              }
            },
            { message: msg }
          );
        } else if (
          rule.type === "min" &&
          (field.type === "number" || typeof fieldSchema.min === "function")
        ) {
          const minVal = rule.value;
          fieldSchema = fieldSchema.refine(
            (val: any) => val === "" || val === null || val === undefined || val >= minVal,
            { message: msg }
          );
        } else if (
          rule.type === "max" &&
          (field.type === "number" || typeof fieldSchema.max === "function")
        ) {
          const maxVal = rule.value;
          fieldSchema = fieldSchema.refine(
            (val: any) => val === "" || val === null || val === undefined || val <= maxVal,
            { message: msg }
          );
        } else if (
          rule.type === "step" &&
          (field.type === "number" || typeof fieldSchema.multipleOf === "function")
        ) {
          const stepVal = rule.value;
          fieldSchema = fieldSchema.refine(
            (val: any) =>
              val === "" || val === null || val === undefined || Number(val) % stepVal === 0,
            { message: msg }
          );
        }
      });
    }

    // 3. Apply "Required" refinement AFTER basic rules.
    const isRequired = field.validation?.some((v) => v.type === "required");
    if (isRequired) {
      const reqMsg = field.validation?.find((v) => v.type === "required")?.message || "Required";

      fieldSchema = fieldSchema.refine(
        (val: any) => {
          if (val === null || val === undefined || val === "") return false;
          if (Array.isArray(val) && val.length === 0) return false;
          if (field.type === "daterange" && (!val.start || !val.end)) return false;
          if (field.type === "checkbox" || field.type === "switch") return val === true;
          return true;
        },
        { message: reqMsg }
      );
    }

    // 4. Transform to Optional if not required
    if (!isRequired && field.type !== "checkbox" && field.type !== "switch") {
      fieldSchema = fieldSchema.optional().nullable().or(z.literal(""));
    }

    shape[field.name] = fieldSchema;
  });

  return z.object(shape);
}
