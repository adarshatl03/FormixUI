import React, { forwardRef, useState } from "react";
import { useComponentTheme } from "../theme/ThemeContext";

import type { BaseFieldProps } from "./field/types";

interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "id">, BaseFieldProps {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      id,
      label,
      error,
      className,
      disabled,
      startAdornment,
      endAdornment,
      required,
      globalOverRide,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const themeClasses = useComponentTheme(
      "switch",
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
      <div className={`${themeClasses.root} ${className || ""}`}>
        {startAdornment && <span className="mr-2 text-muted-foreground">{startAdornment}</span>}
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              {...props}
              ref={ref}
              type="checkbox"
              id={id}
              disabled={disabled}
              className="sr-only peer" // Hidden input
              onFocus={(e) => {
                setFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                props.onBlur?.(e);
              }}
            />
            {/* Track */}
            <div className={themeClasses.track}></div>
            {/* Thumb */}
            <div className={themeClasses.thumb}></div>
          </div>
          <span className={`ml-2 ${themeClasses.label}`}>
            {label} {required && <span className="text-destructive">*</span>}
          </span>
        </label>
        {endAdornment && <span className="ml-2 text-muted-foreground">{endAdornment}</span>}
        {error && <p className={themeClasses.errorText}>{error}</p>}
      </div>
    );
  }
);

Switch.displayName = "Switch";
