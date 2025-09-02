"use client";

import { PrepButtonProps } from './types';

export default function PrepButton({
  onClick,
  className = "",
  size = "md",
  variant = "secondary",
  iconOnly = false
}: PrepButtonProps) {
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

  const PencilIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    height="17"
    width="17"
  >
    <style type="text/css">
      {`
        .st0 {
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 10;
        }
        .st1 {
          fill: none;
          stroke: #000000;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .st2 {
          fill: none;
          stroke: #000000;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 6, 6;
        }
        .st3 {
          fill: none;
          stroke: #000000;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 4, 4;
        }
        .st4 {
          fill: none;
          stroke: #000000;
          stroke-width: 2;
          stroke-linecap: round;
        }
        .st5 {
          fill: none;
          stroke: #000000;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-dasharray: 3.1081, 3.1081;
        }
        .st6 {
          fill: none;
          stroke: #000000;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 10;
          stroke-dasharray: 4, 3;
        }
      `}
    </style>
    <path
      className="st0"
      d="M11.3,26.5L4,28l1.5-7.3L21.6,4.5c0.8-0.8,2.1-0.8,2.9,0l2.9,2.9c0.8,0.8,0.8,2.1,0,2.9L11.3,26.5z"
    />
    <line className="st0" x1="18.7" y1="7.5" x2="24.5" y2="13.3" />
    <line className="st0" x1="18.7" y1="13.3" x2="9.9" y2="22.1" />
  </svg>
);
  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded transition flex items-center ${iconOnly ? 'justify-center' : 'gap-3'} ${className}`}
      title="Kitbox"
    >
      <PencilIcon />
      {!iconOnly && <span>Kitbox</span>}
    </button>
  );
}