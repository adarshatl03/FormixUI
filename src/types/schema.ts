export type FieldDirection = "horizontal" | "vertical";

export interface ResponsiveDirection {
  xs?: FieldDirection;
  sm?: FieldDirection;
  md?: FieldDirection;
  lg?: FieldDirection;
}

export type FieldType =
  | "text"
  | "email"
  | "url"
  | "tel"
  | "number"
  | "password"
  | "textarea"
  | "select" // Native select
  | "autocomplete" // Custom detailed select
  | "date"
  | "time"
  | "datetime"
  | "daterange"
  | "checkbox"
  | "switch"
  | "radio"
  | "file";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface ValidationRule {
  type:
    | "required"
    | "min"
    | "max"
    | "minLength"
    | "maxLength"
    | "length"
    | "email"
    | "url"
    | "pattern"
    | "step"
    | "regex"
    | "custom"
    | "fileSize"
    | "fileType"
    | "minDate"
    | "maxDate"
    | "integer"
    | "positive"
    | "negative"
    | "nonZero";
  value?: any;
  message?: string;
}

export interface GridProps {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Default (often sm or md)
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Mobile (< 640px)
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Tablet (>= 640px)
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Laptop (>= 768px)
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Desktop (>= 1024px)
  rowSpan?: number;
}

export interface VisibilityRule {
  field: string;
  operator: "eq" | "neq" | "in" | "contains" | "gt" | "lt" | "nin" | "changed";
  value: any;
}

export interface FieldSchema {
  id: string; // Unique identifier for the field definition
  name: string; // Path in the form data object (e.g., "user.firstName")
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  helperText?: string; // Helper text shown below the field
  errorMessage?: string; // Custom error message

  // Components Props
  options?: SelectOption[]; // For select, radio, autocomplete
  multiple?: boolean; // For autocomplete, select, file
  restrictInput?: boolean;
  clearable?: boolean;
  asyncUrl?: string; // URL for fetching options asynchronously
  startAdornment?: string; // We'll assume simple string/icon name for JSON schema
  endAdornment?: string;
  direction?: FieldDirection | ResponsiveDirection;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
  format?: string;
  accept?: string;
  maxSize?: number;

  // Text/Number Input Specific
  min?: number; // Min value for number, min date for date
  max?: number; // Max value for number, max date for date
  step?: number; // Step for number input
  minLength?: number; // Min length for text
  maxLength?: number; // Max length for text
  pattern?: string; // Regex pattern for validation
  autocomplete?: string; // HTML autocomplete attribute
  inputMode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

  // File Upload Specific
  maxFiles?: number; // Max number of files for multiple upload
  allowedExtensions?: string[]; // Allowed file extensions
  previewMode?: "list" | "grid" | "compact"; // Preview display mode

  // Date/Time Specific
  minDate?: string; // ISO date string
  maxDate?: string; // ISO date string
  disabledDates?: string[]; // Array of disabled dates
  dateFormat?: string; // Display format for date
  timeFormat?: "12h" | "24h"; // Time format

  // Autocomplete/Select Specific
  searchable?: boolean; // Enable search in options
  creatable?: boolean; // Allow creating new options
  grouped?: boolean; // Options are grouped
  virtualScroll?: boolean; // Enable virtual scrolling for large lists
  loadingText?: string; // Text shown while loading async options
  noOptionsText?: string; // Text shown when no options available

  // Textarea Specific
  autoGrow?: boolean; // Auto-grow textarea
  showCharCount?: boolean; // Show character count

  // Checkbox/Radio/Switch Specific
  checkboxLabel?: string; // Label for single checkbox
  indeterminate?: boolean; // Support indeterminate state for checkbox

  // UI Customization
  variant?: "outlined" | "filled" | "standard"; // Input variant
  size?: "small" | "medium" | "large"; // Input size
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info"; // Color theme
  fullWidth?: boolean; // Take full width of container
  dense?: boolean; // Compact spacing

  // Layout
  grid?: GridProps;

  // State
  disabled?: boolean;
  hidden?: boolean;
  readOnly?: boolean;
  required?: boolean; // Mark field as required
  autoFocus?: boolean; // Auto-focus on mount

  // Validation (Serializable Zod effectively)
  validation?: ValidationRule[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceValidation?: number; // Debounce validation in ms

  // Dynamic Props (Dependencies)
  visibilityRules?: VisibilityRule[];
  disableRules?: VisibilityRule[]; // Same structure as visibility rules
  clearValueRules?: VisibilityRule[]; // Clears field value when conditions are met
  reserveSpace?: boolean;

  // Advanced
  tooltip?: string; // Tooltip text
  prefix?: string; // Prefix text/icon
  suffix?: string; // Suffix text/icon
  mask?: string; // Input mask pattern
  transform?: "uppercase" | "lowercase" | "capitalize"; // Text transformation
}

export interface FormSchema {
  id?: string;
  title?: string;
  description?: string;
  fields: FieldSchema[];
  layout?: {
    columns?: number; // Default 12
    gap?: number; // Tailwind spacing scale
  };
  styling?: {
    spacing?: {
      formPadding?: number; // Tailwind spacing scale (0-96)
      fieldGap?: number; // Gap between fields
      sectionGap?: number; // Gap between sections
    };
    responsive?: {
      mobile?: {
        columns?: number;
        gap?: number;
      };
      tablet?: {
        columns?: number;
        gap?: number;
      };
      desktop?: {
        columns?: number;
        gap?: number;
      };
    };
  };
}
