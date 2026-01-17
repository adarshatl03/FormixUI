# 💻 Development Tasks

This document tracks the **frontend-only, practical development tasks** for `formix-ui` and serves as a comprehensive Feature Matrix.

## ✅ Feature Matrix & Completion Status

### 🧱 Core Inputs

- [x] **Button**: Standard interactive button.
- [ ] **Button Group**: Group of buttons joined together.
- [x] **Checkbox**: Binary selection control.
- [x] **Combobox (Autocomplete)**: Input with filtered suggestions.
- [ ] **Command**: Fast, composable, unstyled command menu for React.
- [x] **Date Picker**: Date selection interactive calendar.
- [x] **Date Range Picker**: Date range selection.
- [x] **Date Time Picker**: Combined date and time picker.
- [ ] **Field**: Abstract field wrapper for custom inputs.
- [ ] **Form**: Form wrapper with schema validation.
- [x] **Input**: Basic text input fields (text, number, password, url, etc.).
- [ ] **Input Group**: Pre/Post-append visual grouping.
- [ ] **Input OTP**: One-time password input.
- [ ] **Item**: Generic list item container.
- [ ] **Native Select**: Browser native dropdown.
- [x] **Radio Group**: Single selection from a list.
- [x] **Select**: Custom styled dropdown menu.
- [ ] **Slider**: Range slider input.
- [x] **Switch**: Toggle switch for boolean values.
- [x] **Textarea**: Multi-line text input.
- [ ] **Toggle**: Two-state button.
- [ ] **Toggle Group**: Group of two-state buttons.
- [x] **Time Picker**: Time selection input.
- [x] **File Input**: File upload control.

### 📢 Feedback

- [ ] **Alert**: Critical information banner.
- [ ] **Alert Dialog**: Modal confirmation dialog.
- [ ] **Dialog**: Modal window.
- [ ] **Progress**: Progress bar indicator.
- [ ] **Skeleton**: Loading placeholder state.
- [ ] **Sonner**: Stackable toast notifications.
- [ ] **Spinner**: Loading spinner.
- [ ] **Toast**: Temporary notification message.
- [x] **Tooltip**: Hover text label (implemented as Error Tooltip).

### 🧭 Navigation

- [ ] **Breadcrumb**: Path hierarchy navigation.
- [ ] **Dropdown Menu**: Toggleable menu for actions.
- [ ] **Menubar**: Desktop-style menu bar.
- [ ] **Navigation Menu**: Link hierarchy navigation.
- [ ] **Pagination**: Page navigation control.
- [ ] **Sidebar**: Collapsible side navigation.
- [ ] **Tabs**: Tabbed content switcher.

### 📐 Layout

- [ ] **Accordion**: Vertically stacked set of interactive headings.
- [ ] **Aspect Ratio**: Displays content within a desired ratio.
- [ ] **Card**: Box component with header, content, and footer.
- [ ] **Collapsible**: Interactive component which expands/collapses a panel.
- [ ] **Drawer**: Panel that slides out from the edge of the screen.
- [ ] **Resizable**: Resizable panel groups.
- [ ] **Scroll Area**: Custom styled scrollable area.
- [ ] **Separator**: Visual divider.
- [ ] **Sheet**: Modal that typically slides out from the side.

### 📊 Data Display

- [ ] **Avatar**: Image element with a fallback for representing the user.
- [ ] **Badge**: Small status descriptor for UI elements.
- [x] **Calendar**: Date view component (used in DatePicker).
- [ ] **Carousel**: Motion carousel for cycling through elements.
- [ ] **Chart**: Visual data representation.
- [ ] **Data Table**: Advanced table with sorting, filtering, and pagination.
- [ ] **Empty**: Placeholder for empty states.
- [ ] **Hover Card**: Preview content available behind a link.
- [ ] **Kbd**: Keyboard shortcut display.
- [ ] **Table**: Responsive HTML table component.
- [ ] **Typography**: Text styles and headings.

### 🧩 Utilities / Other

- [ ] **Context Menu**: Right-click menu.
- [ ] **Popover**: Displays rich content in a portal, triggered by a button.

### 🏢 Enterprise / Advanced

- [ ] **Rich Text Editor**: WYSIWYG editor.
- [ ] **Color Picker**: Color selection tool.
- [ ] **Rating**: Star or scale rating input.
- [ ] **Stepper**: Step-by-step wizard navigation.
- [ ] **Timeline**: Vertical display of events.
- [ ] **Tree View**: Hierarchical data display.
- [ ] **Transfer List**: Dual-list item mover.
- [ ] **Upload**: Drag-and-drop file uploader (Dropzone).
- [ ] **Virtual Scroll**: Performance optimization for large lists.
- [ ] **Watermark**: Overlay for protection/status.
- [ ] **Tour**: Guided walkthrough of the UI.
- [ ] **Statistic**: Key value display with trends.

### 🖼️ Page / Layout Patterns

- [ ] **Page Header**: Standardized page title/action area.
- [ ] **Description List**: Key-value data pair display.
- [ ] **Result**: Success/Error/404/500 full-page states.
- [ ] **Split View**: Resizable split pane layout.

---

## 🛠️ Infrastructure & Dev Tasks (Completed)

### 1. Project Setup

- [x] Initialize Vite + React + TypeScript
- [x] Configure path aliases
- [x] Setup Tailwind CSS 4.1
- [x] Global CSS tokens & Theme Variables
- [x] Theme Switcher

### 2. Form Engine Core

- [x] BaseField Wrapper
- [x] LabelWrapper (Floating/Notched)
- [x] Adornment System
- [x] Error System (Tooltip integration)
- [x] Layout Engine (Grid/ColSpan)
- [x] Schema Renderer (Zod Integration)
- [x] Frontend Validation Logic

## 📋 Outstanding Infrastructure Tasks

### Date & Time Advanced

- [ ] Locale switcher UI
- [ ] Week start UI
- [ ] Week number toggle UI
- [ ] Time step UI

### Accessibility (A11y)

- [ ] Focus trapping (modals)
- [ ] Screen reader labels
- [ ] Color contrast audit
- [ ] Tab order verification
- [ ] Reduced motion support

### Testing & QA

- 🔄 Mobile/Tablet/Desktop rendering
- 🔄 Cross-browser compatibility
- 🔄 Performance profiling
