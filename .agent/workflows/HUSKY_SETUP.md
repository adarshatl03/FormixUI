# Git Hooks Setup (Husky)

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality through Git hooks.

## 🎯 What's Configured

### Pre-Commit Hook

Runs **before** every commit to ensure code quality:

✅ **Lint-Staged** - Only checks files you're committing

- **TypeScript/TSX files** (`.ts`, `.tsx`):
  - Runs ESLint with auto-fix
  - Runs TypeScript type checking
- **JSON/Markdown files** (`.json`, `.md`):
  - Formats with Prettier

**Location**: `.husky/pre-commit`

### Pre-Push Hook

Runs **before** every push to ensure build integrity:

✅ **Full Project Checks**:

1. **Linter** - Runs `npm run lint` on entire codebase
2. **Type Check** - Runs `tsc --noEmit` to catch TypeScript errors
3. **Build** - Runs `npm run build` to ensure project builds successfully

**Location**: `.husky/pre-push`

## 📦 Installed Packages

- `husky` - Git hooks manager
- `lint-staged` - Run linters on staged files
- `prettier` - Code formatter

## 🚀 How It Works

### When You Commit

```bash
git add .
git commit -m "feat: add new feature"
```

**What happens:**

1. Husky triggers `pre-commit` hook
2. Lint-staged runs on staged files:
   - ESLint fixes code issues
   - TypeScript checks types
   - Prettier formats JSON/MD
3. If all pass ✅ → Commit succeeds
4. If any fail ❌ → Commit blocked, fix errors first

### When You Push

```bash
git push
```

**What happens:**

1. Husky triggers `pre-push` hook
2. Runs full project checks:
   - Linter on all files
   - TypeScript type check
   - Full build
3. If all pass ✅ → Push succeeds
4. If any fail ❌ → Push blocked, fix errors first

## ⚙️ Configuration Files

### `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### `.husky/pre-push`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npx tsc --noEmit
npm run build
```

### `package.json` - lint-staged config

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "tsc --noEmit"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2
}
```

## 🛠️ Customization

### Skip Hooks (Not Recommended)

If you absolutely need to skip hooks:

```bash
# Skip pre-commit
git commit --no-verify -m "message"

# Skip pre-push
git push --no-verify
```

⚠️ **Warning**: Only use `--no-verify` in emergencies!

### Modify Hooks

Edit the hook files directly:

- `.husky/pre-commit` - Modify pre-commit behavior
- `.husky/pre-push` - Modify pre-push behavior

### Update Lint-Staged Rules

Edit `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "tsc --noEmit"
      // Add more commands here
    ]
  }
}
```

## 🔧 Troubleshooting

### Hooks Not Running

1. **Reinstall Husky**:

   ```bash
   npm run prepare
   ```

2. **Check Git Config**:

   ```bash
   git config core.hooksPath
   # Should output: .husky
   ```

3. **Make hooks executable** (Unix/Mac):
   ```bash
   chmod +x .husky/pre-commit
   chmod +x .husky/pre-push
   ```

### Hooks Failing

1. **Check what failed**:
   - Read the error message
   - Fix the reported issues

2. **Run checks manually**:

   ```bash
   # Test lint-staged
   npx lint-staged

   # Test linter
   npm run lint

   # Test type check
   npx tsc --noEmit

   # Test build
   npm run build
   ```

3. **Fix issues** and try again

### Prettier Conflicts with ESLint

If Prettier and ESLint conflict:

1. Install ESLint-Prettier integration:

   ```bash
   npm install --save-dev eslint-config-prettier
   ```

2. Update `eslint.config.js`:

   ```js
   import prettier from "eslint-config-prettier";

   export default [
     // ... other configs
     prettier, // Add at the end
   ];
   ```

## 📊 Benefits

✅ **Consistent Code Quality** - All commits meet standards
✅ **Catch Errors Early** - Before they reach the repo
✅ **Automated Formatting** - No manual formatting needed
✅ **Build Verification** - Ensure code builds before push
✅ **Team Alignment** - Everyone follows same standards

## 🎓 Best Practices

1. **Don't Skip Hooks** - They're there to help
2. **Fix Issues Immediately** - Don't accumulate technical debt
3. **Keep Hooks Fast** - Only check what's necessary
4. **Update Regularly** - Keep dependencies current
5. **Document Changes** - Update this README when modifying hooks

## 📚 Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [Lint-Staged Documentation](https://github.com/okonet/lint-staged)
- [Prettier Documentation](https://prettier.io/)

---

**Setup Complete! 🎉**

Your project now has automated code quality checks on every commit and push.
