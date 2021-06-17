export const elapsedTime = (time: string | number | Date) => {
  const timePassed = new Date().getTime() - new Date(time).getTime();
  const years = Math.floor(timePassed / 31536000000);
  const months = Math.floor((timePassed - years * 31536000000) / 2628000000);
  const days = Math.floor((timePassed - months * 2628000000) / 86400000);
  const hours = Math.floor((timePassed - days * 86400000) / 3600000);
  const minutes = Math.floor((timePassed - hours * 3600000) / 60000);

  return `${
    years > 0
      ? `${years}y`
      : `${
          months > 0
            ? `${months}mo`
            : `${
                days > 0
                  ? `${days}d`
                  : `${
                      hours > 0
                        ? `${hours}h`
                        : `${minutes > 0 ? `${minutes}min` : "just now"}`
                    }`
              }`
        }`
  }`;
};
