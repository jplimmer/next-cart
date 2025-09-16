'use client';

import { useState } from 'react';
import '../css/QuantitySelector.css';

export default function QuantitySelector({
  className,
}: {
  className?: string;
}) {
  const [qty, setQty] = useState(1);

  return (
    <div className={`flex flex-col items-start space-y-1 ${className}`}>
      <label
        htmlFor="qty"
        className={`text-sm font-bold text-gray-700 ${className}`}
      >
        Quantity
      </label>

      <div className="flex items-center border rounded overflow-hidden w-fit">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
        >
          −
        </button>
        <input
          id="qty"
          type="number"
          value={qty}
          min={1}
          onChange={(e) => setQty(Number(e.target.value))}
          className={`inputNoSpinner w-12 text-center border-none focus:outline-none`}
        />
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
}
