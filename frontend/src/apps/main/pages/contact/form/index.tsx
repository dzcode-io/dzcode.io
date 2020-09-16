import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import { toast } from "react-toastify";
import { validateField } from "./validation/validate-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0 ",
  },
  button: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));

interface SendMessageParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const sendMessage = async ({
  name,
  email,
  subject,
  message,
}: SendMessageParams) => {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "https://dzcode.io",
    };

    const res = await axios.post(
      "https://us-central1-dzcode-io.cloudfunctions.net/api/contact",
      { name, email, subject, message },
      { headers: headers },
    );
  } catch (error) {
    console.error(error);

    const emoji = Math.random() * 10 > 5 ? "👀" : "💭";

    toast.error(`${emoji} Ops!, Something Went Wrong.`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const ContactForm = (props: any) => {
  const initialState = {
    name: "",
    email: "",
    subject: "",
    message: "",
    errors: { name: "", email: "", subject: "", message: "" },
  };

  const [state, setState] = useState(initialState);

  const handleChange = (event: { currentTarget: any }): void => {
    const target = event.currentTarget;
    const { name, value } = target;

    const errors = validateField(name, value);
    setState({
      ...state,
      [name]: value,
      errors: { ...state.errors, ...errors },
    });
  };

  const handleSubmit = async (event: any) => {
    const emoji = Math.random() * 10 > 5 ? "✌" : "👍";
    event.preventDefault();
    toast.success(`${emoji} Message Sent Successfully!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const { name, email, subject, message } = state;
    const form = {
      name,
      email,
      subject,
      message,
    };

    await sendMessage(form);

    setState(initialState);
  };
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        className={classes.input}
        id="name"
        label="Name"
        name="name"
        autoComplete="off"
        type="text"
        variant="outlined"
        value={state.name}
        onChange={handleChange}
        error={!!state.errors.name}
        helperText={state.errors.name}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        className={classes.input}
        id="email"
        label="Email"
        name="email"
        autoComplete="off"
        type="email"
        variant="outlined"
        value={state.email}
        onChange={handleChange}
        error={!!state.errors.email}
        helperText={state.errors.email}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        className={classes.input}
        id="subject"
        label="Subject"
        name="subject"
        autoComplete="off"
        type="text"
        variant="outlined"
        value={state.subject}
        onChange={handleChange}
        error={!!state.errors.subject}
        helperText={state.errors.subject}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        className={classes.input}
        id="message"
        label="Message"
        name="message"
        autoComplete="off"
        type="text"
        variant="outlined"
        value={state.message}
        onChange={handleChange}
        error={!!state.errors.message}
        helperText={state.errors.message}
        multiline={true}
        rows={8}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
        disableElevation
      >
        Send Message
      </Button>
    </form>
  );
};
