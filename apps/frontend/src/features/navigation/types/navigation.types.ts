export interface NavbarProps {
  logoSrc: string;
  logoAlt?: string;
  avatarSrc: string;
  avatarAlt?: string;
  className?: string;
  goBack?: () => void;
  isLoggedIn?: boolean;
  disableScrollHandler?: boolean;
  isVisible?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  isMinified: boolean;
  currentUser: any;
  avatarAlt: string;
  showProfile: boolean;
  showBucket: boolean;
  showPrep: boolean;
  onProfileClick: () => void;
  onBucketClick: () => void;
  onPrepClick: () => void;
  onLogout: () => void;
}

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export type OverlayType = 'sidebar' | 'profile' | 'bucket' | 'prep' | null;

export interface NavigationState {
  activeOverlay: OverlayType;
}