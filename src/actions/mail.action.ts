"use server";

import NewPersonWaitList from "@/emails/NewPersonWaitListEmail";
import { resend } from "../lib/resend";
import { redirect } from "next/navigation";
import { action, ActionError } from "../lib/action-utils";
import { emailSchema } from "../lib/schemas";

export const newSubWaitList = action
  .schema(emailSchema)
  .action(async ({ parsedInput }) => {
    const mail = await resend.emails.send({
      from: "PawThera<contact@pawthera.com>",
      subject: "New person in the WaitList",
      to: ["mathieu.chambaud@pawthera.com", "graig.kolodziejczyk@pawthera.com"],
      react: NewPersonWaitList({ subEmail: parsedInput.email }),
    });

    if (mail.error) {
      console.log(mail.error.message);
      throw new ActionError(mail.error.message);
    } else {
      redirect("/waitlist");
    }
  });
