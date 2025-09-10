interface LogoProps {
  size?: number;
  colour?: string;
  cartColour?: string;
  zapOutlineColour?: string;
  zapFillColour?: string;
}

export function Logo({
  size = 24,
  colour = 'currentColor',
  cartColour,
  zapOutlineColour,
  zapFillColour = 'none',
}: LogoProps) {
  const finalCartColour = cartColour || colour;
  const finalZapOutlineColour = zapOutlineColour || colour;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label=""
    >
      {/* Lucide's Shopping cart */}
      <g className="shopping-cart" stroke={finalCartColour}>
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </g>

      {/* Lucide's Zap, scaled to 90% height and 40% width, centered */}
      <g
        className="zap"
        stroke={finalZapOutlineColour}
        fill={zapFillColour}
        transform="translate(12,12) scale(0.4,0.9) translate(-8,-12)"
      >
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </g>
    </svg>
  );
}
