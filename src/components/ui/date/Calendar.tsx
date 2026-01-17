import React, { useState, useEffect } from "react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  daysShort,
  months,
  isSameDay,
  isToday,
  addMonths,
} from "../../../utils/date-utils";

interface CalendarProps {
  value?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (date: Date) => void;
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  minDate?: Date;
  maxDate?: Date;
  isRange?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  value,
  startDate,
  endDate,
  onChange,
  onRangeChange,
  minDate,
  maxDate,
  isRange = false,
}) => {
  // Initialize view date based on value or current date
  const [viewDate, setViewDate] = useState(value || startDate || new Date());

  useEffect(() => {
    if (value) setViewDate(value);
    else if (startDate) setViewDate(startDate);
  }, [value, startDate]);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    setViewDate(addMonths(viewDate, -1));
  };

  const nextMonth = () => {
    setViewDate(addMonths(viewDate, 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);

    if (minDate && selectedDate < new Date(minDate.setHours(0, 0, 0, 0))) return;
    if (maxDate && selectedDate > new Date(maxDate.setHours(0, 0, 0, 0))) return;

    if (isRange && onRangeChange) {
      // Logic for range selection
      if (!startDate || (startDate && endDate)) {
        onRangeChange({ start: selectedDate, end: null });
      } else if (startDate && !endDate) {
        if (selectedDate < startDate) {
          onRangeChange({ start: selectedDate, end: startDate });
        } else {
          onRangeChange({ start: startDate, end: selectedDate });
        }
      }
    } else {
      onChange?.(selectedDate);
    }
  };

  const isSelected = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (isRange) {
      if (startDate && isSameDay(date, startDate)) return true;
      if (endDate && isSameDay(date, endDate)) return true;
      return false;
    }
    return value ? isSameDay(date, value) : false;
  };

  const isInRange = (day: number) => {
    if (!isRange || !startDate || !endDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date > startDate && date < endDate;
  };

  const isDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(0, 0, 0, 0))) return true;
    return false;
  };

  // Generate calendar grid
  const renderDays = () => {
    const days = [];
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const _isSelected = isSelected(day);
      const _isToday = isToday(new Date(currentYear, currentMonth, day));
      const _isInRange = isInRange(day);
      const _isDisabled = isDisabled(day);

      let cellClass =
        "w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors";

      if (_isDisabled) {
        cellClass += " text-gray-300 cursor-not-allowed";
      } else if (_isSelected) {
        cellClass += " bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90";
      } else if (_isInRange) {
        cellClass += " bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-none";
        // Fix rounded corners for range ends
      } else if (_isToday) {
        cellClass +=
          " text-[var(--color-primary)] font-bold bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20";
      } else {
        cellClass += " hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-gray-200";
      }

      // Adjust rounded corners for range ends within the grid
      if (isRange && startDate && endDate) {
        const date = new Date(currentYear, currentMonth, day);
        if (isSameDay(date, startDate))
          cellClass = cellClass.replace("rounded-none", "") + " rounded-l-full rounded-r-none";
        if (isSameDay(date, endDate))
          cellClass = cellClass.replace("rounded-none", "") + " rounded-r-full rounded-l-none";
        if (isSameDay(date, startDate) && isSameDay(date, endDate)) cellClass += " rounded-full";
      }

      days.push(
        <div key={day} className={cellClass} onClick={() => !_isDisabled && handleDateClick(day)}>
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 w-fit select-none">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={prevMonth}
          type="button"
          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-600 dark:text-gray-400"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          {months[currentMonth]} {currentYear}
        </span>
        <button
          onClick={nextMonth}
          type="button"
          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-600 dark:text-gray-400"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {daysShort.map((day) => (
          <div
            key={day}
            className="w-8 text-center text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 gap-x-1">{renderDays()}</div>
    </div>
  );
};
