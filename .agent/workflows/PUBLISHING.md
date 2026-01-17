# Publishing Guide for FormEngine

This guide walks you through publishing FormEngine to npm.

## 📋 Pre-Publishing Checklist

### 1. **Code Quality**

- [ ] All tests passing: `npm run test`
- [ ] Linter passing: `npm run lint`
- [ ] Build successful: `npm run build`
- [ ] No TypeScript errors: `tsc --noEmit`

### 2. **Documentation**

- [ ] README.md is up-to-date
- [ ] CHANGELOG.md has new version entry
- [ ] API documentation is current
- [ ] Examples are working

### 3. **Version**

- [ ] Updated version in `package.json`
- [ ] Follows semantic versioning (MAJOR.MINOR.PATCH)
- [ ] Git tag created for version

### 4. **Files**

- [ ] `.npmignore` configured correctly
- [ ] `files` field in package.json is correct
- [ ] LICENSE file exists
- [ ] README.md exists

## 🚀 Publishing Steps

### Step 1: Login to npm

```bash
npm login
```

Enter your npm credentials:

- Username
- Password
- Email
- One-time password (if 2FA enabled)

### Step 2: Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included in the package.

### Step 3: Build the Package

```bash
npm run build:lib
```

Verify the `dist/` directory contains:

- `index.js` - Main entry point
- `index.d.ts` - TypeScript definitions
- `style.css` - Styles
- All component files

### Step 4: Test Locally (Optional but Recommended)

Create a test project and install your package locally:

```bash
# In your form-engine directory
npm pack

# In a test project
npm install /path/to/formstack-ui-3.0.2.tgz
```

Test that imports work:

```tsx
import { SchemaForm, FormBuilder } from "formstack-ui";
import "formstack-ui/styles";
```

### Step 5: Publish to npm

#### For First-Time Publishing

```bash
npm publish --access public
```

#### For Updates

```bash
npm publish
```

#### For Beta/RC Versions

```bash
npm publish --tag beta
# or
npm publish --tag next
```

### Step 6: Verify Publication

1. Check on npm: https://www.npmjs.com/package/formstack-ui
2. Install in a test project:
   ```bash
   npm install formstack-ui
   ```
3. Verify imports work correctly

### Step 7: Create GitHub Release

1. Go to GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v3.1.0`
4. Release title: `FormEngine v3.1.0`
5. Copy changelog content for Version 3.1.0 to description
6. Publish release

### Step 8: Deploy Demo Site (GitHub Pages)

Always deploy the latest demo site alongside your library release:

```bash
npm run deploy
```

This ensures the playground at `https://adarshatl03.github.io/form-engine/` showcases the new features.

### Step 9: Announce

- [ ] Tweet about the release (Mention CLI 3.0 and Variant System)
- [ ] Post on Reddit (r/reactjs, r/webdev)
- [ ] Update documentation site manually if needed
- [ ] Notify Discord/Slack community
- [ ] Send newsletter (if applicable)

## 🔄 Version Bumping

### Patch Release (3.0.2 → 3.0.3)

Bug fixes, no new features:

```bash
npm version patch
git push && git push --tags
npm publish
```

### Minor Release (3.0.2 → 3.1.0)

New features, backward compatible:

```bash
npm version minor
git push && git push --tags
npm publish
```

### Major Release (3.0.2 → 4.0.0)

Breaking changes:

```bash
npm version major
git push && git push --tags
npm publish
```

## 📦 Package Scopes

### Public Scoped Package

```json
{
  "name": "formstack-ui"
}
```

Publish with:

```bash
npm publish --access public
```

### Unscoped Package

```json
{
  "name": "formstack-ui"
}
```

Publish with:

```bash
npm publish
```

## 🏷️ npm Tags

### Latest (Default)

```bash
npm publish
# Users install with: npm install formstack-ui
```

### Beta

```bash
npm publish --tag beta
# Users install with: npm install formstack-ui@beta
```

### Next

```bash
npm publish --tag next
# Users install with: npm install formstack-ui@next
```

### Update Tag

```bash
npm dist-tag add formstack-ui@3.0.3 latest
```

## 🔐 Security

### Enable 2FA on npm

```bash
npm profile enable-2fa auth-and-writes
```

### Use npm Tokens in CI/CD

1. Create token: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Add to GitHub Secrets: `NPM_TOKEN`
3. Use in GitHub Actions:
   ```yaml
   - run: npm publish
     env:
       NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

## 🐛 Troubleshooting

### "Package already exists"

- Version already published
- Bump version and try again

### "403 Forbidden"

- Not logged in: `npm login`
- No permission: Check package ownership
- 2FA required: Enable 2FA

### "EPUBLISHCONFLICT"

- Package name taken
- Choose different name or scope

### Files Missing in Package

- Check `.npmignore`
- Check `files` field in package.json
- Run `npm pack --dry-run` to verify

### TypeScript Definitions Not Found

- Ensure `types` field in package.json points to `.d.ts` file
- Verify `dist/index.d.ts` exists after build

## 📊 Post-Publishing

### Monitor

- [ ] npm download stats: https://npm-stat.com/
- [ ] GitHub stars/forks
- [ ] Issue reports
- [ ] User feedback

### Maintain

- [ ] Respond to issues within 48 hours
- [ ] Review pull requests weekly
- [ ] Update dependencies monthly
- [ ] Security patches ASAP

## 🔄 Unpublishing (Emergency Only)

⚠️ **Warning**: Only unpublish within 72 hours of publishing!

```bash
npm unpublish formstack-ui@3.0.2
```

After 72 hours, use deprecation instead:

```bash
npm deprecate formstack-ui@3.0.2 "Security vulnerability, please upgrade to 3.0.3"
```

## 📝 Automation with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          registry-url: "https://registry.npmjs.org"
      - run: npm ci
      - run: npm run build:lib
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 🎯 Best Practices

1. **Always test locally before publishing**
2. **Use semantic versioning strictly**
3. **Keep CHANGELOG.md updated**
4. **Tag releases in git**
5. **Enable 2FA on npm account**
6. **Use scoped packages for organization**
7. **Include comprehensive README**
8. **Provide TypeScript definitions**
9. **Document breaking changes clearly**
10. **Respond to issues promptly**

## 📞 Support

If you encounter issues:

- Check npm status: https://status.npmjs.org/
- npm support: https://www.npmjs.com/support
- GitHub issues: https://github.com/adarshatl03/form-engine/issues

---

**Happy Publishing! 🎉**
