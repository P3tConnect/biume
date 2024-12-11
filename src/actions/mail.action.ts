"use server";

import NewPersonWaitList from "@/emails/NewPersonWaitListEmail";
import { resend } from "../lib/resend";
import { redirect } from "next/navigation";
import { action } from "../lib/action";
import { emailSchema } from "../lib/schemas";
import { ZSAError } from "zsa";

export const newSubWaitList = action
  .input(emailSchema)
  .handler(async ({ input }) => {
    const mail = await resend.emails.send({
      from: "PawThera<contact@pawthera.com>",
      subject: "New person in the WaitList",
      to: ["mathieu.chambaud@pawthera.com", "graig.kolodziejczyk@pawthera.com"],
      react: NewPersonWaitList({ subEmail: input.email }),
    });

    if (mail.error) {
      console.log(mail.error.message);
      throw new ZSAError("ERROR", mail.error.message);
    } else {
      redirect("/waitlist");
    }
  });
