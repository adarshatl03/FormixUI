export const Home = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Formix UI Package Summary
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Overview of the publishing-ready state of the Formix UI library. Comprehensive
          documentation, configuration, and build artifacts are ready for deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Documentation Status */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center text-xl">
              📄
            </div>
            <h2 className="text-2xl font-bold">Documentation</h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 p-3 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
              <span className="text-green-500 mt-1">✅</span>
              <div>
                <strong className="block text-foreground">README.md</strong>
                <span className="text-sm text-muted-foreground">
                  Comprehensive overview, examples, and API docs.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
              <span className="text-green-500 mt-1">✅</span>
              <div>
                <strong className="block text-foreground">LICENSE</strong>
                <span className="text-sm text-muted-foreground">
                  MIT License for open-source usage.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
              <span className="text-green-500 mt-1">✅</span>
              <div>
                <strong className="block text-foreground">CONTRIBUTING.md</strong>
                <span className="text-sm text-muted-foreground">
                  Guidelines for development and PRs.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
              <span className="text-green-500 mt-1">✅</span>
              <div>
                <strong className="block text-foreground">CHANGELOG.md</strong>
                <span className="text-sm text-muted-foreground">
                  Version history and release notes.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
              <span className="text-green-500 mt-1">✅</span>
              <div>
                <strong className="block text-foreground">PUBLISHING.md</strong>
                <span className="text-sm text-muted-foreground">
                  Guide for npm publishing and versioning.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Configuration Status */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center text-xl">
              ⚙️
            </div>
            <h2 className="text-2xl font-bold">Configuration</h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 p-3 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
              <span className="text-green-500 mt-1">✅</span>
              <div>
                <strong className="block text-foreground">package.json</strong>
                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                  <div className="flex justify-between">
                    <span>Package:</span> <code className="bg-muted px-1 rounded">formix-ui</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Version:</span> <code className="bg-muted px-1 rounded">3.1.3</code>
                  </div>
                  <div className="text-xs mt-1">Updated exports, keywords, and scripts.</div>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
              <span className="text-green-500 mt-1">✅</span>
              <div>
                <strong className="block text-foreground">.npmignore</strong>
                <span className="text-sm text-muted-foreground">
                  Optimized to exclude source/dev files.
                </span>
              </div>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <h3 className="font-semibold mb-2">🚀 Ready to Launch</h3>
            <p className="text-sm text-muted-foreground">
              All pre-publishing checks passed. The package now features CLI 3.0, Formik & Yup
              integration, and premium landing page automation.
            </p>
          </div>
        </div>
      </div>

      {/* Package Details Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Version</div>
            <div className="text-3xl font-bold">3.1.3</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">License</div>
            <div className="text-3xl font-bold text-yellow-400">MIT</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Exports</div>
            <div className="text-3xl font-bold text-blue-400">ESM</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Types</div>
            <div className="text-3xl font-bold text-green-400">100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
