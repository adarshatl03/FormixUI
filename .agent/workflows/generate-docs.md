---
description: Generate comprehensive documentation for new features across all supported stack combinations.
---

# Documentation Generation Workflow

When a new feature or component is added to `formix-ui`, follow these steps to ensure documentation covers all possible user stacks.

## 1. Identify Affected Combinations

The project supports various combinations of tools. For every new feature, you must evaluate:

- **Frameworks**: Vite (React) | Next.js
- **Validation**: Zod | Yup
- **State Management**: Standard (`useForm`) | Formik | React Hook Form

## 2. Prepare Example Snippets

For each combination, generate a clean, copy-pasteable code snippet.

- **Example A (Standard + Zod)**: The default implementation.
- **Example B (Formik + Yup)**: Using `FormikSchemaForm` and `generateYupSchema`.
- **Example C (Next.js)**: Ensure `"use client"` and proper CSS imports are shown if applicable.

## 3. Update USAGE_GUIDE.md

// turbo

1. Locate the relevant section in `USAGE_GUIDE.md`.
2. Add a sub-section for the new feature.
3. Use tabbed blocks (if supported) or sequential headers to show the code for different stacks.
   - Example: `### Implementation with Formik`

## 4. Update CLI Documentation

// turbo

1. If the feature requires specific configuration, update `CLI_GUIDE.md`.
2. Ensure the `npx formix-ui init` and `create` instructions reflect any new options.

## 5. Verify Build and Types

// turbo

1. Run `npm run build:lib` to ensure the new feature and its examples are type-safe across all combinations.
2. Fix any "Cannot find module" or type errors immediately.

## 6. Validation Matrix Check

Ensure the feature handles:

- Required state
- Error message display
- Initial values
- Conditional visibility (using `visibilityRules`)
