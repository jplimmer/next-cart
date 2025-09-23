'use client';

import Link from 'next/link';
import { useState } from 'react';

export function HoverPrefetchLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
      className={`hover:underline ${className}`}
    >
      {children}
    </Link>
  );
}
