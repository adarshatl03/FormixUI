export const ChangelogPage = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-4xl font-extrabold mb-2">Changelog</h1>
        <p className="text-xl text-muted-foreground">
          All notable changes to FormixUI are documented here.
        </p>
      </div>

      <div className="space-y-12">
        {/* Version 0.0.2 */}
        <div className="relative pl-8 border-l-2 border-border">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
          <h2 className="text-2xl font-bold mb-2">
            v0.0.2 <span className="text-sm font-normal text-muted-foreground ml-2">Current</span>
          </h2>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Changed</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Rebranding:</strong> Officially renamed project from{" "}
                  <code className="text-xs bg-muted px-1 rounded">r-form-engine</code> to{" "}
                  <strong className="text-primary">formix-ui</strong>.
                </li>
                <li>
                  <strong>CLI V3:</strong> Updated all CLI commands to use{" "}
                  <code className="text-xs bg-muted px-1 rounded">npx formix-ui</code>.
                </li>
                <li>
                  <strong>Configuration:</strong> Migrated config file to{" "}
                  <code className="text-xs bg-muted px-1 rounded">formix.config.json</code>.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Version 0.0.1 */}
        <div className="relative pl-8 border-l-2 border-border">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
          <h2 className="text-2xl font-bold mb-2">
            v0.0.1{" "}
            <span className="text-sm font-normal text-muted-foreground ml-2">2026-01-17</span>
          </h2>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Initial Release</h3>
              <p className="text-muted-foreground mb-4">
                First release under the new <strong>FormixUI</strong> package name.
              </p>
            </div>
          </div>
        </div>

        {/* Legacy Version 3.0.5 */}
        <div className="relative pl-8 border-l-2 border-border opacity-75">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Added</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Native Date Range Picker:</strong> Added{" "}
                  <code className="text-primary bg-primary/10 px-1 rounded">showTime</code> prop.
                </li>
                <li>
                  <strong>Demo Gallery:</strong> Added Time Range Picker example.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
