export const convertTo24Hour = (time: string, period: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  let hour = hours;

  if (period === "AM" && hours === 12) {
    hour = 0;
  } else if (period === "PM" && hours !== 12) {
    hour += 12;
  }

  return hour * 60 + minutes;
};

export const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const checkTimeOverlap = (
  start1: number,
  end1: number,
  start2: number,
  end2: number,
): boolean => {
  // Handle cases where end time is on the next day (smaller than start time)
  if (end1 < start1) end1 += 24 * 60; // Add 24 hours in minutes
  if (end2 < start2) end2 += 24 * 60;

  return start1 < end2 && end1 > start2;
};

export const formatTimeForDisplay = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const parseDateString = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const getWeekNumber = (date: Date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
