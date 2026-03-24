// src/lib/schemas.test.ts
import { describe, it, expect } from 'vitest';
import { bookingSchema } from './schemas';

describe('bookingSchema', () => {
  it('should validate a correct payload', () => {
    const validData = {
      eventId: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const result = bookingSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const invalidData = {
      eventId: '1',
      name: 'John Doe',
      email: 'not-an-email',
    };
    const result = bookingSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address');
    }
  });

  it('should enforce name length boundaries', () => {
    const tooShort = {
      eventId: '1',
      name: 'J',
      email: 'john@example.com',
    };
    const result = bookingSchema.safeParse(tooShort);
    expect(result.success).toBe(false);
  });
});