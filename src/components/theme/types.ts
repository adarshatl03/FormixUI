// State interface that most inputs share
export interface ComponentState {
  error?: boolean | string;
  disabled?: boolean;
  focused?: boolean;
  checked?: boolean; // for checkbox/radio/switch
  value?: any;
  variant?: "outline" | "filled" | "standard" | "floating";
}

// A style definition can be a static string (Tailwind classes)
// or a function that returns a string based on state.
export type StyleOrFn = string | ((state: ComponentState) => string);

export interface ComponentTheme {
  // Common slots
  root?: StyleOrFn;
  label?: StyleOrFn;
  input?: StyleOrFn;
  helperText?: StyleOrFn;
  errorText?: StyleOrFn;

  // Slots specific to complex components
  wrapper?: StyleOrFn; // e.g. input wrapper
  icon?: StyleOrFn; // e.g. checkbox icon
  track?: StyleOrFn; // e.g. switch track
  thumb?: StyleOrFn; // e.g. switch thumb
  list?: StyleOrFn; // e.g. autocomplete list
  item?: StyleOrFn; // e.g. autocomplete item
  tag?: StyleOrFn; // e.g. autocomplete chip
}

export interface FormTheme {
  global?: ComponentTheme;
  textInput: ComponentTheme;
  textarea: ComponentTheme;
  select: ComponentTheme;
  checkbox: ComponentTheme;
  radio: ComponentTheme;
  switch: ComponentTheme;
  autocomplete: ComponentTheme;
  fileInput: ComponentTheme;
  datePicker: ComponentTheme;
  dateRangePicker: ComponentTheme;
  dateTimePicker: ComponentTheme;
  timePicker: ComponentTheme;
}
