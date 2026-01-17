interface ErrorTooltipProps {
  error: string;
  className?: string; // Positioning
}

export const ErrorTooltip = ({ error, className = "" }: ErrorTooltipProps) => {
  return (
    <div
      className={`group/error z-20 cursor-help flex items-center justify-center ${className}`}
    >
      <span className="text-destructive hover:opacity-80 transition-opacity">
        {/* ⓘ Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </span>

      {/* Tooltip */}
      <div
        className={`
            absolute bottom-full right-0 mb-2 
            bg-destructive text-white text-[11px] px-2 py-1.5 rounded-md shadow-xl whitespace-nowrap  
            opacity-0 invisible group-hover/error:opacity-100 group-hover/error:visible 
            transition-all duration-200 transform translate-y-1 group-hover/error:translate-y-0
            z-tooltip pointer-events-none border border-white/10
        `}
        role="alert"
      >
        {error}
        {/* Pointer / Arrow - centered at 9px from right edge (half of 18px icon) */}
        <div
          className="absolute top-full right-[4px] -mt-[5px] w-2.5 h-2.5 bg-destructive rotate-45 border-r border-b border-white/10"
          style={{ transformOrigin: "center" }}
        ></div>
      </div>
    </div>
  );
};
