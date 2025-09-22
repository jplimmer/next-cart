'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function ToggleForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowForm(!showForm)}>
        Add new product
        {showForm ? <ChevronDown /> : <ChevronRight />}
      </Button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showForm ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
