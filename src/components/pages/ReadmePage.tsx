import {
  Folder,
  FileCode,
  Layers,
  Cpu,
  Box,
  Terminal,
  Palette,
  LayoutTemplate,
} from "lucide-react";

export const ReadmePage = () => {
  const stats = [
    { label: "Source Files", value: "~70", icon: FileCode },
    { label: "UI Components", value: "22+", icon: Box },
    { label: "Field Types", value: "17", icon: Layers },
    { label: "CLI Commands", value: "4", icon: Terminal },
  ];

  const techStack = [
    { name: "React", version: "19.0", badge: "bg-blue-500/10 text-blue-500" },
    { name: "TypeScript", version: "5.9", badge: "bg-blue-600/10 text-blue-600" },
    { name: "Tailwind CSS", version: "4.0", badge: "bg-cyan-500/10 text-cyan-500" },
    { name: "Vite", version: "7.2", badge: "bg-purple-500/10 text-purple-500" },
    { name: "Zod", version: "3.24", badge: "bg-indigo-500/10 text-indigo-500" },
    { name: "Formik", version: "2.4", badge: "bg-yellow-500/10 text-yellow-500" },
  ];

  const structure = [
    { path: "src/cli", desc: "CLI Tooling & Scaffolding (38KB+)", icon: Terminal },
    { path: "src/components/builder", desc: "Visual Drag-and-Drop Editor", icon: LayoutTemplate },
    { path: "src/components/ui", desc: "Primitive UI Elements (20+)", icon: Box },
    { path: "src/SchemaForm.tsx", desc: "Core Rendering Engine (16KB)", icon: Cpu },
    { path: "src/index.css", desc: "Tailwind v4 Theme Configuration", icon: Palette },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-10">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Cpu className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Project Analysis</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Comprehensive breakdown of the <strong>FormixUI</strong> framework architecture, state,
          and capabilities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 bg-card rounded-xl border border-border shadow-sm flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors"
          >
            <stat.icon className="w-8 h-8 text-primary mb-3" />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Core Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Architecture Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Folder className="w-6 h-6 text-primary" />
              Architecture Overview
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30">
                <h3 className="font-semibold">Core Directory Structure</h3>
              </div>
              <div className="divide-y divide-border">
                {structure.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <code className="text-sm font-semibold text-primary">{item.path}</code>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Modules */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              Key Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-lg">Runtime Engine</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The <code className="text-xs bg-muted px-1 py-0.5 rounded">SchemaForm</code>{" "}
                  component acts as the central orchestrator, recursively rendering fields based on
                  JSON schemas. It handles:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Zod/Yup Validation Adaptation</li>
                  <li>Deeply Nested State Management</li>
                  <li>Conditional Logic Evaluation</li>
                  <li>Theme Context Propagation</li>
                </ul>
              </div>

              <div className="p-5 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-5 h-5 text-green-500" />
                  <h3 className="font-bold text-lg">CLI 3.0</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  A massive 38KB+ implementation in{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">src/cli/index.ts</code>{" "}
                  handles the developer experience:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>
                    <strong>init</strong>: Smart project detection & setup
                  </li>
                  <li>
                    <strong>add</strong>: Component registry fetching
                  </li>
                  <li>
                    <strong>create</strong>: Scaffold new apps with 3 presets
                  </li>
                  <li>
                    <strong>update</strong>: Self-updating mechanism
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Tech Stack & Meta */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Box className="w-6 h-6 text-primary" />
              Technology Stack
            </h2>
            <div className="bg-card rounded-xl border border-border p-5 space-y-4">
              {techStack.map((tech, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-medium">{tech.name}</span>
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${tech.badge}`}>
                    v{tech.version}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Palette className="w-6 h-6 text-primary" />
              Design System
            </h2>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground mb-4">
                Built on <strong>Tailwind CSS v4.0</strong>, utilizing the new CSS-first
                configuration approach.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <span>Primary: Zinc/Blue Scale</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-destructive" />
                  <span>Semantic Errors</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full border border-border bg-background" />
                  <span>Dark Mode First</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
