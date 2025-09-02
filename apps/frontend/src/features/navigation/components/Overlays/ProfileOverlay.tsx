"use client";
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileOverlay = React.forwardRef<HTMLDivElement, ProfileOverlayProps>(({ isOpen, onClose }, ref) => {
  const { user, isAuthenticated } = useAuth();

  if (!isOpen || !isAuthenticated || !user) return null;

  return (
    <div ref={ref} className={`fixed top-14 right-16 h-[calc(100vh-3.5rem)] w-80 bg-white shadow-lg transform transition-transform duration-300 z-30 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Profile</h2>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 min-w-12 rounded-xs bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 text-xl font-bold">@</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{user?.name || user?.username}</h3>
            <p className="text-gray-600 text-sm truncate">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" value={user?.name || user?.username || ''} disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-sm text-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={user?.email || ''} disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-sm text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileOverlay.displayName = 'ProfileOverlay';

export default ProfileOverlay;