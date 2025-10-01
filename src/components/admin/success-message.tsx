'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessMessage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
      router.replace('/admin');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return <p>Done!</p>;
}
