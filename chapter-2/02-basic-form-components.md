# Chapter 2: Basic Form Components

This chapter introduces reusable form components with TypeScript, accessibility features, and Tailwind CSS styling. You'll build the foundation for a production-ready event registration form.

## Learning Outcomes

By the end of this chapter, you will:
- Create isolated, reusable form components (Input, Select, Textarea, Checkbox)
- Implement TypeScript interfaces for type-safe props
- Add accessibility attributes (ARIA labels, keyboard navigation, error states)
- Style components consistently with Tailwind CSS
- Write unit tests for component behavior
- Create Storybook stories for visual testing

## Prerequisites

- Completed Chapter 1 (Next.js setup, Storybook, Vitest, Playwright)
- Understanding of React functional components
- Basic TypeScript knowledge

## Overview

Form components are the building blocks of user interfaces. This chapter focuses on creating four essential form components that follow enterprise best practices:

1. **Input**: Text, email, phone, and number inputs
2. **Select**: Dropdown selection
3. **Textarea**: Multi-line text input
4. **Checkbox**: Boolean selection

Each component includes:
- TypeScript prop interfaces for type safety
- Accessibility attributes (ARIA labels, roles, keyboard navigation)
- Error state handling with visual feedback
- Consistent Tailwind CSS styling
- Keyboard navigation support (Escape to blur)

## Component Architecture

All form components follow a consistent pattern:

```typescript
interface ComponentProps {
  id: string;              // Unique identifier
  name: string;            // Form field name
  label: string;           // Visible label text
  value: string;           // Current value
  onChange: (value) => void; // Change handler
  error?: string;          // Optional error message
  required?: boolean;      // Optional required flag
  // Component-specific props...
}
```

### Common Features

**Error Handling:**
- Error messages display below the field
- Red border and focus ring when error exists
- ARIA attributes link error to field (`aria-describedby`, `aria-invalid`)
- Error messages use `role="alert"` and `aria-live="polite"`

**Accessibility:**
- Labels properly associated with inputs (`htmlFor` and `id`)
- Required fields marked with asterisk and `aria-required`
- Keyboard navigation support (Escape key to blur)
- Focus states with visible ring

**Styling:**
- Tailwind CSS utility classes
- Consistent spacing and sizing
- Blue focus ring for valid fields
- Red focus ring for error fields
- Disabled state styling

## Implementation

### 1. Input Component

Create `src/components/forms/Input.tsx`:

```typescript
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
```

**Key Features:**
- Supports text, email, tel, and number input types
- Optional `aria-describedby` prop for additional descriptions
- Escape key blurs the input
- Error state changes border and focus ring color

### 2. Select Component

Create `src/components/forms/Select.tsx`:

```typescript
import React from 'react';

export interface SelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder,
}) => {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
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
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
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
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
```

**Key Features:**
- Options array with value/label pairs
- Optional placeholder as disabled first option
- Same error handling and styling as Input

### 3. Textarea Component

Create `src/components/forms/Textarea.tsx`:

```typescript
import React from 'react';

export interface TextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  rows = 4,
}) => {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-offset-0
          transition-colors duration-200
          resize-vertical
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
```

**Key Features:**
- Configurable rows (default 4)
- Vertical resize only (`resize-vertical`)
- Multi-line text input

### 4. Checkbox Component

Create `src/components/forms/Checkbox.tsx`:

```typescript
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
```

**Key Features:**
- Uses `checked` prop instead of `value`
- onChange receives boolean instead of string
- Flexbox layout with checkbox and label side-by-side
- Label is clickable (cursor-pointer)

## Testing

### Unit Tests

Create `src/components/forms/Input.test.tsx`:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders with label and value', () => {
    render(
      <Input
        id="test-input"
        name="test"
        label="Test Label"
        value="test value"
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Input
        id="test-input"
        name="test"
        label="Test Label"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Test Label');
    await user.type(input, 'hello');

    expect(handleChange).toHaveBeenCalledTimes(5); // Once per character
  });

  it('displays error message when error prop is provided', () => {
    render(
      <Input
        id="test-input"
        name="test"
        label="Test Label"
        value=""
        onChange={() => {}}
        error="This field is required"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(
      <Input
        id="test-input"
        name="test"
        label="Test Label"
        value=""
        onChange={() => {}}
        required
      />
    );

    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('blurs input when Escape key is pressed', async () => {
    const user = userEvent.setup();

    render(
      <Input
        id="test-input"
        name="test"
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText('Test Label');
    await user.click(input);
    expect(input).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(input).not.toHaveFocus();
  });
});
```

**Test Coverage:**
- Component rendering with props
- User interaction (typing, clicking)
- Error state display
- Required field indicator
- Keyboard navigation (Escape key)

Similar tests should be created for Select, Textarea, and Checkbox components.

### Storybook Stories

Create `src/components/forms/Input.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'tel', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Wrapper component to handle state
const InputWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return <Input {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    id: 'default-input',
    name: 'default',
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    id: 'value-input',
    name: 'value',
    label: 'Input with Value',
    value: 'Pre-filled value',
  },
};

export const Required: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    id: 'required-input',
    name: 'required',
    label: 'Required Input',
    required: true,
    placeholder: 'This field is required',
  },
};

export const WithError: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    id: 'error-input',
    name: 'error',
    label: 'Input with Error',
    error: 'This field is required',
  },
};

export const Email: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    id: 'email-input',
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
};

export const Phone: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    id: 'phone-input',
    name: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
  },
};
```

**Story Coverage:**
- Default state
- Pre-filled value
- Required field
- Error state
- Different input types (email, phone)

Run Storybook to view components:

```bash
pnpm storybook
```

## Usage Example

Here's how to use these components in a form:

```typescript
import { useState } from 'react';
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { Textarea } from '@/components/forms/Textarea';
import { Checkbox } from '@/components/forms/Checkbox';

export default function ExampleForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event: '',
    notes: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const eventOptions = [
    { value: 'conference', label: 'Annual Conference' },
    { value: 'workshop', label: 'Technical Workshop' },
    { value: 'meetup', label: 'Community Meetup' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation and submission logic
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6">
      <Input
        id="name"
        name="name"
        label="Full Name"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
        error={errors.name}
        required
        placeholder="John Doe"
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        error={errors.email}
        required
        placeholder="john@example.com"
      />

      <Select
        id="event"
        name="event"
        label="Select Event"
        value={formData.event}
        onChange={(value) => setFormData({ ...formData, event: value })}
        options={eventOptions}
        error={errors.event}
        required
        placeholder="Choose an event..."
      />

      <Textarea
        id="notes"
        name="notes"
        label="Additional Notes"
        value={formData.notes}
        onChange={(value) => setFormData({ ...formData, notes: value })}
        placeholder="Any special requirements or questions?"
        rows={4}
      />

      <Checkbox
        id="terms"
        name="terms"
        label="I agree to the terms and conditions"
        checked={formData.agreeToTerms}
        onChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
        error={errors.terms}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
}
```

## Running Tests

Run unit tests:

```bash
pnpm test
```

Run tests in watch mode during development:

```bash
pnpm test -- --watch
```

## Summary

You've created four reusable form components with:
- ✅ TypeScript interfaces for type safety
- ✅ Accessibility attributes (ARIA labels, keyboard navigation)
- ✅ Error state handling
- ✅ Consistent Tailwind CSS styling
- ✅ Unit tests for behavior verification
- ✅ Storybook stories for visual testing

These components form the foundation for the multi-step registration form you'll build in upcoming chapters.

## Next Steps

In Chapter 3, you'll add form validation logic to these components, including:
- Client-side validation rules
- Error message generation
- Field-level and form-level validation
- Validation helper functions

The components you built in this chapter will integrate seamlessly with the validation system.
