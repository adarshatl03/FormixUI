import React from "react";

interface LabelWrapperProps {
  id: string;
  label: string;
  hasValue: boolean;
  isFocused: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  startAdornmentWidth?: number;
  children: React.ReactNode;
}

export const LabelWrapper = ({
  id,
  label,
  hasValue,
  isFocused,
  error,
  required,
  disabled,
  startAdornmentWidth = 0,
  children,
}: LabelWrapperProps) => {
  // Logic: Label floats if field has value OR is focused (Material Design standard)
  // Logic: Label floats if field has value OR is focused (Material Design standard)
  const isFloating = hasValue || isFocused;

  return (
    <div className="relative group w-full formix-label-root">
      {/* 
        The Input Container 
        - We apply the border here via a pseudo-element or a sibling to achieve the notch effect.
        - However, a cleaner CSS-only notch uses a fieldset/legend approach OR a transform-based label with a solid background.
        - Per project rules: "Solid notch background" -> easier than SVG mask.
      */}

      {/* The Input Element (Children) */}
      {children}

      {/* The Label */}
      <label
        htmlFor={id}
        className={`
          absolute left-3 transition-all duration-200 pointer-events-none z-10 origin-left formix-floating-label
          px-1 rounded-sm
          ${
            isFloating
              ? "-top-2.5 text-xs font-medium translate-x-0 formix-label-active"
              : "top-2 text-sm formix-label-inactive"
          }
          ${
            error
              ? "text-destructive formix-label-error"
              : isFocused
                ? "text-ring formix-label-focused"
                : "text-slate-500"
          }
          ${disabled ? "opacity-50 formix-label-disabled" : ""}
        `}
        style={
          {
            // Use CSS variable for start adornment offset so peer selectors can use it
            "--start-adornment-width": `${startAdornmentWidth}px`,
            transform: !isFloating
              ? "translateX(var(--start-adornment-width))" // Default inside state uses var
              : "none", // Floating uses none

            background: isFloating
              ? `linear-gradient(to bottom, transparent 62%, ${
                  disabled ? "var(--zinc-100)" : "var(--color-input)"
                } 38%)`
              : "transparent",
          } as React.CSSProperties
        }
      >
        {label}
        {required && <span className="text-destructive ml-0.5 formix-required-asterisk">*</span>}
      </label>

      {/* 
        Solid Border / Notch Simulation:
        We need a border that 'cuts'. 
        If we use a solid background on the label (which we did above: bg-surface-50),
        it will visually "cut" the border behind it if the z-index is correct.
      */}
    </div>
  );
};
