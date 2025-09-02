"use client";
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';
import { Navbar } from './Navbar/Navbar';
import { Sidebar } from './Sidebar/Sidebar';
import ProfileOverlay from './Overlays/ProfileOverlay';
import BucketOverlay from './Overlays/BucketOverlay';
import PrepOverlay from './Overlays/PrepOverlay';
import { NavbarProps } from '../types/navigation.types';

export const Navigation: React.FC<NavbarProps> = (props) => {
  const { isAuthenticated, user } = useAuth();
  const { navigationState, navigationContainerRef, setOverlay, toggleSidebar, closeOverlay, handleLogin, handleLogout } = useNavigation();

  return (
    <div ref={navigationContainerRef}>
      <Navbar
        {...props}
        onToggleSidebar={toggleSidebar}
        onLogin={handleLogin}
        isSidebarActive={navigationState.activeOverlay !== null}
      />

      {isAuthenticated && (
        <Sidebar
          isOpen={navigationState.activeOverlay !== null}
          isMinified={navigationState.activeOverlay !== null && navigationState.activeOverlay !== 'sidebar'}
          currentUser={user}
          avatarAlt={props.avatarAlt || 'User Avatar'}
          showProfile={navigationState.activeOverlay === 'profile'}
          showBucket={navigationState.activeOverlay === 'bucket'}
          showPrep={navigationState.activeOverlay === 'prep'}
          onProfileClick={() => setOverlay('profile')}
          onBucketClick={() => setOverlay('bucket')}
          onPrepClick={() => setOverlay('prep')}
          onLogout={handleLogout}
        />
      )}

      <ProfileOverlay
        isOpen={navigationState.activeOverlay === 'profile'}
        onClose={closeOverlay}
      />

      <BucketOverlay
        isOpen={navigationState.activeOverlay === 'bucket'}
        onClose={closeOverlay}
      />

      <PrepOverlay
        isOpen={navigationState.activeOverlay === 'prep'}
        onClose={closeOverlay}
      />
    </div>
  );
};