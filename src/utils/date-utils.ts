export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const formatDate = (date: Date | null, formatStr: string = "dd/MM/yyyy"): string => {
  if (!date) return "";

  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;

  const dd = d < 10 ? `0${d}` : `${d}`;
  const mm = m < 10 ? `0${m}` : `${m}`;
  const HH = hours < 10 ? `0${hours}` : `${hours}`;
  const MM = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Simple format replacement
  // Extend as needed or use a regex for more robustness
  return formatStr
    .replace("dd", dd)
    .replace("MM", mm)
    .replace("yyyy", `${y}`)
    .replace("d", `${d}`)
    .replace("M", `${m}`)
    .replace("HH", HH)
    .replace("mm", MM)
    .replace("hh", `${hours12}`)
    .replace("a", ampm);
};

export const parseDate = (dateStr: string): Date | null => {
  // Basic parsing for default format dd/MM/yyyy
  // This is a simplified parser; for production robust use, a library or complex regex is better.
  const parts = dateStr.split(/[-/.]/);
  if (parts.length === 3) {
    // Assumption: dd/mm/yyyy or yyyy-mm-dd
    // Let's try to detect based on 4 digits
    if (parts[0].length === 4) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    } else {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;
  return null;
};

export const isSameDay = (d1: Date | null, d2: Date | null): boolean => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const isToday = (d: Date): boolean => {
  return isSameDay(d, new Date());
};

export const addMonths = (date: Date, monthsToAdd: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + monthsToAdd);
  return newDate;
};

export const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};
