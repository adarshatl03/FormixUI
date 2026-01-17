import type { FormSchema } from "../types/schema";

export const KITCHEN_SINK_SCHEMA: FormSchema = {
  id: "kitchen-sink-demo",
  title: "All Features Demo",
  description:
    "A comprehensive showcase of all input types, validation rules, and dynamic logic (visibility, disable, clear).",
  styling: {
    spacing: {
      formPadding: 8,
      fieldGap: 6,
    },
    responsive: {
      mobile: { columns: 1, gap: 4 },
      tablet: { columns: 2, gap: 6 },
      desktop: { columns: 2, gap: 8 },
    },
  },
  layout: {
    columns: 12,
    gap: 4,
  },
  fields: [
    {
      id: "section-1",
      name: "_info_section",
      type: "text", // Should be static/html ideally but using text for now or mapped to section
      label: "Personal Information",
      grid: { colSpan: 12 },
      disabled: true, // Acts as header
      defaultValue: "SECTION HEADER",
    },
    {
      id: "f_name",
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "e.g. John Doe",
      grid: { colSpan: 6 },
      validation: [{ type: "required", message: "Name is required" }],
    },
    {
      id: "f_email",
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      grid: { colSpan: 6 },
      validation: [
        { type: "required", message: "Email is required" },
        { type: "email", message: "Invalid email format" },
      ],
    },
    {
      id: "f_role",
      name: "role",
      label: "Job Role",
      type: "select",
      options: [
        { label: "Developer", value: "dev" },
        { label: "Designer", value: "des" },
        { label: "Manager", value: "mgr" },
        { label: "Other", value: "other" },
      ],
      grid: { colSpan: 6 },
    },
    {
      id: "f_other_role",
      name: "otherRole",
      label: "Specify Role",
      type: "text",
      grid: { colSpan: 6 },
      visibilityRules: [{ field: "role", operator: "eq", value: "other" }],
      validation: [{ type: "required", message: "Please specify your role" }],
    },
    {
      id: "f_exp",
      name: "experience",
      label: "Years of Experience",
      type: "number",
      grid: { colSpan: 6 },
      validation: [
        { type: "min", value: 0, message: "Cannot be negative" },
        { type: "max", value: 50, message: "Must be under 50" },
      ],
    },
    {
      id: "f_skills",
      name: "skills",
      label: "Skills (Multi-Select)",
      type: "autocomplete",
      multiple: true,
      options: [
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
        { label: "Angular", value: "angular" },
        { label: "Node.js", value: "node" },
        { label: "Python", value: "python" },
      ],
      grid: { colSpan: 12 },
    },
    {
      id: "section-2",
      name: "_pref_section",
      type: "text",
      label: "Preferences & settings",
      grid: { colSpan: 12 },
      disabled: true,
      defaultValue: "SECTION HEADER",
    },
    {
      id: "f_notifications",
      name: "notifications",
      label: "Enable Notifications",
      type: "switch",
      grid: { colSpan: 6 },
    },
    {
      id: "f_freq",
      name: "frequency",
      label: "Notification Frequency",
      type: "radio",
      options: [
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
      ],
      grid: { colSpan: 6 },
      disableRules: [
        { field: "notifications", operator: "neq", value: true }, // Disabled if notifications OFF
      ],
    },
    {
      id: "f_country",
      name: "country",
      label: "Country",
      type: "select",
      options: [
        { label: "USA", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "UK", value: "uk" },
      ],
      grid: { colSpan: 6 },
    },
    {
      id: "f_state",
      name: "state",
      label: "State/Province",
      type: "text",
      placeholder: "Enter state...",
      grid: { colSpan: 6 },
      clearValueRules: [
        { field: "country", operator: "changed", value: null }, // Clear when country changes
      ],
      disableRules: [
        { field: "country", operator: "eq", value: undefined }, // Disable if no country
        { field: "country", operator: "eq", value: "" },
      ],
    },
    {
      id: "f_dates",
      name: "bookingParams",
      label: "Booking Period",
      type: "daterange",
      grid: { colSpan: 12 },
      validation: [{ type: "required", message: "Dates required" }],
    },
    {
      id: "f_agree",
      name: "terms",
      label: "I agree to the Terms & Conditions",
      type: "checkbox",
      grid: { colSpan: 12 },
      validation: [{ type: "required", message: "You must agree to terms" }],
    },
  ],
};
