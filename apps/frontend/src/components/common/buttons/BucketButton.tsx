"use client";

import { BucketButtonProps } from './types';

export default function BucketButton({
  onClick,
  className = "",
  size = "md",
  variant = "secondary",
  iconOnly = false
}: BucketButtonProps) {
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
      title="My Bucket"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" id="Bucket--Streamline-Tabler" height="17" width="17">
        <desc>
          Bucket Streamline Icon: https://streamlinehq.com
        </desc>
        <path d="M4 7a8 4 0 1 0 16 0A8 4 0 1 0 4 7" strokeWidth="2"></path>
        <path d="M4 7c0 0.664 0.088 1.324 0.263 1.965L7 19c0.5 1.5 2.239 2 5 2s4.5 -0.5 5 -2c0.333 -1 1.246 -4.345 2.737 -10.035A7.45 7.45 0 0 0 20 7" strokeWidth="2"></path>
      </svg>
      {!iconOnly && <span>My bucket</span>}
    </button>
  );
}