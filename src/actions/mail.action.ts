"use server";

import NewPersonWaitList from "@/emails/NewPersonWaitList";
import { resend } from "../utils/resend";
import { redirect } from "next/navigation";
import { any, z } from "zod";
import { ActionError, action } from "../utils/action";
import { emailSchema } from "../utils/schema";

export const newSubWaitList = action(emailSchema, async (params, _) => {
  const mail = await resend.emails.send({
    from: "PawThera<contact@pawthera.com>",
    subject: "New person in the WaitList",
    to: ["mathieu.chambaud@pawthera.com", "graig.kolodziejczyk@pawthera.com"],
    react: NewPersonWaitList({ subEmail: params.email }),
  });

  if (mail.error) {
    console.log(mail.error.message);
    throw new ActionError(mail.error.message);
  } else {
    redirect("/waitlist");
  }
});

// export async function newSubWaitlist(formData: FormData) {
//   const validateSchema = emailSchema.safeParse(formData);

//   if (!validateSchema.success) {
//     return {
//       error: validateSchema.error.flatten().fieldErrors,
//     };
//   }

//   const mail = await resend.emails.send({
//     from: "PawThera<contact@pawthera.com>",
//     subject: "New person in the WaitList",
//     to: ["mathieu.chambaud@pawthera.com", "graig.kolodziejczyk@pawthera.com"],
//     react: NewPersonWaitList({ subEmail: validateSchema.data.email }),
//   });

//   if (mail.error) {
//     console.log(mail.error.message, "we have an error");
//   } else {
//     console.log(mail.data);
//     redirect("/waitlist");
//   }
// }
