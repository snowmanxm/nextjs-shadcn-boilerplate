'use client';

import { type ComponentProps, useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui';

interface DebouncedInputProps extends Omit<
  ComponentProps<typeof Input>,
  'defaultValue' | 'onChange' | 'value'
> {
  delay?: number;
  onDebouncedChange: (value: string) => void;
  value: string;
}

export function DebouncedInput({
  delay = 800,
  onDebouncedChange,
  value,
  ...props
}: DebouncedInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const onDebouncedChangeRef = useRef(onDebouncedChange);

  useEffect(() => {
    onDebouncedChangeRef.current = onDebouncedChange;
  }, [onDebouncedChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue === value) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onDebouncedChangeRef.current(inputValue);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, inputValue, value]);

  return (
    <Input {...props} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
  );
}
