"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useAuth } from '@/hooks/useAuth';
import { NavigationState, OverlayType } from '../types/navigation.types';

export const useNavigation = () => {
  const router = useRouter();
  const { authType } = useAuth();
  
  
  const [navigationState, setNavigationState] = useState<NavigationState>({
    activeOverlay: null
  });

  const navigationContainerRef = useRef<HTMLDivElement>(null);

  const setOverlay = (overlay: OverlayType) => {
    if (navigationState.activeOverlay === overlay) {
      return; // Do nothing if same overlay is clicked
    }
    setNavigationState({ activeOverlay: overlay });
  };

  const toggleSidebar = () => {
    if (navigationState.activeOverlay === 'sidebar') {
      setNavigationState({ activeOverlay: null });
    } else {
      setNavigationState({ activeOverlay: 'sidebar' });
    }
  };

  const closeOverlay = () => {
    setNavigationState({ activeOverlay: null });
  };

  const handleLogin = () => router.push('/login');

  const handleLogout = async () => {
    try {
      localStorage.clear();
      if (authType === 'google') {
        await signOut({ redirect: false });
      }
      window.location.href = '/login';
    } catch (error) {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (!navigationContainerRef.current?.contains(target)) {
        closeOverlay();
      }
    };

    if (navigationState.activeOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navigationState.activeOverlay]);

  return {
    navigationState,
    navigationContainerRef,
    setOverlay,
    toggleSidebar,
    closeOverlay,
    handleLogin,
    handleLogout
  };
};