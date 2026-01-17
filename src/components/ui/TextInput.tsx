import React, { forwardRef, useState } from "react";
import { useComponentTheme } from "../theme/ThemeContext";
import type { BaseFieldProps } from "./field/types";

interface TextInputProps
  extends BaseFieldProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "required"> {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
      onClear,
      onFocus,
      onBlur,
      globalOverRide,
      variant,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    // Resolve Theme
    const themeClasses = useComponentTheme(
      "textInput",
      {
        error: !!error,
        disabled,
        focused,
        value: value ?? defaultValue,
        variant,
      },
      undefined,
      globalOverRide
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const isFloating = variant === "floating";

    return (
      <div className={`${themeClasses.root} ${className || ""} ${fullWidth ? "w-full" : ""}`}>
        {!isFloating && label && (
          <label htmlFor={id} className={themeClasses.label}>
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <div className={themeClasses.wrapper}>
          {isFloating && label && (
            <label htmlFor={id} className={themeClasses.label}>
              {label} {required && <span className="text-destructive">*</span>}
            </label>
          )}

          {startAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {startAdornment}
            </div>
          )}

          <input
            {...props}
            ref={ref}
            id={id}
            disabled={disabled}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFloating && !focused ? "" : props.placeholder}
            className={themeClasses.input}
            style={{
              paddingLeft: startAdornment ? "2.5rem" : undefined,
              paddingRight: endAdornment || onClear ? "2.5rem" : undefined,
            }}
          />

          {(endAdornment || onClear) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {onClear && (value || defaultValue) && !disabled && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
              {endAdornment}
            </div>
          )}
        </div>

        {error && <span className={themeClasses.errorText}>{error}</span>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
