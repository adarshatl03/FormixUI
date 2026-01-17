import { z } from "zod";
import type { FormSchema } from "@/types/schema";

export const generateZodSchema = (schema: FormSchema) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  schema.fields.forEach((field) => {
    let validator: z.ZodTypeAny = z.any();
    const rules = field.validation || [];

    // Map base types
    switch (field.type) {
      case "text":
      case "textarea":
      case "password":
      case "url":
      case "tel":
      case "select":
      case "radio":
      case "autocomplete":
        validator = z.string();
        break;

      case "email":
        validator = z.string(); // We'll add .email() via rules or default
        // If email type but no specific rule, add email validation default?
        // Usually better to rely on rules, but 'type: email' implies email validation.
        validator = (validator as z.ZodString).email({
          message: "Invalid email address",
        });
        break;

      case "number":
        validator = z.number();
        break;

      case "checkbox":
      case "switch":
        validator = z.boolean();
        break;

      case "date":
      case "time":
      case "datetime":
      case "daterange":
        // Standard date inputs
        validator = z.any(); // flexible for Date object or string
        break;

      case "file":
        validator = z.any(); // File or FileList
        break;

      default:
        validator = z.any();
    }

    // Apply Validation Rules
    rules.forEach((rule) => {
      switch (rule.type) {
        case "minLength":
          if (validator instanceof z.ZodString) {
            validator = validator.min(rule.value as number, {
              message: rule.message || `Min length is ${rule.value}`,
            });
          }
          break;
        case "maxLength":
          if (validator instanceof z.ZodString) {
            validator = validator.max(rule.value as number, {
              message: rule.message || `Max length is ${rule.value}`,
            });
          }
          break;
        case "length":
          if (validator instanceof z.ZodString) {
            validator = validator.length(rule.value as number, {
              message: rule.message || `Length must be exactly ${rule.value}`,
            });
          }
          break;
        case "min":
          if (validator instanceof z.ZodNumber) {
            validator = validator.min(rule.value as number, {
              message: rule.message || `Min value is ${rule.value}`,
            });
          }
          break;
        case "max":
          if (validator instanceof z.ZodNumber) {
            validator = validator.max(rule.value as number, {
              message: rule.message || `Max value is ${rule.value}`,
            });
          }
          break;
        case "pattern":
          if (validator instanceof z.ZodString) {
            validator = validator.regex(new RegExp(rule.value as string), {
              message: rule.message || "Invalid format",
            });
          }
          break;
        case "step":
          if (validator instanceof z.ZodNumber) {
            validator = validator.step(rule.value as number, {
              message: rule.message || `Must be multiple of ${rule.value}`,
            });
          }
          break;
        // email, url are handled by type usually, but if explicit rule exists:
        case "email":
          if (validator instanceof z.ZodString) {
            validator = validator.email({
              message: rule.message || "Invalid email",
            });
          }
          break;
        case "url":
          if (validator instanceof z.ZodString) {
            validator = validator.url({
              message: rule.message || "Invalid URL",
            });
          }
          break;
      }
    });

    // File Validation (MaxSize)
    if (field.type === "file" && field.maxSize) {
      validator = validator.refine(
        (val) => {
          if (!val) return true; // Skip if optional (handled later)

          // If FileList (browser native)
          if (typeof FileList !== "undefined" && val instanceof FileList) {
            return Array.from(val).every((f: any) => f.size <= (field.maxSize || 0));
          }
          // If Array of files
          if (Array.isArray(val)) {
            return val.every((f: any) => f.size <= (field.maxSize || 0));
          }
          // Single File
          if ((val as any).size) {
            return (val as any).size <= (field.maxSize || 0);
          }
          return true;
        },
        {
          message: `File size must be less than ${(field.maxSize / 1024 / 1024).toFixed(2)} MB`,
        }
      );
    }

    // Required Handling
    const requiredRule = rules.find((r) => r.type === "required");
    if (requiredRule) {
      // It is required
      // For string validation, Zod .min(1) is best for required
      if (validator instanceof z.ZodString) {
        validator = validator.min(1, {
          message: requiredRule.message || "Required",
        });
      } else {
        // for others, just ensure not null/undefined/empty
        validator = validator.refine((val) => val !== null && val !== undefined && val !== "", {
          message: requiredRule.message || "Required",
        });
      }
    } else {
      // Optional
      validator = validator.optional().or(z.null()).or(z.literal(""));
    }

    if (!field.hidden) {
      shape[field.name] = validator;
    }
  });

  return z.object(shape);
};
