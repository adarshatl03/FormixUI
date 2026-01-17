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

  const totalTasks = completedCount + inProgressCount + upcomingCount;
  const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  console.log("");
  console.log(chalk.hex("#FF00FF")("╭──────────────────────────────────────────────╮"));
  console.log(
    chalk.hex("#FF00FF")("│") +
      chalk.bold.white.bgHex("#FF00FF")("           🚀 FORMIX UI STATUS              ") +
      chalk.hex("#FF00FF")("│")
  );
  console.log(chalk.hex("#FF00FF")("│                                              │"));
  console.log(
    chalk.hex("#FF00FF")("│") +
      `   📦 Version:    ${chalk.bold.yellow("v" + version)}`.padEnd(55) +
      chalk.hex("#FF00FF")("│")
  );
  console.log(
    chalk.hex("#FF00FF")("│") +
      `   📊 Progress:   ${chalk.bold.green(percent + "%")} (${completedCount}/${totalTasks})`.padEnd(
        55
      ) +
      chalk.hex("#FF00FF")("│")
  );
  console.log(
    chalk.hex("#FF00FF")("│") +
      `   ✅ Completed:  ${chalk.green(completedCount)}`.padEnd(55) +
      chalk.hex("#FF00FF")("│")
  );
  console.log(
    chalk.hex("#FF00FF")("│") +
      `   🚧 In Prog:    ${chalk.blue(inProgressCount + upcomingCount)}`.padEnd(55) +
      chalk.hex("#FF00FF")("│")
  );
  console.log(chalk.hex("#FF00FF")("│                                              │"));
  console.log(chalk.hex("#FF00FF")("╰──────────────────────────────────────────────╯"));
  console.log("");

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
      completed: completedFeatures,
      inProgress: inProgressFeatures,
    },
    lastUpdated: new Date().toISOString(),
  };

  // 4. Write JSON for Frontend
  await fs.ensureDir(path.dirname(STATUS_DATA_FILE));
  await fs.writeJson(STATUS_DATA_FILE, statusData, { spaces: 2 });
  // console.log(chalk.cyan(`💾 Saved status data to ${STATUS_DATA_FILE}`));

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

### 🚀 Status

| 📦 **Version** | ✅ **Completed** | 🚧 **In Progress** | 🔄 **Recurring** | 📅 **Upcoming** |
| :---: | :---: | :---: | :---: | :---: |
| **v${version}** | ${completedCount} | ${inProgressCount} | ${recurringCount} | ${upcomingCount} |

<sub>Last updated: ${new Date().toUTCString()}</sub>

<details>
<summary><h3>📅 Recent Activity & Roadmap</h3></summary>

#### ✨ Recently Completed
${completedFeatures
  .slice(0, 5)
  .map((f) => `- ✅ ${f}`)
  .join("\n")}

#### 🚧 In Progress / Planned
${inProgressFeatures
  .slice(0, 5)
  .map((f) => `- 🚧 ${f}`)
  .join("\n")}

</details>

<br/>
${endMarker}
`;

  // Remove existing status block if present to re-position it
  const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, "g");
  let newReadme = readmeContent.replace(regex, "").trim();

  // Find target section to insert before
  // We want to insert before the FIRST features section found
  const featuresIndex = newReadme.indexOf("## ✨ Features");
  const highlightsIndex = newReadme.indexOf("## 🌟 Highlights");

  // Find the earliest valid index
  let targetIndex = -1;
  if (featuresIndex !== -1 && highlightsIndex !== -1) {
    targetIndex = Math.min(featuresIndex, highlightsIndex);
  } else if (featuresIndex !== -1) {
    targetIndex = featuresIndex;
  } else if (highlightsIndex !== -1) {
    targetIndex = highlightsIndex;
  }

  if (targetIndex !== -1) {
    // Insert before the identified section section
    newReadme =
      newReadme.slice(0, targetIndex) +
      "\n\n" +
      statusMarkdown.trim() +
      "\n\n" +
      newReadme.slice(targetIndex);
  } else {
    // Fallback: Insert after Title
    const lines = newReadme.split("\n");
    const titleIndex = lines.findIndex((l) => l.startsWith("# "));
    if (titleIndex !== -1) {
      lines.splice(titleIndex + 1, 0, "\n" + statusMarkdown.trim() + "\n");
      newReadme = lines.join("\n");
    } else {
      newReadme = statusMarkdown + "\n" + newReadme;
    }
  }

  await fs.writeFile(README_FILE, newReadme);
  console.log(chalk.cyan(`📄 Updated README.md with detailed status`));
}

generateStatus().catch(console.error);
