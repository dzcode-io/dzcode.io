import * as functions from "firebase-functions";
import sgMail from "@sendgrid/mail";

// setup send grid
let SENDGRID_API_KEY: string = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);
let admins: string[] = functions.config().sendgrid.admins;
let user: string = functions.config().sendgrid.contactEmail;

export const sendEmail = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snapshot, _context) => {
    const contactMessage = snapshot.data();

    if (contactMessage) {
      //
      const { name, email, subject, message, createdAt } = contactMessage;

      // format mails message
      // user message
      let senderMessage = {
        to: email,
        from: user,
        subject: "Message Received",
        text: `Hello ${name},I received your message. I will get back to you as soon as possible.`,
      };
      //

      // admin notification
      let adminMessage = {
        from: user,
        to: admins,
        subject: "New Message Sent",
        text: `there is a new message sent. 
        At: ${createdAt}
        from: ${name}, email: ${email}
        about: ${subject}
        message: ${message}
        `,
      };

      // send mail to user
      sgMail.send(senderMessage);

      // send mail to admin
      sgMail.send(adminMessage);
    }
  });
