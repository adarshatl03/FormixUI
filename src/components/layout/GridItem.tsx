import { type ReactNode } from "react";

interface GridItemProps {
  children: ReactNode;
  colSpan?: number; // 1-12
  className?: string;
}

export const GridItem = ({
  children,
  colSpan = 12,
  className = "",
}: GridItemProps) => {
  // Safe colSpan mapping
  const span = Math.min(Math.max(colSpan, 1), 12);

  // Responsive logic:
  // Mobile: Always full width (col-span-12)
  // Tablet/Desktop: Use defined span

  /* 
    Tailwind 4 dynamic values work, but for a strict grid system, explicit classes are safer 
    to avoid purging issues if not configured correctly, though 4.0 is smarter.
    We'll use style for exact control or a mapping.
  */

  const getSpanClass = (s: number) => {
    switch (s) {
      case 1:
        return "md:col-span-1";
      case 2:
        return "md:col-span-2";
      case 3:
        return "md:col-span-3";
      case 4:
        return "md:col-span-4";
      case 5:
        return "md:col-span-5";
      case 6:
        return "md:col-span-6";
      case 7:
        return "md:col-span-7";
      case 8:
        return "md:col-span-8";
      case 9:
        return "md:col-span-9";
      case 10:
        return "md:col-span-10";
      case 11:
        return "md:col-span-11";
      case 12:
        return "md:col-span-12";
      default:
        return "md:col-span-12";
    }
  };

  return (
    <div className={`col-span-12 ${getSpanClass(span)} ${className}`}>
      {children}
    </div>
  );
};
