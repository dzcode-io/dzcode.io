/**
 * @function calculateDate
 * @description this function calculate the date difference between two dates
 * @param {Date} startDate - the start date
 * @param {Date} endDate - the end date
 * @returns {string} the difference between the two dates
 * @author [Omar Belghaouti](https://github.com/Omar-Belghaouti)
 */
export const calculateDate = (startDate: Date, endDate: Date): string => {
  const diff = endDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);
  const diffHours = Math.floor((diff - diffDays * 24 * 1000 * 60 * 60) / (1000 * 60 * 60));
  const diffMinutes = Math.floor(
    (diff - diffDays * 24 * 1000 * 60 * 60 - diffHours * 1000 * 60 * 60) / (1000 * 60),
  );
  const diffSeconds = Math.floor(
    (diff - diffDays * 24 * 1000 * 60 * 60 - diffHours * 1000 * 60 * 60 - diffMinutes * 1000 * 60) /
      1000,
  );
  if (diffYears > 0) {
    return `${diffYears}y`;
  }
  if (diffMonths > 0) {
    return `${diffMonths}mo`;
  }
  if (diffDays > 0) {
    return `${diffDays}d`;
  }
  if (diffHours > 0) {
    return `${diffHours}h`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes}m`;
  }
  return `${diffSeconds}s`;
};
