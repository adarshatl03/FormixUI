import { Terminal } from "lucide-react";

export const CliGuidePage = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Terminal className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">CLI Guide</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          The <code className="text-primary font-semibold">formix-ui</code> CLI is a powerful tool
          designed to streamline the setup, management, and expansion of your form-driven
          applications.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">📋 Prerequisites</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            <li>
              <strong>Node.js</strong>: v18.0.0 or higher
            </li>
            <li>
              <strong>React</strong>: v18.0.0 or higher
            </li>
            <li>
              <strong>Tailwind CSS</strong>: v4.0.0+ (Recommended) or v3.0.0+
            </li>
            <li>
              <strong>TypeScript</strong>: Highly recommended for the best developer experience
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">🚀 Quick Start</h2>
        <p className="text-muted-foreground">
          You can run the CLI without installing it globally using{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">npx</code>:
        </p>
        <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-border">
          npx formix-ui init
        </div>
      </section>

      {/* Commands */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">⌨️ Commands</h2>

        <div className="grid gap-6">
          {/* init */}
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">init</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Initializes <code className="bg-muted px-1 py-0.5 rounded text-xs">formix-ui</code> in
              your project. It will ask whether you want to use it as a library or copy the source
              code (shadcn-style).
            </p>
            <div className="bg-slate-950 text-slate-50 p-3 rounded-lg font-mono text-sm">
              npx formix-ui init
            </div>
          </div>

          {/* create */}
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">create</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Scaffolds a complete new project with React (Vite or Next.js), Tailwind CSS, and your
              choice of validation (Zod/Yup) and state management (Formik/RHF).
            </p>
            <div className="bg-slate-950 text-slate-50 p-3 rounded-lg font-mono text-sm">
              npx formix-ui create [project-name]
            </div>
          </div>

          {/* add */}
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">add</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Adds specific UI components to your project. This is used in "Copy Code" mode.
            </p>
            <div className="bg-slate-950 text-slate-50 p-3 rounded-lg font-mono text-sm">
              npx formix-ui add [component-name]
            </div>
          </div>

          {/* update */}
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">update</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Updates your locally copied components to the latest versions from the registry.
            </p>
            <div className="bg-slate-950 text-slate-50 p-3 rounded-lg font-mono text-sm">
              npx formix-ui update [component-name]
            </div>
          </div>
        </div>
      </section>

      {/* Dos and Donts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">✅ Do's and ❌ Don'ts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
            <h3 className="text-green-600 dark:text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
              ✅ Do's
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  <strong>Run init first</strong>: Always run init before trying to add components.
                  It creates the required config file.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  <strong>Use TypeScript</strong>: The CLI generates TypeScript components.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  <strong>Commit changes</strong>: Before running update, commit your work in case
                  files are overwritten.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  <strong>Check formix.config.json</strong>: Manually adjust paths if you need
                  components in custom directories.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
            <h3 className="text-red-600 dark:text-red-400 font-bold text-lg mb-4 flex items-center gap-2">
              ❌ Don'ts
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>
                  <strong>Don't delete formix.config.json</strong>: This tracks your configuration.
                  Deleting it breaks commands.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>
                  <strong>Don't ignore Peer Dependencies</strong>: Ensure libraries like zod or
                  lucide-react are installed.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>
                  <strong>Don't mix versions</strong>: Keep the main package version in sync with
                  local components.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>
                  <strong>Don't forget Tailwind</strong>: Ensure your config includes component
                  paths.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">🛠️ Configuration (formix.config.json)</h2>
        <p className="text-muted-foreground">
          When you run <code className="bg-muted px-1 py-0.5 rounded text-xs">init</code>, a
          configuration file is created.
        </p>
        <pre className="bg-slate-950 text-slate-50 p-6 rounded-xl font-mono text-sm overflow-x-auto border border-border">
          {`{
  "mode": "library",
  "packageName": "formix-ui",
  "tailwind": true,
  "validation": "zod",
  "formState": "standard",
  "paths": {
    "components": "src/components/ui",
    "core": "src/components/formix"
  }
}`}
        </pre>
      </section>
    </div>
  );
};
