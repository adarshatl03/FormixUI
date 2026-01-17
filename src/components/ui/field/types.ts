import type { ReactNode } from "react";

export interface BaseFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;

  // Adornments
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  onClear?: () => void;

  // Layout
  fullWidth?: boolean;
  globalOverRide?: boolean;
  variant?: "outline" | "filled" | "standard" | "floating";
}
