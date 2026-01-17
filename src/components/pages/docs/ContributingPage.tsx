import { GitPullRequest, Heart, Code2, Bug } from "lucide-react";

export const ContributingPage = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-10">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Contributing</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Thank you for your interest in contributing to FormEngine! We welcome contributions from
          the community.
        </p>
      </div>

      {/* Getting Started */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">🚀 Getting Started</h2>
        <div className="p-6 bg-card border border-border rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
            <li>Node.js 18+ and npm</li>
            <li>Git</li>
            <li>TypeScript knowledge</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3">Setup Workflow</h3>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground font-mono text-sm">
            <li className="pl-2">Fork the repository</li>
            <li className="pl-2">
              Clone your fork: <span className="text-foreground">git clone ...</span>
            </li>
            <li className="pl-2">
              Install dependencies: <span className="text-foreground">npm install</span>
            </li>
            <li className="pl-2">
              Create a branch: <span className="text-foreground">git checkout -b feature/name</span>
            </li>
            <li className="pl-2">
              Start dev server: <span className="text-foreground">npm run dev</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Development Guidelines */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Code2 className="w-6 h-6 text-primary" />
          Development Guidelines
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold mb-4">Code Style</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use TypeScript for all new code</li>
              <li>
                • Run linter: <code className="bg-muted px-1 rounded">npm run lint</code>
              </li>
              <li>• Use meaningful variable names</li>
              <li>• Add comments for complex logic</li>
            </ul>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold mb-4">Commit Messages</h3>
            <div className="bg-slate-950 text-slate-50 p-3 rounded-lg text-xs font-mono space-y-1">
              <div>feat: add new field type</div>
              <div>fix: resolve validation error</div>
              <div>docs: update README</div>
              <div>style: format code</div>
              <div>refactor: simplify logic</div>
            </div>
          </div>
        </div>
      </section>

      {/* PR Process */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <GitPullRequest className="w-6 h-6 text-primary" />
          Pull Request Process
        </h2>
        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="font-bold mb-1">1. Update Docs</div>
              <div className="text-xs text-muted-foreground">If adding features</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="font-bold mb-1">2. Add Tests</div>
              <div className="text-xs text-muted-foreground">Verify functionality</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="font-bold mb-1">3. Linter Check</div>
              <div className="text-xs text-muted-foreground">Ensure clean code</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Bugs */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bug className="w-6 h-6 text-red-500" />
          Reporting Bugs
        </h2>
        <div className="p-6 bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 rounded-xl">
          <p className="text-muted-foreground mb-4">
            Please verify the bug exists in the latest version and provide a minimal reproduction.
          </p>
          <h4 className="font-semibold text-sm mb-2">Include in your report:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground pl-4 list-disc">
            <li>Clear description</li>
            <li>Steps to reproduce</li>
            <li>Expected vs Actual behavior</li>
            <li>Environment details (OS, Browser, Version)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
