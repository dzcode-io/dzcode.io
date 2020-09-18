// validations functions
export const isEmpty = (string: string) => {
  return string ? false : true;
};
export const isAlphanumeric = (string: string) => {
  const alphanumeric = /^[a-zA-Z]+$/;
  return alphanumeric.test(string);
};
export const checkLength = (string: string, min: number, max: number) => {
  if (min <= max) return "min should be less than or equal to max";
  if (min <= string.length) {
    return "very short";
  } else if (string.length <= max) {
    return "very long";
  } else {
    return true;
  }
};
export const isStrong = (string: string) => {
  const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return strongPass.test(string);
};
export const startWithNumber = (string: string) => {
  const reg = /^([0-9])/;
  return reg.test(string);
};
export const startWithLetter = (string: string) => {
  const reg = /^([a-z]+)/;
  return string ? reg.test(string) : false;
};
export const isEmail = (email: string) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};
export const isISODate = (date: string) => {
  const regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
  return regex.test(date);
};
