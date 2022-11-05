import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: "alimuhammadfc5@gmail.com",
    pass: "RInaZGYL6kcwTOjM",
  },
  //   service: "gmail",
  //   auth: {
  //     user: "alimuhammadfp5@gmail.com",
  //     pass: "Mna&h?123",
  //   },
});

export const emailRouter = router({
  send: protectedProcedure.input(z.object({})).mutation(async ({ ctx }) => {
    const mailOptions = {
      from: "youremail@gmail.com",
      to: "myfriend@yahoo.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    const mail = await transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return { mail };
  }),
});
