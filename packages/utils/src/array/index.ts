export const arrayOf = (length: number): number[] => {
  return Array.from({ length }, (_, index) => index);
};
