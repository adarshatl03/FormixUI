# Contributing to FormEngine

Thank you for your interest in contributing to FormEngine! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- TypeScript knowledge
- React experience

### Setup

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/form-engine.git
   cd form-engine
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Run linter before committing: `npm run lint`
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── builder/      # Form builder components
│   └── demo/         # Demo/gallery components
├── types/            # TypeScript type definitions
├── context/          # React contexts
└── hooks/            # Custom React hooks
```

### Commit Messages

Follow conventional commits:

```
feat: add new field type for color picker
fix: resolve validation error in email field
docs: update README with new examples
style: format code with prettier
refactor: simplify autocomplete logic
test: add tests for file upload
chore: update dependencies
```

### Pull Request Process

1. **Update Documentation**: If you add features, update README.md
2. **Add Tests**: Include tests for new functionality
3. **Update CHANGELOG**: Add entry to CHANGELOG.md
4. **Run Linter**: Ensure `npm run lint` passes
5. **Build Check**: Ensure `npm run build` succeeds
6. **Create PR**: Submit pull request with clear description

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests passing

## Screenshots (if applicable)

Add screenshots here

## Checklist

- [ ] Code follows project style
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

## 🐛 Reporting Bugs

### Before Submitting

1. Check existing issues
2. Try latest version
3. Reproduce in clean environment

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**

- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- FormEngine Version: [e.g. 1.0.0]
- React Version: [e.g. 19.2.0]

**Additional context**
Any other relevant information
```

## 💡 Feature Requests

We love new ideas! Submit feature requests as GitHub issues with:

- **Clear title**: Descriptive feature name
- **Use case**: Why is this needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other approaches considered
- **Examples**: Similar features in other tools

## 🧪 Testing

### Running Tests

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Writing Tests

- Place tests next to source files: `Component.test.tsx`
- Test user interactions, not implementation
- Aim for >80% coverage
- Mock external dependencies

Example:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("renders with label", () => {
    render(<TextInput label="Name" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });
    expect(handleChange).toHaveBeenCalled();
  });
});
```

## 📚 Documentation

### Code Documentation

- Use JSDoc for public APIs
- Document complex algorithms
- Explain "why" not just "what"

Example:

```typescript
/**
 * Validates a field value against its validation rules
 * @param value - The field value to validate
 * @param rules - Array of validation rules to apply
 * @returns Object with isValid flag and error message
 */
export function validateField(
  value: any,
  rules: ValidationRule[]
): { isValid: boolean; error?: string } {
  // Implementation
}
```

### README Updates

When adding features:

1. Update feature list
2. Add usage example
3. Update API documentation
4. Add to changelog

## 🎨 Design Guidelines

### UI/UX Principles

- **Consistency**: Follow existing patterns
- **Accessibility**: ARIA labels, keyboard navigation
- **Responsiveness**: Mobile-first approach
- **Performance**: Optimize re-renders
- **Dark Mode**: Support both themes

### Component Guidelines

- Keep components focused (single responsibility)
- Use TypeScript interfaces for props
- Provide sensible defaults
- Make components composable
- Support ref forwarding

## 🔄 Release Process

Maintainers only:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v3.0.2`
4. Push tag: `git push origin v3.0.2`
5. Publish to npm: `npm publish`
6. Create GitHub release

## 📞 Getting Help

- **Discord**: [Join our community](#)
- **GitHub Discussions**: Ask questions
- **Stack Overflow**: Tag `formengine`
- **Email**: adarshatl03@gmail.com

## 🏆 Recognition

Contributors will be:

- Listed in README.md
- Mentioned in release notes
- Invited to contributor Discord channel

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

**Positive behavior:**

- Using welcoming language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior:**

- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other unprofessional conduct

### Enforcement

Report violations to adarshatl03@gmail.com. All complaints will be reviewed and investigated.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to FormEngine! 🎉**
