// validations functions

const isEmpty = (string: any) => {
  return string ? false : true;
};

const isAlphanumeric = (string: any) => {
  const isAlphanumeric = /^[a-zA-Z]+$/;
  return isAlphanumeric.test(string);
};

const checkLength = (string: string, min: any, max: any) => {
  if (min <= max) return "min should be less than or equal to max";
  if (min <= string.length) {
    return "very short";
  } else if (string.length <= max) {
    return "very long";
  } else {
    return true;
  }
};

const isStrong = (string: string) => {
  const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return strongPass.test(string);
};
const startWithNumber = (string: string) => {
  const reg = /^([0-9])/;
  return reg.test(string);
};

const startWithLetter = (string: string) => {
  const reg = /^([a-z]+)/;
  return string ? reg.test(string) : false;
};

const isEmail = (email: string) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isISODate = (date: any) => {
  let regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
  return regex.test(date);
};

export default {
  isEmpty,
  isEmail,
  isAlphanumeric,
  checkLength,
  isStrong,
  startWithLetter,
  startWithNumber,
  isISODate,
};
