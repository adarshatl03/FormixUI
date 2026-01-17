# 🔄 Final Integration: Automated Sync Setup

This guide covers the final steps to wire up your Private Repo so it automatically updates the Public Demo.

## 1. Generate Access Token (PAT)

You need a token that allows your Private Repo to write to your Public Repo.

1.  Go to [GitHub Settings > Developer Settings > Personal Access Tokens (Tokens (classic))](https://github.com/settings/tokens).
2.  Click **Generate new token (classic)**.
3.  **Note**: "Demo Sync Token".
4.  **Scopes**: Check `repo` (Full control of private repositories).
    - _Why?_ It needs to push code to `adarshatl03/formstack-ui`.
5.  Click **Generate token**.
6.  **Copy the token** immediately (you won't see it again).

## 2. Add Secret to PRIVATE Repo

1.  Go to your **Private Repository** (`formstack-ui/formstack-ui`) on GitHub.
2.  Navigate to **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  **Name**: `PUBLIC_REPO_TOKEN`
5.  **Value**: Paste the PAT you generated in Step 1.
6.  Click **Add secret**.

## 3. Update Publish Workflow

Now, update your `.github/workflows/publish-npm.yml` file to run the sync script after publishing.

Add this block to the end of the `jobs: publish: steps:` section:

```yaml
- name: Sync Demo 🔄
  env:
    GITHUB_TOKEN: ${{ secrets.PUBLIC_REPO_TOKEN }}
  run: node scripts/sync-public-demo.js
```

## ✅ Verification

To test the entire flow:

1.  Make a change in your private `src` folder.
2.  Commit and tag a release: `git tag v0.0.X` && `git push origin v0.0.X`.
3.  Watch the Action:
    - **Private Repo**: Publishes to NPM -> Runs Sync Script.
    - **Public Repo**: Receives Push -> Triggers Deploy Action -> Deploys to GitHub Pages.
