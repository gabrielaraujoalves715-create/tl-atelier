import React from 'react';

interface CustomCartIconProps {
  itemCount: number;
  size?: number;
}

export default function CustomCartIcon({ itemCount, size = 26 }: CustomCartIconProps) {
  return (
    <div className="relative inline-block select-none" style={{ width: size, height: size }}>
      {/* Custom Shopping Bag SVG matching the exact shape in the user's reference */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-brand-text group-hover:text-brand-dark-rose transition-colors duration-200"
      >
        {/* Curved upper handle */}
        <path d="M8 7V5.5a4 4 0 0 1 8 0V7" />
        
        {/* Trapezoidal bag outline with flat bottom and slightly rounded corners */}
        <path d="M4.5 7h15l1 13.5a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 20.5L4.5 7z" />
        
        {/* T Initial Inside the Bag, styled elegantly as a single serif letter like the 'K' in reference photo */}
        <text
          x="12"
          y="17"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontFamily="Georgia, Times, 'Times New Roman', serif"
          fontSize="8.5"
          fontWeight="bold"
        >
          T
        </text>
      </svg>
      
      {/* Pink/Rose Badge containing the item count exactly like the photo */}
      <span 
        className="absolute -top-1.5 -right-2 bg-[#F9A8D4] text-[#BE185D] text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center font-sans border border-white/80 transition-all duration-300"
        style={{
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        {itemCount}
      </span>
    </div>
  );
}
