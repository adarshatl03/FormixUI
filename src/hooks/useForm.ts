import { useState, useCallback } from "react";

/**
 * useForm Hook
 * Strictly keeps state FLAT (keys can contain dots like "account.username")
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
  validate: externalValidate,
  mode = "onSubmit",
}: {
  initialValues: T;
  schema?: any; // Generic schema support (Zod, Yup, etc.)
  onSubmit?: (values: T) => void;
  validate?: (values: T) => Record<string, string>;
  mode?: "onSubmit" | "onChange" | "onBlur";
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Validate entire form
  const validate = useCallback(
    (valuesToValidate: any) => {
      const newErrors: Record<string, string> = {};

      // 1. Zod Validation
      if (schema && typeof schema.safeParse === "function") {
        try {
          const result = schema.safeParse(valuesToValidate);
          if (!result.success) {
            result.error.issues.forEach((err: any) => {
              const path = err.path.join(".");
              if (!newErrors[path]) {
                newErrors[path] = err.message;
              }
            });
          }
        } catch (err) {
          console.error("Zod Parsing Error:", err);
        }
      }

      // 2. Yup Validation
      if (schema && typeof schema.validateSync === "function") {
        try {
          schema.validateSync(valuesToValidate, { abortEarly: false });
        } catch (err: any) {
          if (err.inner) {
            err.inner.forEach((error: any) => {
              if (error.path && !newErrors[error.path]) {
                newErrors[error.path] = error.message;
              }
            });
          }
        }
      }

      // 2. External Validation
      if (externalValidate) {
        try {
          const extErrors = externalValidate(valuesToValidate);
          if (extErrors) {
            Object.assign(newErrors, extErrors);
          }
        } catch (err) {
          console.error("External Validation Error:", err);
        }
      }

      return newErrors;
    },
    [schema, externalValidate]
  );

  const setFieldValue = useCallback(
    (path: string, value: any, shouldValidate = false) => {
      setValues((prev) => {
        const next = { ...prev, [path]: value };

        if ((mode === "onChange" || shouldValidate) && schema) {
          const validationErrors = validate(next);
          setErrors(validationErrors);
        }

        return next;
      });

      if (!touched[path]) {
        setTouched((prev) => ({ ...prev, [path]: true }));
      }
    },
    [mode, schema, validate, touched]
  );

  const handleBlur = useCallback(
    (path: string) => {
      setTouched((prev) => ({ ...prev, [path]: true }));
      if (mode === "onBlur" || mode === "onChange") {
        const validationErrors = validate(values);
        setErrors(validationErrors);
      }
    },
    [mode, validate, values]
  );

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      console.log("--- SUBMIT TRIGGERED ---");
      setIsSubmitting(true);
      setSubmitCount((prev) => prev + 1);

      const validationErrors = validate(values);
      setErrors(validationErrors);

      // Force touch all fields that have errors
      const allTouched: Record<string, boolean> = { ...touched };
      Object.keys(validationErrors).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      if (Object.keys(validationErrors).length === 0) {
        onSubmit?.(values);
      } else {
        console.warn("Submit blocked by validation errors:", validationErrors);
      }
      setIsSubmitting(false);
    },
    [validate, values, onSubmit, touched]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitCount(0);
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setFieldValue,
    reset,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isSubmitted: submitCount > 0,
    register: (path: string) => ({
      value: values[path],
      onChange: (val: any) => setFieldValue(path, val),
      onBlur: () => handleBlur(path),
      error: errors[path],
      name: path,
    }),
  };
}
