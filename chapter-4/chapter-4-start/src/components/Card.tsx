import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = ({ title, children, footer }: CardProps) => {
  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-lg shadow-sm overflow-hidden bg-white dark:bg-black">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800">
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-3 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
          {footer}
        </div>
      )}
    </div>
  );
};