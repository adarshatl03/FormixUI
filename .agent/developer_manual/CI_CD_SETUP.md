# 🤖 CI/CD & Setup Guide

This document explains the CI/CD infrastructure and how to set up the repository for automation.

## 🛡️ 1. NPM Trusted Publishing (OIDC)

We use **Trusted Publishing** to allow GitHub Actions to publish to NPM without long-lived secrets.

### Setup Instructions

1.  **NPM Website**: Go to your package settings -> **Publishing**.
2.  **Connect**: Add a new GitHub Actions workflow.
3.  **Config**:
    - Owner: `adarshatl03` (or org name)
    - Repo: `form-engine`
    - Workflow: `publish-npm.yml`
4.  **Permissions**: Ensure `Read and write` access is granted.

## 🔑 2. GitHub Secrets

If Trusted Publishing is NOT used, you must set these secrets in GitHub Repo Settings -> Secrets -> Actions:

- `NPM_TOKEN`: A granular access token from NPM with "Read and write" scope.

## ⚙️ 3. Workflow Permissions

To allow the workflows to deploy to GitHub Pages and create releases:

1.  Go to **Settings** -> **Actions** -> **General**.
2.  Under **Workflow permissions**, select **"Read and write permissions"**.
3.  Check **"Allow GitHub Actions to create and approve pull requests"**.

## 🔄 4. Workflows Explained

- **`publish-npm.yml`**: Triggered on tags (`v*`). Builds lib, publishes to NPM, deploys site.
- **`deploy-site.yml`**: Triggered on push to `develop`. Deploys the playground site only.
