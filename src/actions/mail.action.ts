"use server"

import { redirect } from "next/navigation"

import NewPersonWaitList from "@/emails/NewPersonWaitListEmail"

import { ActionError, createServerAction } from "../lib"
import { resend } from "../lib/resend"
import { emailSchema } from "../lib/schemas"

export const newSubWaitList = createServerAction(
  emailSchema,
  async (input, ctx) => {
    const mail = await resend.emails.send({
      from: "PawThera<contact@pawthera.com>",
      subject: "New person in the WaitList",
      to: ["mathieu.chambaud@pawthera.com", "graig.kolodziejczyk@pawthera.com"],
      react: NewPersonWaitList({ subEmail: input.email }),
    })

    if (mail.error) {
      console.log(mail.error.message)
      throw new ActionError(mail.error.message)
    } else {
      redirect("/waitlist")
    }
  },
  []
)
