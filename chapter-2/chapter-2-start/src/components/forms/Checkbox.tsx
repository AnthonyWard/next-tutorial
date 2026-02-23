import React from 'react';

export interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  error,
}) => {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow keyboard navigation
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`
              w-4 h-4 border rounded
              focus:outline-none focus:ring-2 focus:ring-offset-0
              transition-colors duration-200
              ${
                hasError
                  ? 'border-red-500 focus:ring-red-500 text-red-600'
                  : 'border-gray-300 focus:ring-blue-500 text-blue-600'
              }
              disabled:bg-gray-100 disabled:cursor-not-allowed
            `}
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor={id}
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            {label}
          </label>
        </div>
      </div>
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
