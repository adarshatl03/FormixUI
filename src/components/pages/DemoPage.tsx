import { useRef, useState } from "react";
import { SchemaForm, type SchemaFormHandle } from "@/components/SchemaForm";
import type { FormSchema } from "@/types/schema";
import type { FormTheme } from "@/components/theme/types";
import { defaultTheme } from "@/components/theme/defaultTheme";

interface DemoPageProps {
  schema: FormSchema;
}

export const DemoPage = ({ schema }: DemoPageProps) => {
  const formRef = useRef<SchemaFormHandle>(null);
  const [debugValues, setDebugValues] = useState<any>({});
  const [demoTheme, setDemoTheme] = useState<FormTheme | undefined>(undefined);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left Column: Logic Guide */}
      <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-blue-500">⚡</span> Active Conditions
          </h3>
          <div className="space-y-3">
            <div
              className={`p-3 rounded-lg border transition-colors ${
                debugValues?.job?.role === "other"
                  ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-300"
                  : "bg-muted/50 border-transparent text-muted-foreground"
              }`}
            >
              <div className="text-xs font-semibold uppercase mb-1">Condition 1</div>
              <div className="text-sm font-medium">Show "Specify Role" field</div>
              <div className="text-xs opacity-80 mt-1">Rule: Role == "Other"</div>
            </div>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Interact with the form on the right to see conditions trigger in real-time.</p>
          </div>
        </div>
      </div>

      {/* Right Column: The Form */}
      <div className="lg:col-span-2">
        <div className="p-8 md:p-10 rounded-3xl border border-border bg-card shadow-xl relative overflow-hidden">
          {/* Decorative background gradients */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Dynamic Form</h2>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Theme:
              </label>
              <select
                className="text-sm border border-border rounded px-2 py-1 bg-background"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "default") {
                    setDemoTheme(undefined);
                  } else if (val === "ocean") {
                    setDemoTheme({
                      ...defaultTheme,
                      textInput: {
                        ...defaultTheme.textInput,
                        input:
                          "flex h-12 w-full rounded-full border-2 border-blue-200 bg-blue-50/50 px-4 py-2 text-sm text-blue-900 placeholder:text-blue-400 focus:outline-none focus:border-blue-500 transition-all",
                      },
                    });
                  } else if (val === "forest") {
                    setDemoTheme({
                      ...defaultTheme,
                      textInput: {
                        ...defaultTheme.textInput,
                        root: "flex flex-col gap-1 mb-4",
                        input:
                          "flex h-10 w-full rounded-none border-b-2 border-green-700 bg-green-50/20 px-0 py-2 text-sm text-green-900 placeholder:text-green-700/50 focus:outline-none focus:border-green-500 transition-all",
                        label: "text-xs font-bold uppercase text-green-800 tracking-wider",
                      },
                    });
                  }
                }}
              >
                <option value="default">Default</option>
                <option value="ocean">Ocean (Round)</option>
                <option value="forest">Forest (Underline)</option>
              </select>
            </div>
          </div>

          <div className="relative z-10">
            <SchemaForm
              debug
              theme={demoTheme}
              onValuesChange={(vals) => setDebugValues(vals)}
              onSubmit={(values) => {
                console.log("Submitted:", values);
                alert("Form Submitted!\n\nPayload:\n" + JSON.stringify(values, null, 2));
              }}
              schema={schema}
              hideTitle
              ref={formRef}
            />

            {/* External Actions Buttons */}
            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-border">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                onClick={() => formRef.current?.reset()}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => formRef.current?.submit()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-colors shadow-sm font-medium"
              >
                Submit Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
