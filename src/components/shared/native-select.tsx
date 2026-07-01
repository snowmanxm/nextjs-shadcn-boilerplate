'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

type NativeSelectOption = string | { label: string; value: string };

interface NativeSelectProps {
  className?: string;
  disabled?: boolean;
  id: string;
  onChange: (value: string) => void;
  options: NativeSelectOption[];
  placeholder?: string;
  value: string;
}

export function NativeSelect({
  className = 'w-20',
  disabled = false,
  id,
  onChange,
  options,
  placeholder,
  value,
}: NativeSelectProps) {
  const normalizedOptions = options.map((item) =>
    typeof item === 'string' ? { label: item, value: item } : item,
  );
  const selectedOption = normalizedOptions.find((option) => option.value === value);

  return (
    <Select
      disabled={disabled}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue) {
          onChange(nextValue);
        }
      }}
    >
      <SelectTrigger id={id} className={className} size="sm">
        <SelectValue>{selectedOption?.label ?? placeholder}</SelectValue>
      </SelectTrigger>
      <SelectContent className="min-w-20" alignItemWithTrigger>
        {normalizedOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
