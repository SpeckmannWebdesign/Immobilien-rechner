"use client"

interface LogoProps {
  className?: string
  variant?: "light" | "dark"
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", variant = "dark", showText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-[13px]" },
    md: { icon: 32, text: "text-sm" },
    lg: { icon: 40, text: "text-base" },
  }

  const s = sizes[size]
  const textColor = variant === "light" ? "#F1F5F9" : "#111827"
  const textColorSub = variant === "light" ? "#94A3B8" : "#9CA3AF"

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* SVG Logo Mark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          {/* Haupt-Gradient: Indigo → Cyan */}
          <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#0E7490" />
          </linearGradient>

          {/* Heller Gradient für Akzente */}
          <linearGradient id="logoAccent" x1="0" y1="10" x2="40" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Subtiler Schatten */}
          <filter id="logoShadow" x="-2" y="-2" width="44" height="44">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#4338CA" floodOpacity="0.2" />
          </filter>

          {/* Clip für abgerundetes Quadrat */}
          <clipPath id="logoClip">
            <rect width="40" height="40" rx="10" />
          </clipPath>
        </defs>

        {/* Hintergrund: Abgerundetes Quadrat */}
        <g clipPath="url(#logoClip)" filter="url(#logoShadow)">
          {/* Base Fill */}
          <rect width="40" height="40" fill="url(#logoGrad)" />

          {/* Subtiles Muster: Diagonale Linien */}
          <line x1="0" y1="40" x2="40" y2="0" stroke="white" strokeWidth="0.5" opacity="0.06" />
          <line x1="-10" y1="40" x2="30" y2="0" stroke="white" strokeWidth="0.5" opacity="0.04" />
          <line x1="10" y1="40" x2="50" y2="0" stroke="white" strokeWidth="0.5" opacity="0.04" />

          {/* Haus-Silhouette (stilisiert, geometrisch) */}
          <path
            d="M20 8L8 18V32H16V24H24V32H32V18L20 8Z"
            fill="white"
            opacity="0.12"
          />

          {/* Chart-Balken (aufsteigende Säulen im Haus) */}
          <rect x="11" y="26" width="4" height="6" rx="1" fill="white" opacity="0.9" />
          <rect x="18" y="22" width="4" height="10" rx="1" fill="white" opacity="0.9" />
          <rect x="25" y="18" width="4" height="14" rx="1" fill="white" opacity="0.9" />

          {/* Dach-Linie (prominent) */}
          <path
            d="M6 19L20 7L34 19"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.95"
          />

          {/* Aufwärtstrend-Pfeil über dem Dach */}
          <path
            d="M12 25L18 20L24 22L30 15"
            stroke="url(#logoAccent)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M27 14L31 14L31 18"
            stroke="url(#logoAccent)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.7"
          />

          {/* Glanz-Effekt oben links */}
          <rect width="40" height="20" fill="url(#logoShine)" opacity="0.08"
                style={{ background: "linear-gradient(180deg, white 0%, transparent 100%)" }} />
          <rect width="40" height="18" rx="0" fill="white" opacity="0.04" />
        </g>
      </svg>

      {/* Text */}
      {showText && (
        <span className={`${s.text} font-bold tracking-tight leading-none`} style={{ color: textColor }}>
          Immobilien
          <span style={{ color: textColorSub }} className="font-semibold">-Rechner</span>
        </span>
      )}
    </span>
  )
}
