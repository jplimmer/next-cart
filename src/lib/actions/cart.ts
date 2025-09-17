'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addToCartAction() {
  const cookieStore = await cookies();
  const currentCount = parseInt(
    cookieStore.get('cart-count')?.value || '0',
    10
  );
  const newCount = currentCount + 1;

  cookieStore.set('cart-count', newCount.toString(), {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // for Cross Site Request Forgery protection
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  // Return the new count for immediate UI feedback
  return newCount;
}

export async function getCartCount(): Promise<number> {
  const cookieStore = await cookies();
  return parseInt(cookieStore.get('cart-count')?.value || '0', 10);
}

export async function clearCart() {
  const cookieStore = await cookies();
  cookieStore.delete('cart-count');
}
