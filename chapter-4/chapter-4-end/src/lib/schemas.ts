import { z } from 'zod';

export const bookingSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Please enter a valid email address'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;