import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { describe, it, expect } from 'vitest';

describe('Card Component', () => {
  it('renders title and children', () => {
    render(<Card title="Test Title">Test Content</Card>);
    
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('renders footer when provided', () => {
    render(
      <Card title="Start" footer={<span>Footer Content</span>}>
        Body
      </Card>
    );

    expect(screen.getByText('Footer Content')).toBeDefined();
  });
});