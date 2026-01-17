import { BookOpen, Code, Terminal, Palette, Layout, Puzzle } from "lucide-react";

export const UsageGuidePage = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-12">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Usage Guide</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Complete documentation for installing, configuring, and building with{" "}
          <span className="font-semibold text-primary">FormixUI</span>.
        </p>
      </div>

      {/* Installation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Terminal className="w-6 h-6 text-primary" />
          Installation & Setup
        </h2>

        <div className="space-y-6">
          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold mb-3">1. Install Package</h3>
            <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm border border-border">
              npm install formix-ui
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold mb-3">2. Install Peer Dependencies</h3>
            <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm border border-border">
              npm install react react-dom tailwindcss zod formik yup
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold mb-3">3. Configure Tailwind CSS</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add the library path to your{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">content</code> array:
            </p>
            <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-border">
              {`content: [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/formix-ui/**/*.{js,ts,jsx,tsx}"
],`}
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold mb-3">4. Import Styles</h3>
            <p className="text-sm text-muted-foreground mb-3">In your main CSS file:</p>
            <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm border border-border">
              @import "formix-ui/styles";
            </div>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Puzzle className="w-6 h-6 text-primary" />
          Framework Integration
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Standard */}
          <div className="p-6 bg-card border border-border rounded-xl flex flex-col">
            <h3 className="font-bold text-lg mb-2">Native (Zod + Standard)</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">
              Best for lightweight apps or projects avoiding extra dependencies.
            </p>
            <div className="bg-slate-950 text-slate-50 p-3 rounded-lg font-mono text-xs">
              {`<SchemaForm schema={schema} onSubmit={...} />`}
            </div>
          </div>

          {/* Formik */}
          <div className="p-6 bg-card border border-border rounded-xl flex flex-col">
            <h3 className="font-bold text-lg mb-2">Formik + Yup</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">
              Ideal for enterprise apps already invested in the Formik ecosystem.
            </p>
            <div className="bg-slate-950 text-slate-50 p-3 rounded-lg font-mono text-xs">
              {`<FormikSchemaForm validationLib="yup" ... />`}
            </div>
          </div>
        </div>
      </section>

      {/* Basic Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Code className="w-6 h-6 text-primary" />
          Basic Usage
        </h2>
        <div className="p-6 bg-card border border-border rounded-xl">
          <h3 className="font-semibold mb-4">Simple Contact Form</h3>
          <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-border">
            {`const contactSchema: FormSchema = {
  title: "Contact Us",
  fields: [
    {
      id: "name",
      name: "name",
      label: "Full Name",
      type: "text",
      validation: [
        { 
          type: "required" 
        }
      ],
      grid: { 
        colSpan: 12 
      }
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      validation: [
        { 
          type: "required" 
        }, 
        { 
          type: "email" 
        }
      ],
      grid: { 
        colSpan: 12 
      }
    }
  ]
};

export default function App() {
  return (
    <SchemaForm 
      schema={contactSchema} 
      onSubmit={console.log} 
    />
  );
}`}
          </div>
        </div>
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Layout className="w-6 h-6 text-primary" />
          API Reference
        </h2>

        {/* SchemaForm Props */}
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="p-4">Prop</th>
                <th className="p-4">Type</th>
                <th className="p-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              <tr>
                <td className="p-4 font-mono text-primary">schema</td>
                <td className="p-4 font-mono text-xs">FormSchema</td>
                <td className="p-4">The JSON schema definition (Required)</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-primary">onSubmit</td>
                <td className="p-4 font-mono text-xs">(values) =&gt; void</td>
                <td className="p-4">Submission handler (Required)</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-primary">onValidate</td>
                <td className="p-4 font-mono text-xs">(values) =&gt; errors</td>
                <td className="p-4">Custom cross-field validation</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-primary">debug</td>
                <td className="p-4 font-mono text-xs">boolean</td>
                <td className="p-4">Show live state debugger</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Theming */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" />
          Theming
        </h2>
        <div className="p-6 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground mb-4">
            Wrap your application in the{" "}
            <code className="bg-muted px-1 rounded">ThemeProvider</code> to enable dark mode and
            theme switching.
          </p>
          <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm border border-border">
            {`<ThemeProvider defaultTheme="system" storageKey="app-theme">
   <div className="min-h-screen bg-background text-foreground">
      <SchemaForm schema={schema} ... />
   </div>
</ThemeProvider>`}
          </div>
        </div>
      </section>
    </div>
  );
};
