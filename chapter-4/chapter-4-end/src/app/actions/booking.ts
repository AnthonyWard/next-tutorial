'use server';

import { bookingSchema } from '@/lib/schemas';

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
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  console.log(`Validated Booking received for ${name} (${email}) for event ${eventId}`);
  
  return {
    success: true,
    message: 'Booking successfully confirmed!',
    errors: {},
  };
}