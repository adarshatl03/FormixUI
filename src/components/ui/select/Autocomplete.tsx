import React, { useState, useRef, useEffect, useMemo, useId } from "react";
import { useComponentTheme, useFormTheme } from "../../theme/ThemeContext";
import { defaultTheme } from "../../theme/defaultTheme";
import type { BaseFieldProps } from "../field/types";
import { useDebounce } from "@/hooks/useDebounce";

import type { Option } from "./types";
import type { ComponentState } from "../../theme/types";

interface AutocompleteProps extends Omit<BaseFieldProps, "value" | "onChange"> {
  options: Option[];
  value?: string | number | (string | number)[]; // Single or Array of values
  onChange?: (value: string | number | (string | number)[] | null) => void;
  multiple?: boolean;
  limitTags?: number;
  placeholder?: string;
  loading?: boolean;
  loadOptions?: (query: string) => Promise<Option[]>; // Async support
  onClear?: () => void;
}

export const Autocomplete = ({
  id,
  label,
  error,
  required,
  disabled,
  className,
  startAdornment,
  endAdornment,
  fullWidth,
  options: initialOptions = [],
  value,
  onChange,
  multiple = false,
  limitTags,
  placeholder = "",
  loading: externalLoading = false,
  loadOptions,
  onClear,
  globalOverRide = true,
  variant,
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const uniqueId = useId();
  const listboxId = `${uniqueId}-listbox`;
  const getOptionId = (index: number) => `${uniqueId}-option-${index}`;

  // Async State
  const [asyncOptions, setAsyncOptions] = useState<Option[]>([]);
  const [internalLoading, setInternalLoading] = useState(false);

  const debouncedSearch = useDebounce(inputValue, 500);

  const isLoading = externalLoading || internalLoading;

  // Decide which options to use
  const currentOptions = loadOptions ? asyncOptions : initialOptions;

  // Filter options based on input (CLIENT SIDE ONLY)
  const filteredOptions = useMemo(() => {
    if (loadOptions) return currentOptions; // Server filtered
    if (!inputValue) return currentOptions;
    return currentOptions.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [currentOptions, inputValue, loadOptions]);

  // Handle Async Search via Effect on Debounced Value
  useEffect(() => {
    if (!loadOptions) return;

    let active = true;

    const fetchOptions = async () => {
      setInternalLoading(true);
      try {
        const results = await loadOptions(debouncedSearch);
        if (active) {
          setAsyncOptions(results);
        }
      } catch (err) {
        console.error("Failed to load options", err);
        if (active) setAsyncOptions([]);
      } finally {
        if (active) setInternalLoading(false);
      }
    };

    fetchOptions();

    return () => {
      active = false;
    };
  }, [debouncedSearch, loadOptions]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (!multiple && value) {
          const selected = currentOptions.find((o) => o.value === value);
          if (selected) setInputValue(selected.label);
          else setInputValue("");
        } else {
          setInputValue("");
        }
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [multiple, value, currentOptions]);

  // Reset active index when options change
  useEffect(() => {
    setActiveIndex(-1);
  }, [filteredOptions]);

  // Derived selected options objects
  const selectedOptions = useMemo(() => {
    if (multiple) {
      if (!Array.isArray(value)) return [];
      return currentOptions.filter((opt) => value.includes(opt.value));
    } else {
      return currentOptions.find((opt) => opt.value === value) || null;
    }
  }, [currentOptions, value, multiple]);

  const handleSelect = (option: Option) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (!currentValues.includes(option.value)) {
        onChange?.([...currentValues, option.value]);
      }
      setInputValue(""); // Clear search
      inputRef.current?.focus(); // Keep focus
    } else {
      onChange?.(option.value);
      setIsOpen(false);
      setInputValue(option.label); // Set input to label
    }
    setActiveIndex(-1);
  };

  const handleRemove = (valToRemove: string | number) => {
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter((v) => v !== valToRemove));
    } else {
      onChange?.(null);
      setInputValue("");
    }
  };

  const scrollIntoView = (index: number) => {
    if (listRef.current) {
      const item = listRef.current.children[index] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
        scrollIntoView(activeIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        scrollIntoView(activeIndex - 1);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && activeIndex < filteredOptions.length) {
        handleSelect(filteredOptions[activeIndex]);
      } else if (!isOpen) {
        setIsOpen(true);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (
      e.key === "Backspace" &&
      !inputValue &&
      multiple &&
      Array.isArray(value) &&
      value.length > 0
    ) {
      const lastValue = value[value.length - 1];
      handleRemove(lastValue);
    }
  };

  // Sync single select input value with selected option label when not typing
  useEffect(() => {
    if (!multiple && !isOpen) {
      if (selectedOptions && !Array.isArray(selectedOptions)) {
        setInputValue((selectedOptions as Option).label);
      } else {
        setInputValue("");
      }
    }
  }, [selectedOptions, multiple, isOpen]);

  // Resolve Theme
  const [focused, setFocused] = useState(false);
  const theme = useFormTheme(); // Access full theme to use helpers manually
  const autocompleteTheme = theme.autocomplete || defaultTheme.autocomplete;

  // We base "error" state on props
  const themeClasses = useComponentTheme(
    "autocomplete",
    {
      error: error,
      disabled: disabled,
      focused: focused, // internal or props
      value: value && (Array.isArray(value) ? value.length > 0 : value !== ""),
      variant,
    },
    undefined,
    globalOverRide
  );

  const isFloating = variant === "floating";

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

      {/* Wrapper acting as the visible input box */}
      <div
        className={themeClasses.wrapper}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.focus();
            setIsOpen(true);
          }
        }}
      >
        {isFloating && label && (
          <label htmlFor={id} className={themeClasses.label}>
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}
        {/* Start Adornment */}
        {startAdornment && (
          <div className="flex items-center text-muted-foreground mr-1">{startAdornment}</div>
        )}

        {/* Render Chips for Multi-select */}
        {multiple &&
          (selectedOptions as Option[]).slice(0, limitTags ? limitTags : undefined).map((opt) => (
            <div key={opt.value} className={themeClasses.tag}>
              {opt.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(opt.value);
                }}
                disabled={disabled}
                className="ml-1 hover:text-foreground focus:outline-none"
              >
                ×
              </button>
            </div>
          ))}
        {multiple && limitTags && (selectedOptions as Option[]).length > limitTags && (
          <div className={themeClasses.tag}>
            +{(selectedOptions as Option[]).length - limitTags}
          </div>
        )}

        <input
          ref={inputRef}
          id={id}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? getOptionId(activeIndex) : undefined}
          disabled={disabled}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            // Delay blur handling to allow clicks
            setFocused(false);
          }}
          placeholder={!multiple || (selectedOptions as Option[]).length === 0 ? placeholder : ""}
          className={themeClasses.input}
          autoComplete="off"
        />

        {/* End Adornment / Chevron */}
        <div className="flex items-center gap-2 ml-auto text-muted-foreground">
          {(endAdornment || onClear) &&
            onClear &&
            value &&
            (!Array.isArray(value) || value.length > 0) &&
            !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="hover:text-foreground"
              >
                ✕
              </button>
            )}
          {/* Default Chevron */}
          {!endAdornment ? (
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
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          ) : (
            endAdornment
          )}
        </div>
      </div>

      {error && <span className={themeClasses.errorText}>{error}</span>}

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className={themeClasses.list}>
          {isLoading ? (
            <div className="p-2 text-sm text-center text-muted-foreground">Loading...</div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-2 text-sm text-center text-muted-foreground">No options found.</div>
          ) : (
            <ul className="py-1" ref={listRef} role="listbox" id={listboxId}>
              {filteredOptions.map((option, index) => {
                const isSelected = multiple
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value;
                const isHighlighted = index === activeIndex;

                // Manually resolve item class
                const itemClass =
                  typeof autocompleteTheme.item === "function"
                    ? autocompleteTheme.item({
                        focused: isHighlighted,
                        value: isSelected,
                      } as ComponentState)
                    : autocompleteTheme.item || "";

                return (
                  <li
                    key={option.value}
                    id={getOptionId(index)}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={itemClass}
                  >
                    {option.label}
                    {isSelected && <span className="ml-auto text-primary">✓</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
