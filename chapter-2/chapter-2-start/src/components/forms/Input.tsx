import React from 'react';

export interface InputProps {
  id: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  'aria-describedby'?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  'aria-describedby': ariaDescribedBy,
}) => {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow keyboard navigation
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={
          hasError
            ? `${errorId}${ariaDescribedBy ? ` ${ariaDescribedBy}` : ''}`
            : ariaDescribedBy
        }
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-offset-0
          transition-colors duration-200
          ${
            hasError
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
      />
      {hasError && (
        <p
          id={errorId}
          className="mt-1 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
