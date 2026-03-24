'use client';
import { useActionState, useEffect } from 'react'; // <-- Add useEffect
import { useForm } from 'react-hook-form'; // <-- Add imports
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormData } from '@/lib/schemas';
import { submitBooking } from '../app/actions/booking';
import SubmitButton from './SubmitButton';
import toast from 'react-hot-toast';

// Initial state for useActionState
const initialState = {
  success: false,
  message: '',
  errors: {},
};

export default function BookingForm({ eventId }: { eventId: string }) {
  const [state, formAction] = useActionState(submitBooking as any, initialState);
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

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      reset(); // clear the form inputs
    } else if (state?.message && !state?.success) {
      toast.error(state.message);
    }
  }, [state, reset]);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Book your ticket</h3>
      
      {state?.message && (
        <div className={`p-3 mb-4 rounded ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {state.message}
        </div>
      )}
      
      <form action={formAction} className="space-y-4">
        <input type="hidden" {...register('eventId')} />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            id="name" 
            {...register('name')}
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
          />
            {clientErrors.name && (
                <p className="mt-1 text-sm text-red-600">{clientErrors.name.message}</p>
            )}
            {state?.errors?.name && (
                <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
            )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            {...register('email')}
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
          />
          {clientErrors.email && (
            <p className="mt-1 text-sm text-red-600">{clientErrors.email.message}</p>
          )}
          {state?.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
          )}
        </div>
        
        <SubmitButton 
          label="Confirm Booking" 
          loadingLabel="Processing..." 
        />
      </form>
    </div>
  );
}