import React, { useState, useRef, useEffect } from "react";
import { useComponentTheme } from "../../theme/ThemeContext";
import type { BaseFieldProps } from "../field/types";
import { Calendar } from "./Calendar";
import { TimeView } from "./TimeView";
import { formatDate, parseDate } from "../../../utils/date-utils";

interface DateTimePickerProps extends BaseFieldProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  min?: Date;
  max?: Date;
  format?: string;
  placeholder?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
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
  min,
  max,
  format = "dd/MM/yyyy HH:mm",
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
    "dateTimePicker",
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
    const val = e.target.value;
    setInputValue(val);
    const parsed = parseDate(val);
    if (parsed) {
      if (min && parsed < min) return;
      if (max && parsed > max) return;
      onChange?.(parsed);
    } else {
      if (!val) onChange?.(null);
    }
  };

  const handleDateChange = (date: Date) => {
    const newDate = new Date(date);
    if (value) {
      newDate.setHours(value.getHours());
      newDate.setMinutes(value.getMinutes());
      newDate.setSeconds(value.getSeconds());
    } else {
      newDate.setHours(0, 0, 0, 0);
    }
    onChange?.(newDate);
  };

  const handleTimeChange = (date: Date) => {
    onChange?.(date);
  };

  const CalendarIcon = (
    <button
      type="button"
      onClick={(e) => {
        if (!disabled) {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
      disabled={disabled}
      className={themeClasses.calendarIcon}
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
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="M12 6v6l4 2" />
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
              className={themeClasses.clearButton}
            >
              ✕
            </button>
          )}
          {endAdornment || CalendarIcon}
        </div>
      </div>

      {error && <span className={themeClasses.errorText}>{error}</span>}
      {isOpen && !disabled && (
        <div className={themeClasses.popover}>
          <Calendar value={value} onChange={handleDateChange} minDate={min} maxDate={max} />
          <TimeView value={value} onChange={handleTimeChange} />
        </div>
      )}
    </div>
  );
};
