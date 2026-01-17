import { CheckCircle2, Circle, Clock, LayoutList } from "lucide-react";
import { Link } from "react-router-dom";

export const TasksPage = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-10">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <LayoutList className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Project Roadmap</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Tracking the progress, completed milestones, and future plans for{" "}
          <span className="font-semibold text-primary">FormixUI</span>.
        </p>
      </div>

      {/* Completed Tasks */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          Completed Tasks
        </h2>

        <div className="grid gap-6">
          {/* Date & Time */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">
              📅 Date & Time Improvements
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Implement DateRangePicker with Time:</strong> Added showTime prop to
                  DateRangePicker.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Schema Integration:</strong> Updated SchemaForm to auto-enable time
                  selection based on format.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>UI/UX Polishing:</strong> Tabbed interface for Start/End time selection.
                </span>
              </li>
            </ul>
          </div>

          {/* Integration */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">
              🏗️ Integration Ecosystem
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Formik Support:</strong> Created FormikSchemaForm for first-class Formik
                  integration.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Yup Validation:</strong> Implement generateYupSchema to convert FormEngine
                  schemas to Yup.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Next.js Support:</strong> Full compatibility with the App Router and
                  Server Components.
                </span>
              </li>
            </ul>
          </div>

          {/* CLI */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">
              🛠️ CLI 3.0 (Power Tools)
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>New create command:</strong> Scaffold entire projects with one command.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Intelligent init:</strong> Context-aware setup for Vite/Next.js and TS/JS.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Custom Landing Page:</strong> Generated projects feature a premium landing
                  page.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Copy-Code Mode:</strong> shadcn-style component installation.
                </span>
              </li>
            </ul>
          </div>

          {/* Documentation */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">
              📚 Documentation & Demo Site
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>New Home Page:</strong> Created a dedicated landing page.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Interactive Documentation:</strong> Built Readme, Guide, Changelog, and
                  Tasks pages.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>API Docs:</strong> Documented Formik, Yup, and new DateRangePicker props.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>CLI Guide:</strong> Comprehensive manual for all CLI commands.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Refactoring:</strong> Removed Kendo UI references; Updated Tailwind CSS
                  usage.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Planned Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" />
          Planned Features
        </h2>

        <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            See{" "}
            <Link to="/ecosystem" className="font-semibold underline hover:text-blue-800">
              Ecosystem Plan
            </Link>{" "}
            for the detailed expansion strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Core Enhancements */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Core Enhancements
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Multi-step Forms:</strong> Native support for wizards.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Form Templates:</strong> Library of pre-built layouts.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Conditional Sections:</strong> Group-level show/hide logic.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Repeatable Groups:</strong> Dynamic field sets.
                </span>
              </li>
            </ul>
          </div>

          {/* New Field Types */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              New Field Types
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Rich Text Editor:</strong> WYSIWYG for textarea.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>File Upload Advanced:</strong> Drag-drop, cropping.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Signature Pad:</strong> Canvas-based capture.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Geolocation:</strong> Map-based picker.
                </span>
              </li>
            </ul>
          </div>

          {/* Advanced Features */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Advanced Features
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Form Versioning:</strong> Track schema history.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>Analytics:</strong> Completion rates & drop-offs.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>I18n:</strong> Native schema translation.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  <strong>PDF Export:</strong> Generate documents from submissions.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
