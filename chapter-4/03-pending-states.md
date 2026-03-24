# Step 3: Handling Pending States

When a user submits the form, they typically have to wait a second or two for the Server Action to finish processing. During this time, they might click the "Submit" button multiple times, or wonder if the application is broken.

React 19 gives us `useFormStatus` to gracefully handle the "pending" state of a form and improve our User Experience (UX).

## 1. Create a Submit Button Component

Because `useFormStatus` tracks the status of the closest parent `<form>`, we must extract the submit button into a separate component so that `useFormStatus` is called *inside* the form contexts.

Create a new file `src/components/SubmitButton.tsx`:

```tsx
'use client';

import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  label: string;
  loadingLabel: string;
}

export default function SubmitButton({ label, loadingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center
        ${pending 
          ? 'bg-blue-400 cursor-not-allowed text-white/80' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`
      }
    >
      {pending && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {pending ? loadingLabel : label}
    </button>
  );
}
```

## 2. Update BookingForm

Now replace the standard `<button>` in your `BookingForm.tsx` with the new `SubmitButton`.

```tsx
// src/components/BookingForm.tsx
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormData } from '@/lib/schemas';
import { submitBooking } from '../app/actions/booking';
import SubmitButton from './SubmitButton';

// ...

export default function BookingForm({ eventId }: { eventId: string }) {
  // ... previous setup ...

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
      {/* ... */}
      
      <form action={formAction} className="space-y-4">
        {/* ... inputs ... */}
        
        <SubmitButton 
          label="Confirm Booking" 
          loadingLabel="Processing..." 
        />
      </form>
    </div>
  );
}
```

Try submitting the form again - you should now see a spinner and the text change to "Processing...". The button is also safely disabled to prevent duplicate submissions.