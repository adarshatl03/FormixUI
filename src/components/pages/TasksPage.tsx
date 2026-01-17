export const TasksPage = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-4xl font-extrabold mb-2">Project Tasks & Roadmap</h1>
        <p className="text-xl text-muted-foreground">
          Track completed work and upcoming features for FormEngine.
        </p>
      </div>

      <div className="space-y-12">
        {/* Completed Tasks */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-green-600 dark:text-green-500">
            ✅ Completed Tasks (Current Session)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">📅 Date & Time Improvements</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Implement DateRangePicker with Time:</strong> Added{" "}
                    <code>showTime</code> prop.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Schema Integration:</strong> Auto-enable time selection based on format.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>UI/UX Polishing:</strong> Tabbed interface for Start/End time.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Validation:</strong> Logic to preserve time & validate ranges.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🏗️ Integration Ecosystem</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Formik Support:</strong> Global `FormikSchemaForm` mapping.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Yup Schema Generator:</strong> Native translation of FormSchema to Yup.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Next.js Optimization:</strong> App Router safe components.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🛠️ CLI 3.0 (Power Tools)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Project Scaffolding:</strong> New <code>create</code> command.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Contextual Init:</strong> Prompt-driven setup for Framwork/Language.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Landing Page Automation:</strong> Dynamic template generation.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">📚 Documentation & Demo Site</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>New Home Page:</strong> Dedicated landing page summary.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Interactive Documentation:</strong> Readme, Guide, and Changelog pages.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Navigation:</strong> Responsive top bar and routing.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Content Updates:</strong> Removed Kendo UI references, updated versions.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🧹 Maintenance</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Kendo UI Removal:</strong> Full migration to native components.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-0.5">✔</span>
                  <span>
                    <strong>Linting:</strong> Fixed Tailwind & React warnings.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Planned Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-500">
            🚀 Planned Features (Roadmap)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-50 dark:bg-surface-900/40 p-5 rounded-xl border border-border">
              <h3 className="font-semibold mb-3 text-foreground">Core Enhancements</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Multi-step Forms/Wizard</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Form Templates</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Conditional Sections</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Repeatable Group Fields</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-50 dark:bg-surface-900/40 p-5 rounded-xl border border-border">
              <h3 className="font-semibold mb-3 text-foreground">New Field Types</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Rich Text Editor</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Advanced File Upload</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Signature Pad</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Geolocation</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Rating/Star & Color Picker</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-50 dark:bg-surface-900/40 p-5 rounded-xl border border-border">
              <h3 className="font-semibold mb-3 text-foreground">Advanced Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Form Versioning</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Analytics</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Internationalization (i18n)</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>PDF Export</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Calculated Fields</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-50 dark:bg-surface-900/40 p-5 rounded-xl border border-border">
              <h3 className="font-semibold mb-3 text-foreground">Integrations</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Webhook Support</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded-full border border-muted-foreground/30"></span>
                  <span>Email Notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
