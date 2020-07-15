const xss = require("xss");

import * as admin from "../utils/admin";
import { Request, Response } from "express";

import validateMessage from "./validation/messageValidation";

const db = admin.db;

const pure = (dirty: string) => {
  var pure = xss(dirty);
  return pure;
};

const postEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    let newMessage = {
      name: pure(name),
      email: pure(email),
      subject: pure(subject),
      message: pure(message),
      createdAt: new Date().toISOString(),
    };

    // validate
    let errors = validateMessage(newMessage);
    if (!errors.valid) {
      return res.status(400).json(errors);
    }

    // add
    await db.collection("messages").add(newMessage);

    return res.json({ message: "message added successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export default postEmail;
