import { Type, List, Calendar, CheckSquare, FileText, Layout } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { Autocomplete } from "../ui/select/Autocomplete";
import { DatePicker } from "../ui/date/DatePicker";
import { DateRangePicker } from "../ui/date/DateRangePicker";
import { DateTimePicker } from "../ui/date/DateTimePicker";
import { TimePicker } from "../ui/date/TimePicker";
import { Checkbox } from "../ui/Checkbox";
import { Switch } from "../ui/Switch";
import { RadioGroup } from "../ui/RadioGroup";
import { FileInput } from "../ui/FileInput";
import type { PropConfig } from "./types";

export interface ComponentConfig {
  title: string;
  description: string;
  icon: any;
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  propDefinitions: Record<string, PropConfig>;
}

export const COMPONENTS: Record<string, ComponentConfig> = {
  textInput: {
    title: "Text Input",
    description: "Standard input field for text data.",
    icon: Type,
    component: TextInput,
    defaultProps: {
      label: "Username",
      placeholder: "Enter username",
      fullWidth: true,
      required: false,
      disabled: false,
      variant: "outline",
    },
    propDefinitions: {
      label: { type: "string" },
      placeholder: { type: "string" },
      error: { type: "string", label: "Error Message" },
      fullWidth: { type: "boolean" },
      required: { type: "boolean" },
      disabled: { type: "boolean" },
      variant: { type: "select", options: ["outline", "filled", "standard", "floating"] },
      type: { type: "select", options: ["text", "email", "password", "url", "tel", "number"] },
    },
  },
  textarea: {
    title: "Textarea",
    description: "Multi-line text input for longer responses.",
    icon: FileText,
    component: Textarea,
    defaultProps: {
      label: "Biography",
      placeholder: "Tell us about yourself...",
      rows: 4,
      fullWidth: true,
      variant: "outline",
    },
    propDefinitions: {
      label: { type: "string" },
      placeholder: { type: "string" },
      rows: { type: "number" },
      error: { type: "string" },
      fullWidth: { type: "boolean" },
      disabled: { type: "boolean" },
      variant: { type: "select", options: ["outline", "filled", "standard", "floating"] },
    },
  },
  select: {
    title: "Select",
    description: "Native selection dropdown.",
    icon: Layout,
    component: Select,
    defaultProps: {
      label: "Framework",
      placeholder: "Select a framework",
      options: [
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
        { label: "Angular", value: "angular" },
      ],
      fullWidth: true,
      variant: "outline",
    },
    propDefinitions: {
      label: { type: "string" },
      placeholder: { type: "string" },
      fullWidth: { type: "boolean" },
      disabled: { type: "boolean" },
      error: { type: "string" },
      variant: { type: "select", options: ["outline", "filled", "standard", "floating"] },
    },
  },
  autocomplete: {
    title: "Autocomplete",
    description: "Searchable select component with support for detailed options.",
    icon: List,
    component: Autocomplete,
    defaultProps: {
      label: "Select Country",
      placeholder: "Search...",
      options: [
        { label: "United States", value: "us" },
        { label: "United Kingdom", value: "uk" },
        { label: "Canada", value: "ca" },
        { label: "Australia", value: "au" },
        { label: "Germany", value: "de" },
      ],
      fullWidth: true,
      multiple: false,
      variant: "outline",
    },
    propDefinitions: {
      label: { type: "string" },
      placeholder: { type: "string" },
      multiple: { type: "boolean" },
      disabled: { type: "boolean" },
      error: { type: "string" },
      variant: { type: "select", options: ["outline", "filled", "standard", "floating"] },
    },
  },
  datePicker: {
    title: "Date Picker",
    description: "Native-based accessible date picker with formatting support.",
    icon: Calendar,
    component: DatePicker,
    defaultProps: {
      label: "Birth Date",
      format: "dd/MM/yyyy",
      fullWidth: true,
      variant: "outline",
    },
    propDefinitions: {
      label: { type: "string" },
      format: { type: "select", options: ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"] },
      disabled: { type: "boolean" },
      error: { type: "string" },
      variant: { type: "select", options: ["outline", "filled", "standard", "floating"] },
    },
  },
  dateRangePicker: {
    title: "Date Range Picker",
    description: "Range selection with time support.",
    icon: Calendar,
    component: DateRangePicker,
    defaultProps: {
      id: "dob-range",
      label: "Trip Dates",
      fullWidth: true,
      showTime: true,
      variant: "outline",
    },
    propDefinitions: {
      label: { type: "string" },
      placeholder: { type: "string" },
      fullWidth: { type: "boolean" },
      disabled: { type: "boolean" },
      error: { type: "string" },
      showTime: { type: "boolean" },
      variant: { type: "select", options: ["outline", "filled", "standard", "floating"] },
    },
  },
  dateTimePicker: {
    title: "Date Time Picker",
    description: "Selection of both date and time.",
    icon: Calendar,
    component: DateTimePicker,
    defaultProps: {
      label: "Appointment",
      fullWidth: true,
      variant: "outline",
    },
    propDefinitions: {
      label: { type: "string" },
      disabled: { type: "boolean" },
      error: { type: "string" },
      variant: { type: "select", options: ["outline", "filled", "standard", "floating"] },
    },
  },
  timePicker: {
    title: "Time Picker",
    description: "Strictly select time.",
    icon: Calendar,
    component: TimePicker,
    defaultProps: {
      id: "meeting-time",
      label: "Meeting Time",
      fullWidth: true,
      variant: "outline",
    },
    propDefinitions: {
      label: { type: "string" },
      disabled: { type: "boolean" },
      error: { type: "string" },
      variant: { type: "select", options: ["outline", "filled", "standard", "floating"] },
    },
  },
  checkbox: {
    title: "Checkbox",
    description: "Boolean selection control.",
    icon: CheckSquare,
    component: Checkbox,
    defaultProps: {
      label: "Terms & Conditions",
      checked: true,
    },
    propDefinitions: {
      label: { type: "string" },
      disabled: { type: "boolean" },
      error: { type: "string" },
    },
  },
  switch: {
    title: "Switch",
    description: "Toggle switch for boolean states.",
    icon: CheckSquare, // Reusing icon or find Toggle
    component: Switch,
    defaultProps: {
      label: "Enable Notifications",
      checked: false,
    },
    propDefinitions: {
      label: { type: "string" },
      disabled: { type: "boolean" },
      error: { type: "string" },
    },
  },
  radio: {
    title: "Radio Group",
    description: "Single selection from a set of options.",
    icon: List,
    component: RadioGroup,
    defaultProps: {
      name: "plan",
      label: "Choose Plan",
      options: [
        { label: "Free", value: "free" },
        { label: "Pro", value: "pro" },
        { label: "Enterprise", value: "ent" },
      ],
      direction: "vertical",
    },
    propDefinitions: {
      label: { type: "string" },
      direction: { type: "select", options: ["vertical", "horizontal"] },
      disabled: { type: "boolean" },
      error: { type: "string" },
    },
  },
  fileInput: {
    title: "File Input",
    description: "File upload component with dropzone and preview.",
    icon: FileText,
    component: FileInput,
    defaultProps: {
      label: "Upload Document",
      accept: ".pdf,.doc,.docx",
      multiple: false,
    },
    propDefinitions: {
      label: { type: "string" },
      accept: { type: "string" },
      multiple: { type: "boolean" },
      disabled: { type: "boolean" },
      error: { type: "string" },
    },
  },
};
