# Step 1: Server Actions

Server Actions are a feature in Next.js that allows you to execute asynchronous code directly on the server without having to manually create an API endpoint. This is perfect for form submissions and data mutations.

## 1. Create a Server Action

Let's create a server action to handle our event booking submissions.

1.  Create a folder `src/app/actions` to keep your actions organized.
2.  Inside `src/app/actions`, create a file named `booking.ts`.

Add the following code to `booking.ts`:

```typescript
'use server';

export async function submitBooking(prevState: any, formData: FormData) {
  // We use 'use server' at the top of the file to mark all exported functions as Server Actions.
  // The first argument 'prevState' is required when using useActionState, followed by the actual FormData.
  
  const name = formData.get('name');
  const email = formData.get('email');
  const eventId = formData.get('eventId');
  
  // Simulate network delay and processing
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  console.log(`Booking received for ${name} (${email}) for event ${eventId}`);
  
  if (!name || !email || !eventId) {
    return {
      success: false,
      message: 'All fields are required.'
    };
  }
  
  return {
    success: true,
    message: 'Booking successfully created!'
  };
}
```

## 2. Using the Server Action in a Form

Now, let's create a booking form component that uses this server action.

1.  Create a new file `src/components/BookingForm.tsx`.

```tsx
'use client';

import { submitBooking } from '../app/actions/booking';
import { useActionState } from 'react';

// Initial state for useActionState
const initialState = {
  success: false,
  message: '',
};

export default function BookingForm({ eventId }: { eventId: string }) {
  const [state, formAction] = useActionState(submitBooking as any, initialState);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Book your ticket</h3>
      
      {state?.message && (
        <div className={`p-3 mb-4 rounded ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {state.message}
        </div>
      )}
      
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="eventId" value={eventId} />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
          />
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

## 3. Add the Form to the Event Details Page

Now, let's include our `BookingForm` on the individual event page. Update your `src/app/events/[eventId]/page.tsx` file to render the form:

```tsx
// src/app/events/[eventId]/page.tsx
import BookingForm from '@/components/BookingForm';
// ... existing imports ...

export default async function EventDetailsPage({ params }: Props) {
  const { eventId } = await params;
  
  // ... existing fetch logic ...
  
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      {/* ... existing event details ... */}
      
      <BookingForm eventId={eventId} />
    </main>
  );
}
```

When you enter your details and submit the form, next.js will call your Server Action. You can check your application terminal to see the `console.log` from the server action outputting the booking details!
