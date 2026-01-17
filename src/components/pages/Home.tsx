import {
  ArrowRight,
  Box,
  Code,
  Layers,
  Zap,
  Terminal,
  Activity,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import projectStatus from "../../data/project-status.json";

export const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="max-w-6xl mx-auto text-center space-y-8 px-4">
          {/* Status Badge */}
          <div className="inline-flex flex-col items-center gap-2">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />v
              {projectStatus.version} - Now Available
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mt-2">
              <span>Completion: {projectStatus.percent}%</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-1000"
                  style={{ width: `${projectStatus.percent}%` }}
                />
              </div>
              <span>
                ({projectStatus.counts.completed}/{projectStatus.counts.total} Tasks)
              </span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-linear-to-br from-foreground via-foreground/90 to-primary/50 bg-clip-text text-transparent">
            FormixUI
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The complete UI framework for building enterprise-grade form applications. Write less
            code, ship faster.
          </p>

          {/* Dynamic Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8 text-left">
            <StatusCard
              title="Recently Completed"
              icon={<CheckCircle className="w-5 h-5 text-green-500" />}
              items={projectStatus.features.completed}
            />
            <StatusCard
              title="In Progress"
              icon={<Activity className="w-5 h-5 text-blue-500" />}
              items={projectStatus.features.inProgress}
            />
            <StatusCard
              title="Stats"
              icon={<Clock className="w-5 h-5 text-purple-500" />}
              items={[
                `v${projectStatus.version} Released`,
                `${projectStatus.counts.recurring} Recurring Tasks`,
                `Last Update: ${new Date(projectStatus.lastUpdated).toLocaleDateString()}`,
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-12">
            <Link
              to="/guide"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/playground"
              className="px-8 py-4 bg-card border border-border rounded-full font-bold text-lg hover:bg-muted transition-colors"
            >
              Try Playground
            </Link>
          </div>

          <div className="mt-12 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 max-w-lg mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <span className="text-primary">$</span>
              <span className="text-foreground">npx formix-ui init</span>
              <span className="ml-auto w-2 h-4 bg-primary animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why FormixUI?</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to build powerful forms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Box className="w-8 h-8 text-blue-500" />}
            title="Visual Builder"
            description="Drag-and-drop interface to create complex forms without writing a single line of code."
            gradient="from-blue-500/20 to-transparent"
          />
          <FeatureCard
            icon={<Layers className="w-8 h-8 text-purple-500" />}
            title="Schema Driven"
            description="Define your forms with simple JSON/TypeScript schemas. Fully typed and validated."
            gradient="from-purple-500/20 to-transparent"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            title="High Performance"
            description="Optimized rendering engine that handles thousands of fields with zero lag."
            gradient="from-yellow-500/20 to-transparent"
          />
          <FeatureCard
            icon={<Code className="w-8 h-8 text-green-500" />}
            title="Developer First"
            description="Top-tier TypeScript support, extensive documentation, and intuitive APIs."
            gradient="from-green-500/20 to-transparent"
          />
          <FeatureCard
            icon={<Terminal className="w-8 h-8 text-pink-500" />}
            title="Powerful CLI"
            description="Scaffold projects, add components, and manage updates with our robust CLI tools."
            gradient="from-pink-500/20 to-transparent"
          />
          <FeatureCard
            icon={<div className="text-2xl">🎨</div>}
            title="Tailwind Native"
            description="Built on Tailwind CSS v4. Fully customizable design system with dark mode support."
            gradient="from-orange-500/20 to-transparent"
          />
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 text-xs font-mono text-slate-400">App.tsx</div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="p-8 font-mono text-sm leading-relaxed text-slate-300">
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">1</span>
                <span>
                  <span className="text-purple-400">import</span> {"{ SchemaForm }"}{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">'formix-ui'</span>;
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">2</span>
                <span></span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">3</span>
                <span>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">schema</span> = {"{"}
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">4</span>
                <span className="pl-4">fields: [</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">5</span>
                <span className="pl-8">{"{"}</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">6</span>
                <span className="pl-12">
                  type: <span className="text-green-400">'text'</span>,
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">7</span>
                <span className="pl-12">
                  label: <span className="text-green-400">'Name'</span>
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">8</span>
                <span className="pl-8">{"},"}</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">9</span>
                <span className="pl-8">{"{"}</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">10</span>
                <span className="pl-12">
                  type: <span className="text-green-400">'email'</span>,
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">11</span>
                <span className="pl-12">
                  label: <span className="text-green-400">'Email'</span>
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">12</span>
                <span className="pl-8">{"}"}</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">13</span>
                <span className="pl-4">]</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">14</span>
                <span>{"};"}</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">15</span>
                <span></span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">16</span>
                <span>
                  <span className="text-purple-400">export default</span> () ={">"} (
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">17</span>
                <span className="pl-4">
                  {"<"}SchemaForm schema={"{schema}"} / {">"}
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">18</span>
                <span>);</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border-t md:border-t-0 md:border-l border-white/10 p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 ring-primary/50 outline-none"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 ring-primary/50 outline-none"
                    placeholder="Enter email"
                  />
                </div>
                <button className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to build better forms?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of developers building modern applications with FormixUI.
          </p>
          <div className="pt-4">
            <Link
              to="/cli"
              className="inline-block px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Install CLI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Component for Status
const StatusCard = ({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) => (
  <div className="bg-card/50 border border-border rounded-xl p-5 flex flex-col h-full backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-3 border-b border-border pb-2">
      {icon}
      <h3 className="font-semibold text-sm uppercase tracking-wider">{title}</h3>
    </div>
    <ul className="space-y-2 text-sm text-muted-foreground grow">
      {items.length > 0 ? (
        items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
            <span>{item}</span>
          </li>
        ))
      ) : (
        <li className="italic opacity-50">No items available</li>
      )}
    </ul>
  </div>
);

// Helper Components
const FeatureCard = ({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) => (
  <div
    className={`group relative overflow-hidden bg-card p-8 rounded-3xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
  >
    <div
      className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}
    />
    <div className="mb-6 p-3 bg-background rounded-2xl w-fit border border-border shadow-sm group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);
