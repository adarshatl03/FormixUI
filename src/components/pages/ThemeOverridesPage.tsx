// ... imports
import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { ThemeProvider } from "../theme/ThemeContext";
import { defaultTheme } from "../theme/defaultTheme";

// Re-use playground configs to render components
import { COMPONENTS } from "../playground/components-config";
import { TextInput } from "../ui/TextInput";
import { Select } from "../ui/Select";

// Minimal wrapper to handle component state for preview
const PreviewWrapper = ({
  component: Component,
  defaultProps,
  componentKey,
}: {
  component: any;
  defaultProps: any;
  componentKey: string;
}) => {
  const isBoolean = componentKey === "checkbox" || componentKey === "switch";
  const [val, setVal] = useState(
    defaultProps.value ?? defaultProps.defaultValue ?? (isBoolean ? false : "")
  );

  const handleChange = (arg: any) => {
    if (isBoolean) {
      if (arg?.target) {
        setVal(arg.target.checked);
      } else {
        setVal(!!arg);
      }
    } else {
      if (arg?.target) {
        setVal(arg.target.value);
      } else {
        setVal(arg);
      }
    }
  };

  const props = {
    ...defaultProps,
    onChange: handleChange,
  };

  if (isBoolean) {
    props.checked = val;
  } else {
    props.value = val;
  }

  return <Component key={componentKey} {...props} />;
};

const COMPONENT_TITLES: Record<string, string> = {
  textInput: "Text Input",
  checkbox: "Checkbox",
  radio: "Radio Group",
  switch: "Switch",
  autocomplete: "Autocomplete",
  select: "Select",
  textarea: "Textarea",
  fileInput: "File Input",
  datePicker: "Date Picker",
};

const THEME_PRESETS: Record<
  string,
  { name: string; light: Record<string, string>; dark: Record<string, string> }
> = {
  modern: {
    name: "Modern Slate",
    light: {
      "--color-background": "#ffffff",
      "--color-foreground": "#09090b",
      "--color-primary": "#003c71",
      "--color-primary-foreground": "#ffffff",
      "--color-secondary": "#f4f4f5",
      "--color-secondary-foreground": "#18181b",
      "--color-destructive": "#ef4444",
      "--color-muted": "#f4f4f5",
      "--color-muted-foreground": "#71717a",
      "--color-input": "#f1f5f9",
      "--color-ring": "#003c71",
    },
    dark: {
      "--color-background": "#020617",
      "--color-foreground": "#f8fafc",
      "--color-primary": "#38bdf8",
      "--color-primary-foreground": "#ffffff",
      "--color-secondary": "#1e293b",
      "--color-secondary-foreground": "#f8fafc",
      "--color-destructive": "#f43f5e",
      "--color-muted": "#1e293b",
      "--color-muted-foreground": "#94a3b8",
      "--color-input": "#1e293b",
      "--color-ring": "#38bdf8",
    },
  },
  vibrant: {
    name: "Vibrant Indigo",
    light: {
      "--color-background": "#fdfcff",
      "--color-foreground": "#1e1b4b",
      "--color-primary": "#4f46e5",
      "--color-primary-foreground": "#ffffff",
      "--color-secondary": "#eef2ff",
      "--color-secondary-foreground": "#312e81",
      "--color-destructive": "#e11d48",
      "--color-muted": "#eef2ff",
      "--color-muted-foreground": "#6366f1",
      "--color-input": "#f5f3ff",
      "--color-ring": "#4f46e5",
    },
    dark: {
      "--color-background": "#0c0a09",
      "--color-foreground": "#fafaf9",
      "--color-primary": "#818cf8",
      "--color-primary-foreground": "#ffffff",
      "--color-secondary": "#1c1917",
      "--color-secondary-foreground": "#d4d4d8",
      "--color-destructive": "#fb7185",
      "--color-muted": "#1c1917",
      "--color-muted-foreground": "#a1a1aa",
      "--color-input": "#1c1917",
      "--color-ring": "#818cf8",
    },
  },
};

export const ThemeOverridesPage = () => {
  const [activeSlug, setActiveSlug] = useState<string>("textInput");
  const [jsonCode, setJsonCode] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);

  const [variant, setVariant] = useState<"light" | "dark">("light");
  const [activePreset, setActivePreset] = useState("modern");
  const [lightVars, setLightVars] = useState(THEME_PRESETS.modern.light);
  const [darkVars, setDarkVars] = useState(THEME_PRESETS.modern.dark);
  const [globalJson, setGlobalJson] = useState(
    JSON.stringify(
      {
        root: "font-sans antialiased",
        label: "tracking-tight",
        input: "shadow-sm",
      },
      null,
      2
    )
  );

  function slugToConfig(slug: string) {
    if (slug === "global") return null;
    return COMPONENTS[slug] || COMPONENTS.textInput;
  }
  const ComponentConfig = slugToConfig(activeSlug);

  const applyPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    setLightVars(THEME_PRESETS[presetKey].light);
    setDarkVars(THEME_PRESETS[presetKey].dark);
  };

  // Logic for JSON editor content
  useEffect(() => {
    if (activeSlug === "global") {
      setJsonCode(globalJson);
      return;
    }

    const getSampleJson = (key: string) => {
      const common = {
        root: "flex flex-col gap-2",
        label: "text-blue-600 font-bold",
      };

      if (key === "autocomplete") {
        return {
          ...common,
          wrapper: "border-2 border-indigo-200 rounded-lg p-2 bg-indigo-50/50",
          item: "px-4 py-2 hover:bg-indigo-600 hover:text-white rounded-md mb-1 cursor-pointer transition-colors",
          list: "mt-2 p-2 bg-white border border-indigo-100 shadow-xl rounded-xl max-h-[300px] overflow-auto",
        };
      }
      if (key === "switch") {
        return {
          ...common,
          track: "w-14 h-7 rounded-full transition-colors duration-300",
          thumb: "w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300",
        };
      }
      if (key === "checkbox" || key === "radio") {
        return {
          ...common,
          root: "flex items-center gap-3 p-3 rounded-xl border border-dashed border-slate-300 hover:border-primary transition-colors",
          input: "w-5 h-5 accent-blue-600",
        };
      }

      return {
        ...common,
        input:
          "border-2 border-blue-200 rounded-xl p-3 bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all",
      };
    };

    setJsonCode(JSON.stringify(getSampleJson(activeSlug), null, 2));
  }, [activeSlug, globalJson]);

  // Sync global changes back to their source if we're in global mode?
  // No, we let the user edit and it computes.

  const liveTheme = useMemo(() => {
    let parsedGlobal = {};
    try {
      parsedGlobal = globalJson ? JSON.parse(globalJson) : {};
    } catch {
      // Ignore parsing errors for derived state
    }

    let parsed = {};
    try {
      parsed = jsonCode ? JSON.parse(jsonCode) : {};
    } catch {
      // Ignore parsing errors for derived state
      return defaultTheme;
    }

    const theme: any = { ...defaultTheme, global: parsedGlobal };
    if (activeSlug !== "global") {
      theme[activeSlug] = { ...theme[activeSlug], ...parsed };
    }
    return theme;
  }, [jsonCode, globalJson, activeSlug]);

  useEffect(() => {
    setParseError(null);
    try {
      if (activeSlug === "global") {
        if (globalJson) JSON.parse(globalJson);
      } else {
        if (jsonCode) JSON.parse(jsonCode);
      }
    } catch (e: any) {
      setParseError(e.message);
    }
  }, [jsonCode, globalJson, activeSlug]);

  const currentVars = variant === "light" ? lightVars : darkVars;
  const setVars = variant === "light" ? setLightVars : setDarkVars;

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-64px)] flex gap-8">
      {/* Sidebar */}
      <div className="w-56 shrink-0 border-r border-border pr-6 overflow-y-auto hidden md:flex flex-col gap-8">
        <div>
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Structure
          </h2>
          <button
            onClick={() => setActiveSlug("global")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors mb-1 flex items-center gap-2 ${
              activeSlug === "global"
                ? "bg-primary/10 text-primary font-bold"
                : "hover:bg-muted text-muted-foreground"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Global Overrides
          </button>

          <div className="h-px bg-border my-4" />
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
            Components
          </h2>
          <div className="space-y-1">
            {Object.keys(defaultTheme)
              .filter((key) => key !== "global")
              .map((key) => {
                const title = COMPONENT_TITLES[key] || key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveSlug(key)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSlug === key
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {title}
                  </button>
                );
              })}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Color Base
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(THEME_PRESETS).map(([key, p]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs border transition-all ${
                  activePreset === key
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              {activeSlug === "global"
                ? "Global Overrides"
                : COMPONENT_TITLES[activeSlug] || activeSlug}
              {activeSlug === "global" && (
                <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full border border-blue-500/20">
                  Inherited by all
                </span>
              )}
            </h1>
            <p className="text-muted-foreground text-sm">
              Tweak properties and see how they look across different theme variants.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setVariant("light")}
              className={`px-4 py-1.5 text-xs rounded-md transition-all flex items-center gap-2 ${variant === "light" ? "bg-background shadow-sm font-bold" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              Light Mode
            </button>
            <button
              onClick={() => setVariant("dark")}
              className={`px-4 py-1.5 text-xs rounded-md transition-all flex items-center gap-2 ${variant === "dark" ? "bg-background shadow-sm font-bold" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              Dark Mode
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
          <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
            <div
              className={`flex-1 bg-card border border-border rounded-xl p-8 flex items-center justify-center relative shadow-sm overflow-hidden transition-all duration-500 ${variant === "dark" ? "dark bg-slate-950" : "bg-white"}`}
              style={currentVars as CSSProperties}
            >
              <div className="absolute inset-0 bg-background transition-colors duration-500 opacity-100" />
              <div className="w-full max-w-sm relative z-10">
                <ThemeProvider value={liveTheme}>
                  {activeSlug === "global" ? (
                    <div className="space-y-6">
                      <TextInput
                        id="g-1"
                        label="Global Input"
                        placeholder="Styles inherited from global..."
                      />
                      <Select
                        id="g-2"
                        label="Global Select"
                        options={[{ label: "Option 1", value: "1" }]}
                      />
                    </div>
                  ) : ComponentConfig ? (
                    <PreviewWrapper
                      component={ComponentConfig.component}
                      defaultProps={{ ...ComponentConfig.defaultProps, globalOverRide: true }}
                      componentKey={activeSlug}
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">No preview available</div>
                  )}
                </ThemeProvider>
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground opacity-50">
                {variant} preview
              </div>
            </div>

            <div className="h-72 bg-[#0d1117] text-slate-300 rounded-xl overflow-hidden flex flex-col shrink-0 border border-slate-800 shadow-xl">
              <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                    JSON CONFIG
                  </span>
                  <span className="text-slate-600">/</span>
                  <span className="text-[10px] font-mono text-slate-400">{activeSlug}.json</span>
                </div>
                {parseError && (
                  <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">
                    {parseError}
                  </span>
                )}
              </div>
              <div className="flex-1 relative">
                <textarea
                  value={jsonCode}
                  onChange={(e) => {
                    setJsonCode(e.target.value);
                    if (activeSlug === "global") setGlobalJson(e.target.value);
                  }}
                  className="absolute inset-0 w-full h-full p-6 text-[13px] font-mono bg-transparent focus:outline-none resize-none leading-relaxed text-blue-100/90"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-card border border-border rounded-xl p-5 overflow-y-auto flex flex-col gap-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm tracking-tight">
                {variant === "light" ? "Light Variables" : "Dark Variables"}
              </h3>
              <button
                onClick={() => setVars(THEME_PRESETS[activePreset][variant])}
                className="text-[10px] font-bold text-primary uppercase hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="space-y-5">
              {Object.entries(currentVars).map(([key, val]) => (
                <div key={key} className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                    {key.replace("--color-", "").replace("-", " ")}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative group p-0.5 rounded-md border border-border bg-muted/30">
                      <input
                        type="color"
                        value={val}
                        onChange={(e) => setVars((prev) => ({ ...prev, [key]: e.target.value }))}
                        className="h-8 w-12 rounded cursor-pointer p-0 opacity-0 absolute inset-0 z-10"
                      />
                      <div
                        className="h-8 w-12 rounded shadow-inner"
                        style={{ backgroundColor: val }}
                      />
                    </div>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setVars((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="h-9 flex-1 rounded-md border border-input bg-background/50 px-3 text-xs font-mono focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
