import React, { forwardRef, useState } from "react";
import { useComponentTheme } from "../theme/ThemeContext";
import type { FieldDirection, ResponsiveDirection } from "../../types/schema";
import type { BaseFieldProps } from "./field/types";

interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "id">, BaseFieldProps {
  name: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  options: RadioOption[];
  direction?: FieldDirection | ResponsiveDirection;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      onChange,
      options,
      label,
      error,
      direction = "vertical",
      disabled,
      className,
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

    // Resolve theme
    const themeClasses = useComponentTheme(
      "radio",
      {
        error: error,
        disabled: disabled,
        focused: focused,
        value: value && value !== "",
      },
      undefined,
      globalOverRide
    );

    const getDirectionClasses = () => {
      if (typeof direction === "string") {
        return direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-2";
      }

      const classes = [];
      const d = direction as ResponsiveDirection;

      // XS / Base
      const baseDir = d.xs || "vertical";
      classes.push(baseDir === "horizontal" ? "flex-row gap-4" : "flex-col gap-2");

      // Breakpoints
      if (d.sm) {
        classes.push(d.sm === "horizontal" ? "sm:flex-row sm:gap-4" : "sm:flex-col sm:gap-2");
      }
      if (d.md) {
        classes.push(d.md === "horizontal" ? "md:flex-row md:gap-4" : "md:flex-col md:gap-2");
      }
      if (d.lg) {
        classes.push(d.lg === "horizontal" ? "lg:flex-row lg:gap-4" : "lg:flex-col lg:gap-2");
      }

      return classes.join(" ");
    };

    return (
      <div
        ref={ref}
        className={`${themeClasses.root} ${className || ""} ${fullWidth ? "w-full" : ""}`}
        {...props}
      >
        {startAdornment && <div className="mb-2 text-muted-foreground">{startAdornment}</div>}
        {label && (
          <span className={themeClasses.label}>
            {label} {required && <span className="text-destructive">*</span>}
          </span>
        )}

        <div className={`${themeClasses.wrapper} ${getDirectionClasses()}`} role="radiogroup">
          {options.map((option) => {
            const isChecked = value == option.value;
            const optionId = `${name}-${option.value}`;

            return (
              <label key={option.value} htmlFor={optionId} className={themeClasses.item}>
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id={optionId}
                    name={name}
                    value={option.value}
                    checked={isChecked}
                    onChange={() => !disabled && onChange?.(option.value)}
                    disabled={disabled}
                    className={themeClasses.input}
                    onFocus={() => {
                      setFocused(true);
                      // props.onFocus?.(e); // radio group props might not have onFocus for individual items easily
                    }}
                    onBlur={() => setFocused(false)}
                  />
                  {/* Dot/Indicator - The default theme input style usually handles specific appearances, 
                      but for a custom radio dot we might need an extra element if Tailwind's accent-color isn't enough.
                      Our default theme uses accent color or standard tailwind radio styles. 
                      If we want a custom dot, we can include it. 
                      Default theme currently:
                      input: "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      This relies on standard browser radio styling for the check mark/dot or uses 'text-primary' with a library like Radix. 
                      Native inputs don't use text-primary for the dot color easily without appearance-none and custom CSS.
                      Let's stick to appearance-none + custom div if we want complete control, OR rely on theme.
                      If theme input class has 'appearance-none', we need the dot.
                      Let's assume the theme can handle it via the input class alone (using checked:bg-...), 
                      or we can keep the dot div if we want to support that style.
                  */}
                </div>
                <span className="text-sm">{option.label}</span>
              </label>
            );
          })}
        </div>

        {error && <p className={themeClasses.errorText}>{error}</p>}
        {endAdornment && <div className="mt-2 text-muted-foreground">{endAdornment}</div>}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
