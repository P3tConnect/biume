"use server";

import NewPersonWaitList from "@/emails/NewPersonWaitList";
import { resend } from "../utils/resend";
import { redirect } from "next/navigation";
import { any, z } from "zod";

const emailSchema = z.object({
  subEmail: z.string().email(),
});

export const newSubWaitlist = async (formData: FormData) => {
  const validateSchema = emailSchema.safeParse(formData);

  if (!validateSchema.success) {
    return {
      error: validateSchema.error.flatten().fieldErrors,
    };
  }

  const mail = await resend.emails.send({
    from: "PawThera<contact@pawthera.com>",
    subject: "New person in the WaitList",
    to: ["mathieu.chambaud@pawthera.com", "graig.kolodziejczyk@pawthera.com"],
    react: NewPersonWaitList({ subEmail: validateSchema.data.subEmail }),
  });

  if (mail.error) {
    console.log(mail.error.message, "we have an error");
  } else {
    console.log(mail.data);
    redirect("/waitlist");
  }
};
