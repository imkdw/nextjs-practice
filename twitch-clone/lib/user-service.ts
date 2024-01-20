import { db } from "./db";

export async function getUserByUsername(username: string) {
  const user = await db.user.findUnique({
    where: { username },
  });

  return user;
}
