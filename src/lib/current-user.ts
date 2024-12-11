"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

export const currentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!session) {
    throw new Error("You are not logged in");
  }

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
