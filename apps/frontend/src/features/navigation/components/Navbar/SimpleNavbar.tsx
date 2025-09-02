"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { NavbarProps } from '../../types/navigation.types';

export const SimpleNavbar: React.FC<NavbarProps> = ({
  logoSrc,
  logoAlt = 'Logo',
  className = '',
  goBack,
}) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    router.push('/login');
  };

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
        {!isAuthenticated && (
          <button
            onClick={handleLogin}
            className="text-black-600 hover:underline bg-transparent border-none cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};