"use server";

import NewPersonWaitList from "@/emails/NewPersonWaitList";
import { resend } from "../utils/resend";
import { redirect } from "next/navigation";
import { db } from "../utils/db";
import { user } from "../db/user";
import { eq } from "drizzle-orm";

export const newSubWaitlist = async (subEmail: string) => {
  const mail = await resend.emails.send({
    from: "PawThera<contact@pawthera.com>",
    subject: "New person in the WaitList",
    to: ["mathieu.chambaud@pawthera.com", "graig.kolodziejczyk@pawthera.com"],
    react: NewPersonWaitList({ subEmail }),
  });

  if (mail.error) {
    console.log(mail.error.message, "we have an error");
  } else {
    console.log(mail.data);
    redirect("/waitlist");
  }
};

async function request() {}
