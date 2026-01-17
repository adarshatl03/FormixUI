import React, { type ReactNode, useState, useCallback } from "react";
import { LabelWrapper } from "./LabelWrapper";
import type { BaseFieldProps } from "./types";

import { ErrorTooltip } from "./ErrorTooltip";

interface BaseFieldInternalProps extends BaseFieldProps {
  children: (props: {
    hasValue: boolean;
    isFocused: boolean;
    onFocus: (e?: any) => void;
    onBlur: (e?: any) => void;
    id: string;
    // We pass padding styles to children so inputs ensure text doesn't overlap adornments
    style: React.CSSProperties;
  }) => ReactNode;
  value?: any;
  defaultValue?: any;
}

export const BaseField = ({
  id,
  label,
  error,
  required,
  disabled,
  startAdornment,
  endAdornment,
  className = "",
  fullWidth = true,
  children,
  value,
  defaultValue,
  onClear,
}: BaseFieldInternalProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const checkHasValue = useCallback((val: any) => {
    if (val === null || val === undefined || val === "") return false;
    if (Array.isArray(val)) return val.length > 0;
    // Handle Date objects
    if (val instanceof Date) return !isNaN(val.getTime());
    // Handle date range objects { start: null, end: null }
    if (typeof val === "object" && val !== null) {
      // Check if it's a date range object
      if ("start" in val && "end" in val) {
        return (
          (val.start !== null && val.start !== undefined) ||
          (val.end !== null && val.end !== undefined)
        );
      }
      // For other objects, check if they have any truthy values
      return Object.values(val).some((v) => v !== null && v !== undefined && v !== "");
    }
    return true;
  }, []);

  // Memoize stringified value for stable comparison
  const stringifiedValue = React.useMemo(() => JSON.stringify(value), [value]);
  console.log(stringifiedValue);
  const handleFocus = () => {
    console.log("BaseField: handleFocus triggered");
    setIsFocused(true);
  };

  const handleBlur = () => {
    console.log("BaseField: handleBlur triggered");
    setIsFocused(false);
  };

  // Update hasValue if external value changes (controlled component)
  const hasValue = React.useMemo(
    () => checkHasValue(value ?? defaultValue),
    [value, defaultValue, checkHasValue]
  );
  // Calculate padding based on adornments
  const [paddingStyles, setPaddingStyles] = useState({
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
  });
  const startRef = React.useRef<HTMLDivElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    let left = 12; // 0.75rem default
    if (startRef.current) {
      left = 12 + startRef.current.offsetWidth + 8;
    }

    let right = 12;
    if (endRef.current) {
      right = 12 + endRef.current.offsetWidth + 8;
    }

    setPaddingStyles({
      paddingLeft: `${left}px`,
      paddingRight: `${right}px`,
    });
  }, [startAdornment, endAdornment, error]);

  return (
    <div
      className={`relative ${fullWidth ? "w-full" : "w-auto"} ${className} mb-4 formix-field-root`}
    >
      <LabelWrapper
        id={id}
        label={label}
        hasValue={hasValue}
        isFocused={isFocused}
        error={error}
        required={required}
        disabled={disabled}
      >
        <div className="relative flex items-center formix-field-wrapper">
          {/* Start Adornment */}
          {startAdornment && (
            <div
              ref={startRef}
              className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center formix-field-start-adornment"
            >
              {startAdornment}
            </div>
          )}
          {/* Render Input (Children) */}
          {children({
            hasValue,
            isFocused,
            onFocus: handleFocus,
            onBlur: handleBlur,
            id,
            style: {
              ...paddingStyles,
            },
          })}
          {/* Right Content (End Adornment + Error) */}
          {(endAdornment || error || onClear) && (
            <div
              ref={endRef}
              className="absolute right-3 flex items-center gap-2 z-10 formix-field-end-adornment"
            >
              {onClear && hasValue && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClear();
                  }}
                  className="text-slate-400 hover:text-red-500 transition-colors focus:outline-none formix-field-clear-btn"
                  aria-label="Clear value"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
              {endAdornment && (
                <span className="flex items-center text-slate-400 formix-field-adornment-content">
                  {endAdornment}
                </span>
              )}
              {error && (
                <div className="formix-field-error-icon">
                  <ErrorTooltip error={error} />
                </div>
              )}
            </div>
          )}
        </div>
      </LabelWrapper>
    </div>
  );
};
