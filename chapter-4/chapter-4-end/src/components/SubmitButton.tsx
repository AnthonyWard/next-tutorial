'use client';

import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  label: string;
  loadingLabel: string;
}

export default function SubmitButton({ label, loadingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center
        ${pending 
          ? 'bg-blue-400 cursor-not-allowed text-white/80' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`
      }
    >
      {pending && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {pending ? loadingLabel : label}
    </button>
  );
}