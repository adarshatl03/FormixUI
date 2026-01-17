import { createContext, useContext, useMemo } from "react";
import { defaultTheme } from "./defaultTheme";
import type { FormTheme, ComponentTheme, ComponentState } from "./types";

// The Context
const ThemeContext = createContext<FormTheme>(defaultTheme);

// The Provider Component
export const ThemeProvider = ThemeContext.Provider;

/**
 * Hook to access the full theme object.
 */
export const useFormTheme = () => useContext(ThemeContext);

/**
 * Hook to resolve styles for a specific component.
 *
 * @param componentName The key of the component in the theme object (e.g. 'textInput')
 * @param state The current state of the component (error, focused, etc.)
 * @param overrideClasses Optional overrides passed directly to the component props
 *
 * @returns An object containing the resolved generic class strings for each slot.
 */
export const useComponentTheme = <K extends keyof FormTheme>(
  componentName: K,
  state: ComponentState,
  overrideClasses?: Partial<Record<keyof ComponentTheme, string>>,
  globalOverride: boolean = true
) => {
  const theme = useFormTheme();
  const componentTheme = theme[componentName] || defaultTheme[componentName];
  const globalTheme = theme.global;

  return useMemo(() => {
    const slots = {} as Record<keyof ComponentTheme, string>;

    // List of all known slots to check for both global and component themes
    const allSlots: (keyof ComponentTheme)[] = [
      "root",
      "label",
      "input",
      "helperText",
      "errorText",
      "wrapper",
      "icon",
      "track",
      "thumb",
      "list",
      "item",
      "tag",
    ];

    allSlots.forEach((slotKey) => {
      let resolvedClass = "";

      // 1. Resolve Global Class (if enabled)
      if (globalOverride && globalTheme && globalTheme[slotKey]) {
        const globalStyle = globalTheme[slotKey];
        resolvedClass = typeof globalStyle === "function" ? globalStyle(state) : globalStyle || "";
      }

      // 2. Resolve Component Specific Class
      const componentStyle = componentTheme?.[slotKey];
      if (componentStyle) {
        const compClass =
          typeof componentStyle === "function" ? componentStyle(state) : componentStyle || "";
        resolvedClass = resolvedClass ? `${resolvedClass} ${compClass}` : compClass;
      }

      // 3. Merge with Prop Overrides if present
      if (overrideClasses && overrideClasses[slotKey]) {
        resolvedClass = resolvedClass
          ? `${resolvedClass} ${overrideClasses[slotKey]}`
          : overrideClasses[slotKey]!;
      }

      if (resolvedClass) {
        slots[slotKey] = resolvedClass.trim();
      }
    });

    return slots;
  }, [componentTheme, globalTheme, state, overrideClasses, globalOverride]);
};
