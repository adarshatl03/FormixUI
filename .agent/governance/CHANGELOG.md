# Changelog

All notable changes to FormEngine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2026-01-17

### 🎉 New Features & Breakthroughs

#### **Themed Variant System**

- **Unified Variants**: Full support for `outline`, `filled`, `standard`, and `floating` variants across all input components.
- **Animated Notches**: Precision-engineered floating labels with a solid background notch effect.
- **Enhanced Date/Time Pickers**: `DatePicker`, `DateRangePicker`, `DateTimePicker`, and `TimePicker` now support the full variant system natively.

#### **CLI 3.0 Power Tools**

- **Dynamic Package Names**: Users can now specify a custom `packageName` during `init` for highly tailored local installations.
- **Component Tracking**: The new `formix.config.json` config tracks every component installed in `copy` mode.
- **`update` Command**: Introduced a powerful `update` command to automatically synchronize your local component source files with the latest upstream library versions.
- **Intelligent Dependency Resolution**: The `add` and `update` commands now recursively manage internal dependencies (like `theme-core` and `date-utils`).

#### **Core Enhancements**

- **Native Implementation**: Fully transitioned from external UI libraries to high-performance, tailored native components for all Date/Time operations.
- **Floating Labels for Selects**: Integrated floating label animations into `Select` and `Autocomplete` components.
- **Library Exports**: Expanded the public API to export the complete suite of themed components.

### 🔧 Technical Details

- **Dependencies**: React 19.2, Tailwind CSS 4.1, Zod 4.3, date-fns 4.1.
- **CLI Utilities**: Chalk, Commander, Execa, Fs-extra, Ora, Prompts.

## [3.0.2] - 2026-01-13

### 🎉 Initial Release

#### Added

**Core Features**

- Schema-driven form rendering with 17 field types
- Visual form builder with drag-and-drop
- Comprehensive validation system (20+ validation types)
- Conditional field visibility with AND/OR rules
- Responsive 12-column grid layout
- Dark mode support
- TypeScript support

**Field Types**

- Text inputs: text, email, url, tel, password
- Number input with min/max/step
- Textarea with auto-grow and character count
- Autocomplete with async support and multi-select
- Native select with multi-select
- Checkbox, Switch, Radio groups
- File upload with preview modes
- Date/Time pickers (Kendo UI integration)

**Form Builder**

- 60+ configurable properties per field
- Smart field defaults by type
- Schema import/export (JSON)
- Copy to clipboard functionality
- Real-time preview
- Organized property panels
- Icon-only button design

**Validation**

- Required, email, URL validation
- Min/max length for text
- Min/max value for numbers
- Pattern/regex validation
- File size and type validation
- Date range validation
- Custom validation functions
- Debounced validation
- Validate on blur/change

**UI/UX**

- Floating labels with notch effect
- Error tooltips
- Icon adornments (start/end)
- Responsive design (mobile/tablet/desktop)
- Accessibility (ARIA, keyboard navigation)
- Premium animations and transitions

**States Gallery**

- Component state showcase
- Smart state filtering by component type
- Responsive grid layout (4-2-1 columns)
- All field types with 7 states each

**Developer Experience**

- TypeScript definitions
- Comprehensive documentation
- Example schemas
- Theme customization
- Zod integration

### 🔧 Technical Details

**Dependencies**

- React 19.2+
- Tailwind CSS 4.1
- Zod 4.3+
- Kendo React UI 13.2 (optional)

**Browser Support**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 📚 Documentation

- README with quick start guide
- API documentation
- Contributing guidelines
- MIT License
- Changelog

---

## [Unreleased]

### Planned Features

- [ ] Multi-step forms/wizard
- [ ] Form templates library
- [ ] Advanced file upload (drag-and-drop, crop)
- [ ] Rich text editor field
- [ ] Signature pad field
- [ ] Geolocation field
- [ ] Rating/star field
- [ ] Color picker field
- [ ] Slider/range field
- [ ] Form analytics
- [ ] A/B testing support
- [ ] Internationalization (i18n)
- [ ] Form versioning
- [ ] Collaboration features
- [ ] API integration templates
- [ ] Webhook support
- [ ] PDF export
- [ ] Email notifications
- [ ] Conditional sections
- [ ] Repeatable field groups
- [ ] Calculation fields
- [ ] Lookup fields
- [ ] Matrix/grid questions

---

## Version History

- **3.0.2** - Initial public release (2026-01-13)

---

## Migration Guides

### From 2.x to 3.0

No migration needed - this is the initial public release!

---

## Breaking Changes

None yet - this is version 1.0.0!

---

## Deprecations

None yet.

---

## Security

### Reporting Security Issues

Please report security vulnerabilities to adarshatl03@gmail.com

### Security Updates

- All dependencies are kept up-to-date
- Regular security audits
- Zod validation prevents injection attacks
- XSS protection built-in

---

**Note**: For detailed commit history, see [GitHub Releases](https://github.com/yourusername/form-engine/releases)
