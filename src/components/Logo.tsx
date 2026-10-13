/**
 * Foodlet mark, redrawn as SVG from the Figma logo: a peach wallet tile with a
 * spoon and fork, a chain link (blockchain) and a check badge.
 */
export function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden focusable="false">
      <rect x="4" y="14" width="46" height="44" rx="8" fill="#fde3b6" />
      {/* spoon */}
      <ellipse cx="17" cy="31" rx="4.5" ry="6" fill="#fe7551" />
      <rect x="15.5" y="35" width="3" height="16" rx="1.5" fill="#fe7551" />
      {/* fork */}
      <rect x="25" y="25" width="2.4" height="10" rx="1.2" fill="#fe7551" />
      <rect x="29" y="25" width="2.4" height="10" rx="1.2" fill="#fe7551" />
      <rect x="33" y="25" width="2.4" height="10" rx="1.2" fill="#fe7551" />
      <path d="M25 33h10.4v2.6a3 3 0 0 1-3 3h-4.4a3 3 0 0 1-3-3z" fill="#fe7551" />
      <rect x="28.6" y="37" width="3.2" height="14" rx="1.6" fill="#fe7551" />
      {/* wallet clasp */}
      <rect x="40" y="36" width="16" height="10" rx="3" fill="#fe7551" />
      <circle cx="45" cy="41" r="2" fill="#fde3b6" />
      {/* chain link */}
      <g fill="none" stroke="#fe7551" strokeWidth="3.2">
        <rect x="4" y="3" width="15" height="9" rx="4.5" transform="rotate(-18 11.5 7.5)" />
        <rect x="14" y="2" width="15" height="9" rx="4.5" transform="rotate(-18 21.5 6.5)" />
      </g>
      {/* check badge */}
      <circle cx="51" cy="13" r="10" fill="#fe7551" />
      <path d="m46 13 3.6 3.6L56.4 9.6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ tone = 'dark', size = 48 }: { tone?: 'dark' | 'orange'; size?: number }) {
  return (
    <span className={`logo logo--${tone}`}>
      <LogoMark size={size} />
      <span className="logo__word">食錢包 Foodlet</span>
    </span>
  )
}
