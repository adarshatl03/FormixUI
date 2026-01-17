import { useMemo } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  BookOpen,
  Terminal,
  Hammer,
  LayoutGrid,
  Palette,
  Map as MapIcon,
} from "lucide-react";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { FormBuilder } from "@/components/builder/FormBuilder";
import { PlaygroundPage } from "@/components/playground/PlaygroundPage";
import { Documentation } from "@/components/demo/Documentation";
import { Home } from "@/components/pages/Home";
import { ReadmePage } from "@/components/pages/ReadmePage";
import { ChangelogPage } from "@/components/pages/ChangelogPage";
import { ThemeOverridesPage } from "@/components/pages/ThemeOverridesPage";
import { DemoPage } from "@/components/pages/DemoPage";
import {
  CliGuidePage,
  UsageGuidePage,
  TasksPage,
  EcosystemPage,
  ContributingPage,
} from "@/components/pages/docs/DocPages";
import type { FormSchema } from "@/types/schema";

const App = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navItemClass = (path: string) =>
    `px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
      isActive(path)
        ? "text-primary bg-primary/10"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  const ultimateSchema = useMemo<FormSchema>(
    () => ({
      title: "Complete Feature Demo",
      description: "A comprehensive showcase of all field types and conditional logic.",
      fields: [
        {
          id: "basic",
          name: "basic",
          label: "Basic Inputs",
          type: "text",
          hidden: true,
          grid: { colSpan: 12 },
        },
        {
          id: "fullname",
          name: "personal.fullname",
          label: "Full Name (Text)",
          type: "text",
          placeholder: "John Doe",
          grid: { colSpan: 6, xs: 12, sm: 6 },
          validation: [{ type: "required", message: "Name is required" }],
        },
        {
          id: "email",
          name: "personal.email",
          label: "Email Address",
          type: "email",
          placeholder: "john@company.com",
          grid: { colSpan: 6, xs: 12, sm: 6 },
          validation: [{ type: "email", message: "Invalid email" }],
        },
        {
          id: "website",
          name: "personal.website",
          label: "Website (URL)",
          type: "url",
          placeholder: "https://example.com",
          grid: { colSpan: 6, xs: 12, sm: 6 },
          validation: [{ type: "url" }],
        },
        {
          id: "phone",
          name: "personal.phone",
          label: "Phone (Tel)",
          type: "tel",
          placeholder: "+1 555 123 4567",
          grid: { colSpan: 6, xs: 12, sm: 6 },
        },
        {
          id: "password",
          name: "security.password",
          label: "Password",
          type: "password",
          grid: { colSpan: 6, xs: 12, sm: 6 },
          validation: [{ type: "minLength", value: 8 }],
        },
        {
          id: "age",
          name: "personal.age",
          label: "Age (Number)",
          type: "number",
          placeholder: "25",
          grid: { colSpan: 6, xs: 12, sm: 6 },
          step: 1,
          validation: [{ type: "min", value: 18, message: "Must be 18+" }],
        },
        {
          id: "role",
          name: "job.role",
          label: "Role (Autocomplete)",
          type: "autocomplete",
          options: [
            { label: "Developer", value: "dev" },
            { label: "Designer", value: "design" },
            { label: "Manager", value: "pm" },
            { label: "Other", value: "other" },
          ],
          grid: { colSpan: 6, xs: 12, sm: 6 },
        },
        {
          id: "department",
          name: "job.department",
          label: "Department (Native Select)",
          type: "select",
          options: [
            { label: "Engineering", value: "eng" },
            { label: "Marketing", value: "mkt" },
            { label: "Sales", value: "sales" },
          ],
          grid: { colSpan: 6, xs: 12, sm: 6 },
        },
        {
          id: "skills",
          name: "job.skills",
          label: "Skills (Multi-Select Autocomplete)",
          type: "autocomplete",
          multiple: true,
          options: [
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
          ],
          grid: { colSpan: 12 },
        },
        {
          id: "other-role",
          name: "job.otherRole",
          label: "Specify Role (Conditionally Visible)",
          type: "text",
          grid: { colSpan: 12 },
          reserveSpace: true,
          visibilityRules: [{ field: "job.role", operator: "eq", value: "other" }],
          validation: [{ type: "required", message: "Please specify your role" }],
          helperText: "Visible only when Role is 'Other'",
        },
        {
          id: "remote",
          name: "job.remote",
          label: "Open to Remote Work? (Switch)",
          type: "switch",
          grid: { colSpan: 6 },
          defaultValue: true,
        },
        {
          id: "relocate",
          name: "job.relocate",
          label: "Willing to relocate? (Checkbox)",
          type: "checkbox",
          checkboxLabel: "Yes, I can relocate",
          grid: { colSpan: 6 },
        },
        {
          id: "employment",
          name: "job.employment",
          label: "Employment Type (Radio)",
          type: "radio",
          options: [
            { label: "Full-time", value: "ft" },
            { label: "Part-time", value: "pt" },
            { label: "Contract", value: "ct" },
          ],
          direction: { xs: "vertical", sm: "horizontal" },
          grid: { colSpan: 12 },
        },
        {
          id: "dob",
          name: "personal.dob",
          label: "Date of Birth (Date)",
          type: "date",
          grid: { colSpan: 4, xs: 12, sm: 4 },
        },
        {
          id: "interviewTime",
          name: "job.interviewTime",
          label: "Preferred Time (Time)",
          type: "time",
          grid: { colSpan: 4, xs: 12, sm: 4 },
        },
        {
          id: "startDateTime",
          name: "job.startDateTime",
          label: "Start Date & Time (DateTime)",
          type: "datetime",
          grid: { colSpan: 4, xs: 12, sm: 4 },
        },
        {
          id: "availability",
          name: "job.availability",
          label: "Availability Period (DateRange)",
          type: "daterange",
          grid: { colSpan: 12 },
          format: "dd MMM yyyy",
        },
        {
          id: "bio",
          name: "personal.bio",
          label: "Bio (Textarea)",
          type: "textarea",
          minRows: 3,
          grid: { colSpan: 12 },
          showCharCount: true,
          validation: [{ type: "maxLength", value: 500 }],
        },
        {
          id: "resume",
          name: "personal.resume",
          label: "Resume (File)",
          type: "file",
          accept: ".pdf,.doc,.docx",
          grid: { colSpan: 12 },
        },
      ],
    }),
    []
  );

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 mr-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M9 13h6" />
                  <path d="M9 17h6" />
                </svg>
              </div>
              <h1 className="font-extrabold text-2xl tracking-tight hidden lg:block bg-linear-to-br from-foreground via-foreground/90 to-primary/50 bg-clip-text text-transparent">
                FormixUI
              </h1>
            </Link>

            <div className="flex items-center flex-1 overflow-x-auto no-scrollbar mask-gradient">
              <nav className="flex items-center gap-1">
                <Link to="/" className={navItemClass("/")}>
                  <HomeIcon className="w-4 h-4 mr-2 inline-block" />
                  Home
                </Link>
                <div className="h-4 w-px bg-border mx-1" />

                <Link to="/guide" className={navItemClass("/guide")}>
                  <BookOpen className="w-4 h-4 mr-2 inline-block" />
                  Guide
                </Link>
                <Link to="/cli" className={navItemClass("/cli")}>
                  <Terminal className="w-4 h-4 mr-2 inline-block" />
                  CLI
                </Link>

                <div className="h-4 w-px bg-border mx-1" />

                <Link to="/builder" className={navItemClass("/builder")}>
                  <Hammer className="w-4 h-4 mr-2 inline-block" />
                  Builder
                </Link>
                <Link to="/playground" className={navItemClass("/playground")}>
                  <LayoutGrid className="w-4 h-4 mr-2 inline-block" />
                  Playground
                </Link>

                <div className="h-4 w-px bg-border mx-1" />

                <Link to="/theme" className={navItemClass("/theme")}>
                  <Palette className="w-4 h-4 mr-2 inline-block" />
                  UI
                </Link>
                <Link to="/tasks" className={navItemClass("/tasks")}>
                  <MapIcon className="w-4 h-4 mr-2 inline-block" />
                  Roadmap
                </Link>
              </nav>
            </div>

            <div className="ml-4 flex items-center gap-2 pl-2 border-l border-border bg-background/80">
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/readme" element={<ReadmePage />} />
              <Route path="/builder" element={<FormBuilder />} />
              <Route path="/playground/*" element={<PlaygroundPage />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/demo" element={<DemoPage schema={ultimateSchema} />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/theme" element={<ThemeOverridesPage />} />

              {/* Documentation Pages */}
              <Route path="/guide" element={<UsageGuidePage />} />
              <Route path="/cli" element={<CliGuidePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/ecosystem" element={<EcosystemPage />} />
              <Route path="/contributing" element={<ContributingPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
