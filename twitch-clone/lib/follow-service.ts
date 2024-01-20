import { getSelf } from "./auth-service";
import { db } from "./db";

export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("Not Found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: { id: self.id, followingId: otherUser.id },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
}

export async function followUser(id: string) {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("Not Found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: { id: self.id, followingId: otherUser.id },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
}
