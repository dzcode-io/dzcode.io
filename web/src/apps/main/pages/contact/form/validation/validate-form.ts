import { isEmail, isEmpty } from "./validation";

export const validateField = (name: string, value: string) => {
  const errors: Record<string, unknown> = {
    valid: true,
  };
  switch (name) {
    case "name":
      if (isEmpty(value)) {
        errors.name = "Please add your name";
        errors.valid = false;
      } else {
        errors.name = "";
      }
      break;
    case "email":
      if (!isEmail(value)) {
        errors.email = "Please add a valid email";
        errors.valid = false;
      } else {
        errors.email = "";
      }
      break;

    case "subject":
      if (isEmpty(value)) {
        errors.subject = "Please add a subject";
        errors.valid = false;
      } else {
        errors.subject = "";
      }

      break;
    case "message":
      if (isEmpty(value)) {
        errors.message = "Please add a message";
        errors.valid = false;
      } else {
        errors.message = "";
      }
      break;

    default:
      break;
  }
  return errors;
};
