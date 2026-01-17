import React from "react";

interface GridContainerProps {
  children: React.ReactNode;
  gap?: number;
  className?: string; // e.g. "grid-cols-12" to force 12 cols always
}

export const GridContainer = ({
  children,
  gap = 4,
  className = "",
}: GridContainerProps) => {
  return (
    <div
      className={`grid grid-cols-12 ${className}`}
      style={{ gap: `${gap * 0.25}rem` }}
    >
      {children}
    </div>
  );
};

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: number; // Default (fallback)
  xs?: number; // Base (Mobile)
  sm?: number; // >= 640px
  md?: number; // >= 768px
  lg?: number; // >= 1024px
  className?: string;
}

const COL_SPAN_MAP: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const SM_COL_SPAN_MAP: Record<number, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
  7: "sm:col-span-7",
  8: "sm:col-span-8",
  9: "sm:col-span-9",
  10: "sm:col-span-10",
  11: "sm:col-span-11",
  12: "sm:col-span-12",
};

const MD_COL_SPAN_MAP: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

const LG_COL_SPAN_MAP: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

export const GridItem = ({
  children,
  colSpan = 12,
  xs,
  sm,
  md,
  lg,
  className = "",
}: GridItemProps) => {
  const baseSpan = Math.min(Math.max(xs || 12, 1), 12);
  const smSpan = sm || colSpan;
  const mdSpan = md;
  const lgSpan = lg;

  return (
    <div
      className={`
        ${COL_SPAN_MAP[baseSpan] || "col-span-12"}
        ${smSpan ? SM_COL_SPAN_MAP[smSpan] || "" : ""}
        ${mdSpan ? MD_COL_SPAN_MAP[mdSpan] || "" : ""}
        ${lgSpan ? LG_COL_SPAN_MAP[lgSpan] || "" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
