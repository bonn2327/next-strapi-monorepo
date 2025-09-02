export interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface BackButtonProps extends BaseButtonProps {
  onBack: () => void;
}

export interface BookmarkButtonProps extends BaseButtonProps {
  isBookmarked?: boolean;
  onToggle?: () => void;
}

export interface LikeButtonProps extends BaseButtonProps {
  isLiked?: boolean;
  onToggle?: () => void;
}

export interface WhatsAppButtonProps extends BaseButtonProps {
  title: string;
  url?: string;
}

export interface UserAccountButtonProps extends BaseButtonProps {
  onProfileClick?: () => void;
  onBucketClick?: () => void;
}

export interface BucketButtonProps extends BaseButtonProps {
  onClick?: () => void;
  iconOnly?: boolean;
}

export interface PrepButtonProps extends BaseButtonProps {
  onClick?: () => void;
  iconOnly?: boolean;
}