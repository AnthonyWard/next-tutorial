import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Basic Card',
    children: 'This is the content of the card.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: 'This card has a footer section.',
    footer: <button className="text-blue-500 text-sm">Action</button>,
  },
};