import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "../../");
const TASKS_FILE = path.join(ROOT_DIR, ".agent/dev_plan/DEVELOPMENT_TASKS.md");
const README_FILE = path.join(ROOT_DIR, "README.md");
const PACKAGE_FILE = path.join(ROOT_DIR, "package.json");
const STATUS_DATA_FILE = path.join(ROOT_DIR, "src/data/project-status.json");

async function generateStatus() {
  console.log(chalk.blue("🔍 Analyzing project status..."));

  // 1. Read Files
  const tasksContent = await fs.readFile(TASKS_FILE, "utf-8");
  const pkgContent = await fs.readJson(PACKAGE_FILE);
  const version = pkgContent.version;

  // 2. Parse Tasks
  const lines = tasksContent.split("\n");
  let completedCount = 0;
  let inProgressCount = 0;
  let upcomingCount = 0;
  let recurringCount = 0;

  const completedFeatures = [];
  const inProgressFeatures = [];
  const upcomingFeatures = [];

  let currentSection = "";

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for sections to categorize features
    if (trimmed.startsWith("## ")) {
      currentSection = trimmed.replace("## ", "").trim();
    }

    if (trimmed.startsWith("- [x]")) {
      completedCount++;
      // Capture recent completed features (simple heuristic)
      if (completedFeatures.length < 5) {
        completedFeatures.push(trimmed.replace("- [x]", "").trim());
      }
    } else if (trimmed.startsWith("- 🔄")) {
      recurringCount++;
    } else if (trimmed.startsWith("- [ ]")) {
      // Distinguish In-Progress vs Upcoming based on section?
      // For now, let's assume 'Outstanding' section is In-Progress/Upcoming
      if (currentSection.includes("Outstanding") || currentSection.includes("In-Progress")) {
        inProgressCount++;
        if (inProgressFeatures.length < 5) {
          inProgressFeatures.push(trimmed.replace("- [ ]", "").trim());
        }
      } else {
        // Maybe early planning items?
        upcomingCount++;
      }
    }
  }

  // Adjust upcoming if standard Checkbox in non-outstanding sections count towards it?
  // Actually, DEVELOPMENT_TASKS has "Completed Tasks" section and "Outstanding" section.
  // Let's refine:
  // Usually the structure is:
  // ## Completed
  // ... [x]
  // ## Outstanding
  // ... [ ]

  // Let's re-scan with simple logic: [ ] is outstanding (upcoming/in-progress), [x] is done.
  // We'll treat all [ ] as "In Progress / Upcoming" for the Total calculation.

  const totalTasks = completedCount + inProgressCount + upcomingCount; // Recurring doesn't count towards completion % usually
  const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  console.log(chalk.green(`✅ Version: ${version}`));
  console.log(chalk.green(`📊 Progress: ${percent}% (${completedCount}/${totalTasks})`));

  // 3. Prepare Data Object
  const statusData = {
    version,
    percent,
    counts: {
      completed: completedCount,
      inProgress: inProgressCount + upcomingCount,
      recurring: recurringCount,
      total: totalTasks,
    },
    features: {
      completed: completedFeatures, // Just a sample
      inProgress: inProgressFeatures,
    },
    lastUpdated: new Date().toISOString(),
  };

  // 4. Write JSON for Frontend
  await fs.ensureDir(path.dirname(STATUS_DATA_FILE));
  await fs.writeJson(STATUS_DATA_FILE, statusData, { spaces: 2 });
  console.log(chalk.cyan(`💾 Saved status data to ${STATUS_DATA_FILE}`));

  // 5. Generate README Content
  const readmeContent = await fs.readFile(README_FILE, "utf-8");

  const startMarker = "<!-- PROJECT_STATUS_START -->";
  const endMarker = "<!-- PROJECT_STATUS_END -->";

  // Format lists for markdown
  const recentFeaturesMd = completedFeatures
    .slice(0, 5)
    .map((f) => `<li>✅ ${f}</li>`)
    .join("\n");
  const inProgressMd = inProgressFeatures
    .slice(0, 5)
    .map((f) => `<li>🚧 ${f}</li>`)
    .join("\n");

  const statusMarkdown = `
${startMarker}
<div align="center">

  <h3>🚀 Project Status: ${percent}% Complete</h3>

  <img src="https://progress-bar.dev/${percent}/?scale=100&title=progress&width=600&color=00ff00&suffix=%25" alt="Progress Bar">

  <br/>

  | 📦 Version | ✅ Completed | 🚧 In Progress | 🔄 Recurring | 📅 Upcoming |
  | :---: | :---: | :---: | :---: | :---: |
  | **v${version}** | **${completedCount}** | **${inProgressCount}** | **${recurringCount}** | **${upcomingCount}** |

</div>

<details open>
<summary><h3>📅 Recent Activity & Roadmap</h3></summary>

| **✨ Recently Completed** | **🚧 In Progress / Planned** |
| :--- | :--- |
| <ul>${recentFeaturesMd}</ul> | <ul>${inProgressMd}</ul> |

</details>

<br/>
${endMarker}
`;

  let newReadme = readmeContent;
  if (readmeContent.includes(startMarker) && readmeContent.includes(endMarker)) {
    const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
    newReadme = readmeContent.replace(regex, statusMarkdown.trim());
  } else {
    const lines = readmeContent.split("\n");
    const titleIndex = lines.findIndex((l) => l.startsWith("# "));
    if (titleIndex !== -1) {
      lines.splice(titleIndex + 1, 0, "\n" + statusMarkdown.trim() + "\n");
      newReadme = lines.join("\n");
    } else {
      newReadme = statusMarkdown + "\n" + readmeContent;
    }
  }

  await fs.writeFile(README_FILE, newReadme);
  console.log(chalk.cyan(`📄 Updated README.md with detailed status`));
}

generateStatus().catch(console.error);
