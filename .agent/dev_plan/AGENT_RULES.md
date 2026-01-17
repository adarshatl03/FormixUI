# 🤖 Agent Rules

This document defines the strict rules the AI Agent must follow when working on the `formix-ui` project.

## 1. core Principles

1. **Read First**: Always read the relevant `.agent/dev_plan/*.md` files before starting a complex task.
2. **No Hallucinations**: Do not invent files or dependencies that do not exist. Verify existence first.
3. **No Placeholders**: Do not leave `// ... code here` blocks in critical logic. Implement fully or not at all.
4. **Preserve Context**: Do not delete `PROJECT_CONTEXT.md` or other critical planning files.
5. **Release Automation**: Whenever a release is tagged (`git tag ...`), ensure `npm run update-status` is run to regenerate `README.md` statistics.

## 2. Naming Conventions

- **Package Name**: Always use `formix-ui`.
- **NPM Scope**: Always use `@formix-ui/*` for ecosystem packages.
- **CLI Command**: Always reference `npx formix-ui ...`.
- **Config File**: Always reference `formix.config.json`.

## 3. Coding Standards

- **Paths**: Use absolute paths for all file operations.
- **Imports**: Use clear, explicit imports. Avoid circular dependencies.
- **Styling**: strictly use Tailwind CSS (v4 or v3 as configured). Do not introduce CSS-in-JS libraries.
- **Types**: Use TypeScript interfaces/types explicitly. Avoid `any`.

## 4. Documentation Strategy

- **Source of Truth**: Treat the `.agent` folder as the oracle.
- **Workflow**:
  - **Identified Rule/Task**: Update `.agent/dev_plan` files _immediately_.
  - **Feature Plan**: Update `.agent/dev_plan` _during_ dev.
  - **Manuals**: Update `.agent/developer_manual` only _after_ completion.
