export const ChangelogPage = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-4xl font-extrabold mb-2">Changelog</h1>
        <p className="text-xl text-muted-foreground">
          All notable changes to FormEngine are documented here.
        </p>
      </div>

      <div className="space-y-12">
        {/* Version 3.0.5 */}
        <div className="relative pl-8 border-l-2 border-border">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
          <h2 className="text-2xl font-bold mb-2">
            v3.0.5 <span className="text-sm font-normal text-muted-foreground ml-2">Current</span>
          </h2>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Added</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Native Date Range Picker:</strong> Added{" "}
                  <code className="text-primary bg-primary/10 px-1 rounded">showTime</code> prop to
                  DateRangePicker for selecting time alongside dates.
                </li>
                <li>
                  <strong>Demo Gallery:</strong> Added Time Range Picker example to the States
                  Gallery.
                </li>
                <li>
                  <strong>Documentation:</strong> Updated README and Package Summary to reflect
                  removal of Kendo UI.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Fixed</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Corrected Tailwind class usage (replaced hardcoded CSS variables with utility
                  classes).
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Version 3.0.2 */}
        <div className="relative pl-8 border-l-2 border-border">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
          <h2 className="text-2xl font-bold mb-2">
            v3.0.2{" "}
            <span className="text-sm font-normal text-muted-foreground ml-2">2026-01-13</span>
          </h2>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3 text-foreground">🎉 Initial Release</h3>
              <p className="text-muted-foreground mb-4">
                First major release of the FormEngine library with visual builder and schema-driven
                rendering.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="block text-foreground mb-2">Core Features</strong>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Visual Form Builder</li>
                    <li>17 Field Types</li>
                    <li>Zod Validation Integration</li>
                    <li>Conditional Logic</li>
                  </ul>
                </div>
                <div>
                  <strong className="block text-foreground mb-2">Architecture</strong>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>React 19 Support</li>
                    <li>Tailwind CSS 4.0</li>
                    <li>TypeScript Native</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
