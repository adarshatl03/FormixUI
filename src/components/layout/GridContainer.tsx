import { type ReactNode } from "react";

interface GridContainerProps {
  children: ReactNode;
  className?: string;
  gap?: number; // 0-8 scale
}

export const GridContainer = ({
  children,
  className = "",
  gap = 4,
}: GridContainerProps) => {
  // Gap mapping to tailwind classes
  const gapClass =
    {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
    }[gap as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8] || "gap-4";

  return (
    <div className={`grid grid-cols-12 ${gapClass} ${className}`}>
      {children}
    </div>
  );
};
