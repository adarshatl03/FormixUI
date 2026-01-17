# 📦 Publishing Guide

This guide covers the entire release lifecycle of `formix-ui`, from versioning to NPM publication.

## 🟢 1. Versioning Strategy

Before publishing, assume Semantic Versioning (SemVer):

| Bump Type | Command             | When to use?                                             |
| :-------- | :------------------ | :------------------------------------------------------- |
| **Patch** | `npm version patch` | Bug fixes, minor style tweaks, CLI internal logic fixes. |
| **Minor** | `npm version minor` | New components, new CLI commands, new variant supports.  |
| **Major** | `npm version major` | Breaking changes to `FormSchema` structure.              |

## 🚀 2. Release Workflow

### Step 1: Commit Changes

Ensure your working directory is clean.

```bash
git add .
git commit -m "feat: new cool feature"
git push
```

### Step 2: Bump Version

This updates `package.json`, creates a commit, and adds a git tag.

```bash
npm version patch # or minor/major
```

### Step 3: Trigger Publication (Automated)

Push the tags to GitHub to trigger the CI/CD pipeline.

```bash
git push --follow-tags
```

**What happens next?**

1. GitHub Actions runs `.github/workflows/publish-npm.yml`.
2. Builds the library (`npm run build:lib`).
3. Publishes to NPM (using Trusted Publishing).
4. Deploys the documentation site to GitHub Pages.

## 🛠️ 3. Manual Publishing (Fallback)

If the automation fails or you need to do a manual release (e.g., first-time setup):

1. **Login**: `npm login`
2. **Build**: `npm run build:lib`
3. **Publish**: `npm publish --access public`

## 📋 4. Post-Release Checklist

- [ ] Verify package on [NPM](https://www.npmjs.com/package/formix-ui)
- [ ] Verify documentation site is updated.
- [ ] Test installation in a fresh project: `npx formix-ui@latest init`
