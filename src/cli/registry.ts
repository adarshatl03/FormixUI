const COMPONENTS_BASE_PATH = "src/components/ui";
const THEME_BASE_PATH = "src/components/theme";

export interface ComponentDefinition {
  name: string;
  files: string[]; // Relative to package root
  dependencies?: string[]; // npm packages
  internalDependencies?: string[]; // other registry components
  type?: "core" | "component";
}

export const registry: Record<string, ComponentDefinition> = {
  // CORE UTILS (Theme System)
  "theme-core": {
    name: "theme-core",
    files: [
      `${THEME_BASE_PATH}/ThemeContext.tsx`,
      `${THEME_BASE_PATH}/defaultTheme.ts`,
      `${THEME_BASE_PATH}/types.ts`,
      "src/utils/validation.ts",
      "src/utils/yup-validation.ts",
      "src/components/SchemaForm.tsx",
      "src/components/FormikSchemaForm.tsx",
    ],
    dependencies: ["clsx", "tailwind-merge", "zod", "yup", "formik"],
    type: "core",
  },

  // FORM INPUTS
  "text-input": {
    name: "text-input",
    files: [`${COMPONENTS_BASE_PATH}/TextInput.tsx`],
    internalDependencies: ["theme-core"],
  },
  textarea: {
    name: "textarea",
    files: [`${COMPONENTS_BASE_PATH}/Textarea.tsx`],
    internalDependencies: ["theme-core"],
  },
  select: {
    name: "select",
    files: [`${COMPONENTS_BASE_PATH}/Select.tsx`],
    internalDependencies: ["theme-core"],
  },
  checkbox: {
    name: "checkbox",
    files: [`${COMPONENTS_BASE_PATH}/Checkbox.tsx`],
    internalDependencies: ["theme-core"],
  },
  "radio-group": {
    name: "radio-group",
    files: [`${COMPONENTS_BASE_PATH}/RadioGroup.tsx`],
    internalDependencies: ["theme-core"],
  },
  switch: {
    name: "switch",
    files: [`${COMPONENTS_BASE_PATH}/Switch.tsx`],
    internalDependencies: ["theme-core"],
  },
  "file-input": {
    name: "file-input",
    files: [`${COMPONENTS_BASE_PATH}/FileInput.tsx`],
    internalDependencies: ["theme-core"],
  },

  // COMPLEX COMPONENTS
  autocomplete: {
    name: "autocomplete",
    files: [
      `${COMPONENTS_BASE_PATH}/select/Autocomplete.tsx`,
      `${COMPONENTS_BASE_PATH}/select/Chip.tsx`,
      `${COMPONENTS_BASE_PATH}/select/types.ts`,
    ],
    internalDependencies: ["theme-core"],
  },
  "date-picker": {
    name: "date-picker",
    files: [
      `${COMPONENTS_BASE_PATH}/date/DatePicker.tsx`,
      `${COMPONENTS_BASE_PATH}/date/Calendar.tsx`,
    ],
    dependencies: ["date-fns"],
    internalDependencies: ["theme-core"],
  },
  "date-range-picker": {
    name: "date-range-picker",
    files: [
      `${COMPONENTS_BASE_PATH}/date/DateRangePicker.tsx`,
      `${COMPONENTS_BASE_PATH}/date/Calendar.tsx`,
    ],
    dependencies: ["date-fns"],
    internalDependencies: ["theme-core"],
  },
  "date-time-picker": {
    name: "date-time-picker",
    files: [
      `${COMPONENTS_BASE_PATH}/date/DateTimePicker.tsx`,
      `${COMPONENTS_BASE_PATH}/date/Calendar.tsx`,
      `${COMPONENTS_BASE_PATH}/date/TimeView.tsx`,
    ],
    dependencies: ["date-fns"],
    internalDependencies: ["theme-core"],
  },
  "time-picker": {
    name: "time-picker",
    files: [
      `${COMPONENTS_BASE_PATH}/date/TimePicker.tsx`,
      `${COMPONENTS_BASE_PATH}/date/TimeView.tsx`,
    ],
    dependencies: ["date-fns"],
    internalDependencies: ["theme-core"],
  },
};

export const getComponent = (name: string): ComponentDefinition | undefined => {
  return registry[name];
};
