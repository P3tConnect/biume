"use server";
import { currentUser as connectedUser, auth } from "@clerk/nextjs/server";

export const currentUser = async () => {
  const session = auth();
  const user = await connectedUser();

  if (!session) {
    throw new Error("You are not logged in");
  }

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
