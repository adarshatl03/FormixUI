import { useState } from "react";
import type { PropConfig } from "./types";
import { Settings2, RefreshCcw, Code } from "lucide-react";

interface ComponentPlaygroundProps {
  component: React.ComponentType<any>;
  propDefinitions: Record<string, PropConfig>;
  defaultProps: Record<string, any>;
}

// Helper to generate formatted JSX
const generateJSX = (componentName: string, props: Record<string, any>) => {
  const propLines = Object.entries(props)
    .filter(([, val]) => val !== undefined && val !== false && val !== "")
    .map(([key, val]) => {
      // Pretty print arrays/objects
      if (typeof val === "object" && val !== null) {
        const json = JSON.stringify(val, null, 2);
        // Indent lines to align with prop
        const indentedJson = json
          .split("\n")
          .map((line, i) => (i === 0 ? line : `  ${line}`))
          .join("\n");
        return `  ${key}={${indentedJson}}`;
      }
      return `  ${key}={${JSON.stringify(val)}}`;
    })
    .join("\n");

  return `<${componentName}\n${propLines}\n/>`;
};

export const ComponentPlayground = ({
  component: Component,
  propDefinitions,
  defaultProps,
}: ComponentPlaygroundProps) => {
  const [props, setProps] = useState(defaultProps);

  const handlePropChange = (key: string, value: any) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  };

  const resetProps = () => {
    setProps(defaultProps);
  };

  const codeString = generateJSX(Component.displayName || Component.name || "Component", props);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full p-6 lg:p-0">
      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto lg:overflow-visible">
        {/* Canvas */}
        <div className="flex-1 bg-card border border-border rounded-xl shadow-sm p-8 flex items-center justify-center min-h-[400px] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div
            id="playground-root"
            className="w-full max-w-md bg-background/50 p-6 rounded-lg backdrop-blur-sm ring-1 ring-border/50"
          >
            <Component {...props} />
          </div>
        </div>

        {/* Code View */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Code className="w-3 h-3" /> JSX Usage
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(codeString);
              }}
              className="text-xs hover:text-white transition-colors"
              title="Copy component code"
            >
              Copy
            </button>
          </div>
          <pre className="flex-1 overflow-x-auto text-[13px] font-mono text-slate-300 leading-relaxed custom-scrollbar">
            {codeString}
          </pre>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:h-full lg:overflow-y-auto custom-scrollbar pb-10">
        <div className="p-5 bg-card border border-border rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Properties
            </h3>
            <button
              onClick={resetProps}
              title="Reset to defaults"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(propDefinitions).map(([key, config]) => (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {config.label || key}
                  </label>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 rounded">
                    {config.type}
                  </span>
                </div>

                {config.type === "string" && (
                  <input
                    type="text"
                    value={props[key] || ""}
                    onChange={(e) => handlePropChange(key, e.target.value)}
                    className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                )}

                {config.type === "number" && (
                  <input
                    type="number"
                    value={props[key] || ""}
                    onChange={(e) => handlePropChange(key, Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                )}

                {config.type === "boolean" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePropChange(key, !props[key])}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        props[key] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          props[key] ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {props[key] ? "True" : "False"}
                    </span>
                  </div>
                )}

                {config.type === "select" && (
                  <select
                    value={props[key] || ""}
                    onChange={(e) => handlePropChange(key, e.target.value)}
                    className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    {config.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {config.description && (
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {config.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
