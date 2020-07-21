import { isEmail, isEmpty } from "./validation";

export const validateField = (name: string, value: string) => {
  const errors = {
    name: "",
    email: "",
    subject: "",
    message: "",
    valid: true,
  };
  switch (name) {
    case "name":
      if (isEmpty(value)) {
        errors.name = "Please add your name";
        errors.valid = false;
      }
      break;
    case "email":
      if (!isEmail(value)) {
        errors.email = "Please add a valid email";
        errors.valid = false;
      }
      break;

    case "subject":
      if (isEmpty(value)) {
        errors.subject = "Please add a subject";
        errors.valid = false;
      }

      break;
    case "message":
      if (isEmpty(value)) {
        errors.message = "Please add a message";
        errors.valid = false;
      }
      break;

    default:
      break;
  }
  return errors;
};
