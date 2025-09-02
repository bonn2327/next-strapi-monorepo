"use client";
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface PrepOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrepOverlay = React.forwardRef<HTMLDivElement, PrepOverlayProps>(({ isOpen, onClose }, ref) => {
  const { user, isAuthenticated } = useAuth();
  const isPremium = user?.isPremium || false;

  if (!isOpen || !isAuthenticated) return null;

  return (
    <div ref={ref} className={`fixed top-14 right-16 h-[calc(100vh-3.5rem)] w-80 bg-white shadow-lg transform transition-transform duration-300 z-30 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Kitbox</h2>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">Syllabus Tracker</h3>
              {!isPremium && (
                <span className="bg-amber-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Try
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">No tracker added yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

PrepOverlay.displayName = 'PrepOverlay';

export default PrepOverlay;