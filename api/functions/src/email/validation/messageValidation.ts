import validation from "./validation";

const { isEmail, isEmpty } = validation;

export const validateMessage = (contactMessage: any) => {
  let errors = {
    valid: true,
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const { name, email, subject, message } = contactMessage;

  if (isEmpty(name)) {
    errors.name = "Please add your name";
    errors.valid = false;
  }
  if (!isEmail(email)) {
    errors.email = "Please add a valid email";
    errors.valid = false;
  }
  if (isEmpty(subject)) {
    errors.subject = "Please add a subject";
    errors.valid = false;
  }
  if (isEmpty(message)) {
    errors.message = "Please add a message";
    errors.valid = false;
  }
  return errors;
};

export default validateMessage;
