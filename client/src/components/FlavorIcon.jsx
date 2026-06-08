// Hand-drawn flavor icons, matching the survey's filled, warm illustration style.
// Each is a 28×28 viewBox SVG. Colors are baked in per flavor so the icon reads
// the same whether or not its card is selected.

export default function FlavorIcon({ flavor, size = 26 }) {
  const common = { width: size, height: size, viewBox: '0 0 28 28' };

  switch (flavor) {
    case 'chocolate':
      return (
        <svg {...common}>
          <g transform="rotate(-8 14 14)">
            <rect x="5" y="7" width="18" height="14" rx="2.5" fill="#5A3A1E" />
            <rect x="5" y="7" width="18" height="14" rx="2.5" fill="none" stroke="#3A2410" strokeWidth="1.2" />
            <line x1="11" y1="7" x2="11" y2="21" stroke="#3A2410" strokeWidth="1" />
            <line x1="17" y1="7" x2="17" y2="21" stroke="#3A2410" strokeWidth="1" />
            <line x1="5" y1="14" x2="23" y2="14" stroke="#3A2410" strokeWidth="1" />
            <rect x="6.2" y="8" width="3.6" height="2" rx="1" fill="#7B4F2E" opacity="0.8" />
            <rect x="12.2" y="8" width="3.6" height="2" rx="1" fill="#7B4F2E" opacity="0.8" />
          </g>
        </svg>
      );

    case 'strawberry':
      return (
        <svg {...common}>
          <path d="M14 25 C8 25 4.5 19.5 4.5 15 C4.5 11 7.5 8.5 11 9.5 L17 9.5 C20.5 8.5 23.5 11 23.5 15 C23.5 19.5 20 25 14 25 Z"
            fill="#E0466E" stroke="#B82F54" strokeWidth="1.2" />
          <path d="M14 4 L11 9 L8 7.5 L10 10.5 L7 11 L11 12 L14 9.5 L17 12 L21 11 L18 10.5 L20 7.5 L17 9 Z"
            fill="#6FA84F" stroke="#4F7233" strokeWidth="1" />
          <g fill="#FBEDA8">
            <ellipse cx="10" cy="15" rx="0.9" ry="1.3" />
            <ellipse cx="14" cy="13.5" rx="0.9" ry="1.3" />
            <ellipse cx="18" cy="15" rx="0.9" ry="1.3" />
            <ellipse cx="12" cy="18.5" rx="0.9" ry="1.3" />
            <ellipse cx="16" cy="18.5" rx="0.9" ry="1.3" />
            <ellipse cx="14" cy="21.5" rx="0.9" ry="1.3" />
          </g>
        </svg>
      );

    case 'lemon':
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="10.5" fill="#E8C81E" stroke="#C9A800" strokeWidth="1.2" />
          <circle cx="14" cy="14" r="8" fill="#FBEDA8" />
          <g stroke="#E8C81E" strokeWidth="1.2" fill="#FFF7D6">
            <path d="M14 14 L14 6.2 A8 8 0 0 1 19.5 8.5 Z" />
            <path d="M14 14 L19.5 8.5 A8 8 0 0 1 21.8 14 Z" />
            <path d="M14 14 L21.8 14 A8 8 0 0 1 19.5 19.5 Z" />
            <path d="M14 14 L19.5 19.5 A8 8 0 0 1 14 21.8 Z" />
            <path d="M14 14 L14 21.8 A8 8 0 0 1 8.5 19.5 Z" />
            <path d="M14 14 L8.5 19.5 A8 8 0 0 1 6.2 14 Z" />
            <path d="M14 14 L6.2 14 A8 8 0 0 1 8.5 8.5 Z" />
            <path d="M14 14 L8.5 8.5 A8 8 0 0 1 14 6.2 Z" />
          </g>
          <circle cx="14" cy="14" r="1.6" fill="#E8C81E" />
        </svg>
      );

    case 'yoghurt':
      return (
        <svg {...common}>
          <path d="M7 11 L5.5 22 Q5.5 24 8 24 L20 24 Q22.5 24 22.5 22 L21 11 Z"
            fill="#EEF2FF" stroke="#7080B0" strokeWidth="1.2" />
          <rect x="6.3" y="15" width="15.4" height="4.5" fill="#C7D0EE" />
          <rect x="5.5" y="8.5" width="17" height="3" rx="1.5" fill="#DCE4FF" stroke="#7080B0" strokeWidth="1.2" />
          <path d="M9 9 Q11 4 14 6 Q17 4 19 9 Z" fill="#FFFFFF" stroke="#7080B0" strokeWidth="1.1" />
          <path d="M11.5 7.8 Q14 5.5 16.5 7.8" stroke="#C7D0EE" strokeWidth="1" fill="none" />
        </svg>
      );

    case 'cookie':
      return (
        <svg {...common}>
          <path d="M23 13.5 A9.5 9.5 0 1 1 13 4 A4.5 4.5 0 0 0 18 9 A4.5 4.5 0 0 0 23 13.5 Z"
            fill="#D6A45C" stroke="#A87838" strokeWidth="1.2" />
          <g fill="#5A3A1E">
            <ellipse cx="10" cy="11" rx="1.5" ry="1.2" />
            <ellipse cx="15" cy="15" rx="1.6" ry="1.3" />
            <ellipse cx="9.5" cy="17" rx="1.3" ry="1.1" />
            <ellipse cx="13.5" cy="20" rx="1.2" ry="1" />
            <ellipse cx="18" cy="18.5" rx="1.3" ry="1.1" />
          </g>
        </svg>
      );

    case 'other':
      return (
        <svg {...common}>
          <path d="M14 4 C14.5 10 15.5 11 21 12 C15.5 13 14.5 14 14 20 C13.5 14 12.5 13 7 12 C12.5 11 13.5 10 14 4 Z"
            fill="#9A9A9A" stroke="#6A6A6A" strokeWidth="1" />
          <path d="M21 17 C21.2 19.5 21.5 20 23.5 20.5 C21.5 21 21.2 21.5 21 24 C20.8 21.5 20.5 21 18.5 20.5 C20.5 20 20.8 19.5 21 17 Z"
            fill="#B5B5B5" stroke="#6A6A6A" strokeWidth="0.8" />
        </svg>
      );

    default:
      return null;
  }
}
