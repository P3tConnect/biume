"use server";

import { createServerAction, db, resend } from "../lib";
import { waitlist, waitlistInsertSchema, waitlistSelectSchema } from "../db";
import { revalidatePath } from "next/cache";
import NewPersonWaitList from "@/emails/NewPersonWaitListEmail";

export const getWaitList = createServerAction(
  waitlistSelectSchema,
  async (input, ctx) => {
    const waitList = await db.query.waitlist.findMany();

    if (!waitList) {
      throw new Error("Failed to get waitlist");
    }

    return waitList;
  },
  [],
);

export const addToWaitList = createServerAction(
  waitlistInsertSchema,
  async (input, ctx) => {
    const waitList = await db
      .insert(waitlist)
      .values(input)
      .returning()
      .execute();

    if (!waitList) {
      throw new Error("Failed to add to waitlist");
    }

    const mail = await resend.emails.send({
      from: "Biume<contact@biume.com>",
      subject: "New person in the WaitList",
      to: ["mathchambaud@icloud.com", "graig.kolodziejczyk@icloud.com"],
      react: NewPersonWaitList({ subEmail: input.email }),
    });

    if (mail.error) {
      console.log(mail.error.message);
      throw new Error(mail.error.message);
    }

    revalidatePath("/");

    return waitList;
  },
  [],
);
