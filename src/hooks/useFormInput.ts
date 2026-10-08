import { useState } from 'react';

export interface FormInput<T> {
  value: T;
  setValue: (value: T) => void;
  messages: string[];
  validate: (callback: (value: T) => string[]) => string[];
  reset: () => void;
}

export function useFormInput<T>(initialValue: T): FormInput<T> {
  const [value, setValue] = useState(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  function validate(callback: (currentValue: T) => string[]): string[] {
    const validationMessages = callback(value);
    setMessages(validationMessages);
    return validationMessages;
  }

  function reset(): void {
    setValue(initialValue);
    setMessages([]);
  }

  return { value, setValue, messages, validate, reset };
}