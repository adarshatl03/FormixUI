# Public Demo Repo Setup Instructions

You are ready to create your **Public** repository (`adarshatl03/formstack-ui`).

## 📂 Assets Prepared

I have created a folder called `public-demo-assets` in your current directory containing:

1.  `package.json`: Configured to install `formstack-ui` from NPM.
2.  `deploy-demo.yml`: A workflow to automatically build and deploy your site to GitHub Pages.

## 🚀 How to Set Up the Public Repo

1.  **Create the Repo**: Go to GitHub and create `adarshatl03/formstack-ui` (Public).
2.  **Initialize locally**:
    ```bash
    mkdir formstack-demo
    cd formstack-demo
    npm create vite@latest . -- --template react-ts
    ```
3.  **Replace Files**:
    - Replace `package.json` with the one from `public-demo-assets/package.json`.
    - Create `.github/workflows/deploy.yml` and paste the content from `public-demo-assets/deploy-demo.yml`.
4.  **Copy Your Demo Code**:
    - Copy your `src/examples` or `ComponentPlayground` from the private repo to `src/` here.
    - **Crucial**: Update imports! Change `../../src` to `formstack-ui`.
5.  **Push**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/adarshatl03/formstack-ui.git
    git push -u origin main
    ```

Your private code is now safe, and your public site will live on!
