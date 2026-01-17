import React, { forwardRef, useState } from "react";
import { useComponentTheme } from "../theme/ThemeContext";
import type { BaseFieldProps } from "./field/types";
import type { SelectOption } from "@/types/schema";

interface SelectProps
  extends BaseFieldProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      error,
      required,
      disabled,
      className,
      startAdornment,
      endAdornment,
      fullWidth,
      value,
      defaultValue,
      onChange,
      options = [],
      placeholder,
      globalOverRide,
      variant,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const themeClasses = useComponentTheme(
      "select",
      {
        error: !!error,
        disabled,
        focused,
        value: value && value !== "",
        variant,
      },
      undefined,
      globalOverRide
    );

    const isFloating = variant === "floating";

    return (
      <div className={`${themeClasses.root} ${className || ""} ${fullWidth ? "w-full" : ""}`}>
        {!isFloating && label && (
          <label htmlFor={id} className={themeClasses.label}>
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}
        <div className="relative">
          {isFloating && label && (
            <label htmlFor={id} className={themeClasses.label}>
              {label} {required && <span className="text-destructive">*</span>}
            </label>
          )}
          <select
            {...props}
            ref={ref}
            id={id}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            className={themeClasses.input}
          >
            {(placeholder || isFloating) && (
              <option value="" disabled hidden={isFloating && !focused && !value}>
                {placeholder || (isFloating ? "" : "Select...")}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
          {startAdornment && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground mr-1">
              {startAdornment}
            </div>
          )}
          {endAdornment && (
            <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground mr-1">
              {endAdornment}
            </div>
          )}
          {/* Default Chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
        {error && <p className={themeClasses.errorText}>{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
