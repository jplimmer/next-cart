'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export function AuthToaster() {
  const { isLoaded, isSignedIn, user } = useUser();
  const prevSignedIn = useRef<boolean>(false);

  useEffect(() => {
    // Early return while Clerk loads
    if (!isLoaded) return;

    if (isSignedIn && !prevSignedIn.current) {
      // Toast on new sign-in
      toast.success(`Welcome, ${user?.firstName || 'stranger'}!`, {
        position: 'bottom-right',
      });
    } else if (!isSignedIn && prevSignedIn.current) {
      // Toast on sign-out
      toast('Logged out', { icon: '👋', position: 'bottom-right' });
    }

    prevSignedIn.current = isSignedIn;
  }, [isLoaded, isSignedIn, user]);

  return null;
}
