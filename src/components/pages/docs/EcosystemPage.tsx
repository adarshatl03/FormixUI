import { Box, Layers, Globe, ShieldCheck, AlertTriangle } from "lucide-react";

export const EcosystemPage = () => {
  const packages = [
    {
      name: "@formix-ui/core",
      desc: "Headless logic engine (hooks only). No UI.",
      status: "Reserved",
    },
    { name: "@formix-ui/charts", desc: "Data visualization components.", status: "Reserved" },
    { name: "@formix-ui/tables", desc: "Enterprise-grade data grids.", status: "Reserved" },
    { name: "@formix-ui/auth", desc: "Pre-built login/register templates.", status: "Reserved" },
    {
      name: "@formix-ui/editor",
      desc: "Standalone visual builder component.",
      status: "Reserved",
    },
    { name: "@formix-ui/cli", desc: "Dedicated CLI package.", status: "Reserved" },
    { name: "@formix-ui/native", desc: "React Native support.", status: "Reserved" },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-10">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Ecosystem Plan</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Strategy for expanding the <span className="font-semibold text-primary">formix-ui</span>{" "}
          ecosystem and modular compatibility.
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg  gap-3 text-amber-700 dark:text-amber-400 hidden">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm">
          <strong>Naming Consideration:</strong> "FormixUI" is a registered trademark. While we use{" "}
          <code className="text-xs bg-black/10 px-1 py-0.5 rounded">formix-ui</code>, future growth
          may require a distinct brand name.
        </div>
      </div>

      {/* Packages */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Box className="w-6 h-6 text-primary" />
          Reserved Packages
        </h2>

        <div className="grid gap-4">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="bg-card border border-border p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-md">
                  <Layers className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-mono font-bold text-primary">{pkg.name}</div>
                  <div className="text-sm text-muted-foreground">{pkg.desc}</div>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold border border-green-500/20 whitespace-nowrap self-start md:self-center">
                {pkg.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Strategy */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">🔄 Phasability & Compatibility</h2>

        <div className="space-y-6">
          {/* Phase 1 */}
          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="text-lg font-bold mb-3">Phase 1: Reservation (Immediate)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>
                Create NPM Organization (<code>@formix-ui</code>)
              </li>
              <li>Publish placeholder packages (0.0.0-placeholder)</li>
              <li>Secure namespace to prevent squatting</li>
            </ul>
          </div>

          {/* Phase 2 */}
          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="text-lg font-bold mb-3">Phase 2: Core Migration (Development)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>
                Extract shared logic to <code>@formix-ui/core</code>
              </li>
              <li>Setup Monorepo (Turborepo/pnpm)</li>
              <li>Refactor components to consume core</li>
            </ul>
          </div>

          {/* Phase 3 */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <ShieldCheck className="w-32 h-32" />
            </div>

            <h3 className="text-lg font-bold mb-4 text-primary">
              Phase 3: The "Facade" Architecture (Recommended)
            </h3>

            <p className="text-sm text-foreground mb-4 font-medium">
              Do NOT unpublish <code>formix-ui</code>. We will use the "Facade" pattern common in
              popular libraries like Vite and Remix.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <strong className="block text-primary mb-1">1. The Wrapper</strong>
                <code className="text-xs bg-muted px-1 rounded">formix-ui</code>
                <p className="text-xs text-muted-foreground mt-2">
                  The "easy button". Re-exports everything. Simple{" "}
                  <code>npm install formix-ui</code>.
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <strong className="block text-primary mb-1">2. The Engine</strong>
                <code className="text-xs bg-muted px-1 rounded">@formix-ui/core</code>
                <p className="text-xs text-muted-foreground mt-2">
                  Headless logic only. For advanced users needing smaller bundles.
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <strong className="block text-primary mb-1">3. The Add-ons</strong>
                <code className="text-xs bg-muted px-1 rounded">@formix-ui/charts</code>
                <p className="text-xs text-muted-foreground mt-2">
                  Optional extras that don't bloat the main package.
                </p>
              </div>
            </div>

            <div>
              <strong className="text-sm">Benefits:</strong>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Keep the premium "short name" on NPM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Avoid breaking existing installs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Gain modularity without complexity for beginners
                </li>
              </ul>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="text-lg font-bold mb-3">Phase 4: Expansion (Growth)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Building out the ecosystem packages once the core is stable.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex gap-2 text-sm">
                <span className="text-primary font-bold">1.</span>
                <div>
                  <strong>@formix-ui/charts</strong>
                  <div className="text-muted-foreground text-xs">Data viz wrappers</div>
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-primary font-bold">2.</span>
                <div>
                  <strong>@formix-ui/tables</strong>
                  <div className="text-muted-foreground text-xs">Data grid wrappers</div>
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-primary font-bold">3.</span>
                <div>
                  <strong>@formix-ui/auth</strong>
                  <div className="text-muted-foreground text-xs">Auth templates</div>
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-primary font-bold">4.</span>
                <div>
                  <strong>@formix-ui/native</strong>
                  <div className="text-muted-foreground text-xs">React Native support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
