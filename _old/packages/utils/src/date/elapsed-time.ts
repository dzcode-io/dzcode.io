// @TODO-ZM: move localization logic into the Dictionary files
export const getElapsedTime = (time: string | number | Date, localizedSuffixes: string) => {
  const timePassed = new Date().getTime() - new Date(time).getTime();
  const years = Math.floor(timePassed / 31536000000);
  const months = Math.floor((timePassed - years * 31536000000) / 2628000000);
  const days = Math.floor((timePassed - months * 2628000000) / 86400000);
  const hours = Math.floor((timePassed - days * 86400000) / 3600000);
  const minutes = Math.floor((timePassed - hours * 3600000) / 60000);
  const [year, month, day, hour, minute, now] = localizedSuffixes.split("|");

  return `${
    years > 0
      ? `${years}${year}`
      : `${
          months > 0
            ? `${months}${month}`
            : `${
                days > 0
                  ? `${days}${day}`
                  : `${
                      hours > 0 ? `${hours}${hour}` : `${minutes > 0 ? `${minutes}${minute}` : now}`
                    }`
              }`
        }`
  }`;
};
