import React, { forwardRef, useState } from "react";
import { useComponentTheme } from "../theme/ThemeContext";

import type { BaseFieldProps } from "./field/types";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "id">, BaseFieldProps {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      error,
      className,
      disabled,
      // Filter out standard field props that don't apply to native checkbox
      startAdornment,
      endAdornment,
      fullWidth,
      required,
      globalOverRide,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const themeClasses = useComponentTheme(
      "checkbox",
      {
        error,
        disabled,
        focused,
        checked: props.checked,
      },
      undefined,
      globalOverRide
    );

    return (
      <div className={`${themeClasses.root} ${className || ""} ${fullWidth ? "w-full" : ""}`}>
        {startAdornment && <div className="mr-2">{startAdornment}</div>}
        <div className={themeClasses.wrapper}>
          <input
            {...props}
            ref={ref}
            type="checkbox"
            id={id}
            disabled={disabled}
            className={themeClasses.input}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
          />
          {/* Custom Icon (Checkmark) handled via peer-checked usually, but if theme provides icon class... */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={themeClasses.icon}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="flex flex-col">
          <label htmlFor={id} className={themeClasses.label}>
            {label} {required && <span className="text-destructive">*</span>}
          </label>
          {error && <p className={themeClasses.errorText}>{error}</p>}
        </div>
        {endAdornment && <div className="ml-auto">{endAdornment}</div>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
