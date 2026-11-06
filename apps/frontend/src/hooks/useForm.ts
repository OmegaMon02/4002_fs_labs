import { useState, type FormEvent } from 'react';

export type FormSubmissionResult<TData, TField extends string> =
  | { success: true; data: TData }
  | { success: false; errors: Partial<Record<TField, string>>; message?: string };

export function useForm<
  TValues extends object,
  TData,
  TField extends string,
>(
  initialValues: TValues,
  submitAction: (values: TValues) => FormSubmissionResult<TData, TField> | Promise<FormSubmissionResult<TData, TField>>,
) {
  const [values, setValues] = useState<TValues>({ ...initialValues });
  const [errors, setErrors] = useState<Partial<Record<TField, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function setField<K extends keyof TValues>(field: K, value: TValues[K]): void {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setErrors({});
    setSubmitError('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<TData | undefined> {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const result = await submitAction(values);
      if (!result.success) {
        setErrors(result.errors);
        setSubmitError(result.message ?? '');
        return undefined;
      }

      setErrors({});
      setValues({ ...initialValues });
      return result.data;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'The request could not be completed.');
      return undefined;
    } finally {
      setIsSubmitting(false);
    }
  }

  function reset(): void {
    setValues({ ...initialValues });
    setErrors({});
  }

  return { values, errors, isSubmitting, submitError, setField, handleSubmit, reset };
}