"use client";
import CombinedAuthProvider from '@/libs/SessionProvider'

export const PageWrapperClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <CombinedAuthProvider>{children}</CombinedAuthProvider>;
};
