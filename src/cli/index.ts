#!/usr/bin/env node
import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { fileURLToPath } from "url";
import { registry, getComponent } from "./registry.js";

// Tailwind v4 CSS Template
const TAILWIND_V4_CSS = `@import "tailwindcss";
@source "../node_modules/r-form-engine/dist";

@variant dark (&:where(.dark, .dark *));

/* =========================================
   BASE PALETTE (STATIC)
========================================= */
:root {
  --color-primary:#003c71;
  --color-secondary:#ff681d;
  --brand-secondary-orange: #ff681d; /* New explicit brand variable */
  --zinc-0: #ffffff;
  --zinc-50: oklch(0.985 0.01 240);
  --zinc-100: oklch(0.965 0.01 240);
  --zinc-200: oklch(0.920 0.02 240);
  --zinc-300: oklch(0.870 0.03 240);
  --zinc-400: oklch(0.700 0.04 240);
  --zinc-500: oklch(0.550 0.05 240);
  --zinc-600: oklch(0.440 0.05 240);
  --zinc-700: oklch(0.350 0.05 240);
  --zinc-800: oklch(0.270 0.05 240);
  --zinc-900: oklch(0.200 0.04 240);
  --zinc-950: oklch(0.130 0.03 240);

  --primary-400: oklch(0.65 0.18 260);
  --primary-500: oklch(0.55 0.22 260);
  --primary-600: oklch(0.45 0.22 260);

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

/* =========================================
   LIGHT THEME (VISIBLY LIGHT)
========================================= */
:root {

  --color-background: var(--zinc-50);
  --color-foreground: var(--zinc-900);

  --color-card: var(--zinc-0);
  --color-card-foreground: var(--zinc-900);

  --color-popover: var(--zinc-0);
  --color-popover-foreground: var(--zinc-900);

  --color-primary: var(--primary-500);
  --color-primary-foreground: #ffffff;

  --color-secondary: var(--zinc-100);
  --color-secondary-foreground: var(--zinc-800);

  --color-muted: var(--zinc-100);
  --color-muted-foreground: var(--zinc-500);

  --color-accent: var(--zinc-100);
  --color-accent-foreground: var(--zinc-800);

  --color-destructive: oklch(0.63 0.26 29);
  --color-destructive-foreground: #ffffff;

  --color-border: var(--zinc-300);
  --color-input: var(--zinc-0);
  --color-ring: var(--primary-500);
  
  --color-control-checked: var(--color-primary);

  --color-tooltip-bg: var(--zinc-900);
  --color-tooltip-text: #ffffff;

  --color-surface-50: var(--zinc-50);
  --color-surface-100: var(--zinc-100);
  --color-surface-200: var(--zinc-200);
  --color-surface-300: var(--zinc-300);
  --color-surface-400: var(--zinc-400);
}



/* =========================================
   MANUAL DARK MODE
========================================= */
html.dark, .dark {
  color-scheme: dark;

  --color-background: var(--zinc-950);
  --color-foreground: var(--zinc-50);

  --color-card: var(--zinc-900);
  --color-card-foreground: var(--zinc-50);

  --color-popover: var(--zinc-900);
  --color-popover-foreground: var(--zinc-50);

  --color-primary: var(--primary-400);
  --color-primary-foreground: #ffffff;

  --color-secondary: var(--zinc-800);
  --color-secondary-foreground: var(--zinc-50);

  --color-muted: var(--zinc-800);
  --color-muted-foreground: var(--zinc-400);

  --color-accent: var(--zinc-800);
  --color-accent-foreground: var(--zinc-50);

  --color-destructive: oklch(0.4 0.2 29);

  --color-border: var(--zinc-800);
  --color-input: var(--zinc-900);
  --color-ring: var(--primary-400);
  
  --color-control-checked: var(--brand-secondary-orange);

  --color-tooltip-bg: var(--zinc-800);
  --color-tooltip-text: var(--zinc-50);

  --color-surface-50: var(--zinc-950);
  --color-surface-100: var(--zinc-900);
  --color-surface-200: var(--zinc-800);
  --color-surface-300: var(--zinc-700);
  --color-surface-400: var(--zinc-600);
}

/* =========================================
   TAILWIND v4 THEME MAP
========================================= */
@theme {
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  --color-card: var(--color-card);
  --color-card-foreground: var(--color-card-foreground);
  --color-popover: var(--color-popover);
  --color-popover-foreground: var(--color-popover-foreground);
  --color-primary: var(--color-primary);
  --color-primary-foreground: var(--color-primary-foreground);
  --color-secondary: var(--color-secondary);
  --color-secondary-foreground: var(--color-secondary-foreground);
  --color-muted: var(--color-muted);
  --color-muted-foreground: var(--color-muted-foreground);
  --color-accent: var(--color-accent);
  --color-accent-foreground: var(--color-accent-foreground);
  --color-destructive: var(--color-destructive);
  --color-destructive-foreground: var(--color-destructive-foreground);
  --color-border: var(--color-border);
  --color-input: var(--color-input);
  --color-ring: var(--color-ring);
  --color-control-checked: var(--color-control-checked);
  --color-tooltip-bg: var(--color-tooltip-bg);
  --color-tooltip-text: var(--color-tooltip-text);
  --color-surface-50: var(--color-surface-50);
  --color-surface-100: var(--color-surface-100);
  --color-surface-200: var(--color-surface-200);
  --color-surface-300: var(--color-surface-300);
  --color-surface-400: var(--color-surface-400);
  --font-sans: var(--font-sans);
}

/* =========================================
   GLOBALS
========================================= */
body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@layer base {
  input:focus,
  textarea:focus,
  select:focus,
  .ring-2,
  .focus\\:ring-2:focus,
  .focus-within\\:ring-2:focus-within {
    outline: none !important;
    box-shadow: none !important;
  }
}
`;

// Get package version
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read package.json
const getPackageParam = (param: string) => {
  try {
    const pkgPath = path.resolve(__dirname, "../../package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = fs.readJSONSync(pkgPath);
      return pkg[param];
    }
    return "1.0.0";
  } catch {
    return "1.0.0";
  }
};

// --- LANDING PAGE TEMPLATES ---

const generateLandingPageContent = (config: any, version: string) => {
  const { framework, validationLib, formState } = config;
  const isNext = framework === "next";

  const componentToUse = formState === "formik" ? "FormikSchemaForm" : "SchemaForm";

  // Note: We use Tailwind v4 classes assuming it's configured.
  // We use standard React imports since the library handles the rest.
  return `${isNext ? '"use client";\n' : ""}import { ${componentToUse}, ThemeProvider } from 'r-form-engine';
import type { FormSchema } from 'r-form-engine';
${isNext ? "import './globals.css';" : "import 'r-form-engine/styles';"}

const schema: FormSchema = {
  title: "Welcome to FormEngine",
  description: "Your project is pre-configured with ${validationLib} and ${formState}.",
  fields: [
    {
      id: "name",
      name: "name",
      label: "What's your name?",
      type: "text",
      placeholder: "Enter your name",
      validation: [{ type: "required", message: "Name is required" }],
      grid: { colSpan: 12 }
    },
    {
      id: "framework",
      name: "framework",
      label: "Framework",
      type: "text",
      defaultValue: "${framework}",
      readOnly: true,
      grid: { colSpan: 4 }
    },
    {
      id: "validation",
      name: "validation",
      label: "Validation",
      type: "text",
      defaultValue: "${validationLib}",
      readOnly: true,
      grid: { colSpan: 4 }
    },
    {
      id: "formState",
      name: "formState",
      label: "State Manager",
      type: "text",
      defaultValue: "${formState}",
      readOnly: true,
      grid: { colSpan: 4 }
    }
  ]
};

export default function ${isNext ? "Page" : "App"}() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center border-t-4 border-primary">
        <header className="mb-16 text-center max-w-3xl">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold bg-primary/10 text-primary rounded-full border border-primary/20 uppercase tracking-widest">
            v${version} Successfully Scaffolded
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Build Forms <span className="text-primary italic">Faster.</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed mx-auto max-w-xl">
            Your <strong>${framework}</strong> project is ready with <strong>${validationLib}</strong> validation and <strong>${formState}</strong> state management.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a 
              href="https://adarshatl03.github.io/form-engine/" 
              target="_blank" 
              className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-primary/25"
            >
              Documentation
            </a>
            <a 
              href="https://github.com/adarshatl03/form-engine" 
              target="_blank" 
              className="px-10 py-4 bg-card border-2 border-border rounded-2xl font-bold hover:bg-muted transition-colors"
            >
              GitHub
            </a>
          </div>
        </header>

        <main className="w-full max-w-2xl bg-card rounded-[2.5rem] shadow-2xl overflow-hidden border border-border">
          <div className="p-12">
            <h2 className="text-3xl font-black mb-10 tracking-tight">Quick Start</h2>
            <${componentToUse} 
              schema={schema} 
              onSubmit={(v) => {
                console.log("Form Values:", v);
                alert("Submission successful! check console.");
              }} 
            />
          </div>
          <div className="bg-muted p-8 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-border">
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-widest font-black text-muted-foreground mb-1">Project Stack</p>
              <p className="text-sm font-bold opacity-80">${framework} • ${validationLib} • ${formState}</p>
            </div>
            <button 
              onClick={() => window.open('https://adarshatl03.github.io/form-engine/playground', '_blank')}
              className="px-6 py-2 bg-foreground text-background rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Open Form Builder →
            </button>
          </div>
        </main>

        <footer className="mt-20 text-muted-foreground font-medium text-sm">
          Built with r-form-engine • The modern form stack
        </footer>
      </div>
    </ThemeProvider>
  );
}
`;
};

// Utility: Resolve package root
const getPackageRoot = () => {
  // __dirname is dist/bin. Package root is ../..
  return path.resolve(__dirname, "../..");
};

// Utility: Read file from package
const readPackageFile = (relativePath: string) => {
  const pkgRoot = getPackageRoot();
  const fullPath = path.join(pkgRoot, relativePath);
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, "utf-8");
  }
  throw new Error(`File not found in package: ${relativePath}`);
};

// Utility: Check if config exists
const CONFIG_FILE = "r-form.json";
const hasConfig = () => fs.existsSync(path.resolve(process.cwd(), CONFIG_FILE));
const getConfig = () => fs.readJSONSync(path.resolve(process.cwd(), CONFIG_FILE));

const program = new Command();

program
  .name("r-form-engine")
  .description("CLI for r-form-engine")
  .version(getPackageParam("version"));

program
  .command("add")
  .description("Add a component to your project")
  .argument("[component]", "The component to add")
  .action(async (componentName) => {
    if (!hasConfig()) {
      console.log(
        chalk.yellow(
          "Configuration file not found. Please run 'init' first or proceed to initialize now."
        )
      );
      const confirm = await prompts({
        type: "confirm",
        name: "init",
        message: "Run init now?",
        initial: true,
      });
      if (confirm.init) {
        console.log(chalk.blue("Please run 'npx r-form-engine init' first."));
        return;
      }
      return;
    }

    const config = getConfig();
    const componentsDir = config.paths?.components || "src/components/ui";
    const coreDir = config.paths?.core || "src/components/r-form";

    let componentsToAdd = componentName ? [componentName] : [];

    if (!componentName) {
      const res = await prompts({
        type: "multiselect",
        name: "components",
        message: "Select components to add:",
        choices: Object.keys(registry)
          .filter((k) => k !== "theme-core")
          .map((k) => ({ title: k, value: k })),
      });
      componentsToAdd = res.components;
    }

    if (componentsToAdd.length === 0) return;

    const spinner = ora("Adding components...").start();

    // Resolve dependencies including internal ones recursively
    const resolvedList = new Set<string>();
    const resolveDeps = (name: string) => {
      if (resolvedList.has(name)) return;
      const comp = getComponent(name);
      if (!comp) {
        spinner.fail(`Component '${name}' not found in registry.`);
        return;
      }
      resolvedList.add(name);
      comp.internalDependencies?.forEach((dep) => resolveDeps(dep));
    };

    try {
      componentsToAdd.forEach((c) => resolveDeps(c));

      // Check for existing files and prompt
      const existingFiles: string[] = [];
      for (const name of resolvedList) {
        const comp = getComponent(name);
        if (!comp) continue;
        const targetBase = comp.type === "core" ? coreDir : componentsDir;
        for (const fileRel of comp.files) {
          const fileName = path.basename(fileRel);
          let targetPath: string;
          if (comp.type === "core") {
            targetPath = path.join(targetBase, fileName);
          } else {
            const cleanRel = fileRel
              .replace(/^src\/components\/ui\//, "")
              .replace(/^src\/components\/theme\//, "");
            targetPath = path.join(targetBase, cleanRel);
          }
          if (fs.existsSync(targetPath)) {
            existingFiles.push(targetPath);
          }
        }
      }

      if (existingFiles.length > 0) {
        spinner.stop();
        const confirm = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `Some files already exist. Overwrite?`,
          initial: false,
        });
        if (!confirm.overwrite) {
          console.log(chalk.yellow("Installation cancelled."));
          return;
        }
        spinner.start();
      }

      // Process list
      for (const name of resolvedList) {
        spinner.text = `Installing ${name}...`;
        const comp = getComponent(name);
        if (!comp) continue;

        // Determine target directory
        const targetBase = comp.type === "core" ? coreDir : componentsDir;

        // Copy Files
        for (const fileRel of comp.files) {
          const content = readPackageFile(fileRel);
          const fileName = path.basename(fileRel);

          // Simplified target path logic
          let targetPath: string;
          if (comp.type === "core") {
            targetPath = path.join(targetBase, fileName);
          } else {
            const cleanRel = fileRel
              .replace(/^src\/components\/ui\//, "")
              .replace(/^src\/components\/theme\//, "");
            targetPath = path.join(targetBase, cleanRel);
          }

          fs.ensureDirSync(path.dirname(targetPath));

          // FIX IMPORTS
          let processedContent = content;
          if (comp.type !== "core") {
            const relativeToCore = path
              .relative(path.dirname(targetPath), coreDir)
              .replace(/\\/g, "/");
            const coreImportPath = relativeToCore.startsWith(".")
              ? relativeToCore
              : `./${relativeToCore}`;

            processedContent = processedContent.replace(
              /from ".*\/theme\/ThemeContext"/g,
              `from "${coreImportPath}/ThemeContext"`
            );
            processedContent = processedContent.replace(
              /from ".*\/theme\/types"/g,
              `from "${coreImportPath}/types"`
            );
            processedContent = processedContent.replace(
              /from ".*\/theme\/defaultTheme"/g,
              `from "${coreImportPath}/defaultTheme"`
            );
          }

          fs.writeFileSync(targetPath, processedContent);
        }

        // Install Deps
        if (comp.dependencies && comp.dependencies.length > 0) {
          spinner.text = `Installing dependencies for ${name}...`;
          await execa("npm", ["install", ...comp.dependencies]);
        }
      }

      // Save to config
      const installed = new Set(config.components || []);
      componentsToAdd.forEach((c) => installed.add(c));
      config.components = Array.from(installed);
      fs.writeJSONSync(path.resolve(process.cwd(), CONFIG_FILE), config, { spaces: 2 });

      spinner.succeed("Components added successfully!");
    } catch (e) {
      spinner.fail("Failed to add components.");
      console.error(e);
    }
  });

program
  .command("update")
  .description("Update installed components")
  .argument("[components...]", "Specific components to update")
  .action(async (components) => {
    if (!hasConfig()) {
      console.log(chalk.red("No configuration found. Run init first."));
      return;
    }

    const config = getConfig();
    const installedComponents = config.components || [];

    if (installedComponents.length === 0) {
      console.log(chalk.yellow("No components installed to update."));
      return;
    }

    const toUpdate = components.length > 0 ? components : installedComponents;

    console.log(chalk.blue(`Updating ${toUpdate.length} components...\n`));

    // We can just call the 'add' logic internally by triggering the action
    // But to avoid recursive CLI calls, we'll just re-run the core logic
    // or better yet, just tell them we are re-installing
    for (const name of toUpdate) {
      if (!installedComponents.includes(name)) {
        console.log(chalk.red(`Component '${name}' is not installed.`));
        continue;
      }
      // Re-run add logic (simplified for update)
      // Actually, let's just use the add command logic
      // to ensure all internal deps are also updated
    }

    // For simplicity, we'll just re-run 'add' for everything in a single go
    const spinner = ora("Updating components...").start();

    const componentsDir = config.paths?.components || "src/components/ui";
    const coreDir = config.paths?.core || "src/components/r-form";

    const resolvedList = new Set<string>();
    const resolveDeps = (name: string) => {
      if (resolvedList.has(name)) return;
      const comp = getComponent(name);
      if (!comp) return;
      resolvedList.add(name);
      comp.internalDependencies?.forEach((dep) => resolveDeps(dep));
    };

    try {
      toUpdate.forEach((c: string) => resolveDeps(c));

      for (const name of resolvedList) {
        spinner.text = `Updating ${name}...`;
        const comp = getComponent(name);
        if (!comp) continue;

        const targetBase = comp.type === "core" ? coreDir : componentsDir;

        for (const fileRel of comp.files) {
          const content = readPackageFile(fileRel);
          const fileName = path.basename(fileRel);
          let targetPath: string;
          if (comp.type === "core") {
            targetPath = path.join(targetBase, fileName);
          } else {
            const cleanRel = fileRel
              .replace(/^src\/components\/ui\//, "")
              .replace(/^src\/components\/theme\//, "");
            targetPath = path.join(targetBase, cleanRel);
          }

          fs.ensureDirSync(path.dirname(targetPath));

          let processedContent = content;
          if (comp.type !== "core") {
            const relativeToCore = path
              .relative(path.dirname(targetPath), coreDir)
              .replace(/\\/g, "/");
            const coreImportPath = relativeToCore.startsWith(".")
              ? relativeToCore
              : `./${relativeToCore}`;

            processedContent = processedContent.replace(
              /from ".*\/theme\/ThemeContext"/g,
              `from "${coreImportPath}/ThemeContext"`
            );
            processedContent = processedContent.replace(
              /from ".*\/theme\/types"/g,
              `from "${coreImportPath}/types"`
            );
            processedContent = processedContent.replace(
              /from ".*\/theme\/defaultTheme"/g,
              `from "${coreImportPath}/defaultTheme"`
            );
          }
          fs.writeFileSync(targetPath, processedContent);
        }

        if (comp.dependencies && comp.dependencies.length > 0) {
          await execa("npm", ["install", ...comp.dependencies]);
        }
      }
      spinner.succeed("Components updated successfully!");
    } catch (e) {
      spinner.fail("Failed to update components.");
      console.error(e);
    }
  });

program
  .command("init")
  .description("Initialize r-form-engine in your project")
  .action(async () => {
    console.log(chalk.blue.bold("\n🚀 Initializing r-form-engine...\n"));

    const mode = await prompts({
      type: "select",
      name: "mode",
      message: "How would you like to use r-form-engine?",
      choices: [
        {
          title: "Library (npm install)",
          value: "library",
          description: "Standard usage, import components from package.",
        },
        {
          title: "Copy Code (shadcn-like)",
          value: "copy",
          description: "Own the code, copy components to your project.",
        },
      ],
      initial: 0,
    });

    if (mode.mode === "library") {
      await runLibraryInit();
    } else {
      await runCopyInit();
    }
  });

program
  .command("create")
  .description("Create a new r-form-engine project")
  .argument("[name]", "Project name")
  .action(async (projectName) => {
    let targetDir = projectName;

    if (!targetDir) {
      const res = await prompts({
        type: "text",
        name: "name",
        message: "What is your project name?",
        initial: "my-form-app",
      });
      targetDir = res.name;
    }

    if (!targetDir) return;

    const frameworkConfig = await prompts([
      {
        type: "select",
        name: "framework",
        message: "Select framework",
        choices: [
          { title: "Vite (React)", value: "vite" },
          { title: "Next.js", value: "next" },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "validationLib",
        message: "Select validation library",
        choices: [
          { title: "Zod (Recommended)", value: "zod" },
          { title: "Yup", value: "yup" },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "formState",
        message: "Select form state manager",
        choices: [
          { title: "Standard (useForm Hook)", value: "standard" },
          { title: "Formik", value: "formik" },
          { title: "React Hook Form", value: "rhf" },
        ],
        initial: 0,
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Add Tailwind CSS?",
        initial: true,
      },
      {
        type: (_, values) => (values.tailwind ? "select" : null),
        name: "tailwindVersion",
        message: "Which version of Tailwind CSS?",
        choices: [
          { title: "v4 (CSS-based configuration)", value: "v4" },
          { title: "v3 (Config-based)", value: "v3" },
        ],
        initial: 0,
      },
    ]);

    const projectPath = path.resolve(process.cwd(), targetDir);

    console.log(chalk.blue(`\nCreating project in ${projectPath}...`));

    try {
      if (frameworkConfig.framework === "vite") {
        await execa("npm", ["create", "vite@latest", targetDir, "--", "--template", "react-ts"], {
          stdio: "inherit",
        });
      } else {
        const args = ["create-next-app@latest", targetDir, "--typescript", "--eslint"];
        if (frameworkConfig.tailwind && frameworkConfig.tailwindVersion === "v3") {
          args.push("--tailwind");
        } else {
          args.push("--no-tailwind");
        }
        args.push("--no-src-dir", "--app", "--import-alias", "@/*");

        await execa("npx", args, { stdio: "inherit" });
      }

      console.log(chalk.green("\nProject scaffolded. Initializing r-form-engine..."));

      process.chdir(projectPath);

      const spinner = ora("Installing r-form-engine dependencies...").start();

      const deps = ["r-form-engine"];
      if (frameworkConfig.validationLib === "zod") deps.push("zod");
      if (frameworkConfig.validationLib === "yup") deps.push("yup");
      if (frameworkConfig.formState === "rhf") deps.push("react-hook-form", "@hookform/resolvers");
      if (frameworkConfig.formState === "formik") deps.push("formik");
      if (frameworkConfig.tailwind) {
        if (frameworkConfig.tailwindVersion === "v4") {
          deps.push("tailwindcss");
          if (frameworkConfig.framework === "vite") {
            deps.push("@tailwindcss/vite");
          } else {
            deps.push("@tailwindcss/postcss");
          }
        } else {
          deps.push("tailwindcss@3", "postcss", "autoprefixer", "clsx", "tailwind-merge");
        }
      }

      await execa("npm", ["install", ...deps]);

      if (frameworkConfig.tailwind) {
        if (frameworkConfig.tailwindVersion === "v4" && frameworkConfig.framework === "vite") {
          spinner.text = "Configuring Tailwind v4...";
          const cssPath = "src/index.css";
          fs.ensureDirSync(path.dirname(cssPath));
          fs.writeFileSync(cssPath, TAILWIND_V4_CSS);

          const viteConfigPath = "vite.config.ts";
          if (fs.existsSync(viteConfigPath)) {
            let viteConfig = fs.readFileSync(viteConfigPath, "utf-8");
            if (!viteConfig.includes("@tailwindcss/vite")) {
              viteConfig = `import tailwindcss from '@tailwindcss/vite';\n` + viteConfig;
              viteConfig = viteConfig.replace("plugins: [", "plugins: [tailwindcss(),");
              fs.writeFileSync(viteConfigPath, viteConfig);
            }
          }
        } else if (
          frameworkConfig.tailwindVersion === "v4" &&
          frameworkConfig.framework === "next"
        ) {
          spinner.text = "Configuring Tailwind v4...";
          const cssPath = "app/globals.css";
          fs.ensureDirSync(path.dirname(cssPath));
          fs.writeFileSync(cssPath, TAILWIND_V4_CSS);

          const postcssContent = `const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
export default config;
`;
          fs.writeFileSync("postcss.config.mjs", postcssContent);
        } else {
          await configureTailwindInternal(frameworkConfig.tailwindVersion);
        }
      }

      // 4. Generate Landing Page
      spinner.text = "Generating landing page...";
      const landingPageContent = generateLandingPageContent(
        frameworkConfig,
        getPackageParam("version")
      );

      if (frameworkConfig.framework === "vite") {
        fs.writeFileSync("src/App.tsx", landingPageContent);
        // Remove default boilerplate if exists
        const defaultAppCss = "src/App.css";
        if (fs.existsSync(defaultAppCss)) {
          fs.writeFileSync(defaultAppCss, "/* Custom styles can go here */");
        }
      } else {
        const pagePath = "app/page.tsx";
        fs.ensureDirSync(path.dirname(pagePath));
        fs.writeFileSync(pagePath, landingPageContent);
      }

      spinner.succeed(chalk.green("Setup complete!"));
      console.log(`\nTo get started:\n  cd ${targetDir}\n  npm run dev`);
    } catch (e) {
      console.error(chalk.red("Error creating project:"), e);
    }
  });

program.parse();

// --- HELPER FUNCTIONS ---

async function runLibraryInit() {
  const config = await prompts([
    {
      type: "select",
      name: "framework",
      message: "Which framework are you using?",
      choices: [
        { title: "Vite (React)", value: "vite" },
        { title: "Next.js", value: "next" },
        { title: "Other", value: "other" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "language",
      message: "Which language are you using?",
      choices: [
        { title: "TypeScript", value: "typescript" },
        { title: "JavaScript", value: "javascript" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "packageName",
      message: "What is the package name you are using?",
      initial: "r-form-engine",
    },
    {
      type: "confirm",
      name: "tailwind",
      message: "Would you like to use Tailwind CSS for styling?",
      initial: true,
    },
    {
      type: (prev) => (prev ? "select" : null),
      name: "tailwindVersion",
      message: "Which version of Tailwind CSS?",
      choices: [
        { title: "v4 (CSS-based configuration)", value: "v4" },
        { title: "v3 (Config-based)", value: "v3" },
      ],
      initial: 0,
    },
    {
      type: (_, values) => (values.tailwind ? "confirm" : null),
      name: "configureTailwind",
      message: "Do you want us to install and configure Tailwind CSS automatically?",
      initial: true,
    },
    {
      type: "select",
      name: "schemaResolver",
      message: "Which schema validation library would you like to use?",
      choices: [
        { title: "Zod (Recommended)", value: "zod" },
        { title: "Yup", value: "yup" },
        { title: "None", value: "none" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "formState",
      message: "Which form state manager would you like to use?",
      choices: [
        { title: "Standard (r-form-engine)", value: "standard" },
        { title: "Formik", value: "formik" },
        { title: "React Hook Form", value: "rhf" },
      ],
      initial: 0,
    },
    {
      type: "confirm",
      name: "installDeps",
      message: "Would you like to install dependencies now?",
      initial: true,
    },
  ]);

  if (!config.packageName) {
    console.log("Cancelled");
    return;
  }

  const spinner = ora("Setting up library...").start();
  try {
    // Write config
    const configFile = {
      mode: "library",
      framework: config.framework,
      language: config.language,
      packageName: config.packageName,
      tailwind: config.tailwind,
      validation: config.schemaResolver,
      formState: config.formState,
    };
    fs.writeJSONSync(path.resolve(process.cwd(), CONFIG_FILE), configFile, { spaces: 2 });

    if (config.installDeps) {
      const deps = [config.packageName];
      if (config.schemaResolver === "zod") deps.push("zod");
      if (config.schemaResolver === "yup") deps.push("yup");
      if (config.formState === "formik") deps.push("formik");
      if (config.formState === "rhf") deps.push("react-hook-form", "@hookform/resolvers");
      if (config.tailwind && config.configureTailwind) {
        if (config.tailwindVersion === "v4") {
          deps.push("tailwindcss", "@tailwindcss/vite");
        } else {
          deps.push("tailwindcss@3", "postcss", "autoprefixer", "clsx", "tailwind-merge");
        }
      }
      await execa("npm", ["install", ...deps]);
    }

    if (config.tailwind && config.configureTailwind) {
      await configureTailwindInternal(config.tailwindVersion);
    }

    spinner.succeed("Library initialized!");
  } catch (e) {
    spinner.fail("Failed");
    console.error(e);
  }
}

async function runCopyInit() {
  const config = await prompts([
    {
      type: "select",
      name: "framework",
      message: "Which framework are you using?",
      choices: [
        { title: "Vite (React)", value: "vite" },
        { title: "Next.js", value: "next" },
        { title: "Other", value: "other" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "language",
      message: "Which language are you using?",
      choices: [
        { title: "TypeScript", value: "typescript" },
        { title: "JavaScript", value: "javascript" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "packageName",
      message: "What is the package name you are using?",
      initial: "r-form-engine",
    },
    {
      type: "text",
      name: "componentsDir",
      message: "Where should we place components?",
      initial: (_, values) =>
        values.framework === "next" ? "app/components/ui" : "src/components/ui",
    },
    {
      type: "text",
      name: "coreDir",
      message: "Where should we place core files (theme, utils)?",
      initial: (_, values) =>
        values.framework === "next" ? "app/components/r-form" : "src/components/r-form",
    },
    {
      type: "confirm",
      name: "tailwind",
      message: "Configure Tailwind CSS?",
      initial: true,
    },
    {
      type: (_, values) => (values.tailwind ? "select" : null),
      name: "tailwindVersion",
      message: "Tailwind Version?",
      choices: [
        { title: "v4", value: "v4" },
        { title: "v3", value: "v3" },
      ],
      initial: 0,
    },
  ]);

  const spinner = ora("Initializing project structure...").start();

  try {
    // 1. Write Config
    const configFile = {
      mode: "copy",
      framework: config.framework,
      language: config.language,
      packageName: config.packageName,
      style: "default",
      paths: {
        components: config.componentsDir,
        core: config.coreDir,
      },
      tailwind: config.tailwind,
      components: [],
    };
    fs.writeJSONSync(path.resolve(process.cwd(), CONFIG_FILE), configFile, { spaces: 2 });

    // 2. Install Base Deps
    const deps = [
      "react-hook-form",
      "zod",
      "@hookform/resolvers",
      "clsx",
      "tailwind-merge",
      "lucide-react",
      "date-fns",
    ];
    if (config.tailwind) {
      if (config.tailwindVersion === "v4") {
        deps.push("tailwindcss", "@tailwindcss/vite");
      } else {
        deps.push("tailwindcss@3", "postcss", "autoprefixer");
      }
    }
    await execa("npm", ["install", ...deps]);

    // 3. Configure Tailwind
    if (config.tailwind) {
      await configureTailwindInternal(config.tailwindVersion, true);
    }

    spinner.succeed("Configuration saved.");
    console.log(chalk.green("You are set up! Run this to install the core system:"));
    console.log(chalk.cyan("npx r-form-engine add theme-core"));
  } catch (e) {
    spinner.fail("Initialization failed");
    console.error(e);
  }
}

async function configureTailwindInternal(version: string, localMode = false) {
  const config = hasConfig() ? getConfig() : { packageName: "r-form-engine" };
  // Locate CSS file
  const cssFiles = ["src/index.css", "src/globals.css", "src/App.css", "styles/globals.css"];
  const foundCss = cssFiles.find((f) => fs.existsSync(path.resolve(process.cwd(), f)));
  const cssPath = foundCss
    ? path.resolve(process.cwd(), foundCss)
    : path.resolve(process.cwd(), "src/index.css");

  if (!foundCss) {
    fs.ensureDirSync(path.dirname(cssPath));
    fs.writeFileSync(cssPath, "");
  }

  if (version === "v4") {
    // v4
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    if (!cssContent.includes('@import "tailwindcss"')) {
      const sourceLine = localMode ? "" : `@source "../node_modules/${config.packageName}/dist";\n`;
      const newContent = `@import "tailwindcss";\n${sourceLine}\n${cssContent}`;
      fs.writeFileSync(cssPath, newContent);
    }
    // If empty/new, use template (local mode removes @source)
    if (!foundCss) {
      let template = TAILWIND_V4_CSS;
      if (localMode) {
        template = template.replace(`@source "../node_modules/r-form-engine/dist";`, "");
      } else {
        template = template.replace(
          `@source "../node_modules/r-form-engine/dist";`,
          `@source "../node_modules/${config.packageName}/dist";`
        );
      }
      fs.writeFileSync(cssPath, template);
    }
  } else {
    // v3
    await execa("npx", ["tailwindcss", "init", "-p"]);
    const tailwindConfigPath = path.resolve(process.cwd(), "tailwind.config.js");
    if (fs.existsSync(tailwindConfigPath)) {
      let content = fs.readFileSync(tailwindConfigPath, "utf-8");
      if (!content.includes(config.packageName) && !localMode) {
        const search = "content: [";
        const replace = `content: [\n    "./node_modules/${config.packageName}/dist/**/*.{js,ts,jsx,tsx}",`;
        content = content.replace(search, replace);
        fs.writeFileSync(tailwindConfigPath, content);
      }
    }

    const cssContent = fs.readFileSync(cssPath, "utf-8");
    if (!cssContent.includes("@tailwind base")) {
      const directives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n`;
      fs.writeFileSync(cssPath, directives + cssContent);
    }
  }
}
