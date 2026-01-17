interface ChipProps {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
}

export const Chip = ({ label, onRemove, disabled }: ChipProps) => {
  return (
    <span
      className={`
      inline-flex items-center px-2 py-0.5 rounded text-sm font-medium
      bg-surface-200 dark:bg-surface-700 text-foreground
      border border-border
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      rfe-chip-root
    `}
    >
      {label}
      {onRemove && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening dropdown if inside input
            onRemove();
          }}
          className="ml-1.5 hover:text-red-500 focus:outline-none"
          aria-label={`Remove ${label}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};
