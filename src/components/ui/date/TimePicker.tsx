import React, { useState, useRef, useEffect } from "react";
import { useComponentTheme } from "../../theme/ThemeContext";
import type { BaseFieldProps } from "../field/types";
import { TimeView } from "./TimeView";
import { formatDate } from "../../../utils/date-utils";

interface TimePickerProps extends BaseFieldProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  min?: Date;
  max?: Date;
  format?: string;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
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
  onChange,
  onClear,
  // min, // TODO: Implement min/max time constraints
  // max,
  format = "HH:mm",
  placeholder,
  globalOverRide = true,
  variant,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state from props during render pattern
  const [lastValue, setLastValue] = useState(value);
  const [lastFormat, setLastFormat] = useState(format);

  if (value !== lastValue || format !== lastFormat) {
    setLastValue(value);
    setLastFormat(format);
    setInputValue(value ? formatDate(value, format) : "");
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Resolve Theme
  const themeClasses = useComponentTheme(
    "timePicker",
    {
      error: !!error,
      disabled,
      focused: isFocused || isOpen,
      value: value,
      variant,
    },
    undefined,
    globalOverRide
  );

  const isFloating = variant === "floating";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      onChange?.(null);
    }
  };

  const handleTimeChange = (date: Date) => {
    const newDate = new Date(value || new Date());
    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    onChange?.(newDate);
  };

  const TimeIcon = (
    <button
      type="button"
      onClick={(e) => {
        if (!disabled) {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
      disabled={disabled}
      className={`focus:outline-none transition-colors ${
        disabled
          ? "text-muted-foreground cursor-not-allowed opacity-50"
          : "hover:text-primary cursor-pointer text-muted-foreground"
      }`}
      tabIndex={-1}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </button>
  );

  return (
    <div
      ref={containerRef}
      className={`${themeClasses.root} ${className || ""} ${fullWidth ? "w-full" : ""}`}
    >
      {!isFloating && label && (
        <label htmlFor={id} className={themeClasses.label}>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className={themeClasses.wrapper} onClick={() => !disabled && setIsOpen(true)}>
        {isFloating && label && (
          <label htmlFor={id} className={themeClasses.label}>
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}

        {startAdornment && (
          <div className="flex items-center text-muted-foreground mr-1">{startAdornment}</div>
        )}

        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          disabled={disabled}
          placeholder={isFloating && !isFocused && !inputValue ? "" : placeholder}
          className={themeClasses.input}
          autoComplete="off"
        />

        <div className="flex items-center gap-2 ml-auto">
          {onClear && value && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
                setInputValue("");
                onChange?.(null);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
          {endAdornment || TimeIcon}
        </div>
      </div>

      {error && <span className={themeClasses.errorText}>{error}</span>}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 z-50 mt-1 shadow-xl rounded-lg animate-in fade-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-black/5 bg-white dark:bg-zinc-950">
          <TimeView value={value} onChange={handleTimeChange} />
        </div>
      )}
    </div>
  );
};
