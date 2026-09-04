interface LogoProps {
  variant?: "dark" | "light";
}

export default function Logo({ variant = "dark" }: LogoProps) {
  const titleColor = variant === "light" ? "#FFFFFF" : "#0F172A";
  const taglineColor = variant === "light" ? "#94A3B8" : "#475569";

  return (
    <a className="flex items-center gap-3 group shrink-0" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 48"
        width="240"
        height="48"
        fill="none"
        className="group-hover:opacity-90 transition-opacity"
      >
        <g transform="translate(4, 4)">
          <rect width="40" height="40" rx="10" fill="#0F172A" />
          <circle cx="13" cy="12" r="2" fill="#EA580C" />
          <circle cx="20" cy="10" r="2" fill="#FFFFFF" />
          <circle cx="27" cy="12" r="2" fill="#10B981" />
          <path
            d="M12 28C16 26 19 25 20 28C21 25 24 26 28 28V18C24 16 21 17 20 19C19 17 16 16 12 18V28Z"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line
            x1="20"
            y1="19"
            x2="20"
            y2="28"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 13V15"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g transform="translate(54, 18)">
          <rect
            width="20"
            height="13"
            rx="2"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <rect width="20" height="4.33" rx="1" fill="#FF9933" />
          <rect y="4.33" width="20" height="4.33" fill="#FFFFFF" />
          <rect y="8.66" width="20" height="4.34" rx="1" fill="#138808" />
          <circle
            cx="10"
            cy="6.5"
            r="1.6"
            stroke="#000080"
            strokeWidth="0.7"
            fill="none"
          />
        </g>
        <text
          x="82"
          y="24"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill={titleColor}
          letterSpacing="-0.02em"
        >
          Bharat
        </text>
        <text
          x="136"
          y="24"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill={titleColor}
          letterSpacing="-0.01em"
        >
          Knowledge
        </text>
        <text
          x="82"
          y="36"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9"
          fontWeight="600"
          fill={taglineColor}
          letterSpacing="0.08em"
        >
          ABOUT INDIA&apos;S
        </text>
      </svg>
    </a>
  );
}