import { User } from "../db/user";
import { auth } from "./auth";

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = session.user as unknown as User;

  return user;
};

export const requiredCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
