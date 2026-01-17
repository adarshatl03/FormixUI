import React, { useRef, useState } from "react";
import { useComponentTheme } from "../theme/ThemeContext";
import type { BaseFieldProps } from "./field/types";

interface FileInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "id">,
    BaseFieldProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  maxSize?: number;
}

export const FileInput = ({
  id,
  label,
  error,
  required,
  disabled,
  className,
  fullWidth,
  value,
  onChange,
  startAdornment,
  endAdornment,
  accept,
  multiple,
  maxSize,
  globalOverRide,
  ...props
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  // Resolve Theme
  const themeClasses = useComponentTheme(
    "fileInput",
    {
      error,
      disabled,
      focused,
      value: !!value,
    },
    undefined,
    globalOverRide
  );

  // ✅ Derived value (no state, no effect)
  const fileName = value?.name ?? "";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (maxSize && file && file.size > maxSize) {
      alert(`File size exceeds the limit of ${Math.round(maxSize / 1024 / 1024)}MB`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    onChange?.(file);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div className={`${themeClasses.root} ${className || ""} ${fullWidth ? "w-full" : ""}`}>
      <label htmlFor={id} className={themeClasses.label}>
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      <div className={themeClasses.wrapper} onClick={() => inputRef.current?.click()}>
        {startAdornment && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none">
            {startAdornment}
          </div>
        )}

        <input
          {...props}
          ref={inputRef}
          type="file"
          id={id}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="sr-only"
        />

        <div className="flex-1 truncate px-1 text-sm text-foreground">
          {fileName || (
            <span className="text-muted-foreground">{props.placeholder || "Choose a file..."}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {fileName && !disabled && (
            <button
              type="button"
              onClick={clearSelection}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              ✕
            </button>
          )}
          {endAdornment && <div>{endAdornment}</div>}
        </div>
      </div>

      {error && <p className={themeClasses.errorText}>{error}</p>}
    </div>
  );
};

FileInput.displayName = "FileInput";
