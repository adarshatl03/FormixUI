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
  dateRangePicker: "Date Range Picker",
  timePicker: "Time Picker",
  dateTimePicker: "Date Time Picker",

  // Feedback
  alert: "Alert",
  dialog: "Dialog",
  toast: "Toast",
  tooltip: "Tooltip",
  sheet: "Sheet",

  // Advanced
  richText: "Rich Text Editor",
  colorPicker: "Color Picker",
  rating: "Rating",
  treeView: "Tree View",
  upload: "File Upload",
  virtualScroll: "Virtual Scroll",

  // Layout
  card: "Card",
  tabs: "Tabs",
  accordion: "Accordion",
  breadcrumb: "Breadcrumb",
  sidebar: "Sidebar",
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
            {/* Categorized Component List */}
            {Object.entries({
              "Base Inputs": ["textInput", "textarea", "fileInput"],
              Selection: ["checkbox", "radio", "switch", "select", "autocomplete"],
              "Date & Time": ["datePicker", "dateTimePicker", "dateRangePicker", "timePicker"],
              "Feedback / Overlay": ["alert", "dialog", "toast", "tooltip", "sheet"],
              "Advanced / Data": [
                "richText",
                "colorPicker",
                "rating",
                "treeView",
                "upload",
                "virtualScroll",
              ],
              Layout: ["card", "tabs", "accordion", "breadcrumb", "sidebar"],
            }).map(([category, slugs]) => (
              <div key={category} className="mb-6">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/70 mb-2 pl-3">
                  {category}
                </h3>
                <div className="space-y-1">
                  {slugs.map((slug) => {
                    const exists = !!defaultTheme[slug as keyof typeof defaultTheme];
                    const title = COMPONENT_TITLES[slug] || slug;

                    if (!exists) {
                      return (
                        <div
                          key={slug}
                          className="w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground/40 border-l-2 border-transparent flex justify-between items-center cursor-not-allowed"
                        >
                          {title}
                          <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                            Planned
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={slug}
                        onClick={() => setActiveSlug(slug)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors border-l-2 ${
                          activeSlug === slug
                            ? "bg-primary/10 text-primary font-medium border-primary"
                            : "hover:bg-muted text-muted-foreground border-transparent hover:border-border"
                        }`}
                      >
                        {title}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
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
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Generate Vanilla CSS
                    const cssContent = `/* 
 * Formik UI - Vanilla CSS Fallback
 * Generated for "No Tailwind" environments
 * --------------------------------------
 */
:root {
${Object.entries(currentVars)
  .map(([k, v]) => `  ${k}: ${v};`)
  .join("\n")}
}

/* Boilerplate Structural Classes used in DefaultTheme */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-1\\.5 { gap: 0.375rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mt-1 { margin-top: 0.25rem; }
.w-full { width: 100%; }
.h-10 { height: 2.5rem; }
.h-4 { height: 1rem; }
.w-4 { width: 1rem; }
.rounded-md { border-radius: 0.375rem; }
.border { border-style: solid; border-width: 1px; }
.border-2 { border-style: solid; border-width: 2px; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.font-medium { font-weight: 500; }
.relative { position: relative; }
.absolute { position: absolute; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
.cursor-pointer { cursor: pointer; }
.outline-none { outline: 2px solid transparent; outline-offset: 2px; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.bg-transparent { background-color: transparent; }

/* Colors Mappings */
.bg-background { background-color: var(--color-background); }
.bg-primary { background-color: var(--color-primary); }
.bg-border { background-color: var(--color-border); }
.text-primary { color: var(--color-primary); }
.text-primary-foreground { color: var(--color-primary-foreground); }
.text-destructive { color: var(--color-destructive); }
.text-muted-foreground { color: var(--color-muted-foreground); }
.text-foreground { color: var(--color-foreground); }
.border-input { border-color: var(--color-input); }
.border-primary { border-color: var(--color-primary); }
.border-destructive { border-color: var(--color-destructive); }
`;
                    const blob = new Blob([cssContent], { type: "text/css" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "form-engine-vanilla.css";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="text-[10px] bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 px-2 py-0.5 rounded font-bold uppercase hover:opacity-90"
                >
                  Download CSS
                </button>
                <button
                  onClick={() => setVars(THEME_PRESETS[activePreset][variant])}
                  className="text-[10px] font-bold text-primary uppercase hover:underline"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {Object.entries(currentVars)
                .filter(([key]) => {
                  const k = key.toLowerCase();
                  // Always show background/foreground
                  if (k.includes("background") || k.includes("foreground")) return true;

                  // Component specific filters
                  if (activeSlug === "global") return true;

                  // Text Input / Textarea / Select / Autocomplete -> Show border, input, ring, destructive
                  const isInput = [
                    "textInput",
                    "textarea",
                    "select",
                    "autocomplete",
                    "fileInput",
                    "datePicker",
                  ].includes(activeSlug);

                  if (isInput) {
                    if (
                      k.includes("border") ||
                      k.includes("input") ||
                      k.includes("ring") ||
                      k.includes("destructive")
                    )
                      return true;
                  }

                  // Checkbox/Radio/Switch -> Show control-checked, ring
                  const isControl = ["checkbox", "radio", "switch"].includes(activeSlug);
                  if (isControl) {
                    if (k.includes("control") || k.includes("ring") || k.includes("primary"))
                      return true;
                  }

                  return false;
                })
                .map(([key, val]) => (
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
