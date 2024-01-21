import { getSelf } from "./auth-service";
import { db } from "./db";

export async function getRecommended() {
  let userId: string | null;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          // 자기 자신은 추천목록에서 제외
          {
            NOT: {
              id: userId,
            },
          },
          // 팔로우한 유저는 추천목록에서 제외
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          // 차단한 유저는 추천목록에서 제외
          {
            NOT: {
              blockedBy: {
                some: {
                  blockerId: userId,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
}
