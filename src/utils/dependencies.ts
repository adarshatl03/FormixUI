import type { FieldSchema } from "@/types/schema";

export const evaluateVisibility = (
  field: FieldSchema,
  formData: Record<string, any>
): boolean => {
  if (field.hidden) return false;
  if (!field.visibilityRules || field.visibilityRules.length === 0) return true;

  // We treat multiple rules as AND by default (all must be true to show)
  // Could be extensible to OR later.
  return field.visibilityRules.every((rule) => {
    const dependentValue = formData[rule.field];

    switch (rule.operator) {
      case "eq":
        return dependentValue === rule.value;
      case "neq":
        return dependentValue !== rule.value;
      case "in":
        return Array.isArray(rule.value) && rule.value.includes(dependentValue);
      case "nin":
        return (
          Array.isArray(rule.value) && !rule.value.includes(dependentValue)
        );
      default:
        return true;
    }
  });
};
