"use server";

import { revalidatePath } from "next/cache";
import { followUser } from "../lib/follow-service";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);
    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (err) {
    throw new Error("Internal Server Error");
  }
}
