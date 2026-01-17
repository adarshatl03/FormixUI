import { useState, useCallback, useMemo } from "react";
import type { FormSchema, FieldSchema } from "@/types/schema";
import { GridContainer } from "@/components/layout/GridContainer";
import { GridItem } from "@/components/layout/GridItem";
import { TextInput } from "@/components/ui/TextInput";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { generateZodSchema } from "@/utils/validation";
import { evaluateVisibility } from "@/utils/dependencies";
import { z } from "zod";

interface FormRendererProps {
  schema: FormSchema;
  initialData?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>) => void;
  className?: string;
}

export const FormRenderer = ({
  schema,
  initialData = {},
  onSubmit,
  className = "",
}: FormRendererProps) => {
  // Hydrate defaults once
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = { ...initialData };
    schema.fields.forEach((field) => {
      if (
        defaults[field.name] === undefined &&
        field.defaultValue !== undefined
      ) {
        defaults[field.name] = field.defaultValue;
      }
    });
    return defaults;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Memoized Zod schema (important)
  const zodSchema = useMemo(() => generateZodSchema(schema), [schema]);

  // ✅ Field-level validation
  const validateField = useCallback(
    (name: string, value: unknown) => {
      try {
        const fieldValidator =
          zodSchema.shape[name as keyof typeof zodSchema.shape];

        if (fieldValidator) {
          fieldValidator.parse(value);
        }

        return null;
      } catch (err) {
        if (err instanceof z.ZodError) {
          return err.issues[0].message;
        }
        return "Invalid value";
      }
    },
    [zodSchema]
  );

  // ✅ Stable change handler
  const handleChange = useCallback(
    (name: string, value: unknown) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      const error = validateField(name, value);

      setErrors((prev) => {
        const next = { ...prev };
        if (error) next[name] = error;
        else delete next[name];
        return next;
      });
    },
    [validateField]
  );

  // ✅ Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validData = zodSchema.parse(formData);
      setErrors({});
      onSubmit?.(validData);
      console.log("Submitted:", validData);
      alert("Form submitted successfully");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  // ✅ Memoized field renderer
  const renderField = useCallback(
    (field: FieldSchema) => {
      const isVisible = evaluateVisibility(field, formData);
      if (!isVisible) return null;

      const isRequired = field.validation?.some((v) => v.type === "required");

      const commonProps = {
        id: field.id,
        label: field.label,
        value:
          field.type === "file" ? undefined : (formData[field.name] as string) || "",
        onChange: (
          e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        ) => {
          const value =
            field.type === "file"
              ? (e.target as HTMLInputElement).files
              : e.target.value;

          handleChange(field.name, value);
        },
        error: errors[field.name],
        required: isRequired,
        disabled: field.disabled,
        readOnly: field.readOnly,
        placeholder: field.placeholder,
        startAdornment: field.startAdornment,
        endAdornment: field.endAdornment,
        accept: field.accept,
        multiple: field.multiple,
      };

      let component = null;

      switch (field.type) {
        case "text":
        case "email":
        case "url":
        case "tel":
        case "password":
        case "number":
        case "file":
          component = <TextInput type={field.type} {...commonProps} />;
          break;

        case "textarea":
          component = <Textarea rows={field.rows} {...commonProps} />;
          break;

        case "select":
          component = <Select options={field.options} {...commonProps} />;
          break;

        default:
          component = <TextInput {...commonProps} />;
      }

      return (
        <GridItem key={field.id} colSpan={field.grid?.colSpan || 12}>
          {component}
        </GridItem>
      );
    },
    [formData, errors, handleChange]
  );

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <GridContainer>
        {schema.fields.map((field) => renderField(field))}
      </GridContainer>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Submit Form
        </button>
      </div>
    </form>
  );
};
