# 🛡️ Dual-Repo Strategy: Confidential Core + Public Demo

This strategy allows you to keep your source code **100% Private** while hosting a **Public** Demo/Documentation site on GitHub Pages.

## 🏗️ The Architecture

| Feature        | 🔒 Private Repo (`formstack-ui/formstack-ui`) | 🌍 Public Repo (`adarshatl03/formstack-ui`)    |
| :------------- | :-------------------------------------------- | :--------------------------------------------- |
| **Content**    | **Source Code**, Library Logic, Secrets       | **Demo App**, Documentation, Examples          |
| **Role**       | **Producer** (Builds & Publishes NPM Package) | **Consumer** (Installs NPM Package & Shows it) |
| **Access**     | Private (Team Only)                           | Public (Everyone)                              |
| **Deployment** | Publishes to **NPM**                          | Deploys to **GitHub Pages**                    |

---

## 🚀 Step-by-Step Implementation

### Phase 1: Clean Up Private Repo (Producer)

The private repo should **only** publish to NPM. It should no longer try to deploy the website itself.

1.  **Modify `publish-npm.yml`**: Remove the "Deploy Website" steps.
2.  **Add Trigger**: Add a step to notify the Public Repo when a new version is published.

### Phase 2: Setup Public Repo (Consumer)

This repo will be a standard React App that _installs_ your library just like a real user would.

1.  **Initialize**: Create a new Vite app in a separate folder.
2.  **Install Library**: `npm install formstack-ui` (The one you published!).
3.  **Move Examples**: Copy your `src/examples` or `ComponentPlayground` files involved in the demo to this new repo.
4.  **Important**: Do **NOT** copy the library source code files. Import them from the package.
    - _Bad_: `import { Button } from './src/components/Button'`
    - _Good_: `import { Button } from 'formstack-ui'`

### Phase 3: Automated Sync (The Bridge)

To ensure the public demo always matches your private code:

1.  **The Trigger**: When you tag a release (`v*`) in the private repo.
2.  **The Script**: `scripts/sync-public-demo.js` will run.
    - It clones the public repo.
    - It copies your `src` folder (excluding internal lib folders).
    - _(Optional)_ It rewrites imports to use `formstack-ui`.
    - It pushes the changes to the public repo.
3.  **The Authenticator**: You must add a Secret to the Private Repo.
    - Name: `PUBLIC_REPO_TOKEN`
    - Value: A classic PAT (Personal Access Token) with `repo` scope that can write to `adarshatl03/formstack-ui`.

### Phase 4: Public Build

Once the Public Repo receives the push:

1.  Its `deploy-demo.yml` workflow triggers.
2.  It runs `npm update formstack-ui`.
3.  It builds the transformed code using the real library from NPM.
4.  It deploys to GitHub Pages.

---

## 📝 Check Steps

1.  [ ] **Private Repo**: Modify CI/CD to stop deploying pages.
2.  [ ] **Public Repo**: specific `package.json` created (I can help generate this).
3.  [ ] **Public Repo**: GitHub Action created to build/deploy site.

**Shall we start by modifying the Private Repo's workflow?**
