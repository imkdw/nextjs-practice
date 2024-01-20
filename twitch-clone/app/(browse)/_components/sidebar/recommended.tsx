"use client";

import { User } from "@prisma/client";
import { useSidebar } from "../../../../store/use-sidebar";
import UserItem, { UserItemSkeleton } from "./user-item";

interface Props {
  data: User[];
}

export default function Recommended({ data }: Props) {
  const { collapsed } = useSidebar((state) => state);

  // 추천 유저가 1명 이상일때 라벨을 보여줌
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommend</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem key={user.id} username={user.username} imageUrl={user.imageUrl} isLive />
        ))}
      </ul>
    </div>
  );
}

export function RecommendedSkeleton() {
  return (
    <ul className="px2">
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
    </ul>
  );
}
