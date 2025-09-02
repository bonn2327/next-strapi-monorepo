"use client";

import { BaseButtonProps } from './types';

interface ProfileButtonProps extends BaseButtonProps {
  onClick?: () => void;
  iconOnly?: boolean;
}

export default function ProfileButton({ 
  onClick,
  className = "",
  size = "md",
  variant = "secondary",
  iconOnly = false
}: ProfileButtonProps) {
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
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded transition flex items-center ${iconOnly ? 'justify-center' : 'gap-3'} ${className}`}
      title="Profile"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" height="17" width="17">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      {!iconOnly && <span>Profile</span>}
    </button>
  );
}