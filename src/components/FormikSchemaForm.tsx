import { useMemo } from "react";
import { useFormik } from "formik";
import type { FormSchema } from "../types/schema";
import {
  generateDefaultValues,
  generateZodSchema,
  checkVisibility,
  getByPath,
} from "../lib/schema-helpers";
import { generateYupSchema } from "../utils/yup-validation";
import { GridContainer, GridItem } from "./ui/Grid";
import { ThemeProvider, useFormTheme } from "./theme/ThemeContext";
import type { FormTheme } from "./theme/types";

// Components
import { TextInput } from "./ui/TextInput";
import { Textarea } from "./ui/Textarea";
import { Autocomplete } from "./ui/select/Autocomplete";

interface FormikSchemaFormProps {
  schema: FormSchema;
  onSubmit: (values: any) => void;
  initialValues?: any;
  validationLib?: "zod" | "yup";
  theme?: FormTheme;
}

export const FormikSchemaForm = ({
  schema,
  onSubmit,
  initialValues,
  validationLib = "zod",
  theme,
}: FormikSchemaFormProps) => {
  const validationSchema = useMemo(() => {
    if (validationLib === "yup") return generateYupSchema(schema);
    return generateZodSchema(schema);
  }, [schema, validationLib]);

  const formik = useFormik({
    initialValues: initialValues || generateDefaultValues(schema),
    validationSchema: validationLib === "yup" ? validationSchema : undefined,
    // Formik doesn't support Zod out of the box easily without a helper,
    // but for this example we'll assume Yup or manual validation
    validate: (values: any) => {
      if (validationLib === "zod") {
        const result = (validationSchema as any).safeParse(values);
        if (!result.success) {
          const errors: any = {};
          result.error.issues.forEach((issue: any) => {
            errors[issue.path.join(".")] = issue.message;
          });
          return errors;
        }
      }
      return {};
    },
    onSubmit,
  });

  const parentTheme = useFormTheme();
  const activeTheme = theme || parentTheme;

  return (
    <ThemeProvider value={activeTheme}>
      <form onSubmit={formik.handleSubmit}>
        <GridContainer>
          {schema.fields.map((field) => {
            const isVisible = checkVisibility(field, formik.values);
            if (!isVisible) return null;

            const commonProps = {
              id: field.name,
              label: field.label,
              value: getByPath(formik.values, field.name),
              onChange: (val: any) => formik.setFieldValue(field.name, val),
              onBlur: formik.handleBlur,
              error: (formik.errors as any)[field.name],
              required: field.validation?.some((r) => r.type === "required"),
              fullWidth: true,
            };

            return (
              <GridItem key={field.id} colSpan={field.grid?.colSpan || 12}>
                {field.type === "text" && <TextInput {...commonProps} />}
                {field.type === "textarea" && <Textarea {...commonProps} />}
                {field.type === "select" && (
                  <Autocomplete {...commonProps} options={field.options || []} />
                )}
                {/* Add other field types as needed */}
              </GridItem>
            );
          })}
        </GridContainer>
        <button type="submit" className="mt-4 px-4 py-2 bg-primary text-white rounded">
          Submit
        </button>
      </form>
    </ThemeProvider>
  );
};
