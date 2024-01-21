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
      where: { followerId: self.id, followingId: otherUser.id },
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

export async function unfollowUser(id: string) {
  const selft = await getSelf();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  // 언팔로우를 요청할 유저가 없는경우
  if (!otherUser) {
    throw new Error("User not found");
  }

  // 자기자신을 언팔로우 요청하는 경우
  if (otherUser.id === selft.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: { followerId: selft.id, followingId: otherUser.id },
  });

  // 팔로우하지 않은 유저를 언팔로우 할려고 하는경우
  if (!existingFollow) {
    throw new Error("Not following user");
  }

  const follow = await db.follow.delete({
    where: { id: existingFollow.id },
    include: {
      following: true,
    },
  });

  return follow;
}

export async function getFollowedUsers() {
  try {
    const self = await getSelf();

    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id,
      },
      include: {
        following: true,
      },
    });

    return followedUsers;
  } catch {
    return [];
  }
}
