"use client";
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface BucketOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const BucketOverlay = React.forwardRef<HTMLDivElement, BucketOverlayProps>(({ isOpen, onClose }, ref) => {
  const { user, isAuthenticated } = useAuth();
  const isPremium = user?.isPremium || false;

  if (!isOpen || !isAuthenticated) return null;

  return (
    <div ref={ref} className={`fixed top-14 right-16 h-[calc(100vh-3.5rem)] w-80 bg-white shadow-lg transform transition-transform duration-300 z-30 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold">My Bucket</h2>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Saved Jobs</h3>
            <p className="text-gray-600 text-sm">No saved jobs yet.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Saved News</h3>
            <p className="text-gray-600 text-sm">No saved news yet.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Saved Digest</h3>
            <p className="text-gray-600 text-sm">No saved digest posts yet.</p>
          </div>


        </div>
      </div>
    </div>
  );
});

BucketOverlay.displayName = 'BucketOverlay';

export default BucketOverlay;