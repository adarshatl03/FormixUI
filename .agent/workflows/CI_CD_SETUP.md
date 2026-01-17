# CI/CD Setup Guide: Trusted Publishing

You have opted for **Trusted Publishing**, which is the most secure way to publish npm packages from GitHub Actions. This method eliminates the need for long-lived secrets.

## 1. Configure NPM for Trusted Publishing

Instead of generating a token, you will tell NPM to "trust" your GitHub repository.

1.  **Log in to NPM**: Go to [npmjs.com](https://www.npmjs.com/).
2.  **Go to Publishing Access**:
    - Navigate to the package settings for `formstack-ui` (or your organization settings if you want to apply it broadly).
    - Click **"Settings"** -> **"Publishing Access"**.
3.  **Link GitHub Repository**:
    - Click **"Add a known CI/CD source"**.
    - Select **"GitHub"**.
    - **Repository**: Enter your repo `username/repo-name` (e.g., `adarshatl03/formstack-ui` or similar).
    - **Build Environment**: Select **"GitHub Actions"**.
    - **Context**:
      - This is CRITICAL. It must match your `publish-npm.yml` trigger.
      - Select **"Tag"**.
      - Pattern: `v*` (Matches the line `tags: - "v*"` in the yaml).
    - Click **"Add"**.

4.  **Repeat for Dependencies** (Optional but Recommended):
    - If you expect to publish `@formstack-ui/core`, etc., separately later, you set trust for those too. For now, setting it for the main package is sufficient.

## 2. GitHub Actions Setup

Your workflow file `.github/workflows/publish-npm.yml` is already configured for Trusted Publishing:

- ✅ `permissions: id-token: write` is enabled (allows OIDC).
- ✅ `npm publish --provenance` flag is set.
- ✅ No `NODE_AUTH_TOKEN` secret is required.

## 3. Website Publication (GitHub Pages)

### Private Repo Limitation

Since your repo is **private**, GitHub Pages requires a **Pro/Team** plan.

### Using Netlify (Free Option)

1.  Create an account on [Netlify](https://www.netlify.com/).
2.  Import your GitHub repository.
3.  Build Settings:
    - **Build command**: `npm run build:site`
    - **Publish directory**: `dist-site`
4.  Adding the Status Badge to README is recommended.

## 4. How to Release

Just push a tag!

```bash
git tag v0.0.3
git push origin v0.0.3
```

This will trigger the trusted workflow. NPM will verify the token from GitHub and publish the package automatically.
