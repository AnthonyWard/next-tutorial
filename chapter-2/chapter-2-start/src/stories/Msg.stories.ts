import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Msg from '../components/Msg';

const meta = {
  title: 'Example/Msg',
  component: Msg,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Msg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello Storybook',
  },
};

export const WithInteraction: Story = {
  args: {
    text: 'Interactive Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the text is present
    await expect(canvas.getByText('Interactive Test')).toBeInTheDocument();
  },
};