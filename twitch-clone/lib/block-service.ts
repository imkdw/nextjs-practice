import { getSelf } from "./auth-service";
import { db } from "./db";

export async function isBlockedByUser(id: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("User Not Found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
}

export async function blockUser(id: string) {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User Not Found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (existingBlock) {
    throw new Error("User already blocked");
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
}

export async function unblockUser(id: string) {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cannot unblock yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User Not Found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (!existingBlock) {
    throw new Error("User not blocked");
  }

  const block = await db.block.delete({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
    include: {
      blocked: true,
    },
  });

  return block;
}
