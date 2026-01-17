/*
 * UNIVERSAL THEME CONFIGURATION
 * ----------------------------------------------------------------------------
 * This file serves as the bridge between Component Logic and Visual Styling.
 * It is designed to support three modes of operation seamlessly:
 *
 * 1. Tailwind v3: Uses standard utility classes.
 * 2. Tailwind v4: Compatible via the new @theme directive mappings.
 * 3. No Tailwind (Vanilla CSS):
 *    - The structure relies on SEMANTIC CSS VARIABLES (e.g., var(--color-background)).
 *    - To use without Tailwind, simply provide a CSS file that defines these variables
 *      and targeting classes (e.g., .flex { display: flex }).
 *    - Alternatively, override these string values with your own BEM classes via
 *      ThemeContext.
 *
 * KEY PRINCIPLES:
 * - NO Hardcoded Colors: Always use var(--color-*) variables (mapped in index.css).
 * - Semantic Slots: Usage of 'root', 'input', 'popover' generic keys.
 * - Responsive Fallbacks: Designs that work on mobile and desktop by default.
 */

import type { FormTheme, ComponentState } from "./types";

// Helper to join classes conditionally (mini-clsx)
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

export const defaultTheme: FormTheme = {
  textInput: {
    root: ({ variant }: ComponentState) =>
      cn("flex flex-col mb-4", variant === "floating" ? "relative pt-2" : "gap-1.5"),
    label: ({ focused, error, variant, value }: ComponentState) => {
      const isFloating = variant === "floating";
      const hasValue = value !== undefined && value !== null && value !== "";

      if (isFloating) {
        return cn(
          "absolute left-3 transition-all duration-200 pointer-events-none z-10",
          focused || hasValue ? "-top-2.5 text-xs bg-background px-1" : "top-2.5 text-sm",
          error ? "text-destructive" : focused ? "text-primary" : "text-muted-foreground"
        );
      }

      return cn(
        "text-sm font-medium transition-colors duration-200",
        error ? "text-destructive" : focused ? "text-primary" : "text-foreground"
      );
    },
    wrapper: "relative",
    input: ({ error, variant }: ComponentState) => {
      const base =
        "block h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all bg-transparent";

      let variantClasses = "";
      if (variant === "filled") {
        variantClasses =
          "bg-muted border-transparent focus-visible:bg-background border-b-2 border-b-input focus-visible:border-b-primary";
      } else if (variant === "standard") {
        variantClasses =
          "bg-transparent border-0 border-b-2 border-input rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary";
      } else {
        // outline and floating
        variantClasses = "border border-input bg-transparent";
      }

      return cn(
        base,
        variantClasses,
        error ? "border-destructive focus-visible:ring-destructive" : ""
      );
    },
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  textarea: {
    root: ({ variant }: ComponentState) =>
      cn("flex flex-col mb-4", variant === "floating" ? "relative pt-2" : "gap-1.5"),
    label: ({ focused, error, variant, value }: ComponentState) => {
      const isFloating = variant === "floating";
      const hasValue = value !== undefined && value !== null && value !== "";

      if (isFloating) {
        return cn(
          "absolute left-3 transition-all duration-200 pointer-events-none z-10",
          focused || hasValue ? "-top-2.5 text-xs bg-background px-1" : "top-2.5 text-sm",
          error ? "text-destructive" : focused ? "text-primary" : "text-muted-foreground"
        );
      }

      return cn(
        "text-sm font-medium transition-colors duration-200",
        error ? "text-destructive" : focused ? "text-primary" : "text-foreground"
      );
    },
    input: ({ error, variant }: ComponentState) => {
      const base =
        "block min-h-[80px] w-full rounded-md px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all bg-transparent";

      let variantClasses = "";
      if (variant === "filled") {
        variantClasses =
          "bg-muted border-transparent focus-visible:bg-background border-b-2 border-b-input focus-visible:border-b-primary";
      } else if (variant === "standard") {
        variantClasses =
          "bg-transparent border-0 border-b-2 border-input rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary";
      } else {
        // outline and floating
        variantClasses = "border border-input bg-transparent";
      }

      return cn(
        base,
        variantClasses,
        error ? "border-destructive focus-visible:ring-destructive" : ""
      );
    },
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  select: {
    root: ({ variant }: ComponentState) =>
      cn("flex flex-col mb-4", variant === "floating" ? "relative pt-2" : "gap-1.5"),
    label: ({ focused, error, variant, value }: ComponentState) => {
      const isFloating = variant === "floating";
      const hasValue = value !== undefined && value !== null && value !== "";

      if (isFloating) {
        return cn(
          "absolute left-3 transition-all duration-200 pointer-events-none z-10",
          focused || hasValue ? "-top-2.5 text-xs bg-background px-1" : "top-2.5 text-sm",
          error ? "text-destructive" : focused ? "text-primary" : "text-muted-foreground"
        );
      }

      return cn(
        "text-sm font-medium transition-colors duration-200",
        error ? "text-destructive" : focused ? "text-primary" : "text-foreground"
      );
    },
    input: ({ error, variant }: ComponentState) => {
      const base =
        "block h-10 w-full appearance-none rounded-md px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all bg-transparent";

      let variantClasses = "";
      if (variant === "filled") {
        variantClasses =
          "bg-muted border-transparent focus:bg-background border-b-2 border-b-input focus:border-b-primary";
      } else if (variant === "standard") {
        variantClasses =
          "bg-transparent border-0 border-b-2 border-input rounded-none px-0 focus:ring-0 focus:border-primary px-0";
      } else {
        // outline and floating
        variantClasses = "border border-input bg-transparent";
      }

      return cn(base, variantClasses, error ? "border-destructive focus:ring-destructive" : "");
    },
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  checkbox: {
    root: "flex items-start gap-3 space-y-0 mb-4",
    // Wrapper for the checkbox input itself to handle custom styling
    wrapper: "relative flex items-center",
    input: ({ checked }: ComponentState) =>
      cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary text-primary-foreground" : "bg-background"
      ),
    icon: ({ checked }: ComponentState) =>
      cn(
        "pointer-events-none absolute h-3 w-3 top-0.5 left-0.5 text-current transition-opacity",
        checked ? "opacity-100" : "opacity-0"
      ),
    label:
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    errorText: "text-[0.8rem] font-medium text-destructive w-full",
  },
  radio: {
    root: "grid gap-2 mb-4",
    label:
      "text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    wrapper: "flex items-center space-x-2",
    input: ({ checked }: ComponentState) =>
      cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-transparent"
      ),
    icon: ({ checked }: ComponentState) =>
      cn("flex items-center justify-center", checked ? "text-current" : "text-transparent"),
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  switch: {
    root: "flex items-center space-x-2 mb-4",
    label:
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    track: ({ checked }: ComponentState) =>
      cn(
        "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-control-default"
      ),
    thumb: ({ checked }: ComponentState) =>
      cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform absolute top-0.5 left-0.5",
        checked ? "translate-x-5" : "translate-x-0"
      ),
    errorText: "text-[0.8rem] font-medium text-destructive mt-1 w-full",
  },
  autocomplete: {
    root: ({ variant }: ComponentState) =>
      cn("flex flex-col mb-4 relative", variant === "floating" ? "relative pt-2" : "gap-1.5"),
    label: ({ focused, error, variant, value }: ComponentState) => {
      const isFloating = variant === "floating";
      const hasValue = value !== undefined && value !== null && value !== "" && value !== 0;

      if (isFloating) {
        return cn(
          "absolute left-3 transition-all duration-200 pointer-events-none z-10",
          focused || hasValue ? "-top-2.5 text-xs bg-background px-1" : "top-2.5 text-sm",
          error ? "text-destructive" : focused ? "text-primary" : "text-muted-foreground"
        );
      }

      return cn(
        "text-sm font-medium transition-colors duration-200",
        error ? "text-destructive" : focused ? "text-primary" : "text-foreground"
      );
    },
    wrapper: ({ focused, error, disabled, variant }: ComponentState) => {
      const base =
        "flex flex-wrap items-center gap-1.5 w-full rounded-md px-3 py-2 text-sm ring-offset-background transition-all";

      let variantClasses = "";
      if (variant === "filled") {
        variantClasses =
          "bg-muted border-b-2 border-b-input border-t-0 border-l-0 border-r-0 rounded-t-md rounded-b-none focus-within:bg-background focus-within:border-b-primary";
      } else if (variant === "standard") {
        variantClasses =
          "bg-transparent border-0 border-b-2 border-input rounded-none px-0 focus-within:ring-0 focus-within:border-primary px-0";
      } else {
        // outline and floating
        variantClasses = "border border-input bg-background";
      }

      return cn(
        base,
        variantClasses,
        focused && variant !== "standard" && variant !== "filled"
          ? "ring-2 ring-ring ring-offset-2 border-primary"
          : "",
        error ? "border-destructive ring-destructive" : "",
        disabled ? "opacity-50 cursor-not-allowed bg-muted" : ""
      );
    },
    input:
      "flex h-auto bg-transparent focus:outline-none placeholder:text-muted-foreground min-w-[80px] flex-1",
    list: "absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 p-1",
    item: ({ focused, value }: ComponentState) =>
      cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors",
        focused ? "bg-accent text-accent-foreground" : "text-foreground",
        value ? "bg-accent/40 font-semibold" : ""
      ),
    tag: "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  fileInput: {
    root: "grid w-full max-w-sm items-center gap-1.5 mb-4",
    label: ({ error }: ComponentState) =>
      cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        error ? "text-destructive" : ""
      ),
    wrapper: ({ focused, error, disabled }: ComponentState) =>
      cn(
        "relative flex items-center justify-between h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        focused ? "ring-2 ring-ring ring-offset-2 border-primary" : "",
        error ? "border-destructive ring-destructive" : "",
        disabled ? "opacity-50 cursor-not-allowed bg-muted" : ""
      ),
    input: ({ disabled }: ComponentState) =>
      cn(
        "absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer",
        disabled ? "cursor-not-allowed" : ""
      ),
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  dateTimePicker: {
    root: ({ variant }: ComponentState) =>
      cn("flex flex-col mb-4 relative", variant === "floating" ? "relative pt-2" : "gap-1.5"),
    label: ({ focused, error, variant, value }: ComponentState) => {
      const isFloating = variant === "floating";
      const hasValue = value !== undefined && value !== null && value !== "";

      if (isFloating) {
        return cn(
          "absolute left-3 transition-all duration-200 pointer-events-none z-10",
          focused || hasValue ? "-top-2.5 text-xs bg-background px-1" : "top-2.5 text-sm",
          error ? "text-destructive" : focused ? "text-primary" : "text-muted-foreground"
        );
      }

      return cn(
        "text-sm font-medium transition-colors duration-200",
        error ? "text-destructive" : focused ? "text-primary" : "text-foreground"
      );
    },
    wrapper: ({ focused, error, disabled, variant }: ComponentState) => {
      const base =
        "flex items-center w-full rounded-md px-3 py-2 text-sm ring-offset-background transition-all h-10";

      let variantClasses = "";
      if (variant === "filled") {
        variantClasses =
          "bg-muted border-b-2 border-b-input border-t-0 border-l-0 border-r-0 rounded-t-md rounded-b-none focus-within:bg-background focus-within:border-b-primary";
      } else if (variant === "standard") {
        variantClasses =
          "bg-transparent border-0 border-b-2 border-input rounded-none px-0 focus-within:ring-0 focus-within:border-primary px-0";
      } else {
        variantClasses = "border border-input bg-background";
      }

      return cn(
        base,
        variantClasses,
        focused && variant !== "standard" && variant !== "filled"
          ? "ring-2 ring-ring ring-offset-2 border-primary"
          : "",
        error ? "border-destructive ring-destructive" : "",
        disabled ? "opacity-50 cursor-not-allowed bg-muted" : ""
      );
    },
    input: "w-full h-full bg-transparent outline-none placeholder:text-muted-foreground",
    calendarIcon: ({ disabled }: ComponentState) =>
      cn(
        "focus:outline-none transition-colors",
        disabled
          ? "text-muted-foreground cursor-not-allowed opacity-50"
          : "hover:text-primary cursor-pointer text-muted-foreground"
      ),
    clearButton: "text-muted-foreground hover:text-foreground transition-colors",
    popover:
      "absolute top-full left-0 z-50 mt-1 min-w-full w-auto whitespace-nowrap shadow-xl rounded-lg animate-in fade-in zoom-in-95 duration-200 flex overflow-hidden ring-1 ring-black/5 bg-popover text-popover-foreground",
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  datePicker: {
    root: ({ variant }: ComponentState) =>
      cn("flex flex-col mb-4 relative", variant === "floating" ? "relative pt-2" : "gap-1.5"),
    label: ({ focused, error, variant, value }: ComponentState) => {
      const isFloating = variant === "floating";
      const hasValue = value !== undefined && value !== null && value !== "";

      if (isFloating) {
        return cn(
          "absolute left-3 transition-all duration-200 pointer-events-none z-10",
          focused || hasValue ? "-top-2.5 text-xs bg-background px-1" : "top-2.5 text-sm",
          error ? "text-destructive" : focused ? "text-primary" : "text-muted-foreground"
        );
      }

      return cn(
        "text-sm font-medium transition-colors duration-200",
        error ? "text-destructive" : focused ? "text-primary" : "text-foreground"
      );
    },
    wrapper: ({ focused, error, disabled, variant }: ComponentState) => {
      const base =
        "flex items-center w-full rounded-md px-3 py-2 text-sm ring-offset-background transition-all h-10";

      let variantClasses = "";
      if (variant === "filled") {
        variantClasses =
          "bg-muted border-b-2 border-b-input border-t-0 border-l-0 border-r-0 rounded-t-md rounded-b-none focus-within:bg-background focus-within:border-b-primary";
      } else if (variant === "standard") {
        variantClasses =
          "bg-transparent border-0 border-b-2 border-input rounded-none px-0 focus-within:ring-0 focus-within:border-primary px-0";
      } else {
        variantClasses = "border border-input bg-background";
      }

      return cn(
        base,
        variantClasses,
        focused && variant !== "standard" && variant !== "filled"
          ? "ring-2 ring-ring ring-offset-2 border-primary"
          : "",
        error ? "border-destructive ring-destructive" : "",
        disabled ? "opacity-50 cursor-not-allowed bg-muted" : ""
      );
    },
    input: "w-full h-full bg-transparent outline-none placeholder:text-muted-foreground",
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  dateRangePicker: {
    root: ({ variant }: ComponentState) =>
      cn("flex flex-col mb-4 relative", variant === "floating" ? "relative pt-2" : "gap-1.5"),
    label: ({ focused, error, variant, value }: ComponentState) => {
      const isFloating = variant === "floating";
      const hasValue = value !== undefined && value !== null && value !== "";

      if (isFloating) {
        return cn(
          "absolute left-3 transition-all duration-200 pointer-events-none z-10",
          focused || hasValue ? "-top-2.5 text-xs bg-background px-1" : "top-2.5 text-sm",
          error ? "text-destructive" : focused ? "text-primary" : "text-muted-foreground"
        );
      }

      return cn(
        "text-sm font-medium transition-colors duration-200",
        error ? "text-destructive" : focused ? "text-primary" : "text-foreground"
      );
    },
    wrapper: ({ focused, error, disabled, variant }: ComponentState) => {
      const base =
        "flex items-center w-full rounded-md px-3 py-2 text-sm ring-offset-background transition-all h-10";

      let variantClasses = "";
      if (variant === "filled") {
        variantClasses =
          "bg-muted border-b-2 border-b-input border-t-0 border-l-0 border-r-0 rounded-t-md rounded-b-none focus-within:bg-background focus-within:border-b-primary";
      } else if (variant === "standard") {
        variantClasses =
          "bg-transparent border-0 border-b-2 border-input rounded-none px-0 focus-within:ring-0 focus-within:border-primary px-0";
      } else {
        variantClasses = "border border-input bg-background";
      }

      return cn(
        base,
        variantClasses,
        focused && variant !== "standard" && variant !== "filled"
          ? "ring-2 ring-ring ring-offset-2 border-primary"
          : "",
        error ? "border-destructive ring-destructive" : "",
        disabled ? "opacity-50 cursor-not-allowed bg-muted" : ""
      );
    },
    input: "w-full h-full bg-transparent outline-none placeholder:text-muted-foreground",
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
  timePicker: {
    root: ({ variant }: ComponentState) =>
      cn("flex flex-col mb-4 relative", variant === "floating" ? "relative pt-2" : "gap-1.5"),
    label: ({ focused, error, variant, value }: ComponentState) => {
      const isFloating = variant === "floating";
      const hasValue = value !== undefined && value !== null && value !== "";

      if (isFloating) {
        return cn(
          "absolute left-3 transition-all duration-200 pointer-events-none z-10",
          focused || hasValue ? "-top-2.5 text-xs bg-background px-1" : "top-2.5 text-sm",
          error ? "text-destructive" : focused ? "text-primary" : "text-muted-foreground"
        );
      }

      return cn(
        "text-sm font-medium transition-colors duration-200",
        error ? "text-destructive" : focused ? "text-primary" : "text-foreground"
      );
    },
    wrapper: ({ focused, error, disabled, variant }: ComponentState) => {
      const base =
        "flex items-center w-full rounded-md px-3 py-2 text-sm ring-offset-background transition-all h-10";

      let variantClasses = "";
      if (variant === "filled") {
        variantClasses =
          "bg-muted border-b-2 border-b-input border-t-0 border-l-0 border-r-0 rounded-t-md rounded-b-none focus-within:bg-background focus-within:border-b-primary";
      } else if (variant === "standard") {
        variantClasses =
          "bg-transparent border-0 border-b-2 border-input rounded-none px-0 focus-within:ring-0 focus-within:border-primary px-0";
      } else {
        variantClasses = "border border-input bg-background";
      }

      return cn(
        base,
        variantClasses,
        focused && variant !== "standard" && variant !== "filled"
          ? "ring-2 ring-ring ring-offset-2 border-primary"
          : "",
        error ? "border-destructive ring-destructive" : "",
        disabled ? "opacity-50 cursor-not-allowed bg-muted" : ""
      );
    },
    input: "w-full h-full bg-transparent outline-none placeholder:text-muted-foreground",
    errorText: "text-[0.8rem] font-medium text-destructive mt-1",
  },
};
