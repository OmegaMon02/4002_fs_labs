import { useState, type FormEvent } from 'react';

export type FormSubmissionResult<TData, TField extends string> =
  | { success: true; data: TData }
  | { success: false; errors: Partial<Record<TField, string>> };

export function useForm<
  TValues extends object,
  TData,
  TField extends string,
>(
  initialValues: TValues,
  submitAction: (values: TValues) => FormSubmissionResult<TData, TField>,
) {
  const [values, setValues] = useState<TValues>({ ...initialValues });
  const [errors, setErrors] = useState<Partial<Record<TField, string>>>({});

  function setField<K extends keyof TValues>(field: K, value: TValues[K]): void {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setErrors({});
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): TData | undefined {
    event.preventDefault();
    const result = submitAction(values);
    if (!result.success) {
      setErrors(result.errors);
      return undefined;
    }

    setErrors({});
    setValues({ ...initialValues });
    return result.data;
  }

  function reset(): void {
    setValues({ ...initialValues });
    setErrors({});
  }

  return { values, errors, setField, handleSubmit, reset };
}