"use client";
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { NavbarProps } from '../../types/navigation.types';

interface NavbarComponentProps extends NavbarProps {
  onToggleSidebar: () => void;
  onLogin: () => void;
  isSidebarActive: boolean;
}

export const Navbar: React.FC<NavbarComponentProps> = ({
  logoSrc,
  logoAlt = 'Logo',
  className = '',
  goBack,
  onToggleSidebar,
  onLogin,
  isSidebarActive,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 h-14 flex items-center justify-between px-6 bg-white shadow-sm ${className}`}>
      <div className="flex items-center">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-12 cursor-pointer"
          onClick={goBack ? goBack : undefined}
        />
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isSidebarActive ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="text-black-600 hover:underline bg-transparent border-none cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};