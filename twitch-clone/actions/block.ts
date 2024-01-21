"use server";

import { revalidatePath } from "next/cache";
import { blockUser } from "../lib/block-service";

export async function onBlock(id: string) {
  // TODO: 라이브 모드에서 블럭처리 하기
  // TODO: 강퇴기능 구현하기
  const blockedUser = await blockUser(id);

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }

  return blockedUser;
}
