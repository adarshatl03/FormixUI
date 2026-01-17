import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const SCOPE = "@formix-ui";
const PACKAGES = ["core", "charts", "tables", "auth", "editor", "cli", "native"];

const OUT_DIR = "dist-placeholders";

// Ensure output directory exists
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}
fs.mkdirSync(OUT_DIR);

console.log(`📦 Preparing placeholder packages for ${SCOPE}...`);

PACKAGES.forEach((pkg) => {
  const pkgName = `${SCOPE}/${pkg}`;
  const pkgDir = path.join(OUT_DIR, pkg);

  fs.mkdirSync(pkgDir);

  // 1. Create package.json
  const packageJson = {
    name: pkgName,
    version: "0.0.0",
    description: `Placeholder for ${pkgName} - Part of the FormixUI ecosystem`,
    main: "index.js",
    repository: {
      type: "git",
      url: "git+https://github.com/adarshatl03/formix-ui.git",
    },
    author: "Adarsh <adarshatl03@gmail.com>",
    license: "MIT",
    publishConfig: {
      access: "public",
    },
  };

  fs.writeFileSync(path.join(pkgDir, "package.json"), JSON.stringify(packageJson, null, 2));

  // 2. Create README.md
  const readmeContent = `# ${pkgName}

🚧 **Coming Soon**

This package is reserved as part of the [FormixUI](https://github.com/adarshatl03/formix-ui) ecosystem.

Please check back later for updates!
`;

  fs.writeFileSync(path.join(pkgDir, "README.md"), readmeContent);

  // 3. Create index.js
  fs.writeFileSync(path.join(pkgDir, "index.js"), "module.exports = {};");

  console.log(`✅ Prepared ${pkgName}`);
});

// Create a publish script
const publishScript = `
#!/bin/bash
echo "🚀 Starting publication of placeholders..."

${PACKAGES.map(
  (pkg) => `
echo "------------------------------------------------"
echo "Publishing ${SCOPE}/${pkg}..."
cd ${pkg}
npm publish --access public
cd ..
`
).join("\n")}

echo "------------------------------------------------"
echo "🎉 All placeholders processed!"
`;

fs.writeFileSync(path.join(OUT_DIR, "publish-all.sh"), publishScript);
// Make it executable (on unix-like systems, helpful if using git bash on windows)
try {
  execSync(`chmod +x ${path.join(OUT_DIR, "publish-all.sh")}`);
} catch (e) {
  // Ignore on windows if fails
}

console.log(`\n✨ Done! Files created in /${OUT_DIR}`);
console.log(`\n👉 TO PUBLISH ALL PACKAGES:`);
console.log(`   1. Navigate to the folder: cd ${OUT_DIR}`);
console.log(`   2. Run the script: sh publish-all.sh`);
console.log(`      (Make sure you are logged in with 'npm login' first!)`);
