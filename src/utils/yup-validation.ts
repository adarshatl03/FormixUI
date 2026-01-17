import * as yup from "yup";
import type { FormSchema } from "@/types/schema";

export const generateYupSchema = (schema: FormSchema) => {
  const shape: Record<string, any> = {};

  schema.fields.forEach((field) => {
    let validator: any = yup.mixed();
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
        validator = yup.string();
        break;

      case "email":
        validator = yup.string().email("Invalid email address");
        break;

      case "number":
        validator = yup.number();
        break;

      case "checkbox":
      case "switch":
        validator = yup.boolean();
        break;

      case "date":
      case "time":
      case "datetime":
      case "daterange":
        validator = yup.mixed();
        break;

      case "file":
        validator = yup.mixed();
        break;

      default:
        validator = yup.mixed();
    }

    // Apply Validation Rules
    rules.forEach((rule) => {
      switch (rule.type) {
        case "minLength":
          if (validator.min) {
            validator = validator.min(
              rule.value as number,
              rule.message || `Min length is ${rule.value}`
            );
          }
          break;
        case "maxLength":
          if (validator.max) {
            validator = validator.max(
              rule.value as number,
              rule.message || `Max length is ${rule.value}`
            );
          }
          break;
        case "min":
          if (validator.min) {
            validator = validator.min(
              rule.value as number,
              rule.message || `Min value is ${rule.value}`
            );
          }
          break;
        case "max":
          if (validator.max) {
            validator = validator.max(
              rule.value as number,
              rule.message || `Max value is ${rule.value}`
            );
          }
          break;
        case "pattern":
          if (validator.matches) {
            validator = validator.matches(
              new RegExp(rule.value as string),
              rule.message || "Invalid format"
            );
          }
          break;
      }
    });

    // Required Handling
    const requiredRule = rules.find((r) => r.type === "required");
    if (requiredRule) {
      validator = validator.required(requiredRule.message || "Required");
    } else {
      validator = validator.nullable().optional();
    }

    if (!field.hidden) {
      shape[field.name] = validator;
    }
  });

  return yup.object().shape(shape);
};
