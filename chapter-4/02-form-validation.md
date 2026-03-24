# Step 2: Form Validation with Zod & React Hook Form

While browser-native validation (`required`, `type="email"`) is helpful, for a production application, we need robust parsing and error handling, especially when interacting with Server Actions. 

Zod gives us schema validation, and React Hook Form (RHF) helps us manage form state efficiently without re-rendering the whole page.

## 1. Install Dependencies

First, let's install the tools we need: `zod`, `react-hook-form`, and the RHF hook resolvers bundle:

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

## 2. Define the Zod Schema

Let's define a schema that validates our form submission. We can put this in a shared location since both the client and server can use it.

1. Create a `src/lib/schemas.ts` file.

```typescript
import { z } from 'zod';

export const bookingSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Please enter a valid email address'),
});

// Infer the TypeScript type from the schema
export type BookingFormData = z.infer<typeof bookingSchema>;
```

## 3. Update the Server Action to use Zod

Next, let's update our Server Action in `src/app/actions/booking.ts` to validate the incoming data securely using our new schema.

```typescript
// src/app/actions/booking.ts
'use server';

import { bookingSchema } from '@/lib/schemas'; // <-- Add import

export async function submitBooking(prevState: any, formData: FormData) {
  // Parse the formData against our schema
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    eventId: formData.get('eventId'),
  };
  
  const validatedFields = bookingSchema.safeParse(rawData);
  
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { name, email, eventId } = validatedFields.data;
  
  // ... Keep existing simulate network delay & logging ...
  
  return {
    success: true,
    message: 'Booking successfully confirmed!',
    errors: {}, // <-- Add empty errors to success state
  };
}
```

## 4. Integrate React Hook Form on the Client

Now, we'll refactor our `BookingForm.tsx` to use `react-hook-form` and display the validation errors returned by Zod appropriately. 

Update `src/components/BookingForm.tsx`:

```tsx
// src/components/BookingForm.tsx
'use client';

import { useActionState, useEffect } from 'react'; // <-- Add useEffect
import { useForm } from 'react-hook-form'; // <-- Add imports
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormData } from '@/lib/schemas';
import { submitBooking } from '../app/actions/booking';

const initialState = {
  success: false,
  message: '',
  errors: {}, // <-- Add errors to initial state
};

export default function BookingForm({ eventId }: { eventId: string }) {
  const [state, formAction] = useActionState(submitBooking as any, initialState);
  
  // <-- Add useForm initialization
  const {
    register,
    reset,
    formState: { errors: clientErrors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventId,
      name: '',
      email: '',
    },
  });

  // <-- Add useEffect to reset form on success
  useEffect(() => {
    if (state?.success) {
      reset();
    }
  }, [state, reset]);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Book your ticket</h3>
      
      {state?.message && !state?.success && (
        <div className="p-3 mb-4 rounded bg-red-100 text-red-800">
          {state.message}
        </div>
      )}
      
      {state?.success && (
        <div className="p-3 mb-4 rounded bg-green-100 text-green-800">
          {state.message}
        </div>
      )}
      
      <form action={formAction} className="space-y-4">
        {/* Replace your inputs with {...register('field')} and add error messages */}
        <input type="hidden" {...register('eventId')} />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 border-gray-700">Name</label>
          <input 
            type="text" 
            id="name" 
            {...register('name')}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black border-gray-300" 
          />
          {clientErrors.name && (
            <p className="mt-1 text-sm text-red-600">{clientErrors.name.message}</p>
          )}
          {state?.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
          )}
        </div>
        
        {/* Do the same for email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            {...register('email')}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black border-gray-300" 
          />
          {clientErrors.email && (
            <p className="mt-1 text-sm text-red-600">{clientErrors.email.message}</p>
          )}
          {state?.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
          )}
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
```

Now, if you try submitting an empty form or invalid email address, the validation step occurs instantaneously before reaching the server!