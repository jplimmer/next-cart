'use client';

import { routes } from '@/lib/constants/routes';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import { NotebookPen, UserRound } from 'lucide-react';
import { navigationMenuTriggerStyle } from '../ui/navigation-menu';

export function UserNavItem() {
  return (
    <div className="flex items-center">
      <ClerkLoading>
        <div className={navigationMenuTriggerStyle()}>
          <UserRound size={28} color="grey" className="animate-pulse" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div className={navigationMenuTriggerStyle()}>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Manage catalog"
                  labelIcon={<NotebookPen size={16} />}
                  href={routes.admin.href}
                />
                <UserButton.Action label="manageAccount" />
                <UserButton.Action label="signOut" />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <div className={navigationMenuTriggerStyle()}>
              <UserRound size={28} className="cursor-pointer" />
            </div>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
}
