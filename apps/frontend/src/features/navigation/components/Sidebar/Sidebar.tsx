"use client";
import React, { useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ProfileButton, BucketButton, SignOutButton } from '@/components/common/buttons';
import PrepButton from '@/components/common/buttons/PrepButton';
import { SidebarProps } from '../../types/navigation.types';

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isMinified,
  currentUser,
  avatarAlt,
  showProfile,
  showBucket,
  showPrep,
  onProfileClick,
  onBucketClick,
  onPrepClick,
  onLogout,
}) => {
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isPremium = user?.isPremium || false;
  
  const avatarBgColor = useMemo(() => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, [currentUser?.id || currentUser?.email]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] ${isMinified ? 'w-16' : 'w-64'} bg-gray-50 transform transition-all duration-300 z-40 translate-x-0`}
    >
      <div className={`${isMinified ? 'p-2' : 'p-6'}`}>
        <div className={`flex items-center ${isMinified ? 'justify-center mb-4' : 'gap-3 mb-6'}`}>
          {currentUser?.image ? (
            <img
              src={currentUser.image}
              alt={avatarAlt}
              className={`${isMinified ? 'w-8 h-8' : 'w-12 h-12'} border-2 border-gray-400 rounded-sm`}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`${isMinified ? 'w-8 h-8' : 'w-12 h-12'} rounded-sm flex items-center justify-center ${avatarBgColor} ${currentUser?.image ? 'hidden' : ''}`}>
            <span className={`text-white ${isMinified ? 'text-sm' : 'text-lg'} font-bold`}>
              {currentUser?.name?.[0]?.toUpperCase() || currentUser?.username?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          {!isMinified && (
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-gray-800 truncate">{currentUser?.name || currentUser?.username || 'User'}</p>
              <span className={`px-2 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 w-fit ${isPremium ? 'bg-green-100 text-green-700' : 'bg-violet-100 text-violet-800'}`}>
                {isPremium && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
                {isPremium ? 'Premium' : 'Basic Access'}
              </span>
            </div>
          )}
        </div>

        <div className={`space-y-2 ${isMinified ? 'mb-4' : 'mb-6'}`}>
          <ProfileButton 
            onClick={onProfileClick} 
            iconOnly={isMinified} 
            variant="ghost" 
            className={`w-full hover:bg-gray-200 ${showProfile ? 'text-black' : 'text-gray-500'}`} 
          />
          <BucketButton 
            onClick={onBucketClick} 
            iconOnly={isMinified} 
            variant="ghost" 
            className={`w-full hover:bg-gray-200 ${showBucket ? 'text-black' : 'text-gray-500'}`} 
          />
          <PrepButton 
            onClick={onPrepClick} 
            iconOnly={isMinified} 
            variant="ghost" 
            className={`w-full hover:bg-gray-200 ${showPrep ? 'text-black' : 'text-gray-500'}`} 
          />
          <div className="border-t border-gray-300 my-2"></div>
          <SignOutButton 
            onClick={async (e) => {
              e.stopPropagation();
              setIsLoggingOut(true);
              await onLogout();
            }} 
            iconOnly={isMinified} 
            isLoading={isLoggingOut}
            className="w-full text-red-400 hover:bg-gray-200" 
          />
        </div>
      </div>
    </div>
  );
};