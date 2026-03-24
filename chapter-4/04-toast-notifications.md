# Step 4: Toast Notifications

An application needs to alert a user to successful or failed operations clearly without taking up permanent vertical space on the form itself. A "Toast" notification pattern serves exactly this purpose.

For this tutorial, we will use `react-hot-toast` to handle notifications.

## 1. Install react-hot-toast

```bash
pnpm add react-hot-toast
```

## 2. Set Up the Toaster Provider

To use toast notifications, we need a "Toaster" component rendered high up in our application component tree.

Modify your Root Layout in `src/app/layout.tsx`:

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

// ... metadata ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
```

## 3. Trigger Toasts in the BookingForm

Finally, let's update our `BookingForm.tsx` to pop a toast notification when our Server Action returns success or failure states.

```tsx
// src/components/BookingForm.tsx
// ... imports ...
import toast from 'react-hot-toast';

// ...

export default function BookingForm({ eventId }: { eventId: string }) {
  const [state, formAction] = useActionState(submitBooking, initialState);
  
  // ... react hook form setup ...

  // Update effect to use react-hot-toast
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      reset(); // clear the form inputs
    } else if (state?.message && !state?.success) {
      toast.error(state.message);
    }
  }, [state, reset]);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
      <h3 className="text-xl font-semibold mb-4">Book your ticket</h3>
      
      {/* We removed the static inline success/error messages in favor of toast */}
      
      <form action={formAction} className="space-y-4">
       {/* ... the rest is unchanged ... */}
      </form>
    </div>
  );
}
```

Now, when you submit your form and everything successfully validates, you'll see a clean toast notification pop up in the corner of your screen!