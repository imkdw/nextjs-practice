import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export async function getSelf() {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error("Not Found");
  }

  return user;
}
