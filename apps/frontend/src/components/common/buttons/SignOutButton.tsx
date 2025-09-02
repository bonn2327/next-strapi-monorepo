"use client";

import { BaseButtonProps } from './types';

interface SignOutButtonProps extends BaseButtonProps {
  onClick: () => void;
  iconOnly?: boolean;
  isLoading?: boolean;
}

export default function SignOutButton({ 
  onClick,
  className = "",
  size = "md",
  variant = "ghost",
  iconOnly = false,
  isLoading = false
}: SignOutButtonProps) {
  const sizeClasses = {
    sm: "p-1",
    md: "p-1.5", 
    lg: "p-2"
  };

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-2 border-gray-200 hover:bg-gray-100",
    ghost: "hover:bg-gray-100"
  };

  return (
    <button 
      onClick={onClick}
      disabled={isLoading}
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded transition flex items-center ${iconOnly ? 'justify-center' : 'gap-3'} text-red-400 w-full ${className} ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`} 
      title={isLoading ? 'Signing out...' : 'Sign out'}
    >
      {isLoading ? (
        <svg className="w-4 h-4 flex-shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l4-4m0 0l-4-4m4 4H9" />
        </svg>
      )}
      {!iconOnly && <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>}
    </button>
  );
}