import React, { useState, useRef, useEffect } from "react";
import { useComponentTheme } from "../../theme/ThemeContext";
import type { BaseFieldProps } from "../field/types";
import { Calendar } from "./Calendar";
import { formatDate } from "../../../utils/date-utils";
import { TimeView } from "./TimeView";

interface DateRangeValue {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerProps extends Omit<BaseFieldProps, "value" | "onChange"> {
  value?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
  min?: Date;
  max?: Date;
  format?: string;
  placeholder?: string;
  allowReverse?: boolean;
  showTime?: boolean; // New prop to enable time selection
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  id,
  label,
  error,
  required,
  disabled,
  className,
  startAdornment,
  endAdornment,
  fullWidth,
  value = { start: null, end: null },
  onChange,
  onClear,
  min,
  max,
  format = "dd/MM/yyyy",
  placeholder,
  showTime = false,
  globalOverRide = true,
  variant,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state from props during render pattern
  const [lastValue, setLastValue] = useState(value);
  const [lastFormat, setLastFormat] = useState(format);
  const [lastShowTime, setLastShowTime] = useState(showTime);

  if (value !== lastValue || format !== lastFormat || showTime !== lastShowTime) {
    setLastValue(value);
    setLastFormat(format);
    setLastShowTime(showTime);

    const startFormat = showTime ? (format.includes("HH:mm") ? format : `${format} HH:mm`) : format;
    const startStr = value?.start ? formatDate(value.start, startFormat) : "";
    const endStr = value?.end ? formatDate(value.end, startFormat) : "";

    let newVal = "";
    if (startStr && endStr) {
      newVal = `${startStr} - ${endStr}`;
    } else if (startStr) {
      newVal = `${startStr} - `;
    }
    setDisplayValue(newVal);
  }

  // State for time tab selection
  const [activeTimeTab, setActiveTimeTab] = useState<"start" | "end">("start");

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
    "dateRangePicker",
    {
      error: !!error,
      disabled,
      focused: isFocused || isOpen,
      value: value?.start || value?.end,
      variant,
    },
    undefined,
    globalOverRide
  );

  const isFloating = variant === "floating";

  const handleTimeChange = (date: Date) => {
    if (activeTimeTab === "start" && value?.start) {
      const newStart = new Date(value.start);
      newStart.setHours(date.getHours());
      newStart.setMinutes(date.getMinutes());
      if (onChange) onChange({ ...value, start: newStart });
    } else if (activeTimeTab === "end" && value?.end) {
      const newEnd = new Date(value.end);
      newEnd.setHours(date.getHours());
      newEnd.setMinutes(date.getMinutes());
      if (onChange) onChange({ ...value, end: newEnd });
    }
  };

  const RangeIcon = (
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
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="M7 14h.01" />
        <path d="M17 14h.01" />
        <path d="M12 14h.01" />
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
          readOnly
          id={id}
          value={displayValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={isFloating && !isFocused && !displayValue ? "" : placeholder}
          className={themeClasses.input}
        />

        <div className="flex items-center gap-2 ml-auto">
          {onClear && (value?.start || value?.end) && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
                onChange?.({ start: null, end: null });
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
          {endAdornment || RangeIcon}
        </div>
      </div>

      {error && <span className={themeClasses.errorText}>{error}</span>}

      {isOpen && !disabled && (
        <div
          className={`absolute top-full left-0 z-50 mt-1 shadow-xl rounded-lg animate-in fade-in zoom-in-95 duration-200 bg-white dark:bg-zinc-950 flex ${showTime ? "flex-row" : ""} ring-1 ring-black/5`}
        >
          <div className="flex flex-col">
            <Calendar
              value={null}
              startDate={value?.start}
              endDate={value?.end}
              isRange={true}
              onRangeChange={(range: any) => {
                // Preserve time if updating dates
                const newStart = range.start;
                if (newStart && value?.start) {
                  newStart.setHours(value.start.getHours());
                  newStart.setMinutes(value.start.getMinutes());
                } else if (newStart) {
                  // Default start time 00:00
                  newStart.setHours(0, 0, 0, 0);
                }

                const newEnd = range.end;
                if (newEnd && value?.end) {
                  newEnd.setHours(value.end.getHours());
                  newEnd.setMinutes(value.end.getMinutes());
                } else if (newEnd) {
                  // Default end time 23:59
                  newEnd.setHours(23, 59, 59, 999);
                }

                onChange?.({ start: newStart, end: newEnd });
                if (range.start && range.end && !showTime) {
                  setIsOpen(false);
                }
                // If showTime, switch to end time tab if we just picked end date?
                if (showTime && range.start && range.end) {
                  setActiveTimeTab("end");
                }
              }}
              minDate={min}
              maxDate={max}
            />
            {showTime && value?.start && value?.end && (
              <div className="p-2 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:opacity-90 transition"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {showTime && (
            <div className="border-l border-gray-100 dark:border-zinc-800 flex flex-col w-40">
              <div className="flex border-b border-gray-100 dark:border-zinc-800">
                <button
                  className={`flex-1 py-2 text-xs font-semibold uppercase ${activeTimeTab === "start" ? "bg-gray-50 dark:bg-zinc-900/50 text-primary" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900"}`}
                  onClick={() => setActiveTimeTab("start")}
                >
                  Start Time
                </button>
                <button
                  className={`flex-1 py-2 text-xs font-semibold uppercase ${activeTimeTab === "end" ? "bg-gray-50 dark:bg-zinc-900/50 text-primary" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900"}`}
                  onClick={() => setActiveTimeTab("end")}
                >
                  End Time
                </button>
              </div>
              <div className="flex-1 relative">
                {activeTimeTab === "start" &&
                  (!value?.start ? (
                    <div className="flex items-center justify-center h-full text-xs text-gray-400 px-4 text-center">
                      Select Start Date first
                    </div>
                  ) : (
                    <TimeView value={value.start} onChange={handleTimeChange} />
                  ))}
                {activeTimeTab === "end" &&
                  (!value?.end ? (
                    <div className="flex items-center justify-center h-full text-xs text-gray-400 px-4 text-center">
                      Select End Date first
                    </div>
                  ) : (
                    <TimeView value={value.end} onChange={handleTimeChange} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
