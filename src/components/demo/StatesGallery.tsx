import { TextInput } from "../ui/TextInput";
import { Textarea } from "../ui/Textarea";
import { Autocomplete } from "../ui/select/Autocomplete";
import { FileInput } from "../ui/FileInput";
import { Checkbox } from "../ui/Checkbox";
import { Switch } from "../ui/Switch";
import { RadioGroup } from "../ui/RadioGroup";
import { DatePicker, TimePicker, DateTimePicker, DateRangePicker } from "../ui/date";

export const StatesGallery = () => {
  const sampleDate = new Date(2024, 0, 12);
  const sampleRange = {
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 10),
  };
  const sampleOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  const categories = [
    {
      title: "Text & Multi-line",
      components: [
        { name: "TextInput", component: TextInput, props: {}, type: "text" },
        {
          name: "Textarea",
          component: Textarea,
          props: { rows: 2 },
          type: "text",
        },
      ],
    },
    {
      title: "Selection & Search",
      components: [
        {
          name: "Autocomplete (Single)",
          component: Autocomplete,
          props: { options: sampleOptions },
          type: "select",
        },
        {
          name: "Autocomplete (Multi)",
          component: Autocomplete,
          props: { options: sampleOptions, multiple: true },
          type: "select",
        },
        {
          name: "RadioGroup (V)",
          component: RadioGroup,
          props: {
            options: sampleOptions,
            name: "demo-radio-v",
            direction: "vertical",
          },
          type: "select",
        },
        {
          name: "RadioGroup (H)",
          component: RadioGroup,
          props: {
            options: sampleOptions,
            name: "demo-radio-h",
            direction: "horizontal",
          },
          type: "select",
        },
      ],
    },
    {
      title: "Boolean & Status",
      components: [
        { name: "Checkbox", component: Checkbox, props: {}, type: "boolean" },
        { name: "Switch", component: Switch, props: {}, type: "boolean" },
      ],
    },
    {
      title: "Date & Time",
      components: [
        {
          name: "DatePicker",
          component: DatePicker,
          props: {},
          type: "date",
        },
        {
          name: "TimePicker",
          component: TimePicker,
          props: {},
          type: "date",
        },
        {
          name: "DateTimePicker",
          component: DateTimePicker,
          props: {},
          type: "date",
        },
        {
          name: "DateRangePicker",
          component: DateRangePicker,
          props: {},
          type: "date",
        },
        {
          name: "DateRangePicker (Time)",
          component: DateRangePicker,
          props: { showTime: true, format: "dd/MM/yyyy HH:mm" },
          type: "date",
        },
      ],
    },
    {
      title: "File Inputs",
      components: [{ name: "FileInput", component: FileInput, props: {}, type: "file" }],
    },
  ];

  const allStates = [
    {
      label: "Empty",
      props: {},
      applicableTo: ["text", "select", "boolean", "date", "file"],
    },
    {
      label: "With Value",
      props: {},
      applicableTo: ["text", "select", "boolean", "date", "file"],
    },
    {
      label: "Clearable",
      props: { clearable: true },
      applicableTo: ["text", "select", "date"],
    },
    {
      label: "With Pattern (Alphabets)",
      props: { pattern: "^[A-Za-z]+$", restrictInput: true },
      applicableTo: ["text"], // Only text inputs
    },
    {
      label: "Disabled Empty",
      props: { disabled: true },
      applicableTo: ["text", "select", "boolean", "date", "file"],
    },
    {
      label: "Disabled with Value",
      props: { disabled: true },
      applicableTo: ["text", "select", "boolean", "date", "file"],
    },
    {
      label: "With Error",
      props: { error: "Validation failed" },
      applicableTo: ["text", "select", "boolean", "date", "file"],
    },
  ];

  // Helper function to filter states based on component type
  const getApplicableStates = (componentType: string) => {
    return allStates.filter((state) => state.applicableTo.includes(componentType));
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800">
        <h1 className="text-2xl font-bold text-primary-950 dark:text-primary-50">
          System Audit: Input States
        </h1>
        <p className="text-sm text-primary-800 dark:text-primary-300 mt-1">
          Comprehensive matrix to verify notch behavior, label floating, and disabled states across
          all component variants.
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat.title}>
          <h2 className="text-xl font-bold mb-6 border-b pb-2 text-primary-600 dark:text-primary-400">
            {cat.title}
          </h2>
          <div className="space-y-8">
            {cat.components.map((comp) => {
              const applicableStates = getApplicableStates(comp.type);

              return (
                <div
                  key={comp.name}
                  className="bg-surface-50 dark:bg-surface-900/50 p-6 rounded-xl border border-border"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-6 italic">
                    Component: {comp.name}
                  </h3>
                  {/* Responsive Grid: 4 cols desktop, 2 cols tablet, 1 col mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {applicableStates.map((state) => {
                      const Component = comp.component as any;

                      // Construct props with type safety bypass for the gallery matrix
                      const finalProps: any = {
                        ...comp.props,
                        ...state.props,
                        label: state.label,
                        id: `${comp.name}-${state.label}`.replace(/\s+/g, "-").toLowerCase(),
                        onChange: () => {}, // Suppress React warnings for uncontrolled components with value
                        readOnly: true, // Semantic correctness for a gallery
                      };

                      if (
                        state.label.includes("Value") ||
                        state.label === "Clearable" ||
                        state.label.includes("Pattern")
                      ) {
                        if (comp.name.includes("Date") || comp.name.includes("Time")) {
                          if (comp.name === "DateRangePicker") finalProps.value = sampleRange;
                          else finalProps.value = sampleDate;
                        } else if (comp.name.includes("Autocomplete")) {
                          if ("multiple" in finalProps && finalProps.multiple)
                            finalProps.value = ["1"];
                          else finalProps.value = "1";
                        } else if (comp.name.includes("RadioGroup")) {
                          finalProps.value = "1";
                        } else if (comp.name === "Checkbox" || comp.name === "Switch") {
                          finalProps.checked = true;
                        } else if (comp.name === "FileInput") {
                          finalProps.value = { name: "sample-document.pdf" };
                        } else {
                          // For pattern state, use alphabets-only content
                          if (state.label.includes("Pattern")) {
                            finalProps.value = "HelloWorld";
                          } else {
                            finalProps.value = "Sample Content";
                          }
                        }
                      } else if (state.label === "With Error") {
                        // Ensure Date/Time components get a valid Date even in error state
                        if (comp.name.includes("Date") || comp.name.includes("Time")) {
                          if (comp.name === "DateRangePicker") finalProps.value = sampleRange;
                          else finalProps.value = sampleDate;
                        } else if (comp.name === "FileInput") {
                          finalProps.value = { name: "invalid-file.txt" };
                        } else {
                          finalProps.value = "Invalid input";
                        }
                      } else if (state.label.includes("Empty")) {
                        // Ensure predictable empty values
                        if (comp.name === "DateRangePicker") {
                          finalProps.value = { start: null, end: null };
                        } else if (comp.name.includes("Autocomplete") && finalProps.multiple) {
                          finalProps.value = [];
                        } else if (comp.name === "Checkbox" || comp.name === "Switch") {
                          finalProps.checked = false;
                          finalProps.value = undefined; // Boolean fields use checked
                        } else if (
                          comp.name.includes("Date") ||
                          comp.name.includes("Time") ||
                          comp.name === "FileInput"
                        ) {
                          finalProps.value = null;
                        } else {
                          finalProps.value = ""; // Text fields use empty string
                        }
                      }

                      return (
                        <div key={state.label} className="space-y-1">
                          <Component {...finalProps} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
