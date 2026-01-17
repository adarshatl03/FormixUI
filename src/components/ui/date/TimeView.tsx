import React from "react";

interface TimeViewProps {
  value?: Date | null;
  onChange: (date: Date) => void;
}

export const TimeView: React.FC<TimeViewProps> = ({ value, onChange }) => {
  const date = value || new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const handleTimeChange = (type: "hour" | "minute", val: number) => {
    const newDate = new Date(date);
    if (type === "hour") newDate.setHours(val);
    if (type === "minute") newDate.setMinutes(val);
    onChange(newDate);
  };

  const hoursList = Array.from({ length: 24 }, (_, i) => i);
  const minutesList = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="flex h-64 w-40 border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Hr</div>
        {hoursList.map((h) => (
          <div
            key={h}
            className={`cursor-pointer px-3 py-1 text-sm text-center hover:bg-gray-100 dark:hover:bg-zinc-800 ${
              h === hours
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]"
                : ""
            }`}
            onClick={() => handleTimeChange("hour", h)}
          >
            {h.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 border-l border-gray-100 dark:border-zinc-900">
        <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Min</div>
        {minutesList.map((m) => (
          <div
            key={m}
            className={`cursor-pointer px-3 py-1 text-sm text-center hover:bg-gray-100 dark:hover:bg-zinc-800 ${
              m === minutes
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]"
                : ""
            }`}
            onClick={() => handleTimeChange("minute", m)}
          >
            {m.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};
